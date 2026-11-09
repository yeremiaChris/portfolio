"use client";

import { useCallback, useState } from "react";

import { HeroHeadlineCopy } from "@/components/home/HeroIntro";
import { HeroNameReveal } from "@/components/home/HeroNameReveal";
import { HeroVisual } from "@/components/home/HeroVisual";

export function HeroFoldMotion() {
  const [terminalReady, setTerminalReady] = useState(false);

  const onNameSettled = useCallback(() => {
    setTerminalReady(true);
  }, []);

  return (
    <div className="grid w-full grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_min(420px,38%)] xl:gap-10">
      <div className="hero-signal-headline relative w-full min-w-0 text-left">
        <HeroNameReveal onSettled={onNameSettled} />
        <HeroHeadlineCopy />
      </div>
      <HeroVisual terminalReady={terminalReady} />
    </div>
  );
}
