import Link from "next/link";
import {
  Bot,
  GitMerge,
  ListChecks,
  Search,
  Ticket,
  type LucideIcon,
} from "lucide-react";

import {
  aboutBentoCardClass,
  aboutBentoChipClass,
} from "@/components/about/aboutSurface";
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

const PRIMARY_STEP_ID = "plan";
const WIDE_STEP_ID = "review";

export function AboutWorkflow() {
  return (
    <section
      aria-labelledby="about-workflow-heading"
      className="mb-8 w-full md:mb-12"
    >
      <header className="mb-8 max-w-2xl px-1 md:mb-10">
        <p className="text-muted-foreground label-caps tracking-widest">
          {aboutWorkflowIntro.eyebrow}
        </p>
        <h2
          id="about-workflow-heading"
          className="font-heading text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {aboutWorkflowIntro.title}
        </h2>
        <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed sm:text-base">
          {aboutWorkflowIntro.description}
        </p>
      </header>

      <div className="flex flex-col gap-5 md:gap-6 lg:gap-7">
        <ToolsBentoCard />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {aboutWorkflowSteps.map((step) => (
            <WorkflowStepCard key={step.id} step={step} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-5 lg:gap-6">
          <SplitCard
            title={aboutWorkflowSplit.ai.title}
            items={aboutWorkflowSplit.ai.items}
            tone="accent"
          />
          <SplitCard
            title={aboutWorkflowSplit.me.title}
            items={aboutWorkflowSplit.me.items}
            tone="primary"
          />
        </div>

        <figure className={cn(aboutBentoCardClass, "w-full")}>
          <blockquote className="text-foreground text-[15px] leading-relaxed sm:text-base">
            {aboutWorkflowExample.beforeLink}
            <Link
              href={aboutWorkflowExample.linkHref}
              className="text-brand-accent hover:text-brand-accent/85 underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none"
            >
              {aboutWorkflowExample.linkLabel}
            </Link>
            {aboutWorkflowExample.afterLink}
          </blockquote>
        </figure>

        <p className="text-muted-foreground max-w-2xl px-1 text-[15px] leading-relaxed sm:text-base">
          {aboutWorkflowClosing}
        </p>
      </div>
    </section>
  );
}

function ToolsBentoCard() {
  return (
    <article className={cn(aboutBentoCardClass, "w-full lg:col-span-3")}>
      <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {aboutWorkflowToolGroups.map((group) => (
          <div key={group.id} className="min-w-0 space-y-3">
            <p className="text-muted-foreground label-caps tracking-widest">
              {group.label}
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.label}>
                  <ToolChip item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

function ToolChip({ item }: { item: AboutWorkflowToolItem }) {
  if (item.href) {
    return (
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          aboutBentoChipClass,
          "text-brand-accent hover:border-brand-accent/45 hover:text-brand-accent/85 transition-colors duration-200 motion-reduce:transition-none",
        )}
      >
        {item.label}
      </Link>
    );
  }

  return <span className={aboutBentoChipClass}>{item.label}</span>;
}

function stepGridClass(step: AboutWorkflowStep) {
  if (step.id === PRIMARY_STEP_ID) {
    return "md:col-span-2 lg:col-span-2 lg:row-span-2";
  }
  if (step.id === WIDE_STEP_ID) {
    return "lg:col-span-2";
  }
  return undefined;
}

function WorkflowStepCard({ step }: { step: AboutWorkflowStep }) {
  const Icon = STEP_ICONS[step.icon];
  const toneClass = aboutStoryToneClass[step.tone];
  const isPrimary = step.id === PRIMARY_STEP_ID;

  return (
    <article
      className={cn(
        aboutBentoCardClass,
        "flex h-full flex-col justify-between",
        stepGridClass(step),
        isPrimary && "lg:min-h-[18.5rem]",
      )}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "bg-secondary/80 flex size-10 shrink-0 items-center justify-center rounded-lg",
              toneClass,
            )}
          >
            <Icon className="size-5" aria-hidden />
          </div>
          <span
            className={cn(
              "font-mono text-xs font-semibold tracking-[0.2em]",
              toneClass,
            )}
          >
            {step.step}
          </span>
        </div>
        <div className="space-y-2.5">
          <h3 className="font-heading text-foreground text-lg font-semibold tracking-tight sm:text-xl">
            {step.title}
          </h3>
          <p className="text-muted-foreground text-[14px] leading-relaxed sm:text-[15px]">
            {step.description}
          </p>
        </div>
      </div>
      <p
        className={cn("mt-6 text-[12px] font-medium sm:text-[13px]", toneClass)}
      >
        {step.footer}
      </p>
    </article>
  );
}

function SplitCard({
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
    <article className={cn(aboutBentoCardClass, "h-full")}>
      <h3
        className={cn(
          "font-heading text-lg font-semibold tracking-tight sm:text-xl",
          toneClass,
        )}
      >
        {title}
      </h3>
      <ul className="text-muted-foreground mt-4 space-y-2.5 text-[14px] leading-relaxed sm:text-[15px]">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span
              className={cn(
                "mt-2 size-1.5 shrink-0 rounded-full",
                tone === "accent" ? "bg-brand-accent" : "bg-brand-accent/70",
              )}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
