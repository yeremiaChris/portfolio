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

export function isElementRenderedForAnimation(element: HTMLElement): boolean {
  if (!element.isConnected) return false;
  if (typeof getComputedStyle !== "undefined") {
    const { display, visibility } = getComputedStyle(element);
    if (display === "none" || visibility === "hidden") return false;
  }
  return element.getClientRects().length > 0;
}

export function canCommitAnimationStyles(element: HTMLElement): boolean {
  return isElementRenderedForAnimation(element);
}

function forceLayoutRead(elements: HTMLElement[]): void {
  const root = elements[0];
  if (root) void root.offsetHeight;
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

function safelySettleAnimation(anim: Animation, element: HTMLElement): void {
  try {
    if (canCommitAnimationStyles(element)) {
      anim.commitStyles();
    }
  } catch {
    try {
      anim.cancel();
    } catch {
      return;
    }
    return;
  }

  try {
    anim.cancel();
  } catch {
    return;
  }
}

export function settleFlipAnimations(element: HTMLElement): void {
  if (typeof element.getAnimations !== "function") return;

  for (const anim of element.getAnimations()) {
    if (!isHeaderFlipAnimation(anim)) continue;
    if (anim.playState !== "running" && anim.playState !== "paused") continue;
    safelySettleAnimation(anim, element);
  }
}

export function settleHeaderFlipTargets(elements: HTMLElement[]): void {
  for (const element of elements) {
    settleFlipAnimations(element);
  }
}

export function playHeaderBarFlip(
  elements: HTMLElement[],
  firstRects: Map<Element, DOMRect>,
): Animation[] {
  forceLayoutRead(elements);
  const animations: Animation[] = [];

  for (const element of elements) {
    const first = firstRects.get(element);
    if (!first) continue;

    const last = element.getBoundingClientRect();
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) continue;
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

export type HeaderBarFlipOptions = {
  preToggleFirst?: boolean;
};

export function runHeaderBarFlip(
  elements: HTMLElement[],
  firstRects: Map<Element, DOMRect>,
  options?: HeaderBarFlipOptions,
): Animation[] {
  const renderedElements = elements.filter(isElementRenderedForAnimation);
  const hasRunningFlip = renderedElements.some(hasActiveHeaderFlipAnimation);

  if (options?.preToggleFirst) {
    if (hasRunningFlip) {
      settleHeaderFlipTargets(renderedElements);
    }
    return playHeaderBarFlip(renderedElements, firstRects);
  }

  if (hasRunningFlip) {
    settleHeaderFlipTargets(renderedElements);
    const visualFirst = captureFlipRects(renderedElements);
    for (const element of renderedElements) {
      element.style.transform = "";
    }
    return playHeaderBarFlip(renderedElements, visualFirst);
  }

  return playHeaderBarFlip(renderedElements, firstRects);
}
