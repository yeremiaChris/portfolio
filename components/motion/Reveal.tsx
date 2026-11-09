"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

import {
  motionRevealOffset,
  motionRevealTransition,
  motionViewport,
} from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      data-reveal=""
      className={cn(className)}
      initial={{ opacity: 0, y: motionRevealOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionViewport}
      transition={{ ...motionRevealTransition, delay }}
    >
      {children}
    </m.div>
  );
}
