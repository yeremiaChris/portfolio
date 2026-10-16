import { describe, expect, it } from "vitest";

import { askYeremia } from "./lab";
import type { LabIndexChunk } from "./lab-index";
import {
  buildRagContext,
  dotProduct,
  parseCitedSources,
  retrieveTopChunks,
  type RetrievedChunk,
} from "./lab-rag";

function chunk(
  partial: Pick<LabIndexChunk, "id" | "text" | "embedding"> &
    Partial<LabIndexChunk>,
): LabIndexChunk {
  return {
    sourceTitle: "Sample",
    url: "/blog/sample",
    hash: "h",
    ...partial,
  };
}

describe("dotProduct", () => {
  it("scores aligned unit vectors highly", () => {
    expect(dotProduct([1, 0], [1, 0])).toBeCloseTo(1);
    expect(dotProduct([1, 0], [0, 1])).toBeCloseTo(0);
  });

  it("throws when vector lengths differ", () => {
    expect(() => dotProduct([1, 0], [1])).toThrow(
      "Embedding length mismatch: 2 vs 1",
    );
  });
});

describe("retrieveTopChunks", () => {
  it("returns the highest-scoring chunks above the threshold", () => {
    const chunks = [
      chunk({ id: "a#0", text: "low", embedding: [0.2, 0] }),
      chunk({ id: "a#1", text: "mid", embedding: [0.5, 0] }),
      chunk({ id: "a#2", text: "high", embedding: [0.9, 0] }),
      chunk({ id: "a#3", text: "also high", embedding: [0.8, 0] }),
    ];

    const retrieved = retrieveTopChunks([1, 0], chunks, {
      topK: 2,
      threshold: 0.45,
    });

    expect(retrieved.map((item) => item.id)).toEqual(["a#2", "a#3"]);
    expect(retrieved[0]?.score).toBeCloseTo(0.9);
  });

  it("returns an empty list when nothing clears the threshold", () => {
    const chunks = [chunk({ id: "a#0", text: "low", embedding: [0.1, 0] })];
    expect(
      retrieveTopChunks([1, 0], chunks, { topK: 5, threshold: 0.45 }),
    ).toEqual([]);
  });
});

describe("buildRagContext", () => {
  it("numbers chunks with title, heading, url, and body", () => {
    const chunks: RetrievedChunk[] = [
      {
        ...chunk({
          id: "a#0",
          text: "Body one.",
          embedding: [1],
          heading: "Clinic",
          sourceTitle: "Mazecare",
          url: "/projects",
        }),
        score: 0.9,
      },
    ];

    expect(buildRagContext(chunks)).toBe(
      "[1] Mazecare — Clinic (/projects)\nBody one.",
    );
  });
});

describe("parseCitedSources", () => {
  const chunks: RetrievedChunk[] = [
    {
      ...chunk({
        id: "a#0",
        text: "one",
        embedding: [1],
        sourceTitle: "About",
        url: "/about",
      }),
      score: 0.9,
    },
    {
      ...chunk({
        id: "a#1",
        text: "two",
        embedding: [1],
        sourceTitle: "Projects",
        heading: "PrimaKu",
        url: "/projects",
      }),
      score: 0.8,
    },
  ];

  it("maps cited numbers to Source rows", () => {
    expect(parseCitedSources("See [2] and again [2].", chunks)).toEqual([
      { id: 2, title: "Projects: PrimaKu", url: "/projects" },
    ]);
  });

  it("returns an empty list when nothing is cited", () => {
    expect(parseCitedSources("No brackets here.", chunks)).toEqual([]);
  });

  it("returns an empty list for the refusal message", () => {
    expect(parseCitedSources(askYeremia.refusalMessage, chunks)).toEqual([]);
  });
});
