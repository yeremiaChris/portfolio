import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  coreTools,
  secondaryTechCategories,
  techStackIntro,
} from "@/lib/tech-stack";

function CoreToolCard({ title, context }: { title: string; context: string }) {
  return (
    <Card className="bg-muted ring-border/20 rounded-2xl ring-1">
      <CardHeader className="gap-1.5 pb-2">
        <CardTitle className="font-heading text-foreground text-base font-semibold tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-[13px] leading-snug">
          {context}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function SecondaryTechGroup({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <h3 className="text-muted-foreground font-mono text-[11px] tracking-wider uppercase">
        {title}
      </h3>
      <p className="text-foreground/90 text-[13px] leading-relaxed">
        {items.join(" · ")}
      </p>
    </div>
  );
}

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="w-full py-16 md:py-24"
    >
      <Container className="flex flex-col gap-10">
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
            <span className="font-semibold text-[#4cd7f6]">
              {techStackIntro.focusValue}
            </span>
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {coreTools.map((tool) => (
            <CoreToolCard
              key={tool.id}
              title={tool.title}
              context={tool.context}
            />
          ))}
        </div>

        <div className="ring-border/20 rounded-3xl bg-[#0a0e14]/60 px-5 py-6 ring-1 md:px-8 md:py-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {secondaryTechCategories.map((category) => (
              <SecondaryTechGroup
                key={category.id}
                title={category.title}
                items={category.items}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
