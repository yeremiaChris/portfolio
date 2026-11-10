"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import { setLenisInstance } from "@/lib/programmatic-scroll";
import { motionAnchorScrollOffset } from "@/lib/motion-tokens";
import { scheduleIdle } from "@/lib/schedule-idle";

type SmoothScrollProps = {
  children: ReactNode;
};

function LenisInstanceBridge() {
  const lenis = useLenis();
  useEffect(() => {
    setLenisInstance(lenis ?? null);
    return () => setLenisInstance(null);
  }, [lenis]);
  return null;
}

const baseLenisOptions = {
  anchors: {
    offset: motionAnchorScrollOffset,
  },
  allowNestedScroll: true,
  respectReducedMotion: true,
} as const;

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [autoRaf, setAutoRaf] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setLenisInstance(null);
      return;
    }

    let cancelled = false;

    const cancelSchedule = scheduleIdle(() => {
      void import("lenis/dist/lenis.css").then(() => {
        if (!cancelled) {
          setAutoRaf(true);
        }
      });
    });

    const onMotionChange = () => {
      if (!media.matches) {
        return;
      }
      cancelled = true;
      cancelSchedule();
      setAutoRaf(false);
      setLenisInstance(null);
    };

    media.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      cancelSchedule();
      media.removeEventListener("change", onMotionChange);
      setLenisInstance(null);
    };
  }, []);

  return (
    <ReactLenis root options={{ ...baseLenisOptions, autoRaf }}>
      <LenisInstanceBridge />
      {children}
    </ReactLenis>
  );
}
