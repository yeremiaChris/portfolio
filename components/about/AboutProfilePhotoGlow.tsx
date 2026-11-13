"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type AboutProfilePhotoGlowProps = {
  children: ReactNode;
};

export function AboutProfilePhotoGlow({
  children,
}: AboutProfilePhotoGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const driftX = useTransform(scrollYProgress, [0, 1], [-16, 18]);
  const driftY = useTransform(scrollYProgress, [0, 1], [12, -20]);

  return (
    <div ref={ref} className="relative">
      <m.div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 sm:-inset-8"
        style={
          reducedMotion
            ? {
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 45%, rgb(76 215 246 / 0.32), transparent 72%)",
                filter: "blur(36px)",
              }
            : {
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 45%, rgb(76 215 246 / 0.32), transparent 72%)",
                filter: "blur(36px)",
                x: driftX,
                y: driftY,
              }
        }
      />
      {children}
    </div>
  );
}
