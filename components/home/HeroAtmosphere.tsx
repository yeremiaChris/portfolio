"use client";

import { useEffect, useRef, useState } from "react";

import { scheduleIdle } from "@/lib/schedule-idle";
import { cn } from "@/lib/utils";

export function HeroAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const cancel = scheduleIdle(() => setEnhanced(true));
    return cancel;
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPaused(!entry?.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "0px 0px 10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "hero-signal-atmosphere pointer-events-none absolute z-0",
        enhanced && "hero-signal-atmosphere--enhanced",
        paused && enhanced && "hero-signal-atmosphere--paused",
      )}
    >
      <div className="hero-signal-grid" />
      {enhanced ? (
        <div className="hero-signal-grid-shimmer hidden lg:block" />
      ) : null}
      <div className="hero-signal-aurora">
        <span className="hero-signal-aurora-blob hero-signal-aurora-blob--a" />
        <span className="hero-signal-aurora-blob hero-signal-aurora-blob--b" />
        <span className="hero-signal-aurora-blob hero-signal-aurora-blob--c" />
      </div>
    </div>
  );
}
