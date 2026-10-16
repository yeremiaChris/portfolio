import type { LabChunk } from "./lab-chunk";

export const LAB_EMBEDDING_MODEL = "gemini-embedding-001";
export const LAB_EMBEDDING_DIMENSIONS = 768;

export type LabIndexChunk = LabChunk & {
  embedding: number[];
};

export type LabIndex = {
  model: string;
  dimensions: number;
  createdAt: string;
  chunks: LabIndexChunk[];
};

export type EmbeddingPlan = {
  /** Chunks whose hash still matches the previous index — keep their vectors. */
  reused: LabIndexChunk[];
  /** New or changed chunks that need an API embed call. */
  toEmbed: LabChunk[];
};

/**
 * Decide which chunks can keep their stored embedding (same model + same hash)
 * and which must be embedded. Chunks missing from `chunks` are dropped by omission.
 */
export function planEmbeddings(input: {
  chunks: LabChunk[];
  existing: LabIndex | null;
  model: string;
}): EmbeddingPlan {
  const { chunks, existing, model } = input;

  if (
    !existing ||
    existing.model !== model ||
    existing.dimensions !== LAB_EMBEDDING_DIMENSIONS
  ) {
    return { reused: [], toEmbed: [...chunks] };
  }

  const previousById = new Map(
    existing.chunks.map((chunk) => [chunk.id, chunk]),
  );
  const reused: LabIndexChunk[] = [];
  const toEmbed: LabChunk[] = [];

  for (const chunk of chunks) {
    const previous = previousById.get(chunk.id);
    if (
      previous &&
      previous.hash === chunk.hash &&
      previous.embedding.length === LAB_EMBEDDING_DIMENSIONS
    ) {
      reused.push({ ...chunk, embedding: previous.embedding });
    } else {
      toEmbed.push(chunk);
    }
  }

  return { reused, toEmbed };
}

/** Round each component to 6 significant digits for a smaller index.json. */
export function roundEmbedding(values: number[]): number[] {
  return values.map((value) => {
    if (value === 0 || !Number.isFinite(value)) return value;
    return Number(value.toPrecision(6));
  });
}

/**
 * Narrow unknown JSON into a LabIndex.
 * Throws if any embedding length ≠ LAB_EMBEDDING_DIMENSIONS.
 */
export function parseLabIndex(value: unknown): LabIndex | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (typeof record.model !== "string") return null;
  if (typeof record.dimensions !== "number") return null;
  if (typeof record.createdAt !== "string") return null;
  if (!Array.isArray(record.chunks)) return null;

  if (record.dimensions !== LAB_EMBEDDING_DIMENSIONS) {
    throw new Error(
      `Index dimensions are ${record.dimensions}, expected ${LAB_EMBEDDING_DIMENSIONS}`,
    );
  }

  const chunks: LabIndexChunk[] = [];
  for (const entry of record.chunks) {
    if (!entry || typeof entry !== "object") return null;
    const chunk = entry as Record<string, unknown>;
    if (typeof chunk.id !== "string") return null;
    if (typeof chunk.sourceTitle !== "string") return null;
    if (typeof chunk.url !== "string") return null;
    if (typeof chunk.text !== "string") return null;
    if (typeof chunk.hash !== "string") return null;
    if (!Array.isArray(chunk.embedding)) return null;
    if (!chunk.embedding.every((n) => typeof n === "number")) return null;

    if (chunk.embedding.length !== LAB_EMBEDDING_DIMENSIONS) {
      throw new Error(
        `Chunk "${chunk.id}" has embedding length ${chunk.embedding.length}, expected ${LAB_EMBEDDING_DIMENSIONS}`,
      );
    }

    chunks.push({
      id: chunk.id,
      sourceTitle: chunk.sourceTitle,
      url: chunk.url,
      ...(typeof chunk.heading === "string" ? { heading: chunk.heading } : {}),
      text: chunk.text,
      hash: chunk.hash,
      embedding: chunk.embedding,
    });
  }

  return {
    model: record.model,
    dimensions: record.dimensions,
    createdAt: record.createdAt,
    chunks,
  };
}
