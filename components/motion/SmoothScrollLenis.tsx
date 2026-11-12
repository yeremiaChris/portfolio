"use client";

import type Lenis from "lenis";
import { useEffect } from "react";

import { motionAnchorScrollOffset } from "@/lib/motion-tokens";
import { setLenisInstance } from "@/lib/programmatic-scroll";
import { scheduleIdle } from "@/lib/schedule-idle";

export const smoothScrollLenisOptions = {
  anchors: {
    offset: motionAnchorScrollOffset,
  },
  allowNestedScroll: true,
  respectReducedMotion: true,
  autoRaf: true,
} as const;

const LENIS_IDLE_DELAY_MS = 3500;

export function SmoothScrollLenisMount() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setLenisInstance(null);
      return;
    }

    let cancelled = false;
    let lenis: Lenis | null = null;

    const cancelSchedule = scheduleIdle(() => {
      void Promise.all([import("lenis"), import("lenis/dist/lenis.css")]).then(
        ([lenisModule]) => {
          if (cancelled) {
            return;
          }
          const Lenis = lenisModule.default;
          lenis = new Lenis(smoothScrollLenisOptions);
          setLenisInstance(lenis);
        },
      );
    }, LENIS_IDLE_DELAY_MS);

    const onMotionChange = () => {
      if (!media.matches) {
        return;
      }
      cancelled = true;
      cancelSchedule();
      lenis?.destroy();
      lenis = null;
      setLenisInstance(null);
    };

    media.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      cancelSchedule();
      media.removeEventListener("change", onMotionChange);
      lenis?.destroy();
      lenis = null;
      setLenisInstance(null);
    };
  }, []);

  return null;
}
