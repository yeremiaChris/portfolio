"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import { setLenisInstance } from "@/lib/programmatic-scroll";
import { motionAnchorScrollOffset } from "@/lib/motion-tokens";

type LenisActivatedProps = {
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

export function LenisActivated({ children }: LenisActivatedProps) {
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
