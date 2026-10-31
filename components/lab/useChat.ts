import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import {
  historyForRegenerate,
  type ChatTransport,
  type Message,
  type MessageStatus,
} from "@/lib/lab-chat";
import { askYeremia } from "@/lib/lab";
import { httpTransport } from "@/lib/lab-http-transport";
import { DEFAULT_MODEL_ID, type ChatModel } from "@/lib/lab-models";

const MODEL_STORAGE_KEY = "ask-yeremia-model-id";

function modelChangeEventName(storageKey: string) {
  return `ask-yeremia-model:${storageKey}`;
}

function findEnabledModel(
  models: ChatModel[],
  id: string,
): ChatModel | undefined {
  const model = models.find((entry) => entry.id === id);
  return model?.enabled ? model : undefined;
}

function readStoredModelId(storageKey: string, models: ChatModel[]): string {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored && findEnabledModel(models, stored)) return stored;
  } catch {
    // localStorage can be unavailable.
  }
  return DEFAULT_MODEL_ID;
}

function subscribeToModelId(storageKey: string, onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) onStoreChange();
  };
  const onLocal = () => onStoreChange();

  window.addEventListener("storage", onStorage);
  window.addEventListener(modelChangeEventName(storageKey), onLocal);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(modelChangeEventName(storageKey), onLocal);
  };
}

function writeStoredModelId(storageKey: string, nextId: string) {
  try {
    window.localStorage.setItem(storageKey, nextId);
  } catch {
    // Ignore persistence failures.
  }
  window.dispatchEvent(new Event(modelChangeEventName(storageKey)));
}

export function useChat(options: {
  transport?: ChatTransport;
  models: ChatModel[];
}) {
  const transport = options.transport ?? httpTransport;
  const models = options.models;
  const storageKey = MODEL_STORAGE_KEY;

  const [messages, setMessages] = useState<Message[]>([]);

  const modelId = useSyncExternalStore(
    (onStoreChange) => subscribeToModelId(storageKey, onStoreChange),
    () => readStoredModelId(storageKey, models),
    () => DEFAULT_MODEL_ID,
  );

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const lastAssistant = messages.findLast(
    (message) => message.role === "assistant",
  );
  const isStreaming =
    lastAssistant?.status === "thinking" ||
    lastAssistant?.status === "streaming";

  function setModelId(nextId: string) {
    if (!findEnabledModel(models, nextId)) return;
    writeStoredModelId(storageKey, nextId);
  }

  function updateMessage(
    id: string,
    patch: Partial<Message> | ((current: Message) => Partial<Message>),
  ) {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id !== id) return message;
        const next = typeof patch === "function" ? patch(message) : patch;
        return { ...message, ...next };
      }),
    );
  }

  function finishAssistant(id: string) {
    updateMessage(id, (current) =>
      current.status === "error" || current.status === "stopped"
        ? {}
        : { status: "done" },
    );
  }

  async function runAssistant(question: string, history: Message[]) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const activeModelId = modelId;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
      status: "done",
    };

    const assistantId = crypto.randomUUID();
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      status: "thinking",
    };

    const nextMessages = [...history, userMessage, assistantMessage];
    setMessages(nextMessages);

    try {
      for await (const event of transport.send({
        messages: nextMessages.filter((message) => message.id !== assistantId),
        modelId: activeModelId,
        signal: controller.signal,
      })) {
        if (event.type === "model") {
          updateMessage(assistantId, { modelId: event.modelId });
          continue;
        }

        if (event.type === "token") {
          updateMessage(assistantId, (current) => ({
            content: `${current.content}${event.text}`,
            status: "streaming" satisfies MessageStatus,
          }));
          continue;
        }

        if (event.type === "sources") {
          updateMessage(assistantId, { sources: event.sources });
          continue;
        }

        if (event.type === "error") {
          updateMessage(assistantId, {
            content: event.message || askYeremia.errorMessage,
            sources: undefined,
            status: "error",
          });
          continue;
        }

        if (event.type === "done") {
          finishAssistant(assistantId);
        }
      }

      finishAssistant(assistantId);
    } catch {
      if (controller.signal.aborted) {
        updateMessage(assistantId, { status: "stopped" });
        return;
      }

      updateMessage(assistantId, {
        content: askYeremia.errorMessage,
        sources: undefined,
        status: "error",
      });
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
    }
  }

  function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || abortRef.current !== null) return;
    void runAssistant(trimmed, messages);
  }

  function stop() {
    abortRef.current?.abort();
  }

  function regenerate() {
    if (abortRef.current !== null) return;
    const prepared = historyForRegenerate(messages);
    if (!prepared) return;
    void runAssistant(prepared.question, prepared.history);
  }

  function reset() {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
  }

  return {
    messages,
    isStreaming,
    modelId,
    setModelId,
    send,
    stop,
    regenerate,
    reset,
  };
}
