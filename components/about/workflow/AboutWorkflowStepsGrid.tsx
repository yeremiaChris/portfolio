"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { WorkflowStepVisual } from "@/components/about/workflow/WorkflowStepVisual";
import { getWorkflowStepToolLabels } from "@/components/about/workflow/workflow-step-tools";
import {
  aboutSurfaceCardClass,
  projectSurfaceHairlineClass,
} from "@/components/about/aboutSurface";
import { aboutWorkflowSteps, type AboutWorkflowStep } from "@/lib/about";
import { aboutHeroEntranceSpring } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

export function AboutWorkflowStepsGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <ol
      className={cn(
        "grid min-w-0 grid-cols-1 gap-5 sm:gap-6",
        "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5",
      )}
    >
      {aboutWorkflowSteps.map((step, index) => (
        <WorkflowStepCard
          key={step.id}
          step={step}
          index={index}
          reducedMotion={!!reducedMotion}
        />
      ))}
    </ol>
  );
}

function WorkflowStepCard({
  step,
  index,
  reducedMotion,
}: {
  step: AboutWorkflowStep;
  index: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const toolLabels = getWorkflowStepToolLabels(step.id);

  const card = (
    <div
      className={cn(
        aboutSurfaceCardClass,
        "flex h-full min-h-0 flex-col transition-[box-shadow,ring-color] duration-200",
        "hover:ring-brand-accent/30 hover:shadow-[0_0_28px_rgb(76_215_246_/_0.12)]",
        "motion-reduce:transition-none",
      )}
    >
      <div className={projectSurfaceHairlineClass} />
      <span className="text-brand-accent text-xs font-semibold tracking-[0.2em]">
        {step.step}
      </span>
      <h3 className="font-heading text-foreground mt-2 text-lg font-semibold tracking-tight">
        {step.title}
      </h3>
      <p className="text-muted-foreground mt-2 text-[14px] leading-snug">
        {step.footer}
      </p>
      {toolLabels.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {toolLabels.map((label) => (
            <li
              key={label}
              className="bg-brand-accent/12 text-brand-accent rounded-md px-2 py-0.5 text-[11px] font-medium"
            >
              {label}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-4 min-h-0 flex-1">
        <WorkflowStepVisual
          stepId={step.id}
          active={inView}
          className="p-3 text-[11px] sm:p-3.5"
        />
      </div>
    </div>
  );

  if (reducedMotion) {
    return (
      <li ref={ref} className="min-w-0 list-none">
        {card}
      </li>
    );
  }

  return (
    <m.li
      ref={ref}
      className="min-w-0 list-none"
      initial={false}
      style={{ opacity: 1 }}
      animate={
        inView
          ? { opacity: 1, translateY: [12, 0] }
          : { opacity: 1, translateY: 0 }
      }
      transition={{
        ...aboutHeroEntranceSpring,
        delay: index * 0.08,
      }}
    >
      {card}
    </m.li>
  );
}
