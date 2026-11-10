"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import { motionTransition } from "@/lib/motion-tokens";

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

  const features = homeRoute
    ? () => import("motion/react").then((mod) => mod.domAnimation)
    : domAnimation;

  return (
    <LazyMotion features={features} strict>
      <MotionConfig reducedMotion="user" transition={motionTransition}>
        <SmoothScroll>{children}</SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  );
}
