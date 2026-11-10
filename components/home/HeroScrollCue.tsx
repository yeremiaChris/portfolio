"use client";

import { useContext, useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { HeroSectionScrollProgressContext } from "@/components/home/HeroViewportSection";
import { motionHeroScrollCue } from "@/lib/motion-tokens";
import { scrollDocumentToElement } from "@/lib/programmatic-scroll";
import { cn } from "@/lib/utils";

type HeroScrollCueProps = {
  targetId: string;
  className?: string;
};

export function HeroScrollCue({ targetId, className }: HeroScrollCueProps) {
  const reducedMotion = useReducedMotion();
  const scrollYProgress = useContext(HeroSectionScrollProgressContext);
  const fallbackProgress = useMotionValue(0);
  const fadeOpacity = useTransform(
    scrollYProgress ?? fallbackProgress,
    [0, motionHeroScrollCue.scrollFadeEnd],
    [1, 0],
  );
  const [interactive, setInteractive] = useState(true);

  useEffect(() => {
    if (!scrollYProgress) {
      return;
    }
    const unsubscribe = fadeOpacity.on("change", (value) => {
      setInteractive(value > 0.08);
    });
    return unsubscribe;
  }, [fadeOpacity, scrollYProgress]);

  return (
    <m.button
      type="button"
      aria-label="Scroll to production work"
      aria-hidden={!interactive}
      tabIndex={interactive ? 0 : -1}
      style={{ opacity: fadeOpacity }}
      className={cn(
        "text-muted-foreground hover:text-brand-accent absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center rounded-full p-2 transition-colors lg:flex",
        !interactive && "pointer-events-none",
        className,
      )}
      onClick={() => {
        if (!interactive) {
          return;
        }
        const target = document.getElementById(targetId);
        if (target) {
          scrollDocumentToElement(target, -8);
        }
      }}
    >
      <span aria-hidden className="flex flex-col items-center gap-1">
        <m.span
          aria-hidden
          className="bg-brand-accent/40 block h-6 w-px origin-top rounded-full"
          initial={false}
          animate={reducedMotion ? { scaleY: 1 } : { scaleY: [0.55, 1, 0.55] }}
          transition={{
            duration: motionHeroScrollCue.duration,
            repeat: reducedMotion ? 0 : Infinity,
            ease: motionHeroScrollCue.ease,
          }}
        />
        <m.span
          aria-hidden
          animate={
            reducedMotion
              ? undefined
              : { y: [0, motionHeroScrollCue.chevronNudgePx, 0] }
          }
          transition={{
            duration: motionHeroScrollCue.duration,
            repeat: reducedMotion ? 0 : Infinity,
            ease: motionHeroScrollCue.ease,
          }}
        >
          <ChevronDownIcon className="size-4" strokeWidth={1.75} />
        </m.span>
      </span>
    </m.button>
  );
}
