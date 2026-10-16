import { GoogleGenAI } from "@google/genai";

import { LAB_EMBEDDING_DIMENSIONS, LAB_EMBEDDING_MODEL } from "./lab-index";

export const EMBED_BATCH_SIZE = 50;
export const EMBED_RETRY_DELAYS_MS = [2000, 4000, 8000] as const;
export const EMBED_BATCH_GAP_MS = 1000;

export function splitIntoBatches<T>(items: T[], size: number): T[][] {
  if (size <= 0) throw new Error("Batch size must be positive");
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    batches.push(items.slice(i, i + size));
  }
  return batches;
}

export function isRetryableEmbedError(error: unknown): boolean {
  const status = readErrorStatus(error);
  return status === 429 || status === 503;
}

/** Prefer the API's "Please retry in Ns" hint when present. */
export function readRetryDelayMs(error: unknown): number | undefined {
  const message = errorMessage(error);
  const match = /Please retry in ([\d.]+)s/i.exec(message);
  if (match?.[1]) {
    return Math.ceil(Number.parseFloat(match[1]) * 1000);
  }

  try {
    const parsed = JSON.parse(message) as {
      error?: { details?: Array<{ retryDelay?: string }> };
    };
    for (const detail of parsed.error?.details ?? []) {
      if (typeof detail.retryDelay !== "string") continue;
      const seconds = Number.parseFloat(detail.retryDelay.replace(/s$/i, ""));
      if (Number.isFinite(seconds) && seconds > 0) {
        return Math.ceil(seconds * 1000);
      }
    }
  } catch {
    // Message is not JSON.
  }

  return undefined;
}

/** Unit-length vector so cosine similarity stays correct at reduced dims. */
export function l2Normalize(values: number[]): number[] {
  let sumSquares = 0;
  for (const value of values) sumSquares += value * value;
  const norm = Math.sqrt(sumSquares);
  if (norm === 0) return values.map(() => 0);
  return values.map((value) => value / norm);
}

export function formatEmbedError(error: unknown): string {
  const message = errorMessage(error);
  try {
    const parsed = JSON.parse(message) as {
      error?: { message?: string; status?: string; code?: number };
    };
    const apiMessage = parsed.error?.message;
    if (typeof apiMessage === "string" && apiMessage.trim()) {
      return apiMessage;
    }
  } catch {
    // Message is not JSON.
  }
  return message || "Embedding request failed";
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "";
}

function readErrorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  const record = error as {
    status?: unknown;
    statusCode?: unknown;
    code?: unknown;
  };
  if (typeof record.status === "number") return record.status;
  if (typeof record.statusCode === "number") return record.statusCode;
  if (typeof record.code === "number") return record.code;
  return undefined;
}

async function defaultSleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export type EmbedTaskType = "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY";

/**
 * Embed texts with gemini-embedding-001.
 * Batches requests and retries 429/503 with exponential backoff.
 * Vectors are L2-normalized (required when outputDimensionality < 3072).
 */
export async function embedTexts(input: {
  texts: string[];
  apiKey: string;
  model?: string;
  taskType?: EmbedTaskType;
  batchSize?: number;
  signal?: AbortSignal;
  /** Injected for tests — embeds one batch of strings. */
  embedBatch?: (texts: string[]) => Promise<number[][]>;
  sleep?: (ms: number) => Promise<void>;
}): Promise<number[][]> {
  const model = input.model ?? LAB_EMBEDDING_MODEL;
  const taskType = input.taskType ?? "RETRIEVAL_DOCUMENT";
  const batchSize = input.batchSize ?? EMBED_BATCH_SIZE;
  const sleep = input.sleep ?? defaultSleep;
  const embedBatch =
    input.embedBatch ??
    createGeminiEmbedBatch({
      apiKey: input.apiKey,
      model,
      taskType,
      signal: input.signal,
    });

  if (input.texts.length === 0) return [];
  input.signal?.throwIfAborted();

  const batches = splitIntoBatches(input.texts, batchSize);
  const vectors: number[][] = [];

  for (let i = 0; i < batches.length; i++) {
    input.signal?.throwIfAborted();
    if (i > 0) await sleep(EMBED_BATCH_GAP_MS);
    const batch = batches[i]!;
    const batchVectors = await embedBatchWithRetry({
      texts: batch,
      embedBatch,
      sleep,
    });
    for (const values of batchVectors) {
      if (values.length !== LAB_EMBEDDING_DIMENSIONS) {
        throw new Error(
          `Embedding length ${values.length}, expected ${LAB_EMBEDDING_DIMENSIONS}`,
        );
      }
      vectors.push(l2Normalize(values));
    }
  }

  return vectors;
}

function createGeminiEmbedBatch(options: {
  apiKey: string;
  model: string;
  taskType: EmbedTaskType;
  signal?: AbortSignal;
}): (texts: string[]) => Promise<number[][]> {
  const ai = new GoogleGenAI({ apiKey: options.apiKey });

  return async (texts) => {
    const response = await ai.models.embedContent({
      model: options.model,
      contents: texts,
      config: {
        taskType: options.taskType,
        outputDimensionality: LAB_EMBEDDING_DIMENSIONS,
        abortSignal: options.signal,
      },
    });

    const embeddings = response.embeddings;
    if (!embeddings || embeddings.length !== texts.length) {
      throw new Error(
        `Expected ${texts.length} embeddings, got ${embeddings?.length ?? 0}`,
      );
    }

    return embeddings.map((entry, index) => {
      const values = entry.values;
      if (!values || values.length === 0) {
        throw new Error(`Missing embedding values at batch index ${index}`);
      }
      return values;
    });
  };
}

async function embedBatchWithRetry(input: {
  texts: string[];
  embedBatch: (texts: string[]) => Promise<number[][]>;
  sleep: (ms: number) => Promise<void>;
}): Promise<number[][]> {
  let attempt = 0;

  for (;;) {
    try {
      return await input.embedBatch(input.texts);
    } catch (error) {
      if (
        !isRetryableEmbedError(error) ||
        attempt >= EMBED_RETRY_DELAYS_MS.length
      ) {
        throw error;
      }
      const configured = EMBED_RETRY_DELAYS_MS[attempt] ?? 8000;
      const suggested = readRetryDelayMs(error) ?? 0;
      const delayMs = Math.max(configured, suggested);
      attempt += 1;
      await input.sleep(delayMs);
    }
  }
}
