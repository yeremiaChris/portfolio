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
    expect(motionEase).toEqual([0.16, 1, 0.3, 1]);
  });

  it("exposes the agreed duration steps", () => {
    expect(motionDuration.reveal).toBeGreaterThanOrEqual(0.7);
    expect(motionDuration.reveal).toBeLessThanOrEqual(0.8);
    expect(motionDuration.page).toBe(0.3);
  });

  it("defines spring and layout-friendly offsets", () => {
    expect(motionSpring.damping).toBeGreaterThanOrEqual(
      motionSpring.stiffness / 15,
    );
    expect(motionRevealOffset).toBe(12);
    expect(motionStaggerGap).toBeGreaterThan(0);
  });
});
