"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useState } from "react";

import { HeroBuildRotatorFallback } from "@/components/home/HeroBuildRotatorFallback";
import { useHeroReady } from "@/components/home/HeroReady";
import { waitForDomHydrated } from "@/lib/wait-for-dom-hydrated";
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
  const { ready: active } = useHeroReady();
  const [motionReady, setMotionReady] = useState(false);

  useLayoutEffect(() => {
    return waitForDomHydrated(() => setMotionReady(true));
  }, []);

  if (!motionReady) {
    return (
      <HeroBuildRotatorFallback
        className={cn("hero-enter hero-enter--1", className)}
      />
    );
  }

  return <HeroBuildRotator active={active} className={cn(className)} />;
}
