import { describe, expect, it } from "vitest";

import {
  motionDuration,
  motionEase,
  motionRevealOffset,
  motionSpring,
  motionStaggerGap,
} from "./motion-tokens";

describe("motion-tokens", () => {
  it("uses the shared easing curve", () => {
    expect(motionEase).toEqual([0.2, 0, 0, 1]);
  });

  it("exposes the agreed duration steps", () => {
    expect(motionDuration).toEqual({ fast: 0.2, base: 0.4, slow: 0.6 });
  });

  it("defines spring and layout-friendly offsets", () => {
    expect(motionSpring.stiffness).toBe(500);
    expect(motionSpring.damping).toBe(30);
    expect(motionRevealOffset).toBeGreaterThanOrEqual(16);
    expect(motionRevealOffset).toBeLessThanOrEqual(24);
    expect(motionStaggerGap).toBeGreaterThan(0);
  });
});
