"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { projectsFeaturedSpring } from "@/lib/projects-motion";

export function BlogHeaderReadingProgressBar() {
  const reducedMotion = useReducedMotion();

  const { scrollYProgress, scrollY } = useScroll();
  const scaleXSpring = useSpring(scrollYProgress, projectsFeaturedSpring);
  const scaleX = reducedMotion ? scrollYProgress : scaleXSpring;
  const opacity = useTransform(scrollY, [0, 64], [0, 1]);

  return (
    <m.div
      aria-hidden
      className="bg-primary pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left shadow-[0_0_12px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]"
      style={{ scaleX, opacity }}
      initial={false}
    />
  );
}
