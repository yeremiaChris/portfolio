"use client";

import { useEffect, useState, type RefObject } from "react";
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

const blogColumnStaggerStep = 0.07;

const blogHoverEase = [0, 0, 0.2, 1] as const;

export const blogCardHoverTransition = {
  duration: 0.3,
  ease: blogHoverEase,
} as const;

export const blogGridLayoutTransition = {
  layout: projectsFeaturedSpring,
  opacity: { duration: 0.28, ease: blogHoverEase },
} as const;

export function useBlogGridColumnCount() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");

    const sync = () => {
      if (mqLg.matches) {
        setColumns(3);
        return;
      }
      if (mqSm.matches) {
        setColumns(2);
        return;
      }
      setColumns(1);
    };

    sync();
    mqSm.addEventListener("change", sync);
    mqLg.addEventListener("change", sync);
    return () => {
      mqSm.removeEventListener("change", sync);
      mqLg.removeEventListener("change", sync);
    };
  }, []);

  return columns;
}

export function useBlogCardEnterMotion(
  targetRef: RefObject<HTMLElement | null>,
  columnIndex: number,
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: blogCardEnterOffset,
  });
  const progress = useSpring(scrollYProgress, projectsFeaturedSpring);
  const staggerStart = columnIndex * blogColumnStaggerStep;
  const local = useTransform(progress, (value) => {
    const start = staggerStart;
    if (value <= start) {
      return 0;
    }
    const span = 1 - start;
    if (span <= 0) {
      return 1;
    }
    if (value >= 1) {
      return 1;
    }
    return (value - start) / span;
  });
  const y = useTransform(local, [0, 1], [56, 0]);
  const opacity = useTransform(local, [0, 1], [0.3, 1]);
  return { y, opacity };
}

export function useBlogMotionHover() {
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  return pointerFine && !reducedMotion;
}
