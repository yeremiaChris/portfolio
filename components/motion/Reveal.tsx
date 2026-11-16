"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { m, useReducedMotion } from "motion/react";

import {
  motionPresetRevealOffset,
  motionPresetRevealOpacity,
  motionPresetRevealTransition,
  motionPresetWhileInViewOptions,
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

type RevealMotionVariants = {
  hidden: { y: number; opacity: number };
  visible: {
    y: number;
    opacity: number;
    transition: ReturnType<typeof motionPresetRevealTransition>;
  };
};

function RevealOnMount({
  children,
  className,
  preset,
  variants,
}: {
  children: ReactNode;
  className?: string;
  preset: MotionPreset;
  variants: RevealMotionVariants;
}) {
  const { ref, active } = useScrollRevealActive({
    when: "mount",
    preset,
  });

  return (
    <m.div
      ref={ref}
      data-reveal=""
      className={cn(className)}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </m.div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  when = "inView",
  preset = "calm",
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const offset = motionPresetRevealOffset(preset, when);
  const transition = motionPresetRevealTransition(preset, when, delay);
  const viewport = motionPresetWhileInViewOptions(preset);
  const variants = useMemo(
    () => ({
      hidden: {
        y: offset,
        opacity: motionPresetRevealOpacity(preset, when),
      },
      visible: {
        y: 0,
        opacity: 1,
        transition,
      },
    }),
    [offset, preset, transition, when],
  );

  if (reducedMotion) {
    return (
      <div data-reveal="" className={cn(className)}>
        {children}
      </div>
    );
  }

  if (when === "inView") {
    return (
      <m.div
        data-reveal=""
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={variants}
      >
        {children}
      </m.div>
    );
  }

  return (
    <RevealOnMount className={className} preset={preset} variants={variants}>
      {children}
    </RevealOnMount>
  );
}
