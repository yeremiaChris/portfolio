"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

import {
  motionRevealOffset,
  motionRevealTransition,
} from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

import { useScrollRevealActive } from "@/components/motion/useScrollRevealActive";

type RevealWhen = "mount" | "inView";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  when?: RevealWhen;
};

export function Reveal({
  children,
  className,
  delay = 0,
  when = "inView",
}: RevealProps) {
  const { ref, active } = useScrollRevealActive({ when });
  const motion = { opacity: 0, y: motionRevealOffset };
  const target = { opacity: 1, y: 0 };
  const transition = { ...motionRevealTransition, delay };

  return (
    <m.div
      ref={ref}
      data-reveal=""
      className={cn(className)}
      initial={motion}
      animate={active ? target : motion}
      transition={transition}
    >
      {children}
    </m.div>
  );
}
