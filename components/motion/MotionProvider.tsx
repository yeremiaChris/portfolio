"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import { motionTransition } from "@/lib/motion-tokens";
import { scheduleIdle } from "@/lib/schedule-idle";

import { SmoothScroll } from "@/components/motion/SmoothScroll";

type MotionProviderProps = {
  children: ReactNode;
};

function isHomePathname(pathname: string | null): boolean {
  return pathname === "/" || pathname === "";
}

export function MotionProvider({ children }: MotionProviderProps) {
  const pathname = usePathname();
  const homeRoute = isHomePathname(pathname);
  const [motionEnabled, setMotionEnabled] = useState(!homeRoute);

  useEffect(() => {
    if (!homeRoute) {
      const timer = window.setTimeout(() => setMotionEnabled(true), 0);
      return () => window.clearTimeout(timer);
    }
    const disableTimer = window.setTimeout(() => setMotionEnabled(false), 0);
    const cancelEnable = scheduleIdle(() => setMotionEnabled(true), 900);
    return () => {
      window.clearTimeout(disableTimer);
      cancelEnable();
    };
  }, [homeRoute]);

  if (!motionEnabled) {
    return <SmoothScroll>{children}</SmoothScroll>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={motionTransition}>
        <SmoothScroll>{children}</SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  );
}
