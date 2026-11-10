"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";

import { setLenisInstance } from "@/lib/programmatic-scroll";
import { scheduleIdle } from "@/lib/schedule-idle";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [LenisActivated, setLenisActivated] = useState<ComponentType<{
    children: ReactNode;
  }> | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }

    let cancelled = false;

    const cancelSchedule = scheduleIdle(() => {
      void (async () => {
        await import("lenis/dist/lenis.css");
        const mod = await import("@/components/motion/LenisActivated");
        if (!cancelled) {
          setLenisActivated(() => mod.LenisActivated);
        }
      })();
    });

    const onMotionChange = () => {
      if (media.matches) {
        cancelled = true;
        cancelSchedule();
        setLenisActivated(null);
        setLenisInstance(null);
      }
    };

    media.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      cancelSchedule();
      media.removeEventListener("change", onMotionChange);
      setLenisInstance(null);
    };
  }, []);

  if (!LenisActivated) {
    return children;
  }

  return <LenisActivated>{children}</LenisActivated>;
}
