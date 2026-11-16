"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import {
  AnimatePresence,
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

const servicesStandardScrollOffset: ["start end", "start 0.45"] = [
  "start end",
  "start 0.45",
];

const servicesBottomScrollOffset: ["start end", "end end"] = [
  "start end",
  "end end",
];

const servicesOfferingEdgeLayoutTransition = {
  type: "tween" as const,
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

const servicesOfferingEdgeOpacityTransition = {
  duration: 0.3,
  ease: [0, 0, 0.2, 1] as const,
};

type ServicesScrollRange = "standard" | "bottom";

const ServicesScrollProgressContext = createContext<MotionValue<number> | null>(
  null,
);

function useServicesScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
  range: ServicesScrollRange,
): MotionValue<number> {
  const offset =
    range === "bottom"
      ? servicesBottomScrollOffset
      : servicesStandardScrollOffset;
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  });
  return useSpring(scrollYProgress, projectsFeaturedSpring);
}

export function useServicesProcessStepMotion(
  progress: MotionValue<number>,
  index: number,
  total: number,
) {
  const start = 0.06 + (index / total) * 0.52;
  const end = Math.min(1, start + 0.24);

  const step = useTransform(progress, (value) => {
    const v = Math.min(1, Math.max(0, value));
    if (v <= start) {
      return 0;
    }
    if (v >= end) {
      return 1;
    }
    return (v - start) / (end - start);
  });

  const y = useTransform(step, [0, 1], [56, 0]);
  const opacity = useTransform(step, [0, 1], [0.3, 1]);

  return { y, opacity };
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

  const x = useTransform(local, [0, 1], [-18, 0]);
  const opacity = useTransform(local, [0, 1], [0.2, 1]);

  return { x, opacity };
}

type ServicesScrollRevealProps = {
  children: ReactNode;
  className?: string;
  parallaxY?: number;
  shareProgress?: boolean;
  scrollRange?: ServicesScrollRange;
};

export function ServicesScrollReveal({
  children,
  className,
  parallaxY = 1,
  shareProgress = false,
  scrollRange = "standard",
}: ServicesScrollRevealProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const progress = useServicesScrollProgress(targetRef, scrollRange);
  const y = useTransform(progress, [0, 1], [56 * parallaxY, 0]);
  const scale = useTransform(progress, [0, 1], [0.94, 1]);
  const opacity = useTransform(progress, [0, 1], [0.3, 1]);

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

  if (reducedMotion || !pointerFine) {
    return null;
  }

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <m.span
          layoutId="services-offering-edge"
          aria-hidden
          className="bg-brand-accent pointer-events-none absolute top-3 bottom-3 left-0 z-10 w-[3px] rounded-full shadow-[0_0_14px_rgb(76_215_246_/_0.75)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            layout: servicesOfferingEdgeLayoutTransition,
            opacity: servicesOfferingEdgeOpacityTransition,
          }}
        />
      ) : null}
    </AnimatePresence>
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
      className="bg-brand-accent/12 pointer-events-none absolute -inset-x-1.5 -inset-y-0.5 z-0 rounded-xl"
      transition={projectsFeaturedSpring}
    />
  );
}

type ServicesProcessRailProps = {
  progress: MotionValue<number>;
  layout: "horizontal" | "vertical";
  stepCount: number;
  className?: string;
};

function ProcessRailDot({
  index,
  total,
  progress,
  layout,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  layout: "horizontal" | "vertical";
}) {
  const reducedMotion = useReducedMotion();
  const highlight = useServicesStepHighlight(progress, index, total);
  const dotOpacity = useTransform(highlight, [0, 1], [0.35, 1]);
  const dotScale = useTransform(highlight, [0, 1], [0.85, 1]);

  const positionStyle =
    layout === "horizontal"
      ? { left: `${((index + 0.5) / total) * 100}%` }
      : { top: `${((index + 0.5) / total) * 100}%` };

  if (reducedMotion) {
    return (
      <span
        className="bg-brand-accent absolute z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgb(76_215_246_/_0.55)]"
        style={positionStyle}
        aria-hidden
      />
    );
  }

  return (
    <m.span
      className="bg-brand-accent absolute z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgb(76_215_246_/_0.55)]"
      style={{ ...positionStyle, opacity: dotOpacity, scale: dotScale }}
      aria-hidden
    />
  );
}

export function ServicesProcessRail({
  progress,
  layout,
  stepCount,
  className,
}: ServicesProcessRailProps) {
  const reducedMotion = useReducedMotion();

  const isHorizontal = layout === "horizontal";

  return (
    <div
      className={cn(
        "pointer-events-none relative",
        isHorizontal ? "h-px min-h-px w-full" : "h-full w-px min-w-px",
        className,
      )}
      aria-hidden
    >
      <span
        className={cn(
          "bg-border/45 absolute",
          isHorizontal
            ? "inset-x-0 top-1/2 h-px -translate-y-1/2"
            : "inset-y-0 left-1/2 w-px -translate-x-1/2",
        )}
      />
      {reducedMotion ? (
        <span
          className={cn(
            "bg-brand-accent absolute shadow-[0_0_12px_rgb(76_215_246_/_0.45)]",
            isHorizontal
              ? "inset-x-0 top-1/2 h-px w-full origin-left -translate-y-1/2 scale-x-100"
              : "inset-y-0 left-1/2 h-full w-px origin-top -translate-x-1/2 scale-y-100",
          )}
        />
      ) : (
        <m.span
          className={cn(
            "bg-brand-accent absolute shadow-[0_0_12px_rgb(76_215_246_/_0.45)]",
            isHorizontal
              ? "inset-x-0 top-1/2 h-px w-full origin-left -translate-y-1/2"
              : "inset-y-0 left-1/2 h-full w-px origin-top -translate-x-1/2",
          )}
          style={isHorizontal ? { scaleX: progress } : { scaleY: progress }}
        />
      )}
      {Array.from({ length: stepCount }, (_, index) => (
        <ProcessRailDot
          key={index}
          index={index}
          total={stepCount}
          progress={progress}
          layout={layout}
        />
      ))}
    </div>
  );
}
