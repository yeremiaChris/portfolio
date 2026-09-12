import { Cloud, Database, LayoutGrid, type LucideIcon } from "lucide-react";

import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  techBadgeClass,
  techCategories,
  techDotClass,
  techStackIntro,
  techToneClass,
  type TechCategory,
  type TechTone,
} from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

const categoryIcons: Record<TechCategory["icon"], LucideIcon> = {
  layout: LayoutGrid,
  database: Database,
  cloud: Cloud,
};

function TechCategoryCard({ category }: { category: TechCategory }) {
  const Icon = categoryIcons[category.icon];

  return (
    <Card className="bg-muted ring-border/20 flex h-full flex-col rounded-3xl">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle
            className={cn(
              "font-heading flex items-center gap-2 text-lg font-semibold tracking-tight",
            )}
          >
            <Icon
              className={cn("size-5 shrink-0", techToneClass[category.tone])}
              aria-hidden
            />
            <h3>{category.title}</h3>
          </CardTitle>
          <Badge
            variant="secondary"
            className={cn(
              "font-mono text-[10px] tracking-wider uppercase",
              techBadgeClass[category.tone],
            )}
          >
            {category.badge}
          </Badge>
        </div>
        <CardDescription className="text-[14px] leading-relaxed">
          {category.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto">
        <ul className="flex flex-wrap gap-2 pt-1">
          {category.items.map((item) => (
            <li key={item.name}>
              <TechChip name={item.name} tone={item.tone} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function TechChip({ name, tone }: { name: string; tone: TechTone }) {
  return (
    <span className="text-foreground ring-border/20 inline-flex items-center gap-1.5 rounded-lg bg-[#0a0e14] px-3 py-1.5 font-mono text-[12px] shadow-sm ring-1">
      <span
        className={cn("size-1.5 shrink-0 rounded-full", techDotClass[tone])}
        aria-hidden
      />
      {name}
    </span>
  );
}

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="w-full py-16 md:py-24"
    >
      <Container className="flex flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-1">
            <Badge
              variant="secondary"
              className="text-primary mb-1 w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest uppercase"
            >
              <span className="bg-primary size-2.5 rounded-full" aria-hidden />
              {techStackIntro.eyebrow}
            </Badge>
            <h2
              id="tech-stack-heading"
              className="font-heading text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {techStackIntro.title}
            </h2>
            <p className="text-muted-foreground text-[15px] leading-6">
              {techStackIntro.description}
            </p>
          </div>
          <p className="text-muted-foreground font-mono text-[13px]">
            {techStackIntro.focusLabel}{" "}
            <span className="text-primary font-semibold">
              {techStackIntro.focusValue}
            </span>
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {techCategories.map((category) => (
            <TechCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
