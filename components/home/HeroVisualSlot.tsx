"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { HeroVisualShell } from "@/components/home/HeroVisualShell";
import { scheduleIdle } from "@/lib/schedule-idle";

const HeroVisual = dynamic(
  () =>
    import("@/components/home/HeroVisual").then((mod) => ({
      default: mod.HeroVisual,
    })),
  { loading: () => <HeroVisualShell /> },
);

function useHeroMotionActive() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = document.getElementById("hero-headline-root");
    if (!root) {
      return;
    }
    if (root.hasAttribute("data-hero-ready")) {
      const timer = window.setTimeout(() => setActive(true), 0);
      return () => window.clearTimeout(timer);
    }
    const observer = new MutationObserver(() => {
      if (root.hasAttribute("data-hero-ready")) {
        setActive(true);
        observer.disconnect();
      }
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-hero-ready"],
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export function HeroVisualSlot() {
  const [deferred, setDeferred] = useState(false);
  const terminalReady = useHeroMotionActive();

  useEffect(() => {
    return scheduleIdle(() => setDeferred(true), 1500);
  }, []);

  if (!deferred) {
    return <HeroVisualShell />;
  }

  return <HeroVisual terminalReady={terminalReady} />;
}
