"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import { setLenisInstance } from "@/lib/programmatic-scroll";
import { motionAnchorScrollOffset } from "@/lib/motion-tokens";

import "lenis/dist/lenis.css";

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

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (enabled === null || !enabled) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: {
          offset: motionAnchorScrollOffset,
        },
        allowNestedScroll: true,
        respectReducedMotion: true,
      }}
    >
      <LenisInstanceBridge />
      {children}
    </ReactLenis>
  );
}
