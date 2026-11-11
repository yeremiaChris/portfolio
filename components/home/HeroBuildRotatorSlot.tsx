"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { HeroBuildRotatorFallback } from "@/components/home/HeroBuildRotatorFallback";
import { useHeroReady } from "@/components/home/HeroReady";
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

type HeroBuildRotatorSlotProps = {
  className?: string;
};

export function HeroBuildRotatorSlot({ className }: HeroBuildRotatorSlotProps) {
  const [deferred, setDeferred] = useState(false);
  const { ready: active } = useHeroReady();

  useEffect(() => {
    return scheduleIdle(() => setDeferred(true), 3500);
  }, []);

  const rotatorClassName = cn("hero-enter hero-enter--1", className);

  if (!deferred) {
    return <HeroBuildRotatorFallback className={rotatorClassName} />;
  }

  return <HeroBuildRotator active={active} className={rotatorClassName} />;
}
