"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useHeroReady } from "@/components/home/HeroReady";
import { HeroVisualShell } from "@/components/home/HeroVisualShell";
import { scheduleIdle } from "@/lib/schedule-idle";

const HeroVisual = dynamic(
  () =>
    import("@/components/home/HeroVisual").then((mod) => ({
      default: mod.HeroVisual,
    })),
  { loading: () => <HeroVisualShell /> },
);

export function HeroVisualSlot() {
  const [deferred, setDeferred] = useState(false);
  const { ready: terminalReady } = useHeroReady();

  useEffect(() => {
    return scheduleIdle(() => setDeferred(true), 4000);
  }, []);

  if (!deferred) {
    return <HeroVisualShell />;
  }

  return <HeroVisual terminalReady={terminalReady} />;
}
