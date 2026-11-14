/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";

import {
  HEADER_BAR_CHROME_DELAY_MS,
  HEADER_FLIP_DURATION_MS,
  HEADER_FLIP_EASING,
  captureFlipRects,
  runHeaderBarFlip,
  settleFlipAnimations,
} from "./header-bar-flip";

describe("header-bar-flip", () => {
  it("uses Keffi-matched FLIP timing", () => {
    expect(HEADER_FLIP_DURATION_MS).toBe(800);
    expect(HEADER_FLIP_EASING).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
    expect(HEADER_BAR_CHROME_DELAY_MS).toBe(150);
  });

  it("captures rects for flip targets", () => {
    const el = document.createElement("div");
    el.getBoundingClientRect = () =>
      ({
        left: 10,
        top: 20,
        width: 100,
        height: 32,
        right: 110,
        bottom: 52,
        x: 10,
        y: 20,
        toJSON: () => ({}),
      }) as DOMRect;

    const map = captureFlipRects([el]);
    expect(map.get(el)?.left).toBe(10);
  });

  it("returns no animations when positions are unchanged", () => {
    const el = document.createElement("section") as HTMLElement;
    const rect = {
      left: 5,
      top: 5,
      width: 50,
      height: 20,
      right: 55,
      bottom: 25,
      x: 5,
      y: 5,
      toJSON: () => ({}),
    } as DOMRect;
    el.getBoundingClientRect = () => rect;
    const animations = runHeaderBarFlip([el]);
    expect(animations).toHaveLength(0);
  });

  it("commits in-flight transform animations before reversing", () => {
    const el = document.createElement("section") as HTMLElement;
    const mockAnim = {
      effect: {
        getKeyframes: () => [{ transform: "translate(40px, 0px)" }, {}],
      },
      commitStyles: vi.fn(),
      cancel: vi.fn(),
    };
    el.getAnimations = vi.fn(() => [mockAnim as unknown as Animation]);

    settleFlipAnimations(el);

    expect(mockAnim.commitStyles).toHaveBeenCalled();
    expect(mockAnim.cancel).toHaveBeenCalled();
  });
});
