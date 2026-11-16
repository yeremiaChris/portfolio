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
  motionPresetConfig,
  motionPresetRevealOffset,
  motionPresetRevealTransition,
  motionRevealRestingTarget,
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
  const { ref, active } = useScrollRevealActive({
    when,
    preset,
  });
  const parentVariants = useMemo(
    () => ({
      rest: {},
      visible: {
        transition: {
          staggerChildren: motionPresetConfig[preset].staggerGap,
          delayChildren: 0,
        },
      },
    }),
    [preset],
  );

  return (
    <m.div
      ref={ref}
      data-stagger=""
      className={cn(className)}
      initial={false}
      style={{ opacity: 1 }}
      variants={parentVariants}
      animate={active ? "visible" : "rest"}
    >
      {children}
    </m.div>
  );
}

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
      rest: motionRevealRestingTarget(),
      visible: {
        y: 0 as const,
        opacity: 1 as const,
        transition: {
          ...motionPresetRevealTransition(preset, when),
          delay,
          from: { y: offset, opacity: 1 as const },
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
    <m.div
      className={cn(className)}
      initial={false}
      style={{ opacity: 1 }}
      variants={itemVariants}
    >
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
    rest: { y: 0; opacity: 1 };
    visible: {
      y: 0;
      opacity: 1;
      transition: ReturnType<typeof motionPresetRevealTransition> & {
        delay: number;
        from: { y: number; opacity: 1 };
      };
    };
  };
}) {
  const { ref, active } = useScrollRevealActive({
    when,
    preset,
  });

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial={false}
      style={{ opacity: 1 }}
      variants={{
        rest: itemVariants.rest,
        visible: itemVariants.visible,
      }}
      animate={active ? "visible" : "rest"}
    >
      {children}
    </m.div>
  );
}
