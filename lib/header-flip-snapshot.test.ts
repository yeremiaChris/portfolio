/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  HEADER_FLIP_DURATION_MS,
  HEADER_FLIP_EASING,
  playHeaderBarFlip,
  runHeaderBarFlip,
} from "./header-bar-flip";
import {
  captureHeaderFlipFirstRects,
  collectHeaderFlipTargets,
  consumeHeaderFlipFirstRects,
  registerHeaderFlipBar,
} from "./header-flip-snapshot";

function mockRect(left: number, top: number, width = 48, height = 32): DOMRect {
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

function createFlipBar(
  positions: Record<string, { left: number; top: number; width?: number }>,
  barWidth = 1200,
): HTMLElement {
  const bar = document.createElement("div");
  bar.dataset.flipBar = "";
  bar.getBoundingClientRect = () => mockRect(24, 8, barWidth);

  for (const [id, position] of Object.entries(positions)) {
    const item = document.createElement("div");
    item.dataset.flipItem = id;
    item.getBoundingClientRect = () =>
      mockRect(position.left, position.top, position.width ?? 48);
    bar.appendChild(item);
  }
  return bar;
}

function setBarPositions(
  bar: HTMLElement,
  positions: Record<string, { left: number; top: number; width?: number }>,
  barWidth?: number,
): void {
  if (barWidth !== undefined) {
    bar.getBoundingClientRect = () => mockRect(24, 8, barWidth);
  }

  for (const child of Array.from(bar.children)) {
    const id = child.getAttribute("data-flip-item");
    if (!id || !(child instanceof HTMLElement)) continue;
    const position = positions[id];
    if (!position) continue;
    child.getBoundingClientRect = () =>
      mockRect(position.left, position.top, position.width ?? 48);
  }
}

describe("header-flip-snapshot scroll sequence", () => {
  beforeEach(() => {
    registerHeaderFlipBar(null);
  });

  it("runs non-zero FLIP on scroll down then scroll up", () => {
    const bar = createFlipBar(
      {
        nav: { left: 320, top: 12 },
        cta: { left: 840, top: 12 },
      },
      420,
    );
    registerHeaderFlipBar(bar);

    captureHeaderFlipFirstRects(true);
    const firstDown = consumeHeaderFlipFirstRects();
    const targets = collectHeaderFlipTargets(bar);
    expect(firstDown?.size).toBe(targets.length);

    setBarPositions(
      bar,
      {
        nav: { left: 280, top: 12 },
        cta: { left: 620, top: 12 },
      },
      420,
    );

    const createSpy = vi
      .fn()
      .mockReturnValue({ onfinish: null } as unknown as Animation);
    for (const item of targets) {
      item.animate = createSpy;
    }

    runHeaderBarFlip(targets, firstDown!, {
      preToggleFirst: true,
      expanding: false,
    });
    expect(createSpy).toHaveBeenCalled();
    const downKeyframes = createSpy.mock.calls[0][0] as Keyframe[];
    expect(downKeyframes[0].transform).not.toBe("translate(0px, 0px)");
    expect(createSpy.mock.calls[0][1]).toMatchObject({
      duration: HEADER_FLIP_DURATION_MS,
      easing: HEADER_FLIP_EASING,
    });

    createSpy.mockClear();

    captureHeaderFlipFirstRects(false);
    const firstUp = consumeHeaderFlipFirstRects();
    expect(firstUp?.get(targets[1])?.left).toBe(280);

    setBarPositions(
      bar,
      {
        nav: { left: 320, top: 12 },
        cta: { left: 840, top: 12 },
      },
      1200,
    );

    runHeaderBarFlip(targets, firstUp!, {
      preToggleFirst: true,
      expanding: true,
    });

    expect(createSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
    const childCall = createSpy.mock.calls.find((call) => {
      const frame = call[0][0] as Keyframe;
      return (
        typeof frame.transform === "string" &&
        frame.transform !== "translate(0px, 0px)" &&
        frame.width === undefined
      );
    });
    expect(childCall).toBeDefined();
    const upKeyframes = childCall![0] as Keyframe[];
    expect(upKeyframes[0].transform).toBe("translate(-40px, 0px)");
    expect(childCall![1]).toMatchObject({
      duration: HEADER_FLIP_DURATION_MS,
      easing: HEADER_FLIP_EASING,
    });

    const barCall = createSpy.mock.calls.find(
      (call) => call[0][0]?.width !== undefined,
    );
    expect(barCall).toBeDefined();
    expect((barCall![0] as Keyframe[])[0].width).toBe("420px");
    expect((barCall![0] as Keyframe[])[1].width).toBe("1200px");
  });

  it("animates the bar container and children on expand", () => {
    const bar = createFlipBar(
      { logo: { left: 72, top: 12 }, cta: { left: 640, top: 12 } },
      380,
    );
    const targets = collectHeaderFlipTargets(bar);
    const first = captureFlipRects(bar, targets, 380);
    setBarPositions(
      bar,
      { logo: { left: 48, top: 12 }, cta: { left: 880, top: 12 } },
      1200,
    );

    const createSpy = vi
      .fn()
      .mockReturnValue({ onfinish: null } as unknown as Animation);
    for (const item of targets) {
      item.animate = createSpy;
    }

    const animations = playHeaderBarFlip(targets, first);
    expect(animations.length).toBeGreaterThanOrEqual(2);
    expect(createSpy).toHaveBeenCalled();

    const barCall = createSpy.mock.calls.find(
      (call) => call[0][0]?.width !== undefined,
    );
    const childCall = createSpy.mock.calls.find(
      (call) =>
        (call[0][0] as Keyframe).transform &&
        (call[0][0] as Keyframe).transform !== "translate(0px, 0px)",
    );
    expect(barCall).toBeDefined();
    expect(childCall).toBeDefined();
  });

  it("preserves pre-toggle capture through consume", () => {
    const bar = createFlipBar({ logo: { left: 48, top: 10 } });
    registerHeaderFlipBar(bar);

    const captured = captureHeaderFlipFirstRects(false);
    expect(captured?.get(collectHeaderFlipTargets(bar)[1])?.left).toBe(48);
    expect(consumeHeaderFlipFirstRects()).toBe(captured);
    expect(consumeHeaderFlipFirstRects()).toBeNull();
  });
});

function captureFlipRects(
  bar: HTMLElement,
  targets: HTMLElement[],
  barWidth: number,
): Map<Element, DOMRect> {
  bar.getBoundingClientRect = () => mockRect(24, 8, barWidth);
  return new Map(
    targets.map((target) => [target, target.getBoundingClientRect()]),
  );
}
