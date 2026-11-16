"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { usePointerFine } from "@/components/projects/usePointerFine";
import {
  projectsFeaturedSpring,
  projectsStaggerTransition,
} from "@/lib/projects-motion";
import { cn } from "@/lib/utils";

const servicesInViewViewport = { once: true, amount: 0.35 } as const;

const servicesCopyContainer = {
  rest: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const servicesCopyItem = {
  rest: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...projectsStaggerTransition,
      from: { opacity: 1, y: 14 },
    },
  },
};

export const servicesHeroMountContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

export const servicesHeroMountItem = {
  hidden: { opacity: 1, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: projectsStaggerTransition,
  },
};

function useServicesClipPath(
  targetRef: RefObject<HTMLElement | null>,
  revealFromStart: boolean,
  reducedMotion: boolean,
): MotionValue<string> | null {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: revealFromStart
      ? ["start 0.98", "start 0.62"]
      : ["start 0.92", "start 0.38"],
  });
  const clipProgress = useSpring(scrollYProgress, projectsFeaturedSpring);

  return useTransform(clipProgress, (value) => {
    if (reducedMotion) {
      return "inset(0% 0% 0% 0%)";
    }
    const open = Math.min(1, Math.max(0, value));
    return `inset(0% ${(1 - open) * 100}% 0% 0%)`;
  });
}

type ServicesScrollClipProps = {
  children: ReactNode;
  className?: string;
  revealFromStart?: boolean;
  contentClassName?: string;
};

export function ServicesScrollClip({
  children,
  className,
  revealFromStart = false,
  contentClassName,
}: ServicesScrollClipProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const clipPath = useServicesClipPath(
    frameRef,
    revealFromStart,
    Boolean(reducedMotion),
  );

  if (reducedMotion) {
    return (
      <div ref={frameRef} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={frameRef}
      className={cn("relative min-w-0 overflow-x-clip", className)}
    >
      <m.div
        className={cn("min-h-0", contentClassName)}
        style={clipPath ? { clipPath } : undefined}
        initial={false}
      >
        {children}
      </m.div>
    </div>
  );
}

type ServicesCopyStaggerProps = {
  children: ReactNode;
  className?: string;
};

export function ServicesCopyStagger({
  children,
  className,
}: ServicesCopyStaggerProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={false}
      variants={servicesCopyContainer}
      animate="rest"
      whileInView="visible"
      viewport={servicesInViewViewport}
    >
      {children}
    </m.div>
  );
}

export function ServicesOfferingEdge({ visible }: { visible: boolean }) {
  const reducedMotion = useReducedMotion();
  const pointerFine = usePointerFine();

  if (!visible || reducedMotion || !pointerFine) {
    return null;
  }

  return (
    <m.span
      layoutId="services-offering-edge"
      aria-hidden
      className="bg-brand-accent pointer-events-none absolute top-3 bottom-3 left-0 z-10 w-[3px] rounded-full shadow-[0_0_14px_rgb(76_215_246_/_0.75)]"
      transition={projectsFeaturedSpring}
    />
  );
}

export function ServicesStepPill({ visible }: { visible: boolean }) {
  const reducedMotion = useReducedMotion();
  const pointerFine = usePointerFine();

  if (!visible || reducedMotion || !pointerFine) {
    return null;
  }

  return (
    <m.span
      layoutId="services-process-step-pill"
      aria-hidden
      className="bg-brand-accent/12 pointer-events-none absolute top-0 left-0 z-0 h-8 min-w-[2.25rem] rounded-full"
      transition={projectsFeaturedSpring}
    />
  );
}

export function useServicesMotionHover() {
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();

  return pointerFine && !reducedMotion;
}
