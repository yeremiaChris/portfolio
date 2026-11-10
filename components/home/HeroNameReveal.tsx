"use client";

import { useCallback, useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";

import {
  motionDuration,
  motionHeroNameRevealTransition,
  motionPresetConfig,
} from "@/lib/motion-tokens";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeroNameRevealProps = {
  className?: string;
  onSettled?: () => void;
};

const HERO_LAST_NAME = "Saragi";

const nameBeforeLast = site.fullName.endsWith(HERO_LAST_NAME)
  ? site.fullName.slice(0, site.fullName.length - HERO_LAST_NAME.length)
  : `${site.fullName} `;

export function heroNameSettleDelayMs(): number {
  return Math.ceil(motionDuration.heroName * 1000);
}

function HeroNameHeading({
  className,
  saragiSheen,
}: {
  className?: string;
  saragiSheen?: boolean;
}) {
  return (
    <h1
      id="hero-heading"
      className={cn(
        "font-heading hero-name-display text-left font-bold tracking-tight text-balance",
        "max-w-[18ch] sm:max-w-none",
        className,
      )}
    >
      <span className="sr-only">{site.fullName}</span>
      <span aria-hidden className="inline">
        <span className="from-brand-accent to-brand-accent/70 bg-linear-to-br bg-clip-text text-transparent">
          {nameBeforeLast}
        </span>
        <span
          className={cn(
            "hero-name-saragi",
            saragiSheen && "hero-name-saragi--sheen",
          )}
        >
          {HERO_LAST_NAME}
        </span>
      </span>
    </h1>
  );
}

export function HeroNameReveal({ className, onSettled }: HeroNameRevealProps) {
  const reducedMotion = useReducedMotion();
  const [sheen, setSheen] = useState(false);

  const handleRevealComplete = useCallback(() => {
    setSheen(true);
  }, []);

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
    return <HeroNameHeading className={className} />;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <m.div
        aria-hidden
        initial={{ opacity: 0, y: motionPresetConfig.expressive.revealOffset }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionHeroNameRevealTransition}
        onAnimationComplete={handleRevealComplete}
      >
        <HeroNameHeading saragiSheen={sheen} />
      </m.div>
    </div>
  );
}
