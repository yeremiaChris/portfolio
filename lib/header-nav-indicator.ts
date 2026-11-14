export type HeaderNavIndicatorBox = {
  x: number;
  width: number;
  visible: boolean;
};

export const hiddenHeaderNavIndicator: HeaderNavIndicatorBox = {
  x: 0,
  width: 0,
  visible: false,
};

export function buildHeaderNavIndicatorBox(
  navRect: DOMRect,
  linkRect: DOMRect,
): HeaderNavIndicatorBox | null {
  const x = linkRect.left - navRect.left;
  const width = linkRect.width;

  if (!Number.isFinite(x) || !Number.isFinite(width) || width <= 0) {
    return null;
  }

  return { x, width, visible: true };
}

export function headerNavIndicatorBoxesEqual(
  a: HeaderNavIndicatorBox,
  b: HeaderNavIndicatorBox,
): boolean {
  return a.x === b.x && a.width === b.width && a.visible === b.visible;
}
