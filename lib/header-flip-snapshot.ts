import { captureFlipRects } from "@/lib/header-bar-flip";

export const HEADER_FLIP_ITEM_SELECTOR = "[data-flip-item]";
export const HEADER_FLIP_BAR_SELECTOR = "[data-flip-bar]";

let flipBarElement: HTMLElement | null = null;
let pendingFirstRects: Map<Element, DOMRect> | null = null;
let pendingFlipCompact: boolean | null = null;

export function registerHeaderFlipBar(element: HTMLElement | null): void {
  flipBarElement = element;
}

export function collectHeaderFlipTargets(bar: HTMLElement): HTMLElement[] {
  return [
    bar,
    ...Array.from(bar.querySelectorAll<HTMLElement>(HEADER_FLIP_ITEM_SELECTOR)),
  ].filter((element): element is HTMLElement => element instanceof HTMLElement);
}

export function captureHeaderFlipFirstRects(
  nextCompact: boolean,
): Map<Element, DOMRect> | null {
  if (!flipBarElement) return null;

  const items = collectHeaderFlipTargets(flipBarElement);
  if (items.length === 0) return null;

  pendingFlipCompact = nextCompact;
  pendingFirstRects = captureFlipRects(items);
  return pendingFirstRects;
}

export function consumeHeaderFlipFirstRects(): Map<Element, DOMRect> | null {
  const rects = pendingFirstRects;
  pendingFirstRects = null;
  return rects;
}

export function consumeHeaderFlipCompactDirection(): boolean | null {
  const value = pendingFlipCompact;
  pendingFlipCompact = null;
  return value;
}

export function peekHeaderFlipBar(): HTMLElement | null {
  return flipBarElement;
}
