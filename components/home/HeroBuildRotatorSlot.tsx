"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

import { useHeroReady } from "@/components/home/HeroReady";
import { cn } from "@/lib/utils";

const HeroBuildRotator = dynamic(
  () =>
    import("@/components/home/HeroBuildRotator").then((mod) => ({
      default: mod.HeroBuildRotator,
    })),
  { ssr: false },
);

type HeroBuildRotatorSlotProps = {
  className?: string;
};

export function HeroBuildRotatorSlot({ className }: HeroBuildRotatorSlotProps) {
  const { ready: active } = useHeroReady();

  useEffect(() => {
    if (!active) {
      return;
    }
    void import("@/components/home/HeroBuildRotator");
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <HeroBuildRotator
      active={active}
      className={cn("hero-build-rotator-mounted", className)}
    />
  );
}
