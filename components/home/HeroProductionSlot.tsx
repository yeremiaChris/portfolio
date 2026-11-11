"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

import { scheduleIdle } from "@/lib/schedule-idle";

const HeroProduction = dynamic(
  () =>
    import("@/components/home/HeroProduction").then((mod) => ({
      default: mod.HeroProduction,
    })),
  { ssr: false },
);

type HeroProductionSlotProps = {
  fallback: ReactNode;
};

export function HeroProductionSlot({ fallback }: HeroProductionSlotProps) {
  const [deferred, setDeferred] = useState(false);

  useEffect(() => {
    return scheduleIdle(() => setDeferred(true), 4500);
  }, []);

  if (!deferred) {
    return fallback;
  }

  return <HeroProduction />;
}
