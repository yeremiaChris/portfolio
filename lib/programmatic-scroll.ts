import type Lenis from "lenis";

import { motionAnchorScrollOffset } from "@/lib/motion-tokens";

let activeLenis: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  activeLenis = instance;
}

export function getLenisInstance() {
  return activeLenis;
}

export function scrollDocumentToY(
  y: number,
  options?: { immediate?: boolean },
) {
  if (activeLenis) {
    activeLenis.scrollTo(y, {
      immediate: options?.immediate,
      duration: 0.85,
    });
    return;
  }
  window.scrollTo({
    top: y,
    behavior: options?.immediate ? "auto" : "smooth",
  });
}

export function scrollDocumentToElement(
  element: HTMLElement,
  offset = motionAnchorScrollOffset,
) {
  if (activeLenis) {
    activeLenis.scrollTo(element, { offset, duration: 0.85 });
    return;
  }
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
