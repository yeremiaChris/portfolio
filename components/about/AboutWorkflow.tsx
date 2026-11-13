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
  aboutStepNumberClass,
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
  type AboutWorkflowToolGroup,
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

const STEP_LG_COL_SPAN: Record<AboutWorkflowStep["id"], string> = {
  plan: "lg:col-span-2",
  ticket: "lg:col-span-2",
  agent: "lg:col-span-2",
  review: "lg:col-span-3",
  merge: "lg:col-span-3",
};

const TOOL_GROUP_ROWS: AboutWorkflowToolGroup["id"][][] = [
  ["editor", "agents", "planning"],
  ["ship", "quality"],
];

export function AboutWorkflow() {
  return (
    <section
      aria-labelledby="about-workflow-heading"
      className="mb-8 w-full md:mb-12"
    >
      <header className="mb-6 max-w-2xl px-1 md:mb-8">
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

      <div className="flex flex-col gap-4 md:gap-5">
        <ToolsBentoCard />

        <div className="grid grid-cols-1 items-start gap-3.5 md:grid-cols-2 md:gap-4 lg:grid-cols-6 lg:gap-4">
          {aboutWorkflowSteps.map((step) => (
            <WorkflowStepCard key={step.id} step={step} />
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-3.5 md:grid-cols-2 md:gap-4">
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

        <figure className={cn(aboutBentoCardClass, "w-full space-y-3")}>
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
          <figcaption className="text-muted-foreground text-[14px] leading-relaxed sm:text-[15px]">
            {aboutWorkflowClosing}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function ToolsBentoCard() {
  const groupsById = new Map(
    aboutWorkflowToolGroups.map((group) => [group.id, group]),
  );

  return (
    <article className={cn(aboutBentoCardClass, "w-full")}>
      <div className="flex flex-col gap-3">
        {TOOL_GROUP_ROWS.map((rowIds) => (
          <div
            key={rowIds.join("-")}
            className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2"
          >
            {rowIds.map((id) => {
              const group = groupsById.get(id);
              if (!group) return null;
              return <ToolGroupRow key={group.id} group={group} />;
            })}
          </div>
        ))}
      </div>
    </article>
  );
}

function ToolGroupRow({ group }: { group: AboutWorkflowToolGroup }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <span className="text-muted-foreground label-caps shrink-0 tracking-widest">
        {group.label}
      </span>
      <ul className="flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <li key={item.label}>
            <ToolChip item={item} />
          </li>
        ))}
      </ul>
    </div>
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

function WorkflowStepCard({ step }: { step: AboutWorkflowStep }) {
  const Icon = STEP_ICONS[step.icon];
  const toneClass = aboutStoryToneClass[step.tone];

  return (
    <article
      className={cn(
        aboutBentoCardClass,
        "flex flex-col items-start",
        STEP_LG_COL_SPAN[step.id],
      )}
    >
      <div className="space-y-2.5">
        <h3 className="flex flex-wrap items-center gap-2 gap-y-1.5">
          <span className={aboutStepNumberClass}>
            <Icon className="size-3.5" aria-hidden />
            {step.step}
          </span>
          <span className="font-heading text-foreground text-base font-semibold tracking-tight sm:text-lg">
            {step.title}
          </span>
        </h3>
        <p className="text-muted-foreground text-[14px] leading-relaxed">
          {step.description}
        </p>
      </div>
      <p className={cn("mt-3 text-[12px] font-medium", toneClass)}>
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
    <article className={cn(aboutBentoCardClass, "flex flex-col items-start")}>
      <h3
        className={cn(
          "font-heading text-base font-semibold tracking-tight sm:text-lg",
          toneClass,
        )}
      >
        {title}
      </h3>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item}>
            <span
              className={cn(
                aboutBentoChipClass,
                tone === "accent" &&
                  "border-brand-accent/30 text-foreground bg-brand-accent/5",
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
