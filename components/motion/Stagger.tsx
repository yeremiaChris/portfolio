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
  motionRevealOffset,
  motionRevealTransition,
  motionStaggerChildDelay,
} from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

import { useScrollRevealActive } from "@/components/motion/useScrollRevealActive";

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
  const { ref, active } = useScrollRevealActive({ when });

  const items = Children.map(children, (child, index) => {
    if (!isValidElement(child) || child.type !== StaggerItem) {
      return child;
    }
    const element = child as ReactElement<StaggerItemProps>;
    return cloneElement(element, { staggerIndex: index });
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
};

export function StaggerItem({
  children,
  className,
  staggerIndex = 0,
}: StaggerItemProps) {
  const delay = motionStaggerChildDelay(staggerIndex);

  return (
    <m.div
      className={cn(className)}
      variants={{
        hidden: {
          opacity: 0,
          y: motionRevealOffset,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ...motionRevealTransition, delay },
        },
      }}
    >
      {children}
    </m.div>
  );
}
