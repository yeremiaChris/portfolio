"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

import {
  motionRevealOffset,
  motionRevealTransition,
  motionViewport,
} from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

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
  const motion = { opacity: 0, y: motionRevealOffset };
  const target = { opacity: 1, y: 0 };
  const transition = { ...motionRevealTransition, delay };

  return (
    <m.div
      data-reveal=""
      className={cn(className)}
      initial={motion}
      {...(when === "mount"
        ? { animate: target }
        : { whileInView: target, viewport: motionViewport })}
      transition={transition}
    >
      {children}
    </m.div>
  );
}
