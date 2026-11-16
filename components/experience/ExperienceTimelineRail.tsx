"use client";

import {
  m,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

type ExperienceTimelineRailProps = {
  fillProgress: MotionValue<number>;
  dotFocus: MotionValue<number>[];
  className?: string;
};

function ExperienceRailDot({ focus }: { focus: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const dotOpacity = useTransform(focus, [0, 1], [0.35, 1]);
  const dotScale = useTransform(focus, [0, 1], [1, 1.3]);
  const dotShadow = useTransform(
    focus,
    [0, 1],
    ["0 0 8px rgba(76, 215, 246, 0.35)", "0 0 14px rgba(76, 215, 246, 0.85)"],
  );

  if (reducedMotion) {
    return (
      <span
        className="bg-brand-accent relative z-10 block size-2 rounded-full shadow-[0_0_10px_rgb(76_215_246_/_0.55)]"
        aria-hidden
      />
    );
  }

  return (
    <m.span
      className="bg-brand-accent relative z-10 block size-2 rounded-full"
      style={{ opacity: dotOpacity, scale: dotScale, boxShadow: dotShadow }}
      aria-hidden
    />
  );
}

export function ExperienceTimelineRail({
  fillProgress,
  dotFocus,
  className,
}: ExperienceTimelineRailProps) {
  const reducedMotion = useReducedMotion();
  const total = dotFocus.length;

  return (
    <div
      className={cn(
        "pointer-events-none relative h-full w-px min-w-px",
        className,
      )}
      aria-hidden
    >
      <span className="bg-border/45 absolute inset-y-0 left-1/2 w-px -translate-x-1/2" />
      {reducedMotion ? (
        <span className="bg-brand-accent absolute inset-y-0 left-1/2 h-full w-px origin-top -translate-x-1/2 scale-y-100 shadow-[0_0_12px_rgb(76_215_246_/_0.45)]" />
      ) : (
        <m.span
          className="bg-brand-accent absolute inset-y-0 left-1/2 h-full w-px origin-top -translate-x-1/2 shadow-[0_0_12px_rgb(76_215_246_/_0.45)]"
          style={{ scaleY: fillProgress }}
        />
      )}
      {dotFocus.map((focus, index) => (
        <div
          key={index}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${((index + 0.5) / total) * 100}%` }}
        >
          <ExperienceRailDot focus={focus} />
        </div>
      ))}
    </div>
  );
}
