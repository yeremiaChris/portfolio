"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  type RefObject,
} from "react";
import { useScroll, type MotionValue } from "motion/react";

export const experienceRailScrollOffset: ["start center", "end center"] = [
  "start center",
  "end center",
];

export const experienceCardScrollOffset: ["start end", "start 0.45"] = [
  "start end",
  "start 0.45",
];

const ExperienceCardScrollProgressContext =
  createContext<MotionValue<number> | null>(null);

export function useExperienceCardScrollProgress() {
  return useContext(ExperienceCardScrollProgressContext);
}

export function ExperienceCardScrollProvider({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <ExperienceCardScrollProgressContext.Provider value={progress}>
      {children}
    </ExperienceCardScrollProgressContext.Provider>
  );
}

export function useExperienceTimelineScroll(
  containerRef: RefObject<HTMLElement | null>,
) {
  const { scrollYProgress: railProgress } = useScroll({
    target: containerRef,
    offset: experienceRailScrollOffset,
  });
  const { scrollYProgress: cardProgress } = useScroll({
    target: containerRef,
    offset: experienceCardScrollOffset,
  });
  return { railProgress, cardProgress };
}
