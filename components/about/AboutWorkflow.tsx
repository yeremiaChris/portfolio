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
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export function AboutWorkflow() {
  return (
    <section
      aria-labelledby="about-workflow-heading"
      className="mb-8 w-full md:mb-12"
    >
      <header className="mb-6 max-w-2xl">
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
      </header>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {aboutWorkflowToolGroups.map((group) => (
          <ToolGroupCard key={group.id} group={group} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 xl:gap-4">
        {aboutWorkflowSteps.map((step) => (
          <WorkflowStepCard key={step.id} step={step} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
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

      <figure className="border-brand-accent/30 bg-muted/40 ring-border/20 mt-8 max-w-3xl rounded-2xl border-l-2 px-5 py-4 ring-1">
        <blockquote className="text-foreground text-[15px] leading-relaxed">
          {aboutWorkflowExample.beforeLink}
          <Link
            href={aboutWorkflowExample.linkHref}
            className="text-brand-accent hover:text-brand-accent/80 underline-offset-4 transition-colors duration-200 hover:underline motion-reduce:transition-none"
          >
            {aboutWorkflowExample.linkLabel}
          </Link>
          {aboutWorkflowExample.afterLink}
        </blockquote>
      </figure>

      <p className="text-muted-foreground mt-6 max-w-2xl text-[15px] leading-relaxed">
        {aboutWorkflowClosing}
      </p>
    </section>
  );
}

function ToolGroupCard({ group }: { group: AboutWorkflowToolGroup }) {
  return (
    <Card className="group bg-muted ring-border/20 hover:bg-muted/90 hover:ring-primary/25 h-full rounded-2xl transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none">
      <CardHeader className="gap-2 px-4 py-4 sm:px-5">
        <p className="text-muted-foreground label-caps tracking-widest">
          {group.label}
        </p>
        <ul className="text-foreground space-y-1 text-[13px] leading-snug font-medium">
          {group.items.map((item) => (
            <li key={item.label}>
              <ToolItem item={item} />
            </li>
          ))}
        </ul>
      </CardHeader>
    </Card>
  );
}

function ToolItem({ item }: { item: AboutWorkflowToolItem }) {
  if (item.href) {
    return (
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent hover:text-brand-accent/80 underline-offset-4 transition-colors duration-200 hover:underline motion-reduce:transition-none"
      >
        {item.label}
      </Link>
    );
  }

  return <span>{item.label}</span>;
}

function WorkflowStepCard({ step }: { step: AboutWorkflowStep }) {
  const Icon = STEP_ICONS[step.icon];
  const toneClass = aboutStoryToneClass[step.tone];

  return (
    <Card
      className={cn(
        "group bg-muted ring-border/20 hover:bg-muted/90 hover:ring-primary/25 flex h-full flex-col justify-between rounded-3xl transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none",
      )}
    >
      <CardHeader className="gap-4">
        <div className="flex items-center justify-between gap-2">
          <div
            className={cn(
              "bg-secondary group-hover:text-brand-accent flex size-10 items-center justify-center rounded-lg transition-colors duration-200 motion-reduce:transition-none",
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
        <div className="space-y-2">
          <CardTitle className="font-heading text-lg font-semibold tracking-tight">
            <h3>{step.title}</h3>
          </CardTitle>
          <CardDescription className="text-[14px] leading-relaxed">
            {step.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="border-t-0 bg-transparent">
        <p className={cn("text-[12px]", toneClass)}>{step.footer}</p>
      </CardFooter>
    </Card>
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
    <Card className="group bg-muted ring-border/20 hover:bg-muted/90 hover:ring-primary/25 rounded-3xl transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none">
      <CardHeader className="gap-3">
        <CardTitle
          className={cn(
            "font-heading text-lg font-semibold tracking-tight",
            toneClass,
          )}
        >
          <h3>{title}</h3>
        </CardTitle>
        <ul className="text-muted-foreground space-y-2 text-[14px] leading-relaxed">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
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
      </CardHeader>
    </Card>
  );
}
