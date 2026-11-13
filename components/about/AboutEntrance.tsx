"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import {
  ABOUT_HERO_ENTRANCE_BASE_DELAY_S,
  ABOUT_HERO_ENTRANCE_STAGGER_S,
  aboutHeroEntranceSpring,
} from "@/lib/scroll-motion";

type AboutEntranceProps = {
  order: number;
  run: boolean;
  reducedMotion: boolean;
  className?: string;
  children: ReactNode;
};

export function AboutEntrance({
  order,
  run,
  reducedMotion,
  className,
  children,
}: AboutEntranceProps) {
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const delay =
    ABOUT_HERO_ENTRANCE_BASE_DELAY_S + order * ABOUT_HERO_ENTRANCE_STAGGER_S;

  return (
    <m.div
      className={className}
      initial={false}
      style={{ opacity: 1 }}
      animate={
        run
          ? { opacity: 1, translateY: [10, 0] }
          : { opacity: 1, translateY: 0 }
      }
      transition={{ ...aboutHeroEntranceSpring, delay }}
    >
      {children}
    </m.div>
  );
}
