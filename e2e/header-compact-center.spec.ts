import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const viewports = [
  { width: 360, name: "360" },
  { width: 390, name: "390" },
  { width: 430, name: "430" },
  { width: 1440, name: "1440" },
] as const;

const artifactDir =
  process.env.HEADER_SCREENSHOT_DIR ?? "/opt/cursor/artifacts";

async function measureBar(page: Page) {
  return page.evaluate(() => {
    const bar = document.querySelector('[data-flip-bar=""]');
    if (!bar) return null;
    const rect = bar.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    return {
      leftGap: rect.left,
      rightGap: vw - rect.right,
      width: rect.width,
    };
  });
}

test.describe("header compact centering", () => {
  test.beforeAll(async () => {
    await fs.mkdir(artifactDir, { recursive: true });
  });

  for (const { width, name } of viewports) {
    test(`equal viewport gaps at ${name}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);

      await page.screenshot({
        path: path.join(artifactDir, `header-expanded-${name}.png`),
      });

      const expanded = await measureBar(page);
      expect(expanded).not.toBeNull();

      await page.evaluate(() => window.scrollTo(0, 100));
      await page.waitForTimeout(800);

      await page.screenshot({
        path: path.join(artifactDir, `header-compact-${name}.png`),
      });

      const compact = await measureBar(page);
      expect(compact).not.toBeNull();
      expect(
        Math.abs(compact!.leftGap - compact!.rightGap),
      ).toBeLessThanOrEqual(1);

      if (width < 860) {
        expect(compact!.width).toBeLessThan(width - 32);
      }

      test.info().attach(`gaps-${name}`, {
        body: JSON.stringify({ expanded, compact }, null, 2),
        contentType: "application/json",
      });
    });
  }
});
