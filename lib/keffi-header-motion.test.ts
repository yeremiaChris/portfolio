import { describe, expect, it } from "vitest";

import {
  motionHeaderFlipTransition,
  motionHeaderNavIndicatorHideTransition,
  motionHeaderNavIndicatorTransition,
  motionKeffiExpoOut,
} from "./keffi-header-motion";

describe("keffi header motion", () => {
  it("matches Keffi Flip duration and expo.out easing", () => {
    expect(motionHeaderFlipTransition(false)).toEqual({
      duration: 0.8,
      ease: motionKeffiExpoOut,
    });
  });

  it("matches Keffi hdr__ind slide timing", () => {
    expect(motionHeaderNavIndicatorTransition(false)).toEqual({
      duration: 0.7,
      ease: motionKeffiExpoOut,
    });
  });

  it("snapshots all header motion when reduced motion is on", () => {
    expect(motionHeaderFlipTransition(true)).toEqual({ duration: 0 });
    expect(motionHeaderNavIndicatorTransition(true)).toEqual({ duration: 0 });
    expect(motionHeaderNavIndicatorHideTransition(true)).toEqual({
      duration: 0,
    });
  });
});
