"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";

import { motionEase } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const HIGHLIGHT_DRAW_S = 0.6;

type HeroHighlightPhraseProps = {
  children: ReactNode;
  active: boolean;
  delay?: number;
  className?: string;
};

export function HeroHighlightPhrase({
  children,
  active,
  delay = 0,
  className,
}: HeroHighlightPhraseProps) {
  const reducedMotion = useReducedMotion();
  const drawn = reducedMotion || active;

  return (
    <m.span
      className={cn("hero-highlight-phrase", className)}
      initial={false}
      animate={{
        backgroundSize: drawn ? "100% 100%" : "0% 100%",
      }}
      transition={{
        duration: reducedMotion ? 0 : HIGHLIGHT_DRAW_S,
        ease: motionEase,
        delay: reducedMotion ? 0 : delay,
      }}
    >
      {children}
    </m.span>
  );
}
