import Link from "next/link";
import {
  GitPullRequestArrow,
  ListChecks,
  Sparkles,
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
  aboutWorkflowBeats,
  aboutWorkflowClosing,
  aboutWorkflowIntro,
  aboutWorkflowToolLink,
  type AboutWorkflowBeat,
} from "@/lib/about";
import { cn } from "@/lib/utils";

const BEAT_ICONS: Record<AboutWorkflowBeat["icon"], LucideIcon> = {
  ticket: Ticket,
  decide: GitPullRequestArrow,
  checks: ListChecks,
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

      <div className="mb-6 max-w-xs">
        <EditorToolChip />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {aboutWorkflowBeats.map((beat) => (
          <WorkflowBeatCard key={beat.id} beat={beat} />
        ))}
      </div>

      <p className="text-muted-foreground mt-6 max-w-2xl text-[15px] leading-relaxed">
        {aboutWorkflowClosing}
      </p>
    </section>
  );
}

function EditorToolChip() {
  return (
    <Link
      href={aboutWorkflowToolLink.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group focus-visible:ring-primary/50 block rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <Card className="bg-muted ring-border/20 group-hover:bg-muted/90 group-hover:ring-primary/30 rounded-2xl transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none">
        <CardHeader className="gap-3">
          <div className="bg-secondary text-primary group-hover:text-brand-accent flex size-9 items-center justify-center rounded-lg transition-colors duration-200 motion-reduce:transition-none">
            <Sparkles className="size-4" aria-hidden />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground label-caps tracking-widest">
              {aboutWorkflowToolLink.detail}
            </p>
            <p className="text-foreground text-[13px] leading-snug font-medium">
              {aboutWorkflowToolLink.name}
            </p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

function WorkflowBeatCard({ beat }: { beat: AboutWorkflowBeat }) {
  const Icon = BEAT_ICONS[beat.icon];
  const toneClass = aboutStoryToneClass[beat.tone];

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
              "bg-secondary group-hover:text-brand-accent flex size-10 items-center justify-center rounded-lg transition-colors duration-200",
              toneClass,
            )}
          >
            <Icon className="size-5" aria-hidden />
          </div>
          <Badge
            variant="secondary"
            className={cn("text-xs tracking-widest", toneClass)}
          >
            {beat.step}
          </Badge>
        </div>
        <div className="space-y-2">
          <CardTitle className="font-heading text-lg font-semibold tracking-tight">
            <h3>{beat.title}</h3>
          </CardTitle>
          <CardDescription className="text-[14px] leading-relaxed">
            {beat.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="border-t-0 bg-transparent">
        <p className={cn("text-[12px]", toneClass)}>{beat.footer}</p>
      </CardFooter>
    </Card>
  );
}
