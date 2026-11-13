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
  const fillHeight = useTransform(springProgress, [0, 1], ["0%", "100%"]);
  const steppedTop =
    projectCount <= 1 ? "0%" : `${(activeIndex / (projectCount - 1)) * 100}%`;
  const dotTop = useTransform(springProgress, (value) => {
    if (projectCount <= 1) return "0%";
    const segment = 1 / (projectCount - 1);
    const snapped = Math.round(value / segment) * segment;
    return `${Math.min(1, Math.max(0, snapped)) * 100}%`;
  });

  return (
    <p
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-0 bottom-0 left-0 hidden w-px sm:block",
        className,
      )}
    >
      <span className="bg-border/35 absolute inset-0 w-px" />
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
