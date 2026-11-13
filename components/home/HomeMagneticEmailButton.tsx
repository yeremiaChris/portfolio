"use client";

import { m, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useCallback, type ReactNode } from "react";

import { useHomePointerEffectsEnabled } from "@/components/home/useHomeMotionEnabled";
import { homeMagneticMaxPx, homeMagneticSpring } from "@/lib/home-motion";
import { cn } from "@/lib/utils";

type HomeMagneticEmailButtonProps = {
  children: ReactNode;
  className?: string;
};

export function HomeMagneticEmailButton({
  children,
  className,
}: HomeMagneticEmailButtonProps) {
  const pointerEffects = useHomePointerEffectsEnabled();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, homeMagneticSpring);
  const springY = useSpring(y, homeMagneticSpring);
  const translate = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (!pointerEffects) {
        return;
      }
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (event.clientX - cx) / (rect.width / 2);
      const dy = (event.clientY - cy) / (rect.height / 2);
      x.set(
        Math.max(
          -homeMagneticMaxPx,
          Math.min(homeMagneticMaxPx, dx * homeMagneticMaxPx),
        ),
      );
      y.set(
        Math.max(
          -homeMagneticMaxPx,
          Math.min(homeMagneticMaxPx, dy * homeMagneticMaxPx),
        ),
      );
    },
    [pointerEffects, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <m.span
      className={cn("inline-flex", className)}
      style={pointerEffects ? { translate } : undefined}
      onPointerMove={pointerEffects ? onMove : undefined}
      onPointerLeave={pointerEffects ? onLeave : undefined}
    >
      {children}
    </m.span>
  );
}
