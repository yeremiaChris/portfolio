import { describe, expect, it, vi } from "vitest";

import {
  httpTransport,
  parseNdjsonLine,
  takeNdjsonEvents,
} from "./lab-http-transport";
import type { Message } from "./lab-chat";

const sampleMessages: Message[] = [
  {
    id: "u1",
    role: "user",
    content: "Hello",
    status: "done",
  },
];

describe("parseNdjsonLine", () => {
  it("parses a valid event and skips malformed lines", () => {
    expect(parseNdjsonLine('{"type":"done"}')).toEqual({ type: "done" });
    expect(parseNdjsonLine("{nope")).toBeNull();
    expect(parseNdjsonLine("   ")).toBeNull();
  });
});

describe("takeNdjsonEvents", () => {
  it("splits an event across reads", () => {
    const first = takeNdjsonEvents("", '{"type":"tok');
    expect(first.events).toEqual([]);
    expect(first.buffer).toBe('{"type":"tok');

    const second = takeNdjsonEvents(first.buffer, 'en","text":"Hi"}\n');
    expect(second.events).toEqual([{ type: "token", text: "Hi" }]);
    expect(second.buffer).toBe("");
  });

  it("flushes a trailing line without a newline", () => {
    const result = takeNdjsonEvents("", '{"type":"done"}', true);
    expect(result.events).toEqual([{ type: "done" }]);
    expect(result.buffer).toBe("");
  });

  it("skips malformed lines while keeping valid ones", () => {
    const result = takeNdjsonEvents(
      "",
      '{"type":"done"}\n{bad\n{"type":"model","modelId":"gemini-3.8-flash"}\n',
    );
    expect(result.events).toEqual([
      { type: "done" },
      { type: "model", modelId: "gemini-3.8-flash" },
    ]);
  });
});

describe("httpTransport", () => {
  it("throws a friendly error for non-ok responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ error: "Too many questions" }), {
            status: 429,
            headers: { "Content-Type": "application/json" },
          }),
      ),
    );

    await expect(
      (async () => {
        const iterator = httpTransport
          .send({
            messages: sampleMessages,
            modelId: "auto",
            signal: new AbortController().signal,
          })
          [Symbol.asyncIterator]();
        await iterator.next();
      })(),
    ).rejects.toThrow("Too many questions");

    vi.unstubAllGlobals();
  });

  it("yields events when lines split across stream reads", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode('{"type":"tok'));
        controller.enqueue(encoder.encode('en","text":"Hi"}\n{"type":"done"}'));
        controller.close();
      },
    });

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(stream, { status: 200 })),
    );

    const events = [];
    for await (const event of httpTransport.send({
      messages: sampleMessages,
      modelId: "auto",
      signal: new AbortController().signal,
    })) {
      events.push(event);
    }

    expect(events).toEqual([{ type: "token", text: "Hi" }, { type: "done" }]);

    vi.unstubAllGlobals();
  });
});
