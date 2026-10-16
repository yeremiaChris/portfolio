import { GoogleGenAI } from "@google/genai";

import type { ChatEvent, Message } from "./lab-chat";
import { askYeremia } from "./lab";
import { embedTexts } from "./lab-embed";
import type { LabIndex } from "./lab-index";
import { AUTO_FALLBACK_ORDER, DEFAULT_MODEL_ID, getModel } from "./lab-models";
import {
  buildRagContext,
  parseCitedSources,
  retrieveTopChunks,
} from "./lab-rag";

export const MAX_MESSAGES = 20;
export const MAX_MESSAGE_CHARS = 2000;
/** Last N messages sent to the model (≈ 6 user/assistant turns). */
export const MAX_HISTORY_MESSAGES = 12;

export type ValidatedChatBody = {
  messages: Message[];
  modelId: string;
  question: string;
};

/** Validate POST JSON for /api/lab/chat. Returns an error string or the body. */
export function validateChatBody(value: unknown): ValidatedChatBody | string {
  if (!value || typeof value !== "object") return "Invalid JSON body";
  const record = value as Record<string, unknown>;

  if (!Array.isArray(record.messages)) return "messages must be an array";
  if (record.messages.length === 0) return "A user message is required";
  if (record.messages.length > MAX_MESSAGES) {
    return `At most ${MAX_MESSAGES} messages are allowed`;
  }

  const messages: Message[] = [];
  for (const entry of record.messages) {
    if (!entry || typeof entry !== "object") return "Invalid message entry";
    const message = entry as Record<string, unknown>;
    if (message.role !== "user" && message.role !== "assistant") {
      return "Each message role must be user or assistant";
    }
    if (typeof message.content !== "string") {
      return "Each message must include string content";
    }
    if (message.content.length > MAX_MESSAGE_CHARS) {
      return `Each message must be at most ${MAX_MESSAGE_CHARS} characters`;
    }

    messages.push({
      id:
        typeof message.id === "string" && message.id
          ? message.id
          : `msg-${messages.length}`,
      role: message.role,
      content: message.content,
      status:
        message.status === "thinking" ||
        message.status === "streaming" ||
        message.status === "done" ||
        message.status === "error" ||
        message.status === "stopped"
          ? message.status
          : "done",
      ...(typeof message.modelId === "string"
        ? { modelId: message.modelId }
        : {}),
    });
  }

  const question =
    messages
      .findLast((message) => message.role === "user" && message.content.trim())
      ?.content.trim() ?? "";

  if (!question) return "A user message is required";
  if (question.length > askYeremia.charLimit) {
    return `Question must be at most ${askYeremia.charLimit} characters`;
  }

  const modelId =
    typeof record.modelId === "string" && record.modelId.trim()
      ? record.modelId.trim()
      : DEFAULT_MODEL_ID;

  return { messages, modelId, question };
}

const enabledFallbacks = AUTO_FALLBACK_ORDER.filter(
  (id) => getModel(id)?.enabled,
);

export function modelCandidates(modelId: string): string[] {
  if (modelId === DEFAULT_MODEL_ID) return enabledFallbacks;
  const selected = getModel(modelId);
  if (selected?.enabled) return [selected.id];
  return enabledFallbacks;
}

function isHistoryMessage(message: Message): boolean {
  if (message.role === "user") return message.content.trim().length > 0;
  return (
    message.status === "done" ||
    (message.status === "stopped" && message.content.trim().length > 0)
  );
}

function isFallbackModelError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const status = (error as { status?: unknown }).status;
  return status === 429 || status === 404 || status === 503;
}

export type LabChatStreamDeps = {
  apiKey: string;
  index: LabIndex;
  signal: AbortSignal;
  embedQuery?: (
    question: string,
    signal: AbortSignal,
  ) => Promise<number[] | undefined>;
  generateStream?: (input: {
    modelId: string;
    contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>;
    systemInstruction: string;
    signal: AbortSignal;
  }) => AsyncIterable<{ text?: string }>;
};

/** Stream ChatEvents for a validated Ask Yeremia turn. */
export async function* streamLabChat(
  body: ValidatedChatBody,
  deps: LabChatStreamDeps,
): AsyncGenerator<ChatEvent> {
  const embedQuery =
    deps.embedQuery ??
    (async (question, signal) => {
      const [vector] = await embedTexts({
        texts: [question],
        apiKey: deps.apiKey,
        taskType: "RETRIEVAL_QUERY",
        signal,
      });
      return vector;
    });

  const generateStream =
    deps.generateStream ??
    async function* (input) {
      const ai = new GoogleGenAI({ apiKey: deps.apiKey });
      const stream = await ai.models.generateContentStream({
        model: input.modelId,
        contents: input.contents,
        config: {
          temperature: 0.2,
          abortSignal: input.signal,
          systemInstruction: input.systemInstruction,
        },
      });
      for await (const chunk of stream) {
        yield { text: chunk.text };
      }
    };

  const queryEmbedding = await embedQuery(body.question, deps.signal);
  if (!queryEmbedding) {
    yield { type: "error", message: askYeremia.errorMessage };
    yield { type: "done" };
    return;
  }

  const retrieved = retrieveTopChunks(queryEmbedding, deps.index.chunks);
  if (retrieved.length === 0) {
    yield { type: "token", text: askYeremia.refusalMessage };
    yield { type: "done" };
    return;
  }

  const context = buildRagContext(retrieved);
  const systemInstruction = [
    "You are Ask Yeremia, answering only from the portfolio context below.",
    "If the context does not contain the answer, reply with exactly this sentence:",
    askYeremia.refusalMessage,
    "Cite supporting passages with bracket numbers like [1] or [2] that match the context.",
    "Keep answers concise and factual.",
    "",
    "Context:",
    context,
  ].join("\n");

  const recentTurns = body.messages
    .filter(isHistoryMessage)
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: (message.role === "assistant" ? "model" : "user") as
        "user" | "model",
      parts: [{ text: message.content }],
    }));

  const candidates = modelCandidates(body.modelId);
  if (candidates.length === 0) {
    yield { type: "error", message: askYeremia.errorMessage };
    yield { type: "done" };
    return;
  }

  let answer = "";
  let streamed = false;

  for (let index = 0; index < candidates.length; index++) {
    const modelId = candidates[index]!;
    const isLast = index === candidates.length - 1;

    try {
      let emittedModel = false;
      for await (const chunk of generateStream({
        modelId,
        contents: recentTurns,
        systemInstruction,
        signal: deps.signal,
      })) {
        if (deps.signal.aborted) return;
        const text = chunk.text;
        if (!text) continue;
        if (!emittedModel) {
          yield { type: "model", modelId };
          emittedModel = true;
          streamed = true;
        }
        answer += text;
        yield { type: "token", text };
      }

      if (!emittedModel) {
        if (!isLast) continue;
        yield { type: "error", message: askYeremia.errorMessage };
        yield { type: "done" };
        return;
      }

      break;
    } catch (error) {
      if (deps.signal.aborted) return;
      if (streamed || !isFallbackModelError(error) || isLast) {
        yield { type: "error", message: askYeremia.errorMessage };
        yield { type: "done" };
        return;
      }
    }
  }

  if (deps.signal.aborted) return;

  yield {
    type: "sources",
    sources: parseCitedSources(answer, retrieved),
  };
  yield { type: "done" };
}
