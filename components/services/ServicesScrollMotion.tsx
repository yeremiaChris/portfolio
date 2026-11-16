"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
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

const servicesScrollOffset: ["start end", "center center"] = [
  "start end",
  "center center",
];

const ServicesScrollProgressContext = createContext<MotionValue<number> | null>(
  null,
);

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

function useServicesScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: servicesScrollOffset,
  });
  return useSpring(scrollYProgress, projectsFeaturedSpring);
}

export function useServicesStepHighlight(
  progress: MotionValue<number>,
  index: number,
  total: number,
) {
  const segment = 1 / total;
  const start = Math.max(0, index * segment - segment * 0.12);
  const end = Math.min(1, (index + 1) * segment + segment * 0.08);

  return useTransform(progress, (value) => {
    const v = Math.min(1, Math.max(0, value));
    if (v <= start) {
      return 0;
    }
    if (v >= end) {
      return 1;
    }
    return (v - start) / (end - start);
  });
}

type ServicesScrollRevealProps = {
  children: ReactNode;
  className?: string;
  parallaxY?: number;
  shareProgress?: boolean;
};

export function ServicesScrollReveal({
  children,
  className,
  parallaxY = 1,
  shareProgress = false,
}: ServicesScrollRevealProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const progress = useServicesScrollProgress(targetRef);
  const y = useTransform(progress, [0, 1], [40 * parallaxY, 0]);
  const scale = useTransform(progress, [0, 1], [0.96, 1]);
  const opacity = useTransform(progress, [0, 1], [0.4, 1]);

  if (reducedMotion) {
    return (
      <div ref={targetRef} className={cn(className)}>
        {children}
      </div>
    );
  }

  const body = (
    <div ref={targetRef} className={cn("min-w-0", className)}>
      <m.div style={{ y, scale, opacity }} initial={false}>
        {children}
      </m.div>
    </div>
  );

  if (!shareProgress) {
    return body;
  }

  return (
    <ServicesScrollProgressContext.Provider value={progress}>
      {body}
    </ServicesScrollProgressContext.Provider>
  );
}

export function useServicesScrollSectionProgress() {
  return useContext(ServicesScrollProgressContext);
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
