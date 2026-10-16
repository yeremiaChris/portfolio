import { createHash } from "node:crypto";

/** ~500 tokens, approximated for English portfolio copy. */
export const CHUNK_TARGET_CHARS = 2000;

/** Overlap between consecutive chunks from the same section. */
export const CHUNK_OVERLAP_RATIO = 0.15;

export type LabChunk = {
  id: string;
  sourceTitle: string;
  url: string;
  heading?: string;
  text: string;
  hash: string;
};

export function hashText(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

/** Text sent to the embedding API (title + heading context + body). */
export function embeddingInput(
  chunk: Pick<LabChunk, "sourceTitle" | "heading" | "text">,
): string {
  const heading = chunk.heading?.trim();
  if (heading) {
    return `${chunk.sourceTitle} — ${heading}\n\n${chunk.text}`;
  }
  return `${chunk.sourceTitle}\n\n${chunk.text}`;
}

/**
 * Split cleaned markdown into stable chunks.
 * Headings (`##` / `###`) first, then paragraphs, with size + overlap limits.
 */
export function chunkMarkdown(input: {
  slug: string;
  sourceTitle: string;
  url: string;
  markdown: string;
}): LabChunk[] {
  const sections = splitByHeadings(input.markdown);
  const overlapChars = Math.floor(CHUNK_TARGET_CHARS * CHUNK_OVERLAP_RATIO);
  const chunks: LabChunk[] = [];

  for (const section of sections) {
    for (const text of packSection(
      section.body,
      CHUNK_TARGET_CHARS,
      overlapChars,
    )) {
      const index = chunks.length;
      chunks.push({
        id: `${input.slug}#${index}`,
        sourceTitle: input.sourceTitle,
        url: input.url,
        ...(section.heading ? { heading: section.heading } : {}),
        text,
        hash: hashText(text),
      });
    }
  }

  return chunks;
}

function splitByHeadings(
  markdown: string,
): { heading?: string; body: string }[] {
  const sections: { heading?: string; body: string }[] = [];
  let heading: string | undefined;
  const bodyLines: string[] = [];

  function flush() {
    const body = bodyLines.join("\n").trim();
    bodyLines.length = 0;
    if (!body) return;
    sections.push(heading ? { heading, body } : { body });
  }

  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (match) {
      flush();
      heading = match[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`~]/g, "")
        .trim();
      continue;
    }
    bodyLines.push(line);
  }
  flush();

  return sections;
}

function packSection(
  body: string,
  maxChars: number,
  overlapChars: number,
): string[] {
  const trimmed = body.trim();
  if (!trimmed) return [];
  if (trimmed.length <= maxChars) return [trimmed];

  const paragraphs = trimmed
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  const chunks: string[] = [];
  let current = "";

  function flushCurrent() {
    if (!current) return;
    chunks.push(current);
    current = "";
  }

  for (const paragraph of paragraphs) {
    if (paragraph.length > maxChars) {
      flushCurrent();
      chunks.push(...windowText(paragraph, maxChars, overlapChars));
      continue;
    }

    const next = current ? `${current}\n\n${paragraph}` : paragraph;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    flushCurrent();
    const previous = chunks[chunks.length - 1] ?? "";
    const tail = previous.slice(-overlapChars).trimStart();
    current = tail ? `${tail}\n\n${paragraph}` : paragraph;
    if (current.length > maxChars) {
      chunks.push(...windowText(current, maxChars, overlapChars));
      current = "";
    }
  }

  flushCurrent();
  return chunks;
}

function windowText(
  text: string,
  maxChars: number,
  overlapChars: number,
): string[] {
  const stride = Math.max(1, maxChars - overlapChars);
  const pieces: string[] = [];

  for (let start = 0; start < text.length; start += stride) {
    const piece = text.slice(start, start + maxChars).trim();
    if (piece) pieces.push(piece);
    if (start + maxChars >= text.length) break;
  }

  return pieces;
}
