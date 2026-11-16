"use client";

import { usePathname } from "next/navigation";
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { projectsFeaturedSpring } from "@/lib/projects-motion";

const blogPostPath = /^\/blog\/[^/]+$/;

export function BlogHeaderReadingProgress() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const showBar = blogPostPath.test(pathname);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleXSpring = useSpring(scrollYProgress, projectsFeaturedSpring);
  const scaleX = reducedMotion ? scrollYProgress : scaleXSpring;
  const opacity = useTransform(scrollY, [0, 64], [0, 1]);

  if (!showBar) return null;

  return (
    <m.div
      aria-hidden
      className="bg-primary pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left shadow-[0_0_12px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]"
      style={{ scaleX, opacity }}
      initial={false}
    />
  );
}
