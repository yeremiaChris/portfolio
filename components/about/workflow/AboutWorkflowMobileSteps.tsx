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
import { aboutStaggerTransition } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

type AboutWorkflowMobileStepsProps = {
  className?: string;
};

export function AboutWorkflowMobileSteps({
  className,
}: AboutWorkflowMobileStepsProps = {}) {
  return (
    <ol className={cn("flex flex-col gap-4 lg:hidden", className)}>
      {aboutWorkflowSteps.map((step, index) => (
        <MobileStepCard key={step.id} step={step} index={index} />
      ))}
    </ol>
  );
}

function MobileStepCard({
  step,
  index,
}: {
  step: AboutWorkflowStep;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const toolLabels = getWorkflowStepToolLabels(step.id);

  return (
    <li ref={ref} className="list-none">
      <m.div
        className={aboutSurfaceCardClass}
        initial={false}
        animate={
          reducedMotion
            ? { opacity: 1, translateY: 0 }
            : {
                opacity: inView ? 1 : 0.9,
                translateY: inView ? 0 : 10,
              }
        }
        transition={{ ...aboutStaggerTransition, delay: index * 0.03 }}
      >
        <div className={projectSurfaceHairlineClass} />
        <span className="text-brand-accent text-xs font-semibold tracking-widest">
          {step.step}
        </span>
        <h3 className="font-heading text-foreground mt-1 text-lg font-semibold tracking-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground mt-1 text-[14px] leading-relaxed">
          {step.description}
        </p>
        <div className="mt-3">
          <WorkflowStepVisual stepId={step.id} active={inView} />
        </div>
        {toolLabels.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1">
            {toolLabels.map((label) => (
              <li
                key={label}
                className="bg-secondary text-muted-foreground rounded-md px-1.5 py-0.5 text-[11px] font-medium"
              >
                {label}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="text-brand-accent mt-2 text-[12px]">{step.footer}</p>
      </m.div>
    </li>
  );
}
