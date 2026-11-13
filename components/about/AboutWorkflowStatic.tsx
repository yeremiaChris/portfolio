import Link from "next/link";
import {
  Bot,
  GitMerge,
  ListChecks,
  Search,
  Ticket,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  projectSurfaceHairlineClass,
  projectSurfacePanelClass,
} from "@/components/projects/projectSurface";
import {
  aboutStoryToneClass,
  aboutWorkflowClosing,
  aboutWorkflowExample,
  aboutWorkflowIntro,
  aboutWorkflowSplit,
  aboutWorkflowSteps,
  aboutWorkflowToolGroups,
  type AboutWorkflowStep,
  type AboutWorkflowToolItem,
} from "@/lib/about";
import { cn } from "@/lib/utils";

const STEP_ICONS: Record<AboutWorkflowStep["icon"], LucideIcon> = {
  plan: Search,
  ticket: Ticket,
  agent: Bot,
  review: ListChecks,
  ship: GitMerge,
};

export function AboutWorkflowStatic() {
  return (
    <section
      aria-labelledby="about-workflow-heading"
      className="mb-8 w-full min-w-0 md:mb-12"
    >
      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="mb-8 min-w-0 lg:col-span-4 lg:mb-0">
          <WorkflowIntroStatic />
          <ToolsPanelStatic />
        </div>
        <WorkflowStepsStatic />
      </div>
      <SplitStatic />
      <QuoteStatic />
      <WorkflowClosingStatic />
    </section>
  );
}

function WorkflowIntroStatic() {
  return (
    <div className="mb-6 max-w-2xl">
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

function ToolsPanelStatic() {
  return (
    <div className={cn(projectSurfacePanelClass, "w-full min-w-0 p-4 sm:p-5")}>
      <div className={projectSurfaceHairlineClass} />
      <ul className="flex flex-col gap-3">
        {aboutWorkflowToolGroups.map((group) => (
          <li
            key={group.id}
            className="bg-secondary/40 ring-border/25 rounded-xl px-3 py-2.5 ring-1"
          >
            <p className="text-muted-foreground label-caps mb-1.5 text-[11px] tracking-widest">
              {group.label}
            </p>
            <ul className="text-foreground flex flex-wrap gap-x-2 gap-y-1 text-[13px] font-medium">
              {group.items.map((item) => (
                <li key={item.label}>
                  <ToolChipStatic item={item} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToolChipStatic({ item }: { item: AboutWorkflowToolItem }) {
  const className = "inline-block rounded-md px-1.5 py-0.5 text-foreground";

  if (item.href) {
    return (
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          className,
          "text-brand-accent hover:text-brand-accent/80 underline-offset-4 hover:underline",
        )}
      >
        {item.label}
      </Link>
    );
  }

  return <span className={className}>{item.label}</span>;
}

function WorkflowStepsStatic() {
  return (
    <div className="flex min-w-0 flex-col gap-10 lg:col-span-8 lg:gap-14">
      {aboutWorkflowSteps.map((step) => (
        <StepCardStatic key={step.id} step={step} />
      ))}
    </div>
  );
}

function StepCardStatic({ step }: { step: AboutWorkflowStep }) {
  const Icon = STEP_ICONS[step.icon];
  const toneClass = aboutStoryToneClass[step.tone];

  return (
    <article className="min-w-0">
      <div className={cn(projectSurfacePanelClass, "min-w-0 p-5 sm:p-6")}>
        <div className={projectSurfaceHairlineClass} />
        <div className="mb-4 flex items-center justify-between gap-2">
          <div
            className={cn(
              "bg-secondary flex size-10 items-center justify-center rounded-lg",
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
        <div
          className="border-border/30 bg-secondary/40 ring-border/20 mb-4 aspect-[5/3] w-full rounded-xl border ring-1"
          aria-hidden
        />
        <h3 className="font-heading text-foreground text-lg font-semibold tracking-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground mt-2 text-[14px] leading-relaxed">
          {step.description}
        </p>
        <p className={cn("mt-3 text-[12px]", toneClass)}>{step.footer}</p>
      </div>
    </article>
  );
}

function SplitStatic() {
  return (
    <div className="mt-12 grid min-w-0 grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
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
    <div className={cn(projectSurfacePanelClass, "p-5 sm:p-6")}>
      <div className={projectSurfaceHairlineClass} />
      <h3
        className={cn(
          "font-heading mb-3 text-lg font-semibold tracking-tight",
          toneClass,
        )}
      >
        {title}
      </h3>
      <ul className="text-muted-foreground space-y-2 text-[14px] leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-2 px-2 py-1.5">
            <span
              className={cn(
                "mt-2 size-1.5 shrink-0 rounded-full",
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

function WorkflowClosingStatic() {
  return (
    <p className="text-muted-foreground mt-6 block max-w-2xl text-[15px] leading-relaxed">
      {aboutWorkflowClosing}
    </p>
  );
}

function QuoteStatic() {
  return (
    <blockquote
      className={cn(
        projectSurfacePanelClass,
        "border-brand-accent/30 mt-8 max-w-3xl border-l-2 px-5 py-4",
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
