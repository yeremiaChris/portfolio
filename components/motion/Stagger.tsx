"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { m } from "motion/react";

import {
  motionPresetRevealOffset,
  motionPresetRevealTransition,
  motionStaggerChildDelay,
  type MotionPreset,
} from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

import { useScrollRevealActive } from "@/components/motion/useScrollRevealActive";

type StaggerWhen = "mount" | "inView";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  when?: StaggerWhen;
  preset?: MotionPreset;
};

export function Stagger({
  children,
  className,
  when = "inView",
  preset = "calm",
}: StaggerProps) {
  const { ref, active } = useScrollRevealActive({ when });

  const items = Children.map(children, (child, index) => {
    if (!isValidElement(child) || child.type !== StaggerItem) {
      return child;
    }
    const element = child as ReactElement<StaggerItemProps>;
    return cloneElement(element, { staggerIndex: index, preset, when });
  });

  return (
    <m.div
      ref={ref}
      data-stagger=""
      className={cn(className)}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={staggerParentVariants}
    >
      {items}
    </m.div>
  );
}

const staggerParentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  staggerIndex?: number;
  preset?: MotionPreset;
  when?: StaggerWhen;
};

export function StaggerItem({
  children,
  className,
  staggerIndex = 0,
  preset = "calm",
  when = "inView",
}: StaggerItemProps) {
  const delay = motionStaggerChildDelay(staggerIndex, preset);
  const offset = motionPresetRevealOffset(preset, when);

  return (
    <m.div
      className={cn(className)}
      variants={{
        hidden: {
          opacity: 0,
          y: offset,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            ...motionPresetRevealTransition(preset, when),
            delay,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}
