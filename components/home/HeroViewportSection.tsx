"use client";

import { createContext, useRef, type ReactNode } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { motionHeroScrollFade } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

import { useHydrated } from "@/components/motion/useHydrated";

type HeroViewportSectionProps = {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

export const HeroSectionScrollProgressContext =
  createContext<MotionValue<number> | null>(null);

export function HeroViewportSection({
  children,
  footer,
  className,
  id,
  ariaLabelledby,
}: HeroViewportSectionProps) {
  const reducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, motionHeroScrollFade.opacityEnd],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, motionHeroScrollFade.yEnd],
  );

  const useScrollFade = hydrated && !reducedMotion;

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(className)}
    >
      <HeroSectionScrollProgressContext.Provider value={scrollYProgress}>
        {useScrollFade ? (
          <m.div
            style={{ opacity, y }}
            className="flex min-h-0 w-full flex-1 flex-col"
          >
            {children}
          </m.div>
        ) : (
          children
        )}
        {footer}
      </HeroSectionScrollProgressContext.Provider>
    </section>
  );
}
