import type { ChatEvent, ChatTransport } from "./lab-chat";

const CHAT_PATH = "/api/lab/chat";

/** Parse one NDJSON line into a ChatEvent, or null if empty/malformed. */
export function parseNdjsonLine(line: string): ChatEvent | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as ChatEvent;
  } catch {
    return null;
  }
}

/**
 * Append a decoded chunk to the NDJSON buffer and emit complete lines.
 * When `flush` is true, also parse any trailing unterminated line.
 */
export function takeNdjsonEvents(
  buffer: string,
  chunk: string,
  flush = false,
): { events: ChatEvent[]; buffer: string } {
  const combined = `${buffer}${chunk}`;

  if (!flush) {
    const lines = combined.split("\n");
    const rest = lines.pop() ?? "";
    const events: ChatEvent[] = [];
    for (const line of lines) {
      const event = parseNdjsonLine(line);
      if (event) events.push(event);
    }
    return { events, buffer: rest };
  }

  const events: ChatEvent[] = [];
  for (const line of combined.split("\n")) {
    const event = parseNdjsonLine(line);
    if (event) events.push(event);
  }
  return { events, buffer: "" };
}

/**
 * Browser transport: POST NDJSON ChatEvent lines from `/api/lab/chat`.
 */
export const httpTransport: ChatTransport = {
  async *send({ messages, modelId, signal }): AsyncIterable<ChatEvent> {
    const response = await fetch(CHAT_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/x-ndjson",
      },
      body: JSON.stringify({ messages, modelId }),
      signal,
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      let message = `Chat request failed (${response.status})`;
      try {
        const parsed = JSON.parse(detail) as { error?: string };
        if (typeof parsed.error === "string" && parsed.error.trim()) {
          message = parsed.error;
        }
      } catch {
        if (detail.trim()) message = detail.trim();
      }
      throw new Error(message);
    }

    if (!response.body) {
      throw new Error("Chat response had no body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        const trailing = takeNdjsonEvents(buffer, "", true);
        for (const event of trailing.events) yield event;
        break;
      }

      const next = takeNdjsonEvents(
        buffer,
        decoder.decode(value, { stream: true }),
      );
      buffer = next.buffer;
      for (const event of next.events) yield event;
    }
  },
};
