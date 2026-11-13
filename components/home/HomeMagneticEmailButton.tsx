"use client";

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useCallback, type ReactNode } from "react";

import { usePointerFine } from "@/components/projects/usePointerFine";
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
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, homeMagneticSpring);
  const springY = useSpring(y, homeMagneticSpring);
  const translate = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;
  const enabled = pointerFine && !reducedMotion;

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (!enabled) {
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
    [enabled, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (!enabled) {
    return children;
  }

  return (
    <m.span
      className={cn("inline-flex", className)}
      style={{ translate }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </m.span>
  );
}
