"use client";

import {
  m,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { projectsFeaturedSpring } from "@/lib/projects-motion";
import { cn } from "@/lib/utils";

const DOT_INSET_PX = 6;

type ProjectsScrollRailProps = {
  progress: MotionValue<number>;
  activeIndex: number;
  projectCount: number;
  className?: string;
};

export function ProjectsScrollRail({
  progress,
  activeIndex,
  projectCount,
  className,
}: ProjectsScrollRailProps) {
  const reducedMotion = useReducedMotion();
  const springProgress = useSpring(progress, projectsFeaturedSpring);
  const clamped = useTransform(springProgress, (value) =>
    Math.min(1, Math.max(0, value)),
  );

  const fillHeight = useTransform(
    clamped,
    (value) =>
      `calc(${DOT_INSET_PX}px + (100% - ${DOT_INSET_PX * 2}px) * ${value})`,
  );

  const steppedFraction =
    projectCount <= 1 ? 0 : activeIndex / (projectCount - 1);

  const dotTop = useTransform(clamped, (value) => {
    if (projectCount <= 1) {
      return `${DOT_INSET_PX}px`;
    }
    const segment = 1 / (projectCount - 1);
    const snapped = Math.round(value / segment) * segment;
    const clampedValue = Math.min(1, Math.max(0, snapped));
    return `calc(${DOT_INSET_PX}px + (100% - ${DOT_INSET_PX * 2}px) * ${clampedValue})`;
  });

  const steppedTop = `calc(${DOT_INSET_PX}px + (100% - ${DOT_INSET_PX * 2}px) * ${steppedFraction})`;

  return (
    <p
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 w-px", className)}
    >
      <span className="bg-border/35 absolute inset-y-0 left-0 w-px" />
      <m.span
        className="bg-brand-accent/85 absolute top-0 left-0 w-px origin-top shadow-[0_0_12px_rgb(76_215_246_/_0.55)]"
        style={{ height: reducedMotion ? steppedTop : fillHeight }}
      />
      <m.span
        className="bg-brand-accent absolute -left-[3px] size-2 rounded-full shadow-[0_0_14px_rgb(76_215_246_/_0.85),0_0_28px_rgb(76_215_246_/_0.35)]"
        style={{
          top: reducedMotion ? steppedTop : dotTop,
          translateY: "-50%",
        }}
      />
    </p>
  );
}
