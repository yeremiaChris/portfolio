"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import { m, useReducedMotion } from "motion/react";

import {
  motionPresetConfig,
  motionPresetRevealOffset,
  motionPresetRevealOpacity,
  motionPresetRevealTransition,
  motionPresetWhileInViewOptions,
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
  const reducedMotion = useReducedMotion();
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
      reducedMotion: reducedMotion ?? false,
    });
  });

  if (reducedMotion) {
    return (
      <div data-stagger="" className={cn(className)}>
        {items}
      </div>
    );
  }

  if (perItemReveal) {
    return (
      <div data-stagger="" className={cn(className)}>
        {items}
      </div>
    );
  }

  return (
    <StaggerParentGated
      className={className}
      when={when}
      preset={preset}
      items={items}
    />
  );
}

function StaggerOnMount({
  items,
  className,
  preset,
  parentVariants,
}: {
  items: ReactNode;
  className?: string;
  preset: MotionPreset;
  parentVariants: {
    hidden: Record<string, never>;
    visible: {
      transition: {
        staggerChildren: number;
        delayChildren: number;
      };
    };
  };
}) {
  const { ref, active } = useScrollRevealActive({
    when: "mount",
    preset,
  });

  return (
    <m.div
      ref={ref}
      data-stagger=""
      className={cn(className)}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={parentVariants}
    >
      {items}
    </m.div>
  );
}

function StaggerParentGated({
  items,
  className,
  when,
  preset,
}: {
  items: ReactNode;
  className?: string;
  when: StaggerWhen;
  preset: MotionPreset;
}) {
  const viewport = motionPresetWhileInViewOptions(preset);
  const parentVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: motionPresetConfig[preset].staggerGap,
          delayChildren: 0,
        },
      },
    }),
    [preset],
  );

  if (when === "inView") {
    return (
      <m.div
        data-stagger=""
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={parentVariants}
      >
        {items}
      </m.div>
    );
  }

  return (
    <StaggerOnMount
      className={className}
      preset={preset}
      parentVariants={parentVariants}
      items={items}
    />
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  staggerIndex?: number;
  preset?: MotionPreset;
  when?: StaggerWhen;
  perItemReveal?: boolean;
  reducedMotion?: boolean;
};

export function StaggerItem({
  children,
  className,
  staggerIndex = 0,
  preset = "calm",
  when = "inView",
  perItemReveal = false,
  reducedMotion = false,
}: StaggerItemProps) {
  const delay = motionStaggerChildDelay(staggerIndex, preset);
  const offset = motionPresetRevealOffset(preset, when);
  const viewport = motionPresetWhileInViewOptions(preset);

  const itemVariants = useMemo(
    () => ({
      hidden: {
        y: offset,
        opacity: motionPresetRevealOpacity(preset, when),
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          ...motionPresetRevealTransition(preset, when),
          delay,
        },
      },
    }),
    [delay, offset, preset, when],
  );

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  if (perItemReveal) {
    return (
      <m.div
        data-stagger-item=""
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={itemVariants}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      data-stagger-item=""
      className={cn(className)}
      variants={itemVariants}
    >
      {children}
    </m.div>
  );
}
