import { describe, expect, it } from "vitest";

import type { Message } from "./lab-chat";
import { askYeremia } from "./lab";
import { createMockTransport } from "./lab-mock";
import { resolveAutoModel } from "./lab-models";

function userMessage(content: string): Message {
  return {
    id: "user-1",
    role: "user",
    content,
    status: "done",
  };
}

async function collect(
  question: string,
  options: { modelId?: string; signal?: AbortSignal; delayMs?: number } = {},
) {
  const transport = createMockTransport({ delayMs: options.delayMs ?? 0 });
  const signal = options.signal ?? new AbortController().signal;
  const tokens: string[] = [];
  let modelId: string | undefined;
  let sources: Message["sources"] = [];

  for await (const event of transport.send({
    messages: [userMessage(question)],
    modelId: options.modelId ?? "auto",
    signal,
  })) {
    if (event.type === "model") modelId = event.modelId;
    if (event.type === "token") tokens.push(event.text);
    if (event.type === "sources") sources = event.sources;
  }

  return { text: tokens.join(""), modelId, sources };
}

describe("mockTransport", () => {
  it("streams a matched canned answer with sources", async () => {
    const { text, sources, modelId } = await collect(
      "Has he worked in healthcare?",
    );

    expect(text).toContain("PrimaKu");
    expect(text).toContain("Mazecare");
    expect(modelId).toBe(resolveAutoModel());
    expect(sources).toEqual([
      { id: 1, title: "Mazecare", url: "/projects#mazecare" },
      { id: 2, title: "PrimaKu", url: "/projects#primaku" },
    ]);
  });

  it("streams the refusal when the question is unknown", async () => {
    const { text, sources } = await collect("What is a good rendang recipe?");

    expect(text).toBe(askYeremia.refusalMessage);
    expect(sources).toEqual([]);
  });

  it("emits the selected model id when not Auto", async () => {
    const { modelId } = await collect("What's his tech stack?", {
      modelId: "gemini-3.5-flash",
    });

    expect(modelId).toBe("gemini-3.5-flash");
  });

  it("throws when the question is the explicit mock error trigger", async () => {
    await expect(collect("__mock_error__")).rejects.toThrow(
      "Mock responder error",
    );
  });

  it("does not throw when the question merely mentions error", async () => {
    const { text } = await collect("Please trigger an error now");
    expect(text).toBe(askYeremia.refusalMessage);
  });

  it("stops when the AbortSignal aborts", async () => {
    const controller = new AbortController();
    const transport = createMockTransport({ delayMs: 20 });
    const iterator = transport
      .send({
        messages: [userMessage("What's his tech stack?")],
        modelId: "auto",
        signal: controller.signal,
      })
      [Symbol.asyncIterator]();

    const first = await iterator.next();
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({ type: "model" });

    const second = await iterator.next();
    expect(second.done).toBe(false);
    expect(second.value).toMatchObject({ type: "token" });

    controller.abort();

    await expect(iterator.next()).rejects.toSatisfy(
      (error: unknown) =>
        error instanceof Error &&
        (error.name === "AbortError" || error.message.length > 0),
    );
  });
});
