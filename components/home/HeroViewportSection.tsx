"use client";

import { useRef, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

import { motionHeroScrollFade } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

import { useHydrated } from "@/components/motion/useHydrated";

type HeroViewportSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

export function HeroViewportSection({
  children,
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
    </section>
  );
}
