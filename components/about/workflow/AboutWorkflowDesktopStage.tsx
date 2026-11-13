"use client";

import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";

import {
  aboutSurfaceCardClass,
  projectSurfaceHairlineClass,
} from "@/components/about/aboutSurface";
import { WorkflowStepVisual } from "@/components/about/workflow/WorkflowStepVisual";
import { getWorkflowStepToolLabels } from "@/components/about/workflow/workflow-step-tools";
import { ScrollProgressRail } from "@/components/motion/ScrollProgressRail";
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
          <ol className="relative col-span-5 flex min-h-0 flex-col gap-1.5 pl-9">
            <div className="pointer-events-none absolute top-1 bottom-1 left-0 w-5">
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
                reducedMotion={!!reducedMotion}
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
  reducedMotion,
}: {
  step: AboutWorkflowStep;
  active: boolean;
  reducedMotion: boolean;
}) {
  const toolLabels = getWorkflowStepToolLabels(step.id);

  return (
    <m.li
      layout={!reducedMotion}
      transition={aboutWorkflowStepSpring}
      className={cn(
        "list-none overflow-hidden rounded-2xl ring-1 transition-colors duration-200 motion-reduce:transition-none",
        active
          ? "bg-brand-accent/8 ring-brand-accent/35 shadow-[0_0_20px_rgb(76_215_246_/_0.1)]"
          : "bg-secondary/30 ring-border/20",
      )}
    >
      <div className="flex items-baseline gap-2 px-4 py-2.5">
        <span
          className={cn(
            "shrink-0 text-xs font-semibold tracking-widest",
            active ? "text-brand-accent" : "text-muted-foreground",
          )}
        >
          {step.step}
        </span>
        <h3
          className={cn(
            "font-heading min-w-0 text-[15px] leading-snug font-semibold tracking-tight",
            active ? "text-foreground" : "text-foreground/80",
          )}
        >
          {step.title}
        </h3>
      </div>
      <m.div
        className="grid"
        initial={false}
        animate={{
          gridTemplateRows: active || reducedMotion ? "1fr" : "0fr",
          opacity: active || reducedMotion ? 1 : 0,
        }}
        transition={aboutWorkflowStepSpring}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-2 px-4 pt-0 pb-3.5">
            <p className="text-muted-foreground text-[13px] leading-snug">
              {step.footer}
            </p>
            {toolLabels.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
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
          </div>
        </div>
      </m.div>
    </m.li>
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
      <div className={cn(aboutSurfaceCardClass)}>
        <div className={projectSurfaceHairlineClass} />
        <div className="border-border/30 mb-4 flex min-w-0 flex-wrap items-baseline gap-2 border-b pb-4">
          <span className="text-brand-accent shrink-0 text-xs font-semibold tracking-widest">
            {step.step}
          </span>
          <h3 className="font-heading text-foreground min-w-0 text-lg font-semibold tracking-tight">
            {step.title}
          </h3>
        </div>
        <p className="text-muted-foreground mb-4 text-[13px] leading-relaxed">
          {step.description}
        </p>
        <div className="relative min-h-0 w-full min-w-0 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={step.id}
              className="w-full min-w-0"
              initial={reducedMotion ? false : { opacity: 0, x: 16, y: 4 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, x: -12, y: -4 }}
              transition={aboutWorkflowStepSpring}
            >
              <WorkflowStepVisual stepId={step.id} active />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
