"use client";

import { useEffect, useMemo } from "react";
import { m, useReducedMotion } from "motion/react";

import {
  motionDuration,
  motionRevealOffset,
  motionRevealTransition,
  motionStaggerGap,
} from "@/lib/motion-tokens";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeroNameRevealProps = {
  className?: string;
  onSettled?: () => void;
};

const letters = [...site.fullName];

export function heroNameSettleDelayMs(): number {
  if (letters.length === 0) {
    return 0;
  }
  const lastIndex = letters.length - 1;
  return Math.ceil(
    (lastIndex * motionStaggerGap + motionDuration.reveal) * 1000,
  );
}

export function HeroNameReveal({ className, onSettled }: HeroNameRevealProps) {
  const reducedMotion = useReducedMotion();

  const parentVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: motionStaggerGap,
        },
      },
    }),
    [],
  );

  const letterVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: motionRevealOffset,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: motionRevealTransition,
      },
    }),
    [],
  );

  useEffect(() => {
    if (reducedMotion) {
      onSettled?.();
      return;
    }

    const delayMs = heroNameSettleDelayMs();
    const timer = window.setTimeout(() => {
      onSettled?.();
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [onSettled, reducedMotion]);

  if (reducedMotion) {
    return (
      <h1
        id="hero-heading"
        className={cn(
          "font-heading text-left text-[2.65rem] font-bold text-balance sm:text-6xl xl:text-7xl",
          "from-brand-accent to-brand-accent/70 bg-linear-to-br bg-clip-text text-transparent",
          "max-w-[16ch] sm:max-w-none",
          className,
        )}
      >
        {site.fullName}
      </h1>
    );
  }

  return (
    <h1
      id="hero-heading"
      className={cn(
        "font-heading text-left text-[2.65rem] font-bold text-balance sm:text-6xl xl:text-7xl",
        "from-brand-accent to-brand-accent/70 bg-linear-to-br bg-clip-text text-transparent",
        "max-w-[16ch] sm:max-w-none",
        className,
      )}
    >
      <span className="sr-only">{site.fullName}</span>
      <m.span
        aria-hidden
        className="inline-flex flex-wrap"
        initial="hidden"
        animate="visible"
        variants={parentVariants}
      >
        {letters.map((letter, index) => (
          <m.span
            key={`${letter}-${index}`}
            aria-hidden
            className="inline-block"
            variants={letterVariants}
          >
            {letter === " " ? "\u00A0" : letter}
          </m.span>
        ))}
      </m.span>
    </h1>
  );
}
