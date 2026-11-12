import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://127.0.0.1:3000/";
const waitMs = 6000;

const executablePath =
  process.env.CHROME_PATH ??
  process.env.PUPPETEER_EXECUTABLE_PATH ??
  "/usr/bin/google-chrome-stable";

const browser = await puppeteer.launch({
  headless: true,
  executablePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });

  const result = await page.evaluate(async (durationMs) => {
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    let headerRemoved = false;
    let mainRemoved = false;

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.removedNodes) {
          if (node === header) {
            headerRemoved = true;
          }
          if (node === main) {
            mainRemoved = true;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    await new Promise((resolve) => {
      window.setTimeout(resolve, durationMs);
    });
    observer.disconnect();

    return {
      headerRemoved,
      mainRemoved,
      headerConnected: header?.isConnected ?? false,
      mainConnected: main?.isConnected ?? false,
      htmlHasLenis: document.documentElement.classList.contains("lenis"),
    };
  }, waitMs);

  console.log(JSON.stringify({ url, waitMs, ...result }, null, 2));

  const stable =
    !result.headerRemoved &&
    !result.mainRemoved &&
    result.headerConnected &&
    result.mainConnected;

  process.exitCode = stable ? 0 : 1;
} finally {
  await browser.close();
}
