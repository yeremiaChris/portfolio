"use client";

import {
  Bot,
  GitMerge,
  ListChecks,
  Search,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import {
  aboutSurfaceCardClass,
  projectSurfaceHairlineClass,
} from "@/components/about/aboutSurface";
import { WorkflowStepMiniVisual } from "@/components/about/workflow/WorkflowStepMiniVisual";
import { Badge } from "@/components/ui/badge";
import {
  aboutStoryToneClass,
  aboutWorkflowSteps,
  type AboutWorkflowStep,
} from "@/lib/about";
import { motionSpring } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const STEP_ICONS: Record<AboutWorkflowStep["icon"], LucideIcon> = {
  plan: Search,
  ticket: Ticket,
  agent: Bot,
  review: ListChecks,
  ship: GitMerge,
};

const BENTO_CLASS: Record<AboutWorkflowStep["id"], string> = {
  plan: "md:col-span-2 md:row-span-2",
  ticket: "",
  agent: "",
  review: "",
  merge: "md:col-span-2 lg:col-span-1",
};

const hoverSpring = {
  ...motionSpring,
  stiffness: 420,
  damping: 32,
};

export function AboutWorkflowStepsBento() {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:gap-5 md:auto-rows-min md:grid-cols-2 lg:grid-cols-3">
      {aboutWorkflowSteps.map((step, index) => (
        <BentoStepCard key={step.id} step={step} index={index} />
      ))}
    </ol>
  );
}

function BentoStepCard({
  step,
  index,
}: {
  step: AboutWorkflowStep;
  index: number;
}) {
  const Icon = STEP_ICONS[step.icon];
  const toneClass = aboutStoryToneClass[step.tone];
  const reducedMotion = useReducedMotion();
  const primary = step.id === "plan";

  const inner = (
    <>
      <div className={projectSurfaceHairlineClass} />
      <div className="flex items-start justify-between gap-2">
        <div
          className={cn(
            "bg-secondary flex size-10 shrink-0 items-center justify-center rounded-lg",
            toneClass,
          )}
        >
          <Icon className="size-5" aria-hidden />
        </div>
        <Badge
          variant="secondary"
          className={cn("text-xs tracking-widest", toneClass)}
        >
          {step.step}
        </Badge>
      </div>
      <h3
        className={cn(
          "font-heading mt-4 font-semibold tracking-tight",
          primary ? "text-xl sm:text-2xl" : "text-lg",
        )}
      >
        {step.title}
      </h3>
      <p
        className={cn(
          "text-muted-foreground mt-2 leading-relaxed",
          primary ? "text-[15px]" : "text-[14px]",
        )}
      >
        {step.description}
      </p>
      <WorkflowStepMiniVisual stepId={step.id} />
      <p className={cn("mt-3 text-[12px] font-medium", toneClass)}>
        {step.footer}
      </p>
    </>
  );

  if (reducedMotion) {
    return (
      <li
        className={cn(
          "list-none",
          BENTO_CLASS[step.id],
          aboutSurfaceCardClass,
          "ring-border/25 ring-1",
        )}
      >
        {inner}
      </li>
    );
  }

  return (
    <m.li
      className={cn(
        "list-none",
        BENTO_CLASS[step.id],
        aboutSurfaceCardClass,
        "ring-border/25 hover:ring-brand-accent/40 ring-1 transition-[box-shadow] duration-200",
      )}
      initial={false}
      style={{ opacity: 1 }}
      whileInView={
        reducedMotion ? undefined : { opacity: 1, translateY: [12, 0] }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ ...hoverSpring, delay: index * 0.08 }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              translateY: -4,
              boxShadow: "0 0 32px rgb(76 215 246 / 0.16)",
            }
      }
    >
      {inner}
    </m.li>
  );
}
