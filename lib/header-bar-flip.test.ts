/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";

import {
  canCommitAnimationStyles,
  HEADER_BAR_CHROME_DELAY_MS,
  HEADER_FLIP_DURATION_MS,
  HEADER_FLIP_EASING,
  captureFlipRects,
  hasActiveHeaderFlipAnimation,
  playHeaderBarFlip,
  runHeaderBarFlip,
  settleFlipAnimations,
} from "./header-bar-flip";

function mockRect(left: number, top: number, width = 40, height = 20): DOMRect {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

function createFlipTarget(id: string): HTMLElement {
  const element = document.createElement("div");
  element.dataset.flipItem = id;
  let rect = mockRect(0, 0);

  element.getBoundingClientRect = () => rect;
  const setRect = (next: DOMRect) => {
    rect = next;
  };

  (
    element as unknown as HTMLElement & {
      __setRect: (next: DOMRect) => void;
    }
  ).__setRect = setRect;
  return element;
}

describe("header-bar-flip", () => {
  it("uses Keffi-matched FLIP timing", () => {
    expect(HEADER_FLIP_DURATION_MS).toBe(800);
    expect(HEADER_FLIP_EASING).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
    expect(HEADER_BAR_CHROME_DELAY_MS).toBe(150);
  });

  it("captures rects for flip targets", () => {
    const el = document.createElement("div");
    el.getBoundingClientRect = () => mockRect(10, 20, 100, 32);

    const map = captureFlipRects([el]);
    expect(map.get(el)?.left).toBe(10);
  });

  it("calls animate with non-zero translate when expanding", () => {
    const el = createFlipTarget("nav");
    const setRect = (
      el as unknown as HTMLElement & { __setRect: (r: DOMRect) => void }
    ).__setRect;

    const first = captureFlipRects([el]);
    setRect(mockRect(120, 8));
    const animate = vi
      .fn()
      .mockReturnValue({ onfinish: null } as unknown as Animation);
    el.animate = animate;

    playHeaderBarFlip([el], first);

    expect(animate).toHaveBeenCalledTimes(1);
    const keyframes = animate.mock.calls[0][0] as Keyframe[];
    expect(keyframes[0].transform).toBe("translate(-120px, -8px)");
  });

  it("calls animate with non-zero translate when compacting", () => {
    const el = createFlipTarget("cta");
    const setRect = (
      el as unknown as HTMLElement & { __setRect: (r: DOMRect) => void }
    ).__setRect;

    setRect(mockRect(40, 4));
    const first = captureFlipRects([el]);
    setRect(mockRect(220, 18));

    const animate = vi
      .fn()
      .mockReturnValue({ onfinish: null } as unknown as Animation);
    el.animate = animate;

    playHeaderBarFlip([el], first);

    expect(animate).toHaveBeenCalledTimes(1);
    const keyframes = animate.mock.calls[0][0] as Keyframe[];
    expect(keyframes[0].transform).toBe("translate(-180px, -14px)");
  });

  it("skips zero-delta playback and only interrupts running flip animations", () => {
    const el = createFlipTarget("logo");
    const rect = mockRect(12, 6);
    el.getBoundingClientRect = () => rect;

    const idleAnim = {
      playState: "idle",
      effect: {
        getKeyframes: () => [{ transform: "translate(1px, 0px)" }],
        getTiming: () => ({ duration: HEADER_FLIP_DURATION_MS }),
      },
    };
    const createSpy = vi
      .fn()
      .mockReturnValue({ onfinish: null } as unknown as Animation);
    el.animate = createSpy;
    el.getAnimations = vi.fn(() => [idleAnim as unknown as Animation]);

    const first = captureFlipRects([el]);
    const animations = runHeaderBarFlip([el], first);

    expect(createSpy).not.toHaveBeenCalled();
    expect(animations).toHaveLength(0);
    expect(hasActiveHeaderFlipAnimation(el)).toBe(false);
  });

  it("replays non-zero translate when rapidly reversing mid-animation", () => {
    const el = createFlipTarget("nav");
    const layout = mockRect(120, 4);
    const visual = mockRect(60, 0);

    const runningAnim = {
      playState: "running",
      effect: {
        getKeyframes: () => [
          { transform: "translate(50px, 0px)" },
          { transform: "translate(0px, 0px)" },
        ],
        getTiming: () => ({ duration: HEADER_FLIP_DURATION_MS }),
      },
      commitStyles: vi.fn(() => {
        el.style.transform = "translate(50px, 0px)";
      }),
      cancel: vi.fn(),
    };

    el.getBoundingClientRect = () => (el.style.transform ? visual : layout);

    const createSpy = vi
      .fn()
      .mockReturnValue({ onfinish: null } as unknown as Animation);
    el.animate = createSpy;
    el.getAnimations = vi.fn(() => [runningAnim as unknown as Animation]);

    document.body.appendChild(el);
    el.getClientRects = () => [mockRect(60, 0)] as unknown as DOMRectList;

    runHeaderBarFlip([el], captureFlipRects([el]), { preToggleFirst: false });

    expect(runningAnim.commitStyles).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledTimes(1);
    const keyframes = createSpy.mock.calls[0][0] as Keyframe[];
    expect(keyframes[0].transform).toBe("translate(-60px, -4px)");
    el.remove();
  });

  it("does not commitStyles when the animation target is not rendered", () => {
    const el = document.createElement("section") as HTMLElement;
    const mockAnim = {
      playState: "running",
      effect: {
        getKeyframes: () => [{ transform: "translate(40px, 0px)" }, {}],
        getTiming: () => ({ duration: HEADER_FLIP_DURATION_MS }),
      },
      commitStyles: vi.fn(),
      cancel: vi.fn(),
    };
    el.getAnimations = vi.fn(() => [mockAnim as unknown as Animation]);

    expect(canCommitAnimationStyles(el)).toBe(false);
    settleFlipAnimations(el);

    expect(mockAnim.commitStyles).not.toHaveBeenCalled();
    expect(mockAnim.cancel).toHaveBeenCalled();
  });

  it("commits in-flight transform animations before reversing when rendered", () => {
    const el = document.createElement("section") as HTMLElement;
    document.body.appendChild(el);
    el.getBoundingClientRect = () => mockRect(0, 0, 100, 40);
    el.getClientRects = () =>
      [mockRect(0, 0, 100, 40)] as unknown as DOMRectList;

    const mockAnim = {
      playState: "running",
      effect: {
        getKeyframes: () => [{ transform: "translate(40px, 0px)" }, {}],
        getTiming: () => ({ duration: HEADER_FLIP_DURATION_MS }),
      },
      commitStyles: vi.fn(),
      cancel: vi.fn(),
    };
    el.getAnimations = vi.fn(() => [mockAnim as unknown as Animation]);

    expect(canCommitAnimationStyles(el)).toBe(true);
    settleFlipAnimations(el);

    expect(mockAnim.commitStyles).toHaveBeenCalled();
    expect(mockAnim.cancel).toHaveBeenCalled();
    el.remove();
  });
});
