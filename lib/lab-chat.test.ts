import { describe, expect, it } from "vitest";

import { historyForRegenerate, type Message } from "./lab-chat";

function user(id: string, content: string): Message {
  return { id, role: "user", content, status: "done" };
}

function assistant(
  id: string,
  status: Message["status"],
  content = "",
): Message {
  return { id, role: "assistant", content, status };
}

describe("historyForRegenerate", () => {
  it("returns null for an empty transcript", () => {
    expect(historyForRegenerate([])).toBeNull();
  });

  it("returns null when there is no user message to replay", () => {
    expect(historyForRegenerate([assistant("a1", "done", "hi")])).toBeNull();
  });

  it("trims a finished assistant turn and replays the last user question", () => {
    const messages = [
      user("u1", "first"),
      assistant("a1", "done", "answer one"),
      user("u2", "second"),
      assistant("a2", "done", "answer two"),
    ];

    expect(historyForRegenerate(messages)).toEqual({
      history: [user("u1", "first"), assistant("a1", "done", "answer one")],
      question: "second",
    });
  });

  it("trims an error assistant the same way (retry path)", () => {
    const messages = [
      user("u1", "Has he worked in healthcare?"),
      assistant("a1", "error", "Something went wrong."),
    ];

    expect(historyForRegenerate(messages)).toEqual({
      history: [],
      question: "Has he worked in healthcare?",
    });
  });

  it("pops consecutive trailing assistants before the user", () => {
    const messages = [
      user("u1", "stack?"),
      assistant("a1", "stopped", "partial"),
      assistant("a2", "thinking"),
    ];

    expect(historyForRegenerate(messages)).toEqual({
      history: [],
      question: "stack?",
    });
  });
});
