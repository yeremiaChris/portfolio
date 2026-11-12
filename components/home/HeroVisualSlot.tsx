"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useState } from "react";

import { useHeroReady } from "@/components/home/HeroReady";
import { HeroVisualShell } from "@/components/home/HeroVisualShell";
import { waitForDomHydrated } from "@/lib/wait-for-dom-hydrated";

const HeroVisual = dynamic(
  () =>
    import("@/components/home/HeroVisual").then((mod) => ({
      default: mod.HeroVisual,
    })),
  { loading: () => <HeroVisualShell /> },
);

export function HeroVisualSlot() {
  const { ready: terminalReady } = useHeroReady();
  const [motionReady, setMotionReady] = useState(false);

  useLayoutEffect(() => {
    return waitForDomHydrated(() => setMotionReady(true));
  }, []);

  if (!motionReady) {
    return <HeroVisualShell />;
  }

  return <HeroVisual terminalReady={terminalReady} />;
}
