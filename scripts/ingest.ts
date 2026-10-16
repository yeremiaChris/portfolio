import fs from "node:fs";
import path from "node:path";

import { chunkMarkdown, embeddingInput } from "@/lib/lab-chunk";
import { embedTexts, formatEmbedError } from "@/lib/lab-embed";
import {
  LAB_EMBEDDING_DIMENSIONS,
  LAB_EMBEDDING_MODEL,
  parseLabIndex,
  planEmbeddings,
  roundEmbedding,
  type LabIndex,
  type LabIndexChunk,
} from "@/lib/lab-index";
import { collectLabSources } from "@/lib/lab-sources";

const INDEX_PATH = path.join(process.cwd(), "lab", "index.json");

async function main() {
  const startedAt = Date.now();
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Set it in .env");
  }

  const sources = collectLabSources();
  const chunks = sources.flatMap((source) =>
    chunkMarkdown({
      slug: source.slug,
      sourceTitle: source.sourceTitle,
      url: source.url,
      markdown: source.markdown,
    }),
  );

  const existing = loadExistingIndex(INDEX_PATH);
  const plan = planEmbeddings({
    chunks,
    existing,
    model: LAB_EMBEDDING_MODEL,
  });

  const vectors = await embedTexts({
    texts: plan.toEmbed.map((chunk) => embeddingInput(chunk)),
    apiKey,
  });

  if (vectors.length !== plan.toEmbed.length) {
    throw new Error(
      `Embedded ${vectors.length} vectors for ${plan.toEmbed.length} chunks`,
    );
  }

  const newlyEmbedded: LabIndexChunk[] = plan.toEmbed.map((chunk, index) => ({
    ...chunk,
    embedding: vectors[index]!,
  }));

  const byId = new Map<string, LabIndexChunk>();
  for (const chunk of plan.reused) byId.set(chunk.id, chunk);
  for (const chunk of newlyEmbedded) byId.set(chunk.id, chunk);

  const ordered = chunks.map((chunk) => {
    const full = byId.get(chunk.id);
    if (!full) throw new Error(`Missing embedding for ${chunk.id}`);
    return {
      ...full,
      embedding: roundEmbedding(full.embedding),
    };
  });

  const index: LabIndex = {
    model: LAB_EMBEDDING_MODEL,
    dimensions: LAB_EMBEDDING_DIMENSIONS,
    createdAt: new Date().toISOString(),
    chunks: ordered,
  };

  fs.mkdirSync(path.dirname(INDEX_PATH), { recursive: true });
  const json = `${JSON.stringify(index, null, 2)}\n`;
  fs.writeFileSync(INDEX_PATH, json, "utf8");

  const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
  const relativePath = path.relative(process.cwd(), INDEX_PATH);

  console.log("Ask Yeremia ingest");
  console.log(`  sources:  ${sources.length}`);
  console.log(`  chunks:   ${ordered.length}`);
  console.log(`  reused:   ${plan.reused.length}`);
  console.log(`  embedded: ${plan.toEmbed.length}`);
  console.log(
    `  file:     ${relativePath} (${formatBytes(Buffer.byteLength(json))})`,
  );
  console.log(`  time:     ${elapsedSec}s`);
}

function loadExistingIndex(filePath: string) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return parseLabIndex(JSON.parse(fs.readFileSync(filePath, "utf8")));
  } catch {
    return null;
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

main().catch((error) => {
  console.error(formatEmbedError(error));
  process.exit(1);
});
