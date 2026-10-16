import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const checkLabChatRateLimit = vi.fn<(ip: string) => Promise<unknown>>();
const ipAddress = vi.fn<(request: Request) => string | undefined>(
  () => "203.0.113.10",
);

vi.mock("@/lib/lab-rate-limit", () => ({
  checkLabChatRateLimit: (ip: string) => checkLabChatRateLimit(ip),
  LAB_CHAT_RATE_LIMIT_MESSAGE:
    "Too many questions right now. Please wait a minute and try again.",
  LAB_CHAT_UNAVAILABLE_MESSAGE: "Chat is temporarily unavailable",
}));

vi.mock("@vercel/functions", () => ({
  ipAddress: (request: Request) => ipAddress(request),
}));

describe("POST /api/lab/chat", () => {
  const originalKey = process.env.GEMINI_API_KEY;

  beforeEach(() => {
    process.env.GEMINI_API_KEY = "test-key";
    checkLabChatRateLimit.mockReset();
    checkLabChatRateLimit.mockResolvedValue({ allowed: true });
    ipAddress.mockReturnValue("203.0.113.10");
  });

  afterEach(() => {
    process.env.GEMINI_API_KEY = originalKey;
  });

  it("returns 400 for an invalid body", async () => {
    const { POST } = await import("./route");
    const response = await POST(
      new Request("http://localhost/api/lab/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: "   " }] }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "A user message is required",
    });
  });

  it("returns 429 when the limiter rejects", async () => {
    checkLabChatRateLimit.mockResolvedValue({
      allowed: false,
      status: 429,
      message:
        "Too many questions right now. Please wait a minute and try again.",
    });

    const { POST } = await import("./route");
    const response = await POST(
      new Request("http://localhost/api/lab/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hello" }],
        }),
      }),
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      error:
        "Too many questions right now. Please wait a minute and try again.",
    });
  });

  it("returns a generic 500 when GEMINI_API_KEY is missing", async () => {
    delete process.env.GEMINI_API_KEY;

    const { POST } = await import("./route");
    const response = await POST(
      new Request("http://localhost/api/lab/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hello" }],
        }),
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Something went wrong.",
    });
  });
});
