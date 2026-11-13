import Link from "next/link";

import { WorkflowStepVisual } from "@/components/about/workflow/WorkflowStepVisual";
import { getWorkflowStepToolLabels } from "@/components/about/workflow/workflow-step-tools";
import {
  aboutSurfaceCardClass,
  projectSurfaceHairlineClass,
} from "@/components/about/aboutSurface";
import {
  aboutWorkflowClosing,
  aboutWorkflowExample,
  aboutWorkflowIntro,
  aboutWorkflowSplit,
  aboutWorkflowSteps,
  aboutStoryToneClass,
} from "@/lib/about";
import { cn } from "@/lib/utils";

export function AboutWorkflowStatic() {
  return (
    <section
      aria-labelledby="about-workflow-heading"
      className="mb-6 w-full min-w-0 md:mb-10"
    >
      <WorkflowIntroStatic />
      <ol className="flex flex-col gap-4 lg:hidden">
        {aboutWorkflowSteps.map((step) => (
          <li key={step.id} className="list-none">
            <div className={aboutSurfaceCardClass}>
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
                <WorkflowStepVisual stepId={step.id} active />
              </div>
              <StepToolChips stepId={step.id} />
              <p className="text-brand-accent mt-2 text-[12px]">
                {step.footer}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
        <ol className="relative col-span-5 flex flex-col gap-1.5 pl-9">
          {aboutWorkflowSteps.map((step, index) => (
            <li
              key={step.id}
              className={cn(
                "list-none overflow-hidden rounded-2xl ring-1",
                index === 0
                  ? "bg-brand-accent/8 ring-brand-accent/35"
                  : "bg-secondary/30 ring-border/20",
              )}
            >
              <div className="flex items-baseline gap-2 px-4 py-2.5">
                <span className="text-brand-accent text-xs font-semibold tracking-widest">
                  {step.step}
                </span>
                <h3 className="font-heading text-[15px] font-semibold tracking-tight">
                  {step.title}
                </h3>
              </div>
              {index === 0 ? (
                <div className="space-y-2 px-4 pt-0 pb-3.5">
                  <p className="text-muted-foreground text-[13px] leading-snug">
                    {step.footer}
                  </p>
                  <StepToolChips stepId={step.id} active />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        <div className="col-span-7">
          <div className={aboutSurfaceCardClass}>
            <div className={projectSurfaceHairlineClass} />
            <div className="border-border/30 mb-4 flex items-baseline gap-2 border-b pb-4">
              <span className="text-brand-accent text-xs font-semibold tracking-widest">
                {aboutWorkflowSteps[0].step}
              </span>
              <h3 className="font-heading text-lg font-semibold tracking-tight">
                {aboutWorkflowSteps[0].title}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 text-[13px] leading-relaxed">
              {aboutWorkflowSteps[0].description}
            </p>
            <WorkflowStepVisual stepId={aboutWorkflowSteps[0].id} active />
          </div>
        </div>
      </div>
      <SplitStatic />
      <QuoteStatic />
      <p className="text-muted-foreground mt-4 block max-w-2xl text-[15px] leading-relaxed">
        {aboutWorkflowClosing}
      </p>
    </section>
  );
}

function WorkflowIntroStatic() {
  return (
    <div className="mb-6 max-w-2xl lg:mb-8">
      <p className="text-muted-foreground label-caps tracking-widest">
        {aboutWorkflowIntro.eyebrow}
      </p>
      <h2
        id="about-workflow-heading"
        className="font-heading text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {aboutWorkflowIntro.title}
      </h2>
      <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
        {aboutWorkflowIntro.description}
      </p>
    </div>
  );
}

function StepToolChips({
  stepId,
  active = false,
}: {
  stepId: (typeof aboutWorkflowSteps)[number]["id"];
  active?: boolean;
}) {
  const labels = getWorkflowStepToolLabels(stepId);
  if (labels.length === 0) {
    return null;
  }
  return (
    <ul className="mt-2 flex flex-wrap gap-1">
      {labels.map((label) => (
        <li
          key={label}
          className={cn(
            "rounded-md px-1.5 py-0.5 text-[11px] font-medium",
            active
              ? "bg-brand-accent/12 text-brand-accent"
              : "bg-secondary text-muted-foreground",
          )}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

function SplitStatic() {
  return (
    <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
      <SplitCardStatic
        title={aboutWorkflowSplit.ai.title}
        items={aboutWorkflowSplit.ai.items}
        tone="accent"
      />
      <SplitCardStatic
        title={aboutWorkflowSplit.me.title}
        items={aboutWorkflowSplit.me.items}
        tone="primary"
      />
    </div>
  );
}

function SplitCardStatic({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly string[];
  tone: "accent" | "primary";
}) {
  const toneClass = aboutStoryToneClass[tone];

  return (
    <div className={aboutSurfaceCardClass}>
      <div className={projectSurfaceHairlineClass} />
      <h3
        className={cn(
          "font-heading mb-2 text-base font-semibold tracking-tight",
          toneClass,
        )}
      >
        {title}
      </h3>
      <ul className="text-muted-foreground space-y-1 text-[13px] leading-snug">
        {items.map((item) => (
          <li key={item} className="flex gap-2 px-1">
            <span
              className={cn(
                "mt-1.5 size-1.5 shrink-0 rounded-full",
                tone === "accent" ? "bg-brand-accent" : "bg-primary",
              )}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuoteStatic() {
  return (
    <blockquote
      className={cn(
        aboutSurfaceCardClass,
        "border-brand-accent/30 mt-6 max-w-3xl border-l-2",
      )}
    >
      <div className={projectSurfaceHairlineClass} />
      <p className="text-foreground text-[15px] leading-relaxed">
        {aboutWorkflowExample.beforeLink}
        <Link
          href={aboutWorkflowExample.linkHref}
          className="text-foreground decoration-brand-accent hover:text-brand-accent font-medium underline underline-offset-4"
        >
          {aboutWorkflowExample.linkLabel}
        </Link>
        {aboutWorkflowExample.afterLink}
      </p>
    </blockquote>
  );
}
