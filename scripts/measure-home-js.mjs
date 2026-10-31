import fs from "node:fs";
import zlib from "node:zlib";

const statsPath = new URL(
  "../.next/diagnostics/route-bundle-stats.json",
  import.meta.url,
);
const stats = JSON.parse(fs.readFileSync(statsPath, "utf8"));
const home = stats.find((entry) => entry.route === "/");

if (!home) {
  console.error("Home route not found in route-bundle-stats.json");
  process.exit(1);
}

let rawTotal = 0;
let brotliTotal = 0;
let gzipTotal = 0;
const rows = [];

for (const relativePath of home.firstLoadChunkPaths) {
  const absolutePath = new URL(`../${relativePath}`, import.meta.url);
  const buffer = fs.readFileSync(absolutePath);
  const brotli = zlib.brotliCompressSync(buffer, {
    params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 },
  });
  const gzip = zlib.gzipSync(buffer, { level: 9 });
  rawTotal += buffer.length;
  brotliTotal += brotli.length;
  gzipTotal += gzip.length;
  rows.push({
    chunk: relativePath.split("/").pop(),
    rawKb: (buffer.length / 1024).toFixed(1),
    brotliKb: (brotli.length / 1024).toFixed(1),
    gzipKb: (gzip.length / 1024).toFixed(1),
  });
}

rows.sort((a, b) => Number(b.brotliKb) - Number(a.brotliKb));

console.log("Route: /");
console.log(`First-load JS raw: ${(rawTotal / 1024).toFixed(1)} KiB`);
console.log(
  `First-load JS brotli (q11): ${(brotliTotal / 1024).toFixed(1)} KiB`,
);
console.log(`First-load JS gzip (l9): ${(gzipTotal / 1024).toFixed(1)} KiB`);
console.table(rows);
