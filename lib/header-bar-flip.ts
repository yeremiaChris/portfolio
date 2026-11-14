export const HEADER_FLIP_DURATION_MS = 800;
export const HEADER_FLIP_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
export const HEADER_BAR_CHROME_DELAY_MS = 150;

export function captureFlipRects(
  elements: Iterable<Element>,
): Map<Element, DOMRect> {
  const rects = new Map<Element, DOMRect>();
  for (const element of elements) {
    rects.set(element, element.getBoundingClientRect());
  }
  return rects;
}

export function settleFlipAnimations(element: HTMLElement): void {
  if (typeof element.getAnimations !== "function") return;

  for (const anim of element.getAnimations()) {
    const effect = anim.effect;
    if (
      !effect ||
      !("getKeyframes" in effect) ||
      typeof effect.getKeyframes !== "function"
    ) {
      continue;
    }
    const keyframes = effect.getKeyframes() as Keyframe[];
    if (!keyframes.some((frame) => frame.transform !== undefined)) continue;
    anim.commitStyles();
    anim.cancel();
  }
}

function playHeaderBarFlip(
  elements: HTMLElement[],
  firstRects: Map<Element, DOMRect>,
): Animation[] {
  const animations: Animation[] = [];

  for (const element of elements) {
    const first = firstRects.get(element);
    if (!first) continue;

    const last = element.getBoundingClientRect();
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    if (dx === 0 && dy === 0) continue;

    element.style.transform = `translate(${dx}px, ${dy}px)`;
    if (typeof element.animate !== "function") continue;

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

export function runHeaderBarFlip(elements: HTMLElement[]): Animation[] {
  for (const element of elements) {
    settleFlipAnimations(element);
  }

  const firstRects = captureFlipRects(elements);
  for (const element of elements) {
    element.style.transform = "";
  }

  return playHeaderBarFlip(elements, firstRects);
}
