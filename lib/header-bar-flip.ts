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

function isHeaderFlipAnimation(anim: Animation): boolean {
  const effect = anim.effect;
  if (
    !effect ||
    !("getKeyframes" in effect) ||
    typeof effect.getKeyframes !== "function"
  ) {
    return false;
  }
  const keyframes = effect.getKeyframes() as Keyframe[];
  if (!keyframes.some((frame) => frame.transform !== undefined)) return false;
  const timing = effect.getTiming();
  return timing.duration === HEADER_FLIP_DURATION_MS;
}

export function hasActiveHeaderFlipAnimation(element: HTMLElement): boolean {
  if (typeof element.getAnimations !== "function") return false;

  for (const anim of element.getAnimations()) {
    if (anim.playState === "finished" || anim.playState === "idle") continue;
    if (!isHeaderFlipAnimation(anim)) continue;
    return true;
  }

  return false;
}

export function settleFlipAnimations(element: HTMLElement): void {
  if (typeof element.getAnimations !== "function") return;

  for (const anim of element.getAnimations()) {
    if (!isHeaderFlipAnimation(anim)) continue;
    if (anim.playState !== "running" && anim.playState !== "paused") continue;
    anim.commitStyles();
    anim.cancel();
  }
}

export function playHeaderBarFlip(
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

export function runHeaderBarFlip(
  elements: HTMLElement[],
  firstRects: Map<Element, DOMRect>,
): Animation[] {
  const interrupted = elements.some(hasActiveHeaderFlipAnimation);

  if (interrupted) {
    for (const element of elements) {
      settleFlipAnimations(element);
    }
    const visualFirst = captureFlipRects(elements);
    for (const element of elements) {
      element.style.transform = "";
    }
    return playHeaderBarFlip(elements, visualFirst);
  }

  return playHeaderBarFlip(elements, firstRects);
}
