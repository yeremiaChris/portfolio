/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  isElementRenderedForAnimation,
  runHeaderBarFlip,
} from "./header-bar-flip";
import {
  captureHeaderFlipFirstRects,
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

function wireFlipClientRects(element: HTMLElement, rect: DOMRect): void {
  element.getBoundingClientRect = () => rect;
  element.getClientRects = () => [rect] as unknown as DOMRectList;
}

function createFlipBar(
  positions: Record<string, { left: number; top: number }>,
): HTMLElement {
  const bar = document.createElement("div");
  bar.dataset.flipBar = "";
  wireFlipClientRects(bar, mockRect(24, 8, 400));
  for (const [id, position] of Object.entries(positions)) {
    const item = document.createElement("div");
    item.dataset.flipItem = id;
    wireFlipClientRects(item, mockRect(position.left, position.top));
    bar.appendChild(item);
  }
  return bar;
}

function setBarPositions(
  bar: HTMLElement,
  positions: Record<string, { left: number; top: number }>,
): void {
  for (const child of Array.from(bar.children)) {
    const id = child.getAttribute("data-flip-item");
    if (!id || !(child instanceof HTMLElement)) continue;
    const position = positions[id];
    if (!position) continue;
    wireFlipClientRects(child, mockRect(position.left, position.top));
  }
}

describe("header-flip-snapshot scroll sequence", () => {
  beforeEach(() => {
    registerHeaderFlipBar(null);
  });

  it("runs non-zero FLIP on scroll down then scroll up", () => {
    const bar = createFlipBar({
      nav: { left: 320, top: 12 },
      cta: { left: 840, top: 12 },
    });
    document.body.appendChild(bar);
    registerHeaderFlipBar(bar);
    expect(isElementRenderedForAnimation(bar)).toBe(true);

    captureHeaderFlipFirstRects();
    const firstDown = consumeHeaderFlipFirstRects();
    expect(firstDown?.size).toBe(2);

    setBarPositions(bar, {
      nav: { left: 280, top: 12 },
      cta: { left: 620, top: 12 },
    });

    const items = Array.from(bar.children) as HTMLElement[];
    const createSpy = vi
      .fn()
      .mockReturnValue({ onfinish: null } as unknown as Animation);
    for (const item of items) {
      item.animate = createSpy;
    }

    runHeaderBarFlip(items, firstDown!, { preToggleFirst: true });
    expect(createSpy).toHaveBeenCalled();
    const downKeyframes = createSpy.mock.calls[0][0] as Keyframe[];
    expect(downKeyframes[0].transform).not.toBe("translate(0px, 0px)");

    createSpy.mockClear();

    captureHeaderFlipFirstRects();
    const firstUp = consumeHeaderFlipFirstRects();
    expect(firstUp?.get(items[0])?.left).toBe(280);

    setBarPositions(bar, {
      nav: { left: 320, top: 12 },
      cta: { left: 840, top: 12 },
    });

    runHeaderBarFlip(items, firstUp!, { preToggleFirst: true });

    expect(createSpy).toHaveBeenCalled();
    const upKeyframes = createSpy.mock.calls[0][0] as Keyframe[];
    expect(upKeyframes[0].transform).toBe("translate(-40px, 0px)");
    bar.remove();
  });

  it("preserves pre-toggle capture through consume", () => {
    const bar = createFlipBar({ logo: { left: 48, top: 10 } });
    document.body.appendChild(bar);
    registerHeaderFlipBar(bar);

    const captured = captureHeaderFlipFirstRects();
    const logo = bar.querySelector("[data-flip-item]") as HTMLElement;
    expect(captured?.get(logo)?.left).toBe(48);
    expect(consumeHeaderFlipFirstRects()).toBe(captured);
    expect(consumeHeaderFlipFirstRects()).toBeNull();
    bar.remove();
  });
});
