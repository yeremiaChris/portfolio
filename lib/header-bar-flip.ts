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

function forceLayoutRead(elements: HTMLElement[]): void {
  const root = elements[0];
  if (root) void root.offsetHeight;
}

function isBarFlipContainer(element: HTMLElement): boolean {
  return element.dataset.flipBar !== undefined;
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
  const animatesFlip =
    keyframes.some((frame) => frame.transform !== undefined) ||
    keyframes.some((frame) => frame.width !== undefined);
  if (!animatesFlip) return false;
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
    const isBar = isBarFlipContainer(element);
    const widthDelta = isBar ? first.width - last.width : 0;
    if (dx === 0 && dy === 0 && widthDelta === 0) continue;

    if (typeof element.animate !== "function") continue;

    if (isBar && widthDelta !== 0) {
      element.style.boxSizing = "border-box";
      element.style.width = `${first.width}px`;
      element.style.transform = `translate(${dx}px, ${dy}px)`;

      const animation = element.animate(
        [
          {
            width: `${first.width}px`,
            transform: `translate(${dx}px, ${dy}px)`,
          },
          {
            width: `${last.width}px`,
            transform: "translate(0px, 0px)",
          },
        ],
        {
          duration: HEADER_FLIP_DURATION_MS,
          easing: HEADER_FLIP_EASING,
          fill: "both",
        },
      );
      animation.onfinish = () => {
        element.style.transform = "";
        element.style.width = "";
        element.style.boxSizing = "";
      };
      animations.push(animation);
      continue;
    }

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

export type HeaderBarFlipOptions = {
  preToggleFirst?: boolean;
  expanding?: boolean;
};

export function runHeaderBarFlip(
  elements: HTMLElement[],
  firstRects: Map<Element, DOMRect>,
  options?: HeaderBarFlipOptions,
): Animation[] {
  void options?.expanding;
  const hasRunningFlip = elements.some(hasActiveHeaderFlipAnimation);

  if (options?.preToggleFirst) {
    if (hasRunningFlip) {
      settleHeaderFlipTargets(elements);
    }
    return playHeaderBarFlip(elements, firstRects);
  }

  if (hasRunningFlip) {
    settleHeaderFlipTargets(elements);
    const visualFirst = captureFlipRects(elements);
    for (const element of elements) {
      element.style.transform = "";
      if (isBarFlipContainer(element)) {
        element.style.width = "";
      }
    }
    return playHeaderBarFlip(elements, visualFirst);
  }

  return playHeaderBarFlip(elements, firstRects);
}
