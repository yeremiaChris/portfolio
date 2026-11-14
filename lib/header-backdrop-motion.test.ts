import { describe, expect, it } from "vitest";

import {
  motionHeaderBackdropDuration,
  motionHeaderBackdropTransition,
} from "./header-backdrop-motion";

describe("motionHeaderBackdropTransition", () => {
  it("snaps instantly when reduced motion is enabled", () => {
    expect(motionHeaderBackdropTransition(true)).toEqual({ duration: 0 });
  });

  it("uses the eased backdrop duration for normal motion", () => {
    expect(motionHeaderBackdropTransition(false)).toEqual({
      duration: motionHeaderBackdropDuration,
      ease: [0.22, 1, 0.36, 1],
    });
  });
});
