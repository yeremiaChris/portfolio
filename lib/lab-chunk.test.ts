import { describe, expect, it } from "vitest";

import {
  CHUNK_OVERLAP_RATIO,
  CHUNK_TARGET_CHARS,
  chunkMarkdown,
  embeddingInput,
  hashText,
} from "./lab-chunk";

describe("hashText", () => {
  it("returns identical hashes for identical text", () => {
    expect(hashText("same body")).toBe(hashText("same body"));
  });

  it("returns different hashes when text changes", () => {
    expect(hashText("alpha")).not.toBe(hashText("beta"));
  });
});

describe("chunkMarkdown", () => {
  it("splits on markdown headings and keeps heading metadata", () => {
    const chunks = chunkMarkdown({
      slug: "sample-post",
      sourceTitle: "Sample Post",
      url: "/blog/sample-post",
      markdown: [
        "## PrimaKu",
        "",
        "Pediatric health app work.",
        "",
        "### Clinic flows",
        "",
        "FHIR-based shipping notes.",
      ].join("\n"),
    });

    expect(chunks).toHaveLength(2);
    expect(chunks[0]).toMatchObject({
      id: "sample-post#0",
      heading: "PrimaKu",
      text: "Pediatric health app work.",
      url: "/blog/sample-post",
    });
    expect(chunks[1]).toMatchObject({
      id: "sample-post#1",
      heading: "Clinic flows",
      text: "FHIR-based shipping notes.",
    });
    expect(chunks[0]?.hash).toBe(hashText("Pediatric health app work."));
  });

  it("keeps chunks at or under the target character budget", () => {
    const paragraph = "word ".repeat(80).trim(); // ~400 chars
    const body = Array.from({ length: 12 }, () => paragraph).join("\n\n");
    const chunks = chunkMarkdown({
      slug: "long",
      sourceTitle: "Long",
      url: "/blog/long",
      markdown: `## Section\n\n${body}`,
    });

    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.text.length).toBeLessThanOrEqual(CHUNK_TARGET_CHARS);
    }
  });

  it("overlaps consecutive chunks from the same section", () => {
    const paragraph = "alpha ".repeat(70).trim();
    const body = Array.from({ length: 10 }, () => paragraph).join("\n\n");
    const chunks = chunkMarkdown({
      slug: "overlap",
      sourceTitle: "Overlap",
      url: "/blog/overlap",
      markdown: `## One section\n\n${body}`,
    });

    expect(chunks.length).toBeGreaterThan(1);
    const first = chunks[0]?.text ?? "";
    const second = chunks[1]?.text ?? "";
    const overlapChars = Math.floor(CHUNK_TARGET_CHARS * CHUNK_OVERLAP_RATIO);
    const tail = first.slice(-overlapChars);
    expect(tail.length).toBeGreaterThan(0);
    expect(second.includes(tail.slice(0, Math.min(40, tail.length)))).toBe(
      true,
    );
  });

  it("assigns stable ids from slug and index", () => {
    const markdown = "## A\n\nOne.\n\n## B\n\nTwo.";
    const first = chunkMarkdown({
      slug: "stable",
      sourceTitle: "Stable",
      url: "/blog/stable",
      markdown,
    });
    const second = chunkMarkdown({
      slug: "stable",
      sourceTitle: "Stable",
      url: "/blog/stable",
      markdown,
    });

    expect(first.map((chunk) => chunk.id)).toEqual(["stable#0", "stable#1"]);
    expect(second.map((chunk) => chunk.id)).toEqual(first.map((c) => c.id));
  });
});

describe("embeddingInput", () => {
  it("prepends source title and heading before the body", () => {
    expect(
      embeddingInput({
        sourceTitle: "Mazecare",
        heading: "Clinic flows",
        text: "FHIR notes.",
      }),
    ).toBe("Mazecare — Clinic flows\n\nFHIR notes.");
  });
});
