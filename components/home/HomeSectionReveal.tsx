"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { useHomeMotion } from "@/components/home/useHomeMotionEnabled";
import { homeSectionReveal } from "@/lib/home-motion";
import { cn } from "@/lib/utils";

type HomeSectionRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

export function HomeSectionReveal({
  children,
  className,
  id,
  ariaLabelledby,
}: HomeSectionRevealProps) {
  const { scroll, reduced } = useHomeMotion();

  if (reduced || !scroll) {
    return (
      <section
        id={id}
        aria-labelledby={ariaLabelledby}
        className={cn(className)}
      >
        {children}
      </section>
    );
  }

  return (
    <m.section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(className)}
      initial={{ opacity: 0, y: homeSectionReveal.offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: homeSectionReveal.duration,
        ease: homeSectionReveal.ease,
      }}
    >
      {children}
    </m.section>
  );
}
