import type { Source } from "./lab-chat";
import type { LabIndexChunk } from "./lab-index";
import { askYeremia } from "./lab";

export const RAG_TOP_K = 5;
export const RAG_SCORE_THRESHOLD = 0.45;

export type RetrievedChunk = LabIndexChunk & {
  score: number;
};

/** Dot product — equals cosine similarity for L2-normalized vectors. */
export function dotProduct(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`Embedding length mismatch: ${a.length} vs ${b.length}`);
  }
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] ?? 0) * (b[i] ?? 0);
  }
  return sum;
}

export function retrieveTopChunks(
  queryEmbedding: number[],
  chunks: LabIndexChunk[],
  options: { topK?: number; threshold?: number } = {},
): RetrievedChunk[] {
  const topK = options.topK ?? RAG_TOP_K;
  const threshold = options.threshold ?? RAG_SCORE_THRESHOLD;

  return chunks
    .map((chunk) => ({
      ...chunk,
      score: dotProduct(queryEmbedding, chunk.embedding),
    }))
    .filter((chunk) => chunk.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/** Numbered context block for the generation prompt. */
export function buildRagContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map((chunk, index) => {
      const heading = chunk.heading?.trim();
      const label = heading
        ? `${chunk.sourceTitle} — ${heading}`
        : chunk.sourceTitle;
      return `[${index + 1}] ${label} (${chunk.url})\n${chunk.text}`;
    })
    .join("\n\n");
}

/**
 * Map `[1]`-style citations in the model answer to Source rows.
 * Returns [] for the refusal message or when nothing is cited.
 */
export function parseCitedSources(
  answer: string,
  chunks: RetrievedChunk[],
): Source[] {
  if (chunks.length === 0) return [];
  if (answer.trim() === askYeremia.refusalMessage.trim()) return [];

  const cited = new Set<number>();
  for (const match of answer.matchAll(/\[(\d+)\]/g)) {
    const id = Number.parseInt(match[1] ?? "", 10);
    if (id >= 1 && id <= chunks.length) cited.add(id);
  }
  if (cited.size === 0) return [];

  return [...cited]
    .sort((a, b) => a - b)
    .map((id) => {
      const chunk = chunks[id - 1]!;
      const heading = chunk.heading?.trim();
      return {
        id,
        title: heading ? `${chunk.sourceTitle}: ${heading}` : chunk.sourceTitle,
        url: chunk.url,
      };
    });
}
