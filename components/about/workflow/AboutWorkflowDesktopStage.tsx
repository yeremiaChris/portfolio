"use client";

import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";

import { WorkflowStepVisual } from "@/components/about/workflow/WorkflowStepVisual";
import { getWorkflowStepToolLabels } from "@/components/about/workflow/workflow-step-tools";
import { ScrollProgressRail } from "@/components/motion/ScrollProgressRail";
import {
  projectSurfaceHairlineClass,
  projectSurfacePanelClass,
} from "@/components/projects/projectSurface";
import { aboutWorkflowSteps, type AboutWorkflowStep } from "@/lib/about";
import {
  ABOUT_WORKFLOW_STEP_SCROLL_VH,
  aboutWorkflowStepSpring,
} from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const STEP_COUNT = aboutWorkflowSteps.length;

export function AboutWorkflowDesktopStage() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (STEP_COUNT <= 1) {
      setActiveIndex(0);
      return;
    }
    const next = Math.round(value * (STEP_COUNT - 1));
    setActiveIndex(Math.min(STEP_COUNT - 1, Math.max(0, next)));
  });

  const activeStep = aboutWorkflowSteps[activeIndex];

  return (
    <div
      ref={scrollerRef}
      className="relative hidden w-full min-w-0 lg:block"
      style={{
        height: `calc(${STEP_COUNT} * ${ABOUT_WORKFLOW_STEP_SCROLL_VH}vh)`,
      }}
    >
      <div className="sticky top-[calc(var(--nav-height,4rem)+1.5rem)] flex max-h-[min(72vh,42rem)] w-full min-w-0 items-stretch">
        <div className="grid min-h-0 w-full min-w-0 grid-cols-12 gap-6 xl:gap-8">
          <ol className="relative col-span-5 flex min-h-0 flex-col gap-2 pl-5">
            <div className="pointer-events-none absolute top-2 bottom-2 left-0 w-5">
              <ScrollProgressRail
                progress={scrollYProgress}
                activeIndex={activeIndex}
                segmentCount={STEP_COUNT}
              />
            </div>
            {aboutWorkflowSteps.map((step, index) => (
              <WorkflowStepListItem
                key={step.id}
                step={step}
                active={index === activeIndex}
              />
            ))}
          </ol>
          <MotionStagePanel
            className="col-span-7 min-w-0 self-start"
            reducedMotion={!!reducedMotion}
            step={activeStep}
          />
        </div>
      </div>
    </div>
  );
}

function WorkflowStepListItem({
  step,
  active,
}: {
  step: AboutWorkflowStep;
  active: boolean;
}) {
  const toolLabels = getWorkflowStepToolLabels(step.id);

  return (
    <li
      className={cn(
        "list-none rounded-xl px-3 py-2.5 transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none",
        active
          ? "bg-brand-accent/8 ring-brand-accent/30 shadow-[0_0_18px_rgb(76_215_246_/_0.12)] ring-1"
          : "bg-secondary/35 ring-border/20 ring-1",
      )}
    >
      <span
        className={cn(
          "text-xs font-semibold tracking-widest",
          active ? "text-brand-accent" : "text-muted-foreground",
        )}
      >
        {step.step}
      </span>
      <h3
        className={cn(
          "font-heading text-[15px] font-semibold tracking-tight",
          active ? "text-foreground" : "text-foreground/85",
        )}
      >
        {step.title}
      </h3>
      <p className="text-muted-foreground mt-0.5 text-[13px] leading-snug">
        {step.footer}
      </p>
      {toolLabels.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-1">
          {toolLabels.map((label) => (
            <li
              key={label}
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[11px] font-medium",
                active
                  ? "bg-brand-accent/12 text-brand-accent"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {label}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function MotionStagePanel({
  className,
  reducedMotion,
  step,
}: {
  className?: string;
  reducedMotion: boolean;
  step: AboutWorkflowStep;
}) {
  return (
    <div className={cn(className)}>
      <div
        className={cn(
          projectSurfacePanelClass,
          "min-h-0 w-full min-w-0 p-4 sm:p-5",
        )}
      >
        <div className={projectSurfaceHairlineClass} />
        <p className="text-muted-foreground mb-3 text-[12px] leading-relaxed">
          {step.description}
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={step.id}
            className="w-full min-w-0"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={aboutWorkflowStepSpring}
          >
            <WorkflowStepVisual stepId={step.id} active />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
