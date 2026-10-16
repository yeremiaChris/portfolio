import { describe, expect, it, vi } from "vitest";

import { LAB_EMBEDDING_DIMENSIONS } from "./lab-index";
import {
  EMBED_BATCH_SIZE,
  EMBED_RETRY_DELAYS_MS,
  embedTexts,
  isRetryableEmbedError,
  l2Normalize,
  readRetryDelayMs,
  splitIntoBatches,
} from "./lab-embed";

function unitVector(): number[] {
  return Array.from({ length: LAB_EMBEDDING_DIMENSIONS }, (_, i) =>
    i === 0 ? 3 : 0,
  );
}

describe("splitIntoBatches", () => {
  it("splits items into fixed-size batches", () => {
    expect(splitIntoBatches([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("returns one batch when size covers all items", () => {
    expect(splitIntoBatches(["a", "b"], 50)).toEqual([["a", "b"]]);
  });
});

describe("isRetryableEmbedError", () => {
  it("retries 429 and 503 only", () => {
    expect(isRetryableEmbedError({ status: 429 })).toBe(true);
    expect(isRetryableEmbedError({ statusCode: 503 })).toBe(true);
    expect(isRetryableEmbedError({ status: 500 })).toBe(false);
    expect(isRetryableEmbedError(new Error("boom"))).toBe(false);
  });
});

describe("readRetryDelayMs", () => {
  it("parses the Gemini retry hint from the error message", () => {
    expect(
      readRetryDelayMs(
        new Error("Quota exceeded. Please retry in 54.427754785s."),
      ),
    ).toBe(54428);
  });
});

describe("l2Normalize", () => {
  it("returns a unit-length vector", () => {
    const normalized = l2Normalize([3, 4]);
    expect(normalized[0]).toBeCloseTo(0.6);
    expect(normalized[1]).toBeCloseTo(0.8);
    const length = Math.hypot(...normalized);
    expect(length).toBeCloseTo(1);
  });

  it("returns zeros for a zero vector", () => {
    expect(l2Normalize([0, 0, 0])).toEqual([0, 0, 0]);
  });
});

describe("embedTexts", () => {
  it("batches calls, L2-normalizes, and concatenates vectors in order", async () => {
    const embedBatch = vi.fn(async (texts: string[]) =>
      texts.map(() => unitVector()),
    );

    const vectors = await embedTexts({
      texts: Array.from({ length: EMBED_BATCH_SIZE + 2 }, (_, i) => `t${i}`),
      apiKey: "test-key",
      batchSize: EMBED_BATCH_SIZE,
      embedBatch,
      sleep: async () => undefined,
    });

    expect(embedBatch).toHaveBeenCalledTimes(2);
    expect(embedBatch.mock.calls[0]?.[0]).toHaveLength(EMBED_BATCH_SIZE);
    expect(embedBatch.mock.calls[1]?.[0]).toHaveLength(2);
    expect(vectors).toHaveLength(EMBED_BATCH_SIZE + 2);
    expect(vectors[0]?.[0]).toBeCloseTo(1);
    expect(Math.hypot(...(vectors[0] ?? []))).toBeCloseTo(1);
  });

  it("rejects embeddings with the wrong length", async () => {
    await expect(
      embedTexts({
        texts: ["one"],
        apiKey: "test-key",
        embedBatch: async () => [[1, 2, 3]],
        sleep: async () => undefined,
      }),
    ).rejects.toThrow(
      `Embedding length 3, expected ${LAB_EMBEDDING_DIMENSIONS}`,
    );
  });

  it("retries 429 with the configured backoff delays", async () => {
    const delays: number[] = [];
    let calls = 0;
    const embedBatch = vi.fn(async () => {
      calls += 1;
      if (calls < 3) {
        throw Object.assign(new Error("rate limited"), { status: 429 });
      }
      return [unitVector()];
    });

    const vectors = await embedTexts({
      texts: ["one"],
      apiKey: "test-key",
      embedBatch,
      sleep: async (ms) => {
        delays.push(ms);
      },
    });

    expect(vectors).toHaveLength(1);
    expect(embedBatch).toHaveBeenCalledTimes(3);
    expect(delays).toEqual([
      EMBED_RETRY_DELAYS_MS[0],
      EMBED_RETRY_DELAYS_MS[1],
    ]);
  });

  it("honors a longer API retry hint over the base backoff", async () => {
    const delays: number[] = [];
    let calls = 0;
    const embedBatch = vi.fn(async () => {
      calls += 1;
      if (calls === 1) {
        throw Object.assign(
          new Error("Quota exceeded. Please retry in 12.5s."),
          { status: 429 },
        );
      }
      return [unitVector()];
    });

    await embedTexts({
      texts: ["one"],
      apiKey: "test-key",
      embedBatch,
      sleep: async (ms) => {
        delays.push(ms);
      },
    });

    expect(delays).toEqual([12500]);
  });

  it("stops retrying after the backoff budget is exhausted", async () => {
    const embedBatch = vi.fn(async () => {
      throw Object.assign(new Error("unavailable"), { status: 503 });
    });

    await expect(
      embedTexts({
        texts: ["one"],
        apiKey: "test-key",
        embedBatch,
        sleep: async () => undefined,
      }),
    ).rejects.toThrow("unavailable");

    expect(embedBatch).toHaveBeenCalledTimes(EMBED_RETRY_DELAYS_MS.length + 1);
  });
});
