import {
  FolderGit2,
  GitCompare,
  ShieldCheck,
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
  aboutWorkflowIntro,
  type AboutWorkflowBeat,
} from "@/lib/about";
import { cn } from "@/lib/utils";

const BEAT_ICONS: Record<AboutWorkflowBeat["icon"], LucideIcon> = {
  plan: FolderGit2,
  review: GitCompare,
  gate: ShieldCheck,
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {aboutWorkflowBeats.map((beat) => (
          <WorkflowBeatCard key={beat.id} beat={beat} />
        ))}
      </div>
    </section>
  );
}

function WorkflowBeatCard({ beat }: { beat: AboutWorkflowBeat }) {
  const Icon = BEAT_ICONS[beat.icon];
  const toneClass = aboutStoryToneClass[beat.tone];

  return (
    <Card className="bg-muted ring-border/20 flex h-full flex-col justify-between rounded-3xl">
      <CardHeader className="gap-4">
        <div className="flex items-center justify-between gap-2">
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
