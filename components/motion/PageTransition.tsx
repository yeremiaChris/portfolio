"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

import { motionPageTransition } from "@/lib/motion-tokens";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <m.div
      data-page-transition=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={motionPageTransition}
    >
      {children}
    </m.div>
  );
}
