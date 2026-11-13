import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/projects");
const VIEWPORT = { width: 1440, height: 900 };
const MAX_BYTES = 120 * 1024;
const QUALITY_STEPS = [82, 72, 62, 52, 42];

const TARGETS = [
  { id: "mazecare", url: "https://www.mazecare.com/" },
  { id: "kiriminaja", url: "https://app.kiriminaja.com" },
  { id: "primaku", url: "https://www.primaku.com" },
  { id: "primacare", url: "https://www.primacare.ai" },
];

function placeholderHtml(id, title) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}body{height:900px;background:linear-gradient(155deg,#070b10,#0d1520 55%,#060a0f);font-family:system-ui,sans-serif;color:#e8eef2;display:flex;align-items:center;justify-content:center}
  .card{width:min(720px,88vw);border:1px solid rgb(76 215 246 / 0.25);border-radius:20px;padding:48px;background:rgb(16 20 26 / 0.85);box-shadow:0 0 80px rgb(76 215 246 / 0.12)}
  .tag{color:#4cd7f6;font-size:13px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px}
  h1{font-size:28px;font-weight:600;margin-bottom:8px}
  p{color:rgb(232 238 242 / 0.65);font-size:15px;line-height:1.5}
  </style></head><body><div class="card"><div class="tag">${id}</div><h1>${title}</h1><p>Public marketing preview unavailable — branded placeholder for portfolio.</p></div></body></html>`;
}

async function isPublicPage(page) {
  const signals = await page.evaluate(() => {
    const bodyText = (document.body?.innerText ?? "")
      .slice(0, 4000)
      .toLowerCase();
    const hasPassword = !!document.querySelector("input[type=password]");
    const loginCue =
      /sign in|log in|masuk|login|password/i.test(bodyText) &&
      /email|username|password/i.test(bodyText);
    return {
      hasPassword,
      loginCue,
      title: document.title,
      bodyLen: bodyText.length,
    };
  });
  if (signals.hasPassword || signals.loginCue) {
    return { ok: false, reason: "login-gated" };
  }
  if (signals.bodyLen < 80) {
    return { ok: false, reason: "empty-or-blocked" };
  }
  return { ok: true };
}

async function writeOptimizedWebp(page, outPath) {
  for (const quality of QUALITY_STEPS) {
    const buffer = await page.screenshot({
      type: "webp",
      quality,
      fullPage: false,
    });
    if (buffer.length <= MAX_BYTES || quality === QUALITY_STEPS.at(-1)) {
      await writeFile(outPath, buffer);
      return { bytes: buffer.length, quality };
    }
  }
  return { bytes: 0, quality: 0 };
}

async function capturePlaceholder(browser, id, title, outPath) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await page.setContent(placeholderHtml(id, title), {
    waitUntil: "networkidle0",
  });
  const meta = await writeOptimizedWebp(page, outPath);
  await page.close();
  return { kind: "placeholder", ...meta };
}

async function captureUrl(browser, target) {
  const outPath = path.join(OUT_DIR, `featured-${target.id}.webp`);
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  page.setDefaultNavigationTimeout(45000);

  try {
    const response = await page.goto(target.url, {
      waitUntil: "networkidle2",
    });
    if (!response || response.status() >= 400) {
      await page.close();
      return capturePlaceholder(browser, target.id, target.id, outPath);
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const gate = await isPublicPage(page);
    if (!gate.ok) {
      await page.close();
      return capturePlaceholder(browser, target.id, target.id, outPath);
    }
    const meta = await writeOptimizedWebp(page, outPath);
    await page.close();
    return { kind: "screenshot", url: target.url, ...meta };
  } catch {
    await page.close().catch(() => {});
    return capturePlaceholder(browser, target.id, target.id, outPath);
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome-stable",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  const results = [];
  for (const target of TARGETS) {
    const result = await captureUrl(browser, target);
    results.push({
      id: target.id,
      ...result,
      file: `featured-${target.id}.webp`,
    });
    console.log(JSON.stringify({ id: target.id, ...result }));
  }

  await browser.close();
  await writeFile(
    path.join(OUT_DIR, "featured-capture-report.json"),
    `${JSON.stringify(results, null, 2)}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
