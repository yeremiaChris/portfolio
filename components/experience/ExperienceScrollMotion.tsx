"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  type RefObject,
} from "react";
import { useScroll, useTransform, type MotionValue } from "motion/react";

export const experienceRailScrollOffset: ["start center", "end center"] = [
  "start center",
  "end center",
];

export const experienceRoleEnterOffset: ["start end", "start 0.45"] = [
  "start end",
  "start 0.45",
];

export const experienceRoleFocusOffset: ["start end", "end start"] = [
  "start end",
  "end start",
];

type ExperienceRoleCardScrollValue = {
  enterProgress: MotionValue<number>;
  focus: MotionValue<number>;
};

const ExperienceRoleCardScrollContext =
  createContext<ExperienceRoleCardScrollValue | null>(null);

export function useExperienceRoleCardScroll() {
  return useContext(ExperienceRoleCardScrollContext);
}

export function ExperienceRoleCardScrollProvider({
  value,
  children,
}: {
  value: ExperienceRoleCardScrollValue;
  children: ReactNode;
}) {
  return (
    <ExperienceRoleCardScrollContext.Provider value={value}>
      {children}
    </ExperienceRoleCardScrollContext.Provider>
  );
}

export function useExperienceTimelineRailScroll(
  containerRef: RefObject<HTMLElement | null>,
) {
  const { scrollYProgress: railProgress } = useScroll({
    target: containerRef,
    offset: experienceRailScrollOffset,
  });
  return railProgress;
}

export function useExperienceRoleCardMotion(
  cardRef: RefObject<HTMLElement | null>,
) {
  const { scrollYProgress: enterProgress } = useScroll({
    target: cardRef,
    offset: experienceRoleEnterOffset,
  });
  const { scrollYProgress: focusProgress } = useScroll({
    target: cardRef,
    offset: experienceRoleFocusOffset,
  });

  const focus = useTransform(focusProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(enterProgress, [0, 1], [56, 0]);
  const enterOpacity = useTransform(enterProgress, [0, 1], [0.3, 1]);
  const shellOpacity = useTransform(
    [enterOpacity, focus],
    ([enter, focusAmount]) =>
      (enter as number) * (0.6 + 0.4 * (focusAmount as number)),
  );
  const borderColor = useTransform(
    focus,
    [0, 0.45, 1],
    [
      "rgba(76, 215, 246, 0.08)",
      "rgba(76, 215, 246, 0.32)",
      "rgba(76, 215, 246, 0.55)",
    ],
  );
  const boxShadow = useTransform(
    focus,
    [0, 1],
    ["0 0 0 0 rgba(76, 215, 246, 0)", "0 0 32px rgba(76, 215, 246, 0.16)"],
  );

  return {
    enterProgress,
    focus,
    y,
    shellOpacity,
    borderColor,
    boxShadow,
  };
}

export function useExperienceBulletMotion(
  progress: MotionValue<number>,
  bulletIndex: number,
) {
  const start = 0.38 + bulletIndex * 0.11;
  const end = start + 0.13;

  const local = useTransform(progress, (value) => {
    const v = Math.min(1, Math.max(0, value));
    if (v <= start) {
      return 0;
    }
    if (v >= end) {
      return 1;
    }
    return (v - start) / (end - start);
  });

  const x = useTransform(local, [0, 1], [-18, 0]);
  const opacity = useTransform(local, [0, 1], [0.2, 1]);

  return { x, opacity };
}
