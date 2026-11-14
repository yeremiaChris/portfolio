export const HEADER_FLIP_DURATION_MS = 800;
export const HEADER_FLIP_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

export function captureFlipRects(
  elements: Iterable<Element>,
): Map<Element, DOMRect> {
  const rects = new Map<Element, DOMRect>();
  for (const element of elements) {
    rects.set(element, element.getBoundingClientRect());
  }
  return rects;
}

export function runHeaderBarFlip(
  elements: Element[],
  firstRects: Map<Element, DOMRect>,
): Animation[] {
  const animations: Animation[] = [];

  for (const element of elements) {
    const first = firstRects.get(element);
    if (!first || !(element instanceof HTMLElement)) continue;

    const last = element.getBoundingClientRect();
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    if (dx === 0 && dy === 0) continue;

    element.style.transform = `translate(${dx}px, ${dy}px)`;
    const animation = element.animate(
      [
        { transform: `translate(${dx}px, ${dy}px)` },
        { transform: "translate(0px, 0px)" },
      ],
      {
        duration: HEADER_FLIP_DURATION_MS,
        easing: HEADER_FLIP_EASING,
        fill: "both",
      },
    );
    animation.onfinish = () => {
      element.style.transform = "";
    };
    animations.push(animation);
  }

  return animations;
}
