import { describe, expect, it } from "vitest";

import {
  motionDuration,
  motionEase,
  motionRevealOffset,
  motionSpring,
  motionStaggerChildDelay,
  motionStaggerGap,
  motionStaggerMaxDelay,
} from "./motion-tokens";

describe("motion-tokens", () => {
  it("uses the shared easing curve", () => {
    expect(motionEase).toEqual([0.16, 1, 0.3, 1]);
  });

  it("exposes the agreed duration steps", () => {
    expect(motionDuration.reveal).toBe(0.4);
    expect(motionDuration.heroName).toBe(0.8);
    expect(motionDuration.page).toBe(0.3);
  });

  it("defines spring and layout-friendly offsets", () => {
    expect(motionSpring.damping).toBeGreaterThanOrEqual(
      motionSpring.stiffness / 15,
    );
    expect(motionRevealOffset).toBe(8);
    expect(motionStaggerGap).toBe(0.04);
  });

  it("caps stagger child delay for long lists", () => {
    expect(motionStaggerChildDelay(0)).toBe(0);
    expect(motionStaggerChildDelay(4)).toBeCloseTo(0.16);
    expect(motionStaggerChildDelay(20)).toBe(motionStaggerMaxDelay);
  });
});
