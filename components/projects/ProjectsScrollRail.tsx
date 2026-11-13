"use client";

import type { MotionValue } from "motion/react";

import { ScrollProgressRail } from "@/components/motion/ScrollProgressRail";
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
  return (
    <ScrollProgressRail
      progress={progress}
      activeIndex={activeIndex}
      segmentCount={projectCount}
      className={cn(className)}
    />
  );
}
