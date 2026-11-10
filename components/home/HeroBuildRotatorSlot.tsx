"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { HeroBuildRotatorFallback } from "@/components/home/HeroBuildRotatorFallback";
import { scheduleIdle } from "@/lib/schedule-idle";
import { cn } from "@/lib/utils";

const HeroBuildRotator = dynamic(
  () =>
    import("@/components/home/HeroBuildRotator").then((mod) => ({
      default: mod.HeroBuildRotator,
    })),
  {
    loading: () => (
      <HeroBuildRotatorFallback className="hero-enter hero-enter--1" />
    ),
  },
);

const HERO_HEADLINE_ROOT_ID = "hero-headline-root";

function useHeroMotionActive() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = document.getElementById(HERO_HEADLINE_ROOT_ID);
    if (!root) {
      return;
    }
    if (root.hasAttribute("data-hero-ready")) {
      const timer = window.setTimeout(() => setActive(true), 0);
      return () => window.clearTimeout(timer);
    }
    const observer = new MutationObserver(() => {
      if (root.hasAttribute("data-hero-ready")) {
        setActive(true);
        observer.disconnect();
      }
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-hero-ready"],
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

type HeroBuildRotatorSlotProps = {
  className?: string;
};

export function HeroBuildRotatorSlot({ className }: HeroBuildRotatorSlotProps) {
  const [deferred, setDeferred] = useState(false);
  const active = useHeroMotionActive();

  useEffect(() => {
    return scheduleIdle(() => setDeferred(true), 1200);
  }, []);

  const rotatorClassName = cn("hero-enter hero-enter--1", className);

  if (!deferred) {
    return <HeroBuildRotatorFallback className={rotatorClassName} />;
  }

  return <HeroBuildRotator active={active} className={rotatorClassName} />;
}
