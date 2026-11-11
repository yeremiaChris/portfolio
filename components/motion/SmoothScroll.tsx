"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { scheduleIdle } from "@/lib/schedule-idle";
import { setLenisInstance } from "@/lib/programmatic-scroll";

const SmoothScrollLenis = dynamic(
  () =>
    import("@/components/motion/SmoothScrollLenis").then((mod) => ({
      default: mod.SmoothScrollLenis,
    })),
  { ssr: false },
);

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenisReady, setLenisReady] = useState(false);

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
          setLenisReady(true);
        }
      });
    }, 3500);

    const onMotionChange = () => {
      if (!media.matches) {
        return;
      }
      cancelled = true;
      cancelSchedule();
      setLenisReady(false);
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

  if (!lenisReady) {
    return children;
  }

  return <SmoothScrollLenis>{children}</SmoothScrollLenis>;
}
