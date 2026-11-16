"use client";

import type { RefObject } from "react";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { usePointerFine } from "@/components/projects/usePointerFine";
import { projectsFeaturedSpring } from "@/lib/projects-motion";

const blogCardEnterOffset: ["start end", "start 0.45"] = [
  "start end",
  "start 0.45",
];

const blogHoverEase = [0, 0, 0.2, 1] as const;

export const blogCardHoverTransition = {
  duration: 0.3,
  ease: blogHoverEase,
} as const;

export const blogGridLayoutTransition = {
  layout: projectsFeaturedSpring,
  opacity: { duration: 0.28, ease: blogHoverEase },
} as const;

export function useBlogCardEnterMotion(
  targetRef: RefObject<HTMLElement | null>,
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: blogCardEnterOffset,
  });
  const progress = useSpring(scrollYProgress, projectsFeaturedSpring);
  const y = useTransform(progress, [0, 1], [56, 0]);
  const opacity = useTransform(progress, [0, 1], [0.3, 1]);
  return { y, opacity };
}

export function useBlogMotionHover() {
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  return pointerFine && !reducedMotion;
}
