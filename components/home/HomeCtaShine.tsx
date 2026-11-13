"use client";

import { m } from "motion/react";
import { useState, type ReactNode } from "react";

import {
  useHomeMotionReduced,
  useHomePointerEffectsEnabled,
} from "@/components/home/useHomeMotionEnabled";
import { cn } from "@/lib/utils";

type HomeCtaShineProps = {
  children: ReactNode;
  className?: string;
};

export function HomeCtaShine({ children, className }: HomeCtaShineProps) {
  const reduced = useHomeMotionReduced();
  const pointerEffects = useHomePointerEffectsEnabled();
  const [hovered, setHovered] = useState(false);

  if (reduced || !pointerEffects) {
    return (
      <span className={cn("relative inline-flex", className)}>{children}</span>
    );
  }

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <m.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 z-[2] w-1/2 bg-gradient-to-r from-transparent via-[#4cd7f6]/50 to-transparent"
        animate={{ x: hovered ? "250%" : "-120%" }}
        transition={{
          duration: hovered ? 0.5 : 0.01,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </span>
  );
}
