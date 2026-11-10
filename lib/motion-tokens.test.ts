import { describe, expect, it } from "vitest";

import {
  motionDuration,
  motionEase,
  motionPresetConfig,
  motionPresetRevealOffset,
  motionPresetRevealTransition,
  motionSpring,
  motionStaggerChildDelay,
} from "./motion-tokens";

describe("motion-tokens", () => {
  it("uses the shared easing curve", () => {
    expect(motionEase).toEqual([0.16, 1, 0.3, 1]);
  });

  it("defines expressive and calm presets", () => {
    expect(motionPresetConfig.expressive.revealDuration).toBe(0.7);
    expect(motionPresetConfig.expressive.revealOffset).toBe(28);
    expect(motionPresetConfig.expressive.staggerGap).toBe(0.06);
    expect(motionPresetConfig.calm.revealDurationMount).toBe(0.25);
    expect(motionPresetConfig.calm.revealOffset).toBe(8);
    expect(motionPresetConfig.calm.staggerMaxDelay).toBe(0.15);
  });

  it("exposes hero and page duration steps", () => {
    expect(motionDuration.heroName).toBe(0.8);
    expect(motionDuration.page).toBe(0.3);
  });

  it("defines spring damping relative to stiffness", () => {
    expect(motionSpring.damping).toBeGreaterThanOrEqual(
      motionSpring.stiffness / 15,
    );
  });

  it("resolves preset reveal offset and transition by when", () => {
    expect(motionPresetRevealOffset("calm", "mount")).toBe(4);
    expect(motionPresetRevealOffset("expressive", "inView")).toBe(28);
    expect(motionPresetRevealTransition("calm", "mount").duration).toBe(0.25);
    expect(motionPresetRevealTransition("calm", "inView").duration).toBe(0.4);
    expect(motionPresetRevealTransition("expressive", "inView").duration).toBe(
      0.7,
    );
  });

  it("caps stagger child delay per preset", () => {
    expect(motionStaggerChildDelay(0, "calm")).toBe(0);
    expect(motionStaggerChildDelay(4, "calm")).toBeCloseTo(0.1);
    expect(motionStaggerChildDelay(20, "calm")).toBe(0.15);
    expect(motionStaggerChildDelay(20, "expressive")).toBe(0.36);
  });
});
