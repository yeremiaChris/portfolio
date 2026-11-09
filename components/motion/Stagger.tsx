"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

import {
  motionRevealOffset,
  motionRevealTransition,
  motionStaggerGap,
  motionViewport,
} from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const staggerParentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionStaggerGap,
      delayChildren: 0.02,
    },
  },
};

const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: motionRevealOffset,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionRevealTransition,
  },
};

type StaggerWhen = "mount" | "inView";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  when?: StaggerWhen;
};

export function Stagger({
  children,
  className,
  when = "inView",
}: StaggerProps) {
  return (
    <m.div
      data-stagger=""
      className={cn(className)}
      initial="hidden"
      variants={staggerParentVariants}
      {...(when === "mount"
        ? { animate: "visible" as const }
        : { whileInView: "visible" as const, viewport: motionViewport })}
    >
      {children}
    </m.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <m.div className={cn(className)} variants={staggerItemVariants}>
      {children}
    </m.div>
  );
}
