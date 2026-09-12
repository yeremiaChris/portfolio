import { Code2, LayoutGrid, Network, type LucideIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  experienceDisciplines,
  experienceDisciplinesIntro,
  experienceRoleToneClass,
  type ExperienceDiscipline,
} from "@/lib/experience";
import { cn } from "@/lib/utils";

const DISCIPLINE_ICONS: Record<ExperienceDiscipline["icon"], LucideIcon> = {
  layout: LayoutGrid,
  network: Network,
  code: Code2,
};

export function ExperienceDisciplines() {
  return (
    <section
      aria-labelledby="disciplines-heading"
      className="mb-12 w-full md:mb-16"
    >
      <header className="mb-6">
        <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
          {experienceDisciplinesIntro.eyebrow}
        </p>
        <h2
          id="disciplines-heading"
          className="font-heading text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {experienceDisciplinesIntro.title}
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {experienceDisciplines.map((item) => (
          <DisciplineCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function DisciplineCard({ item }: { item: ExperienceDiscipline }) {
  const Icon = DISCIPLINE_ICONS[item.icon];
  const toneClass = experienceRoleToneClass[item.tone];

  return (
    <Card className="bg-muted ring-border/20 flex h-full flex-col justify-between rounded-3xl">
      <CardHeader className="gap-4">
        <div
          className={cn(
            "bg-secondary flex size-10 items-center justify-center rounded-lg",
            toneClass,
          )}
        >
          <Icon className="size-6" aria-hidden />
        </div>
        <div className="space-y-2">
          <CardTitle className="font-heading text-lg font-semibold tracking-tight">
            <h3>{item.title}</h3>
          </CardTitle>
          <CardDescription className="text-[14px] leading-relaxed">
            {item.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="border-t-0 bg-transparent">
        <p className={cn("font-mono text-[12px]", toneClass)}>{item.footer}</p>
      </CardFooter>
    </Card>
  );
}
