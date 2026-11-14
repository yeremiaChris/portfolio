"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

import { useHeroReady } from "@/components/home/HeroReady";
import { scheduleIdle } from "@/lib/schedule-idle";

const HeroCodeSnippetMotion = dynamic(
  () =>
    import("@/components/home/HeroCodeSnippetMotion").then((mod) => ({
      default: mod.HeroCodeSnippetMotion,
    })),
  { ssr: false },
);

export function HeroCodeSnippetMotionSlot() {
  const { ready } = useHeroReady();

  useEffect(() => {
    return scheduleIdle(() => {
      void import("@/components/home/HeroCodeSnippetMotion");
    }, 0);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <div data-hero-code-motion-mounted="" className="hero-code-motion-layer">
      <HeroCodeSnippetMotion ready={ready} />
    </div>
  );
}
