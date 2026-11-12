"use client";

import dynamic from "next/dynamic";

import { useHeroReady } from "@/components/home/HeroReady";
import { HeroVisualShell } from "@/components/home/HeroVisualShell";

const HeroVisual = dynamic(
  () =>
    import("@/components/home/HeroVisual").then((mod) => ({
      default: mod.HeroVisual,
    })),
  { loading: () => <HeroVisualShell /> },
);

export function HeroVisualSlot() {
  const { ready: terminalReady } = useHeroReady();

  return <HeroVisual terminalReady={terminalReady} />;
}
