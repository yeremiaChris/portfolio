"use client";

import { m, useMotionValue, useReducedMotion } from "motion/react";

import { ExperienceRoleCard } from "@/components/experience/ExperienceRoleCard";
import {
  ServicesProcessRail,
  ServicesScrollReveal,
  useServicesProcessStepMotion,
  useServicesScrollSectionProgress,
} from "@/components/services/ServicesScrollMotion";
import { experienceRoles } from "@/lib/experience";

function ExperienceRoleCardMotion({
  role,
  stepIndex,
  total,
}: {
  role: (typeof experienceRoles)[number];
  stepIndex: number;
  total: number;
}) {
  const reducedMotion = useReducedMotion();
  const progress = useServicesScrollSectionProgress();
  const fallback = useMotionValue(1);
  const source = progress ?? fallback;
  const motion = useServicesProcessStepMotion(source, stepIndex, total);

  if (reducedMotion) {
    return <ExperienceRoleCard role={role} />;
  }

  return (
    <m.div style={{ y: motion.y, opacity: motion.opacity }} initial={false}>
      <ExperienceRoleCard role={role} />
    </m.div>
  );
}

function ExperienceTimelineBody({ total }: { total: number }) {
  const progress = useServicesScrollSectionProgress();
  const fallback = useMotionValue(0);
  const railProgress = progress ?? fallback;

  return (
    <div className="relative min-w-0 pl-11 sm:pl-12 md:pl-14">
      <ServicesProcessRail
        progress={railProgress}
        layout="vertical"
        stepCount={total}
        className="absolute top-6 bottom-6 left-3 sm:left-3.5 md:left-4"
      />
      <div className="flex w-full min-w-0 flex-col gap-6 md:gap-8">
        {experienceRoles.map((role, index) => (
          <ExperienceRoleCardMotion
            key={role.id}
            role={role}
            stepIndex={index}
            total={total}
          />
        ))}
      </div>
    </div>
  );
}

export function ExperienceTimeline() {
  const total = experienceRoles.length;

  return (
    <section
      id="experience-list"
      aria-label="Career timeline"
      className="mb-12 flex w-full min-w-0 flex-col md:mb-16"
    >
      <ServicesScrollReveal shareProgress className="min-w-0">
        <ExperienceTimelineBody total={total} />
      </ServicesScrollReveal>
    </section>
  );
}
