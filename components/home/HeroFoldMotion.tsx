"use client";

import { useCallback, useState } from "react";

import { HeroBuildRotator } from "@/components/home/HeroBuildRotator";
import { HeroHeadlineCopy } from "@/components/home/HeroIntro";
import { HeroNameReveal } from "@/components/home/HeroNameReveal";
import { HeroVisual } from "@/components/home/HeroVisual";

export function HeroFoldMotion() {
  const [heroReady, setHeroReady] = useState(false);
  const [terminalReady, setTerminalReady] = useState(false);

  const onNameSettled = useCallback(() => {
    setHeroReady(true);
    setTerminalReady(true);
  }, []);

  return (
    <div className="grid w-full grid-cols-1 items-start gap-8 lg:gap-10 xl:grid-cols-[minmax(0,1fr)_min(420px,38%)] xl:items-center">
      <div className="hero-signal-headline relative w-full min-w-0 text-left">
        <HeroNameReveal onSettled={onNameSettled} />
        <HeroBuildRotator active={heroReady} />
        <HeroHeadlineCopy />
      </div>
      <HeroVisual terminalReady={terminalReady} />
    </div>
  );
}
