"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import { m } from "motion/react";

import {
  motionPresetRevealOffset,
  motionPresetRevealTransition,
  motionStaggerChildDelay,
  staggerUsesPerItemInViewReveal,
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
  const perItemReveal = staggerUsesPerItemInViewReveal(preset, when);

  const items = Children.map(children, (child, index) => {
    if (!isValidElement(child) || child.type !== StaggerItem) {
      return child;
    }
    const element = child as ReactElement<StaggerItemProps>;
    return cloneElement(element, {
      staggerIndex: index,
      preset,
      when,
      perItemReveal,
    });
  });

  if (perItemReveal) {
    return (
      <div data-stagger="" className={cn(className)}>
        {items}
      </div>
    );
  }

  return (
    <StaggerParentGated className={className} when={when} preset={preset}>
      {items}
    </StaggerParentGated>
  );
}

function StaggerParentGated({
  children,
  className,
  when,
  preset,
}: {
  children: ReactNode;
  className?: string;
  when: StaggerWhen;
  preset: MotionPreset;
}) {
  const { ref, active } = useScrollRevealActive({ when, preset });

  return (
    <m.div
      ref={ref}
      data-stagger=""
      className={cn(className)}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={staggerParentVariants}
    >
      {children}
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
  perItemReveal?: boolean;
};

export function StaggerItem({
  children,
  className,
  staggerIndex = 0,
  preset = "calm",
  when = "inView",
  perItemReveal = false,
}: StaggerItemProps) {
  const delay = motionStaggerChildDelay(staggerIndex, preset);
  const offset = motionPresetRevealOffset(preset, when);

  const itemVariants = useMemo(
    () => ({
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
    }),
    [delay, offset, preset, when],
  );

  if (perItemReveal) {
    return (
      <StaggerItemInView
        className={className}
        when={when}
        preset={preset}
        itemVariants={itemVariants}
      >
        {children}
      </StaggerItemInView>
    );
  }

  return (
    <m.div className={cn(className)} variants={itemVariants}>
      {children}
    </m.div>
  );
}

function StaggerItemInView({
  children,
  className,
  when,
  preset,
  itemVariants,
}: {
  children: ReactNode;
  className?: string;
  when: StaggerWhen;
  preset: MotionPreset;
  itemVariants: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: ReturnType<typeof motionPresetRevealTransition> & {
        delay: number;
      };
    };
  };
}) {
  const { ref, active } = useScrollRevealActive({ when, preset });

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial={itemVariants.hidden}
      animate={active ? itemVariants.visible : itemVariants.hidden}
    >
      {children}
    </m.div>
  );
}
