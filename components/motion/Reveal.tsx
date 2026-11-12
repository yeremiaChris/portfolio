"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

import {
  motionPresetRevealOffset,
  motionPresetRevealTransition,
  motionRevealAnimateTarget,
  type MotionPreset,
} from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

import { useScrollRevealActive } from "@/components/motion/useScrollRevealActive";

type RevealWhen = "mount" | "inView";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  when?: RevealWhen;
  preset?: MotionPreset;
};

export function Reveal({
  children,
  className,
  delay = 0,
  when = "inView",
  preset = "calm",
}: RevealProps) {
  const { ref, active } = useScrollRevealActive({
    when,
    preset,
  });
  const offset = motionPresetRevealOffset(preset, when);
  const transition = motionPresetRevealTransition(preset, when, delay);

  return (
    <m.div
      ref={ref}
      data-reveal=""
      className={cn(className)}
      initial={false}
      style={{ opacity: 1 }}
      animate={motionRevealAnimateTarget(active, offset, transition)}
    >
      {children}
    </m.div>
  );
}
