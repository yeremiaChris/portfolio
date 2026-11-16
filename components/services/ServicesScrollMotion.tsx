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
import { projectsFeaturedSpring } from "@/lib/projects-motion";
import { cn } from "@/lib/utils";

const servicesScrollOffset: ["start 0.95", "start 0.28"] = [
  "start 0.95",
  "start 0.28",
];

const ServicesScrollProgressContext = createContext<MotionValue<number> | null>(
  null,
);

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
  const start = Math.max(0, index * segment - segment * 0.08);
  const end = Math.min(1, (index + 1) * segment + segment * 0.04);

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

export function useServicesBulletMotion(
  progress: MotionValue<number>,
  bulletIndex: number,
) {
  const start = 0.38 + bulletIndex * 0.11;
  const end = start + 0.13;

  const local = useTransform(progress, (value) => {
    const v = Math.min(1, Math.max(0, value));
    if (v <= start) {
      return 0;
    }
    if (v >= end) {
      return 1;
    }
    return (v - start) / (end - start);
  });

  const x = useTransform(local, [0, 1], [-24, 0]);
  const opacity = useTransform(local, [0, 1], [0.12, 1]);

  return { x, opacity };
}

type ServicesScrollRevealProps = {
  children: ReactNode;
  className?: string;
  parallaxY?: number;
  shareProgress?: boolean;
  fade?: boolean;
};

export function ServicesScrollReveal({
  children,
  className,
  parallaxY = 1,
  shareProgress = false,
  fade = true,
}: ServicesScrollRevealProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const progress = useServicesScrollProgress(targetRef);
  const y = useTransform(progress, [0, 1], [80 * parallaxY, 0]);
  const scale = useTransform(progress, [0, 1], [0.92, 1]);
  const opacity = useTransform(progress, [0, 1], fade ? [0.2, 1] : [1, 1]);

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

export function useServicesMotionHover() {
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();

  return pointerFine && !reducedMotion;
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

type ServicesProcessTrackProps = {
  progress: MotionValue<number>;
  layout: "horizontal" | "vertical";
  className?: string;
};

export function ServicesProcessTrack({
  progress,
  layout,
  className,
}: ServicesProcessTrackProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return null;
  }

  if (layout === "horizontal") {
    return (
      <div
        className={cn("pointer-events-none relative h-px w-full", className)}
        aria-hidden
      >
        <span className="bg-border/45 absolute inset-0 block h-px" />
        <m.span
          className="bg-brand-accent absolute inset-y-0 left-0 h-px w-full origin-left shadow-[0_0_12px_rgb(76_215_246_/_0.45)]"
          style={{ scaleX: progress }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("pointer-events-none relative w-px", className)}
      aria-hidden
    >
      <span className="bg-border/45 absolute inset-0 block w-px" />
      <m.span
        className="bg-brand-accent absolute inset-x-0 top-0 h-full w-px origin-top shadow-[0_0_12px_rgb(76_215_246_/_0.45)]"
        style={{ scaleY: progress }}
      />
    </div>
  );
}
