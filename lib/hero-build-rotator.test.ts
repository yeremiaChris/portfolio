import { describe, expect, it } from "vitest";

import { HERO_BUILD_PHRASES } from "./hero-build-phrases";
import {
  heroBuildRotatorUsesMotionSwap,
  heroBuildRotatorVisiblePhrase,
} from "./hero-build-rotator";

describe("hero-build-rotator", () => {
  it("always shows the first phrase before the name settles", () => {
    expect(heroBuildRotatorVisiblePhrase(false, false, 2)).toBe(
      HERO_BUILD_PHRASES[0],
    );
    expect(heroBuildRotatorVisiblePhrase(false, true, 0)).toBe(
      HERO_BUILD_PHRASES[0],
    );
  });

  it("shows the first phrase immediately after settle before rotation starts", () => {
    expect(heroBuildRotatorVisiblePhrase(true, false, 0)).toBe(
      HERO_BUILD_PHRASES[0],
    );
    expect(heroBuildRotatorUsesMotionSwap(true, false, false)).toBe(false);
  });

  it("enables motion swap only after the first rotation tick", () => {
    expect(heroBuildRotatorUsesMotionSwap(true, false, true)).toBe(true);
    expect(heroBuildRotatorUsesMotionSwap(true, true, true)).toBe(false);
  });
});
