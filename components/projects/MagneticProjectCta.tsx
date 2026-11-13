"use client";

import { m, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useCallback, type ReactNode } from "react";

import {
  projectsMagneticMaxPx,
  projectsMagneticSpring,
} from "@/lib/projects-motion";
import { cn } from "@/lib/utils";

import { usePointerFine } from "@/components/projects/usePointerFine";

type MagneticProjectCtaProps = {
  children: ReactNode;
  className?: string;
};

export function MagneticProjectCta({
  children,
  className,
}: MagneticProjectCtaProps) {
  const pointerFine = usePointerFine();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, projectsMagneticSpring);
  const springY = useSpring(y, projectsMagneticSpring);
  const translate = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (!pointerFine) return;
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (event.clientX - cx) / (rect.width / 2);
      const dy = (event.clientY - cy) / (rect.height / 2);
      x.set(dx * projectsMagneticMaxPx * 0.85);
      y.set(dy * projectsMagneticMaxPx * 0.85);
    },
    [pointerFine, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (!pointerFine) {
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
