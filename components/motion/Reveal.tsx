"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

import {
  motionPresetRevealOffset,
  motionPresetRevealTransition,
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
  const { ref, active, hydrated } = useScrollRevealActive({ when });
  const offset = motionPresetRevealOffset(preset, when);
  const hidden = { opacity: 0, y: offset };
  const visible = { opacity: 1, y: 0 };
  const transition = motionPresetRevealTransition(preset, when, delay);

  return (
    <m.div
      ref={ref}
      data-reveal=""
      className={cn(className)}
      initial={false}
      animate={!hydrated ? false : active ? visible : hidden}
      transition={transition}
    >
      {children}
    </m.div>
  );
}
