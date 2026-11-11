"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import { setLenisInstance } from "@/lib/programmatic-scroll";
import { motionAnchorScrollOffset } from "@/lib/motion-tokens";

type SmoothScrollLenisProps = {
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
  autoRaf: true,
} as const;

export function SmoothScrollLenis({ children }: SmoothScrollLenisProps) {
  return (
    <ReactLenis root options={baseLenisOptions}>
      <LenisInstanceBridge />
      {children}
    </ReactLenis>
  );
}
