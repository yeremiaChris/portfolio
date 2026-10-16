import { describe, expect, it } from "vitest";

import type { LabChunk } from "./lab-chunk";
import {
  LAB_EMBEDDING_DIMENSIONS,
  LAB_EMBEDDING_MODEL,
  parseLabIndex,
  planEmbeddings,
  roundEmbedding,
  type LabIndex,
  type LabIndexChunk,
} from "./lab-index";

function chunk(
  partial: Pick<LabChunk, "id" | "text" | "hash"> & Partial<LabChunk>,
): LabChunk {
  return {
    sourceTitle: "Sample",
    url: "/blog/sample",
    ...partial,
  };
}

function indexed(
  base: LabChunk,
  embedding: number[] = Array.from(
    { length: LAB_EMBEDDING_DIMENSIONS },
    (_, i) => (i === 0 ? 1 : 0),
  ),
): LabIndexChunk {
  return { ...base, embedding };
}

function index(chunks: LabIndexChunk[], model = LAB_EMBEDDING_MODEL): LabIndex {
  return {
    model,
    dimensions: LAB_EMBEDDING_DIMENSIONS,
    createdAt: "2026-01-01T00:00:00.000Z",
    chunks,
  };
}

describe("planEmbeddings", () => {
  it("embeds every chunk when there is no existing index", () => {
    const chunks = [
      chunk({ id: "a#0", text: "one", hash: "h1" }),
      chunk({ id: "a#1", text: "two", hash: "h2" }),
    ];

    expect(
      planEmbeddings({ chunks, existing: null, model: LAB_EMBEDDING_MODEL }),
    ).toEqual({
      reused: [],
      toEmbed: chunks,
    });
  });

  it("embeds every chunk when the stored model differs", () => {
    const next = chunk({ id: "a#0", text: "one", hash: "h1" });
    const existing = index([indexed(next)], "some-older-embedding-model");

    expect(
      planEmbeddings({
        chunks: [next],
        existing,
        model: LAB_EMBEDDING_MODEL,
      }),
    ).toEqual({
      reused: [],
      toEmbed: [next],
    });
  });

  it("embeds every chunk when stored dimensions differ", () => {
    const next = chunk({ id: "a#0", text: "one", hash: "h1" });
    const existing: LabIndex = {
      model: LAB_EMBEDDING_MODEL,
      dimensions: 3072,
      createdAt: "2026-01-01T00:00:00.000Z",
      chunks: [indexed(next, [1, 2, 3])],
    };

    expect(
      planEmbeddings({
        chunks: [next],
        existing,
        model: LAB_EMBEDDING_MODEL,
      }),
    ).toEqual({
      reused: [],
      toEmbed: [next],
    });
  });

  it("reuses the vector when id and hash are unchanged", () => {
    const next = chunk({ id: "a#0", text: "same body", hash: "abc" });
    const embedding = indexed(next).embedding;
    const existing = index([indexed(next, embedding)]);

    const plan = planEmbeddings({
      chunks: [next],
      existing,
      model: LAB_EMBEDDING_MODEL,
    });

    expect(plan.toEmbed).toEqual([]);
    expect(plan.reused).toEqual([{ ...next, embedding }]);
  });

  it("re-embeds when the hash changes for the same id", () => {
    const previous = chunk({ id: "a#0", text: "old", hash: "old-hash" });
    const next = chunk({ id: "a#0", text: "new", hash: "new-hash" });
    const existing = index([indexed(previous)]);

    expect(
      planEmbeddings({
        chunks: [next],
        existing,
        model: LAB_EMBEDDING_MODEL,
      }),
    ).toEqual({
      reused: [],
      toEmbed: [next],
    });
  });

  it("drops chunks that no longer appear in the new set", () => {
    const keep = chunk({ id: "keep#0", text: "keep", hash: "k" });
    const gone = chunk({ id: "gone#0", text: "gone", hash: "g" });
    const existing = index([indexed(keep), indexed(gone)]);

    const plan = planEmbeddings({
      chunks: [keep],
      existing,
      model: LAB_EMBEDDING_MODEL,
    });

    expect(plan.reused.map((c) => c.id)).toEqual(["keep#0"]);
    expect(plan.toEmbed).toEqual([]);
  });
});

describe("roundEmbedding", () => {
  it("rounds each component to 6 significant digits", () => {
    expect(roundEmbedding([0.123456789, 1.23456789e-5, 0])).toEqual([
      0.123457, 0.0000123457, 0,
    ]);
  });
});

describe("parseLabIndex", () => {
  it("returns null for invalid JSON shapes", () => {
    expect(parseLabIndex(null)).toBeNull();
    expect(parseLabIndex({ model: "x" })).toBeNull();
  });

  it("parses a valid index document", () => {
    const embedding = Array.from({ length: LAB_EMBEDDING_DIMENSIONS }, () => 0);
    embedding[0] = 1;
    const value = {
      model: LAB_EMBEDDING_MODEL,
      dimensions: LAB_EMBEDDING_DIMENSIONS,
      createdAt: "2026-01-01T00:00:00.000Z",
      chunks: [
        {
          id: "a#0",
          sourceTitle: "A",
          url: "/a",
          heading: "H",
          text: "body",
          hash: "h",
          embedding,
        },
      ],
    };

    expect(parseLabIndex(value)).toEqual(value);
  });

  it("throws when the index dimensions field is wrong", () => {
    expect(() =>
      parseLabIndex({
        model: LAB_EMBEDDING_MODEL,
        dimensions: 3072,
        createdAt: "2026-01-01T00:00:00.000Z",
        chunks: [],
      }),
    ).toThrow(/Index dimensions are 3072, expected 768/);
  });

  it("throws when a chunk embedding length is wrong", () => {
    expect(() =>
      parseLabIndex({
        model: LAB_EMBEDDING_MODEL,
        dimensions: LAB_EMBEDDING_DIMENSIONS,
        createdAt: "2026-01-01T00:00:00.000Z",
        chunks: [
          {
            id: "a#0",
            sourceTitle: "A",
            url: "/a",
            text: "body",
            hash: "h",
            embedding: [0.1, 0.2],
          },
        ],
      }),
    ).toThrow(
      `Chunk "a#0" has embedding length 2, expected ${LAB_EMBEDDING_DIMENSIONS}`,
    );
  });
});
