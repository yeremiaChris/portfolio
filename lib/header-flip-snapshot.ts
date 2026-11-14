import {
  captureFlipRects,
  isElementRenderedForAnimation,
} from "@/lib/header-bar-flip";

export const HEADER_FLIP_ITEM_SELECTOR = "[data-flip-item]";

let flipBarElement: HTMLElement | null = null;
let pendingFirstRects: Map<Element, DOMRect> | null = null;

export function registerHeaderFlipBar(element: HTMLElement | null): void {
  flipBarElement = element;
}

export function collectHeaderFlipTargets(bar: HTMLElement): HTMLElement[] {
  return Array.from(
    bar.querySelectorAll<HTMLElement>(HEADER_FLIP_ITEM_SELECTOR),
  ).filter(
    (element): element is HTMLElement =>
      element instanceof HTMLElement && isElementRenderedForAnimation(element),
  );
}

export function captureHeaderFlipFirstRects(): Map<Element, DOMRect> | null {
  if (!flipBarElement) return null;

  const items = collectHeaderFlipTargets(flipBarElement);
  if (items.length === 0) return null;

  pendingFirstRects = captureFlipRects(items);
  return pendingFirstRects;
}

export function consumeHeaderFlipFirstRects(): Map<Element, DOMRect> | null {
  const rects = pendingFirstRects;
  pendingFirstRects = null;
  return rects;
}

export function peekHeaderFlipBar(): HTMLElement | null {
  return flipBarElement;
}
