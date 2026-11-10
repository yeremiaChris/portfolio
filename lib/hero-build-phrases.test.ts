import { describe, expect, it } from "vitest";

import {
  HERO_BUILD_PHRASES,
  HERO_BUILD_PHRASES_SR,
  HERO_BUILD_ROTATE_MS,
} from "./hero-build-phrases";

describe("hero-build-phrases", () => {
  it("lists the approved rotating phrases", () => {
    expect(HERO_BUILD_PHRASES).toEqual([
      "React apps",
      "Next.js platforms",
      "design systems",
      "realtime UI",
    ]);
  });

  it("exposes sr-only summary and rotate cadence", () => {
    expect(HERO_BUILD_PHRASES_SR).toContain("React apps");
    expect(HERO_BUILD_ROTATE_MS).toBe(3000);
  });
});
