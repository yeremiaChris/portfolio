import { describe, expect, it } from "vitest";

import {
  streamOpenAIChatCompletions,
  toOpenAIMessages,
} from "./lab-openai-chat";

describe("toOpenAIMessages", () => {
  it("maps Gemini-style turns to OpenAI roles", () => {
    expect(
      toOpenAIMessages("System rules", [
        { role: "user", parts: [{ text: "Hi" }] },
        { role: "model", parts: [{ text: "Hello" }] },
      ]),
    ).toEqual([
      { role: "system", content: "System rules" },
      { role: "user", content: "Hi" },
      { role: "assistant", content: "Hello" },
    ]);
  });
});

describe("streamOpenAIChatCompletions", () => {
  it("streams text deltas from SSE", async () => {
    const encoder = new TextEncoder();
    const body = [
      'data: {"choices":[{"delta":{"content":"Hel"}}]}\n',
      'data: {"choices":[{"delta":{"content":"lo"}}]}\n',
      'data: {"usage":{"prompt_tokens":10,"completion_tokens":2}}\n',
      "data: [DONE]\n",
    ].join("");

    const response = new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(body));
          controller.close();
        },
      }),
      { status: 200 },
    );

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => response;

    const tokens: string[] = [];
    try {
      for await (const chunk of streamOpenAIChatCompletions({
        baseUrl: "https://api.example.com/v1",
        apiKey: "secret",
        model: "deepseek-chat",
        systemInstruction: "Rules",
        contents: [{ role: "user", parts: [{ text: "Hi" }] }],
        maxOutputTokens: 128,
        signal: new AbortController().signal,
      })) {
        if (chunk.text) tokens.push(chunk.text);
      }
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(tokens.join("")).toBe("Hello");
  });

  it("throws with HTTP status on error responses", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      new Response("rate limited", { status: 429 });

    try {
      const iterator = streamOpenAIChatCompletions({
        baseUrl: "https://api.example.com/v1",
        apiKey: "secret",
        model: "deepseek-chat",
        systemInstruction: "Rules",
        contents: [{ role: "user", parts: [{ text: "Hi" }] }],
        maxOutputTokens: 128,
        signal: new AbortController().signal,
      });
      await iterator.next();
      expect.unreachable("should have thrown");
    } catch (error) {
      expect(error).toMatchObject({ status: 429 });
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
