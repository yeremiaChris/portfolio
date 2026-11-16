import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://127.0.0.1:3000/services";

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
  await page.emulate({
    viewport: { width: 375, height: 667, deviceScaleFactor: 2, isMobile: true },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  });

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });
  await new Promise((r) => setTimeout(r, 4000));

  const before = await page.evaluate(() => {
    const el = document.scrollingElement;
    const container = document.querySelector("main .mx-auto");
    const cs = container ? getComputedStyle(container) : null;
    return {
      scrollY: el?.scrollTop ?? 0,
      scrollHeight: el?.scrollHeight ?? 0,
      clientHeight: el?.clientHeight ?? 0,
      containerOverflowX: cs?.overflowX,
      containerOverflowY: cs?.overflowY,
      htmlHasLenis: document.documentElement.classList.contains("lenis"),
    };
  });

  await page.evaluate(() => {
    const el = document.scrollingElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });
  await new Promise((r) => setTimeout(r, 300));

  const box = { x: 187, y: 400 };
  await page.touchscreen.touchStart(box.x, box.y);
  for (let i = 0; i < 15; i++) {
    await page.touchscreen.touchMove(box.x, box.y - i * 50);
    await new Promise((r) => setTimeout(r, 16));
  }
  await page.touchscreen.touchEnd();

  await new Promise((r) => setTimeout(r, 400));

  const afterFirstSwipe = await page.evaluate(() => ({
    scrollY: document.scrollingElement?.scrollTop ?? 0,
  }));

  for (let round = 0; round < 8; round++) {
    await page.touchscreen.touchStart(187, 500);
    for (let i = 0; i < 20; i++) {
      await page.touchscreen.touchMove(187, 500 - i * 30);
      await new Promise((r) => setTimeout(r, 12));
    }
    await page.touchscreen.touchEnd();
    await new Promise((r) => setTimeout(r, 180));
  }

  const afterBottom = await page.evaluate(() => {
    const el = document.scrollingElement;
    const maxScroll = (el?.scrollHeight ?? 0) - (el?.clientHeight ?? 0);
    return {
      scrollY: el?.scrollTop ?? 0,
      maxScroll,
    };
  });

  const result = {
    url,
    before,
    afterFirstSwipe,
    afterBottom,
    touchScrolled: afterFirstSwipe.scrollY > 40,
    reachedBottom: afterBottom.scrollY >= afterBottom.maxScroll - 20,
  };

  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.touchScrolled && result.reachedBottom ? 0 : 1;
} finally {
  await browser.close();
}
