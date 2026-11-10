"use client";

import { useCallback, useEffect, useState } from "react";

import { useHeroReady } from "@/components/home/HeroReady";
import { motionDuration } from "@/lib/motion-tokens";
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
        <span className="hero-name-yeremia">{nameBeforeLast}</span>
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

type HeroNameRevealBridgeProps = {
  className?: string;
};

export function HeroNameRevealBridge({ className }: HeroNameRevealBridgeProps) {
  const { markReady } = useHeroReady();
  const onSettled = useCallback(() => {
    markReady();
  }, [markReady]);

  return <HeroNameReveal className={className} onSettled={onSettled} />;
}

export function HeroNameReveal({ className, onSettled }: HeroNameRevealProps) {
  const [sheen, setSheen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      onSettled?.();
      const timer = window.setTimeout(() => setSheen(true), 0);
      return () => window.clearTimeout(timer);
    }

    const delayMs = heroNameSettleDelayMs();
    const timer = window.setTimeout(() => {
      onSettled?.();
      setSheen(true);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [onSettled, reducedMotion]);

  return (
    <div className={cn("hero-name-reveal overflow-hidden", className)}>
      <div className={cn(!reducedMotion && "hero-name-reveal-track")}>
        <HeroNameHeading saragiSheen={sheen} />
      </div>
    </div>
  );
}
