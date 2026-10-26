import type { GeneratedChunk } from "./lab-chat-api";

export type OpenAIChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export function toOpenAIMessages(
  systemInstruction: string,
  contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>,
): OpenAIChatMessage[] {
  const messages: OpenAIChatMessage[] = [
    { role: "system", content: systemInstruction },
  ];
  for (const entry of contents) {
    messages.push({
      role: entry.role === "model" ? "assistant" : "user",
      content: entry.parts.map((part) => part.text).join(""),
    });
  }
  return messages;
}

function parseSseDataLine(line: string): Record<string, unknown> | null {
  const prefix = "data: ";
  if (!line.startsWith(prefix)) return null;
  const payload = line.slice(prefix.length).trim();
  if (!payload || payload === "[DONE]") return null;
  try {
    return JSON.parse(payload) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function* streamOpenAIChatCompletions(input: {
  baseUrl: string;
  apiKey: string;
  model: string;
  systemInstruction: string;
  contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>;
  maxOutputTokens: number;
  signal: AbortSignal;
}): AsyncGenerator<GeneratedChunk> {
  const base = input.baseUrl.replace(/\/$/, "");
  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: input.model,
      messages: toOpenAIMessages(input.systemInstruction, input.contents),
      temperature: 0.2,
      max_tokens: input.maxOutputTokens,
      stream: true,
      stream_options: { include_usage: true },
    }),
    signal: input.signal,
  });

  if (!response.ok) {
    throw Object.assign(
      new Error(`OpenAI-compatible HTTP ${response.status}`),
      {
        status: response.status,
      },
    );
  }

  if (!response.body) {
    throw Object.assign(new Error("OpenAI-compatible empty body"), {
      status: 503,
    });
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let inputTokens: number | undefined;
  let outputTokens: number | undefined;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex = buffer.indexOf("\n");
    while (newlineIndex !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      newlineIndex = buffer.indexOf("\n");

      const parsed = parseSseDataLine(line);
      if (!parsed) continue;

      const usage = parsed.usage as
        { prompt_tokens?: number; completion_tokens?: number } | undefined;
      if (usage) {
        if (typeof usage.prompt_tokens === "number") {
          inputTokens = usage.prompt_tokens;
        }
        if (typeof usage.completion_tokens === "number") {
          outputTokens = usage.completion_tokens;
        }
      }

      const choices = parsed.choices;
      if (!Array.isArray(choices) || choices.length === 0) continue;
      const choice = choices[0] as { delta?: { content?: string } };
      const text = choice.delta?.content;
      if (text) {
        yield { text, inputTokens, outputTokens };
      }
    }
  }

  if (inputTokens !== undefined || outputTokens !== undefined) {
    yield { inputTokens, outputTokens };
  }
}
