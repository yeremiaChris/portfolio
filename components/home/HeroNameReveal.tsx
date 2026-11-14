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
        "font-heading hero-name-display text-left font-bold",
        "max-w-[18ch] sm:max-w-none",
        className,
      )}
    >
      <span className="sr-only">{site.fullName}</span>
      <span aria-hidden className="inline md:whitespace-nowrap">
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

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applySettled = () => {
      onSettled?.();
      window.setTimeout(() => setSheen(true), 0);
    };

    if (media.matches) {
      applySettled();
      return;
    }

    const delayMs = heroNameSettleDelayMs();
    const delayTimer = window.setTimeout(applySettled, delayMs);

    const onMediaChange = () => {
      if (!media.matches) {
        return;
      }
      window.clearTimeout(delayTimer);
      applySettled();
    };

    media.addEventListener("change", onMediaChange);

    return () => {
      window.clearTimeout(delayTimer);
      media.removeEventListener("change", onMediaChange);
    };
  }, [onSettled]);

  return (
    <div className={cn("hero-name-reveal overflow-hidden", className)}>
      <div className="hero-name-reveal-track">
        <HeroNameHeading saragiSheen={sheen} />
      </div>
    </div>
  );
}
