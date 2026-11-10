"use client";

import { ChevronDownIcon } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import { motionHeroScrollCue } from "@/lib/motion-tokens";
import { scrollDocumentToElement } from "@/lib/programmatic-scroll";
import { cn } from "@/lib/utils";

type HeroScrollCueProps = {
  targetId: string;
  className?: string;
};

export function HeroScrollCue({ targetId, className }: HeroScrollCueProps) {
  const reducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      aria-label="Scroll to production work"
      className={cn(
        "text-muted-foreground hover:text-brand-accent absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center rounded-full p-2 transition-colors lg:flex",
        className,
      )}
      onClick={() => {
        const target = document.getElementById(targetId);
        if (target) {
          scrollDocumentToElement(target, -8);
        }
      }}
    >
      <m.span
        aria-hidden
        animate={
          reducedMotion ? undefined : { y: [0, motionHeroScrollCue.offset, 0] }
        }
        transition={{
          duration: motionHeroScrollCue.duration,
          repeat: reducedMotion ? 0 : Infinity,
          ease: motionHeroScrollCue.ease,
        }}
        className="flex flex-col items-center gap-1"
      >
        <span className="bg-brand-accent/40 h-6 w-px rounded-full" />
        <ChevronDownIcon className="size-4" strokeWidth={1.75} />
      </m.span>
    </button>
  );
}
