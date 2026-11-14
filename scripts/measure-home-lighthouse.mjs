import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const port = Number(process.env.LH_PORT ?? 3010);
const baseUrl = `http://127.0.0.1:${port}/`;
const runs = Number(process.env.LH_RUNS ?? 3);

const chromeFlags = [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--window-size=412,823",
];

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function waitForServer(url, timeoutMs = 120_000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const response = await fetch(url, { redirect: "manual" });
        if (response.ok || response.status === 304) {
          resolve();
          return;
        }
      } catch {
        /* not up yet */
      }
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`Server did not become ready at ${url}`));
        return;
      }
      setTimeout(tick, 250);
    };
    void tick();
  });
}

async function runLighthouse() {
  const lighthouse = await import("lighthouse");
  const chromeLauncher = await import("chrome-launcher");

  const chrome = await chromeLauncher.launch({ chromeFlags });
  try {
    const result = await lighthouse.default(baseUrl, {
      output: "json",
      logLevel: "error",
      port: chrome.port,
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      formFactor: "mobile",
      screenEmulation: {
        mobile: true,
        width: 412,
        height: 823,
        deviceScaleFactor: 2.625,
        disabled: false,
      },
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4,
        requestLatencyMs: 562.5,
        downloadThroughputKbps: 1474.56,
        uploadThroughputKbps: 675,
      },
    });

    const perf = result.lhr.categories.performance.score * 100;
    const tbt =
      result.lhr.audits["total-blocking-time"]?.numericValue ?? Number.NaN;
    const bootup = result.lhr.audits["bootup-time"]?.numericValue ?? Number.NaN;
    const unused =
      result.lhr.audits["unused-javascript"]?.details?.overallSavingsBytes ?? 0;

    return {
      performance: perf,
      tbt,
      bootup,
      unusedJsKiB: unused / 1024,
      a11y: result.lhr.categories.accessibility.score * 100,
      bp: result.lhr.categories["best-practices"].score * 100,
      seo: result.lhr.categories.seo.score * 100,
    };
  } finally {
    await chrome.kill();
  }
}

async function main() {
  const server = spawn("pnpm", ["start", "-p", String(port)], {
    cwd: repoRoot,
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: "",
    },
    stdio: "pipe",
  });

  try {
    await waitForServer(baseUrl);
    const summaries = [];
    for (let i = 0; i < runs; i += 1) {
      summaries.push(await runLighthouse());
      console.log(`Run ${i + 1}:`, summaries[summaries.length - 1]);
    }

    const performance = median(summaries.map((s) => s.performance));
    const tbt = median(summaries.map((s) => s.tbt));
    const bootup = median(summaries.map((s) => s.bootup));
    const unusedJsKiB = median(summaries.map((s) => s.unusedJsKiB));

    console.log("\nMedian mobile Lighthouse (home):");
    console.log(
      JSON.stringify(
        {
          performance,
          tbt,
          bootup,
          unusedJsKiB,
          a11y: summaries[0]?.a11y,
          bp: summaries[0]?.bp,
          seo: summaries[0]?.seo,
        },
        null,
        2,
      ),
    );
  } finally {
    server.kill("SIGTERM");
  }
}

void main();
