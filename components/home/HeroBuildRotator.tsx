"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import {
  HERO_BUILD_PHRASES,
  HERO_BUILD_PHRASES_SR,
  HERO_BUILD_ROTATE_MS,
  HERO_BUILD_SLOT_PHRASE,
} from "@/lib/hero-build-phrases";
import { motionEase } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const wordTransition = {
  duration: 0.5,
  ease: motionEase,
};

type HeroBuildRotatorProps = {
  active: boolean;
  className?: string;
};

export function HeroBuildRotator({ active, className }: HeroBuildRotatorProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!active || reducedMotion || paused) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_BUILD_PHRASES.length);
    }, HERO_BUILD_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [active, paused, reducedMotion]);

  const phrase = HERO_BUILD_PHRASES[index];

  return (
    <p
      aria-live="off"
      className={cn(
        "font-heading mt-2 max-w-full text-left text-[15px] leading-snug font-medium tracking-tight min-[391px]:text-lg md:mt-3",
        className,
      )}
    >
      <span className="sr-only">{HERO_BUILD_PHRASES_SR}</span>
      <span
        aria-hidden
        className="inline-flex max-w-full flex-wrap items-baseline gap-x-1.5"
      >
        <span className="text-muted-foreground shrink-0">I build</span>
        <span className="relative inline-grid max-w-full align-bottom">
          <span
            className="invisible col-start-1 row-start-1 max-w-full max-[390px]:break-words min-[391px]:whitespace-nowrap"
            aria-hidden
          >
            {HERO_BUILD_SLOT_PHRASE}
          </span>
          {reducedMotion || !active ? (
            <span className="hero-name-saragi col-start-1 row-start-1 block max-w-full max-[390px]:break-words min-[391px]:whitespace-nowrap">
              {HERO_BUILD_PHRASES[0]}
            </span>
          ) : (
            <span className="relative col-start-1 row-start-1 block overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={phrase}
                  className="hero-name-saragi block max-w-full max-[390px]:break-words min-[391px]:whitespace-nowrap"
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-100%" }}
                  transition={wordTransition}
                >
                  {phrase}
                </m.span>
              </AnimatePresence>
            </span>
          )}
        </span>
      </span>
    </p>
  );
}
