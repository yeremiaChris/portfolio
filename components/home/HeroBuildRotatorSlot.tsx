"use client";

import dynamic from "next/dynamic";

import { HeroBuildRotatorFallback } from "@/components/home/HeroBuildRotatorFallback";
import { useHeroReady } from "@/components/home/HeroReady";
import { cn } from "@/lib/utils";

const HeroBuildRotator = dynamic(
  () =>
    import("@/components/home/HeroBuildRotator").then((mod) => ({
      default: mod.HeroBuildRotator,
    })),
  {
    loading: () => <HeroBuildRotatorFallback />,
  },
);

type HeroBuildRotatorSlotProps = {
  className?: string;
};

export function HeroBuildRotatorSlot({ className }: HeroBuildRotatorSlotProps) {
  const { ready: active } = useHeroReady();

  return <HeroBuildRotator active={active} className={cn(className)} />;
}
