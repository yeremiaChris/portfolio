"use client";

import { createContext, useRef, type ReactNode } from "react";
import { useScroll, type MotionValue } from "motion/react";

import { cn } from "@/lib/utils";

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(className)}
    >
      <HeroSectionScrollProgressContext.Provider value={scrollYProgress}>
        {children}
        {footer}
      </HeroSectionScrollProgressContext.Provider>
    </section>
  );
}
