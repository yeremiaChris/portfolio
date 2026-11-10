"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function HeroAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

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
        paused && "hero-signal-atmosphere--paused",
      )}
    >
      <div className="hero-signal-grid" />
      <div className="hero-signal-grid-shimmer" />
      <div className="hero-signal-aurora">
        <span className="hero-signal-aurora-blob hero-signal-aurora-blob--a" />
        <span className="hero-signal-aurora-blob hero-signal-aurora-blob--b" />
        <span className="hero-signal-aurora-blob hero-signal-aurora-blob--c" />
      </div>
    </div>
  );
}
