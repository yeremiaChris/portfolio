import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("route scroll reset", () => {
  it("resets scroll on pathname change via SmoothScroll shell", () => {
    const smoothScroll = readFileSync(
      "components/motion/SmoothScroll.tsx",
      "utf8",
    );
    expect(smoothScroll).toContain("RouteScrollToTop");

    const routeReset = readFileSync(
      "components/motion/RouteScrollToTop.tsx",
      "utf8",
    );
    expect(routeReset).toContain("scrollDocumentToY(0");
    expect(routeReset).toContain("popstate");
    expect(routeReset).toContain("location.hash");
  });
});
