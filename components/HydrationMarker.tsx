"use client";

import { useLayoutEffect } from "react";

const HERO_MOTION_SELECTOR = ".hero-enter, .hero-name-reveal-track";

function heroMotionAnimationsFinished(): boolean {
  const elements = document.querySelectorAll(HERO_MOTION_SELECTOR);
  if (elements.length === 0) {
    return true;
  }
  return [...elements].every((element) => {
    const animations = element.getAnimations();
    return (
      animations.length === 0 ||
      animations.every(
        (animation) =>
          animation.playState === "finished" || animation.playState === "idle",
      )
    );
  });
}

function markHydrated() {
  document.documentElement.dataset.hydrated = "";
}

export function HydrationMarker() {
  useLayoutEffect(() => {
    const elements = document.querySelectorAll(HERO_MOTION_SELECTOR);

    if (heroMotionAnimationsFinished()) {
      markHydrated();
      return;
    }

    let pending = 0;
    const onAnimationEnd = () => {
      pending -= 1;
      if (pending <= 0) {
        markHydrated();
      }
    };

    elements.forEach((element) => {
      const animations = element.getAnimations();
      const running = animations.some(
        (animation) => animation.playState === "running",
      );
      if (running) {
        pending += 1;
        element.addEventListener("animationend", onAnimationEnd, {
          once: true,
        });
      }
    });

    if (pending === 0) {
      markHydrated();
    }
  }, []);

  return null;
}
