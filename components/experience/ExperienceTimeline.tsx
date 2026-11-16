"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  m,
  motionValue,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

import { ExperienceRoleCard } from "@/components/experience/ExperienceRoleCard";
import {
  ExperienceRoleCardScrollProvider,
  useExperienceRoleCardMotion,
  useExperienceTimelineRailScroll,
} from "@/components/experience/ExperienceScrollMotion";
import { ExperienceTimelineRail } from "@/components/experience/ExperienceTimelineRail";
import { experienceRoles } from "@/lib/experience";

function ExperienceRoleCardMotion({
  role,
  index,
  registerFocus,
}: {
  role: (typeof experienceRoles)[number];
  index: number;
  registerFocus: (index: number, focus: MotionValue<number>) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const motion = useExperienceRoleCardMotion(cardRef);

  useLayoutEffect(() => {
    registerFocus(index, motion.focus);
  }, [index, motion.focus, registerFocus]);

  if (reducedMotion) {
    return <ExperienceRoleCard role={role} />;
  }

  return (
    <ExperienceRoleCardScrollProvider
      value={{ enterProgress: motion.enterProgress, focus: motion.focus }}
    >
      <m.div
        ref={cardRef}
        className="rounded-3xl border border-solid"
        style={{
          y: motion.y,
          opacity: motion.shellOpacity,
          borderColor: motion.borderColor,
          boxShadow: motion.boxShadow,
        }}
        initial={false}
      >
        <ExperienceRoleCard role={role} />
      </m.div>
    </ExperienceRoleCardScrollProvider>
  );
}

function ExperienceTimelineBody() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railProgress = useExperienceTimelineRailScroll(containerRef);
  const [dotFocus, setDotFocus] = useState<MotionValue<number>[]>(() =>
    experienceRoles.map(() => motionValue(0)),
  );

  const registerFocus = useCallback(
    (index: number, focus: MotionValue<number>) => {
      setDotFocus((current) => {
        if (current[index] === focus) {
          return current;
        }
        const next = current.slice();
        next[index] = focus;
        return next;
      });
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className="relative min-w-0 pl-11 sm:pl-12 md:pl-14"
    >
      <ExperienceTimelineRail
        fillProgress={railProgress}
        dotFocus={dotFocus}
        className="absolute top-6 bottom-6 left-3 sm:left-3.5 md:left-4"
      />
      <div className="flex w-full min-w-0 flex-col gap-6 md:gap-8">
        {experienceRoles.map((role, index) => (
          <ExperienceRoleCardMotion
            key={role.id}
            role={role}
            index={index}
            registerFocus={registerFocus}
          />
        ))}
      </div>
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <section
      id="experience-list"
      aria-label="Career timeline"
      className="mb-12 flex w-full min-w-0 flex-col md:mb-16"
    >
      <ExperienceTimelineBody />
    </section>
  );
}
