import { Container } from "@/components/Container";
import {
  homeBentoCardClass,
  homeBentoChipClass,
} from "@/components/home/homeSurface";
import { SectionIntro } from "@/components/typography/SectionTypography";
import { sectionEyebrowClass } from "@/components/typography/typography-tokens";
import {
  coreTools,
  secondaryTechCategories,
  techStackIntro,
} from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

function CoreToolMiniCard({
  title,
  context,
}: {
  title: string;
  context: string;
}) {
  return (
    <div className="border-border/50 bg-background/35 flex min-w-0 flex-col gap-1 rounded-xl border p-3 md:p-3.5">
      <p className="font-heading text-foreground text-[14px] font-semibold tracking-tight">
        {title}
      </p>
      <p className="text-muted-foreground text-[12px] leading-snug">
        {context}
      </p>
    </div>
  );
}

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="w-full py-12 md:py-16"
    >
      <Container className="flex flex-col gap-8 md:gap-10">
        <SectionIntro
          eyebrow={techStackIntro.eyebrow}
          title={techStackIntro.title}
          description={techStackIntro.description}
          headingId="tech-stack-heading"
        />

        <div className="flex flex-col gap-4 md:gap-5">
          <div
            className={cn(homeBentoCardClass, "flex flex-col gap-4 p-5 md:p-6")}
          >
            <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
              <span className={sectionEyebrowClass}>
                {techStackIntro.focusLabel}
              </span>
              <span className="text-brand-accent text-[13px] font-semibold tracking-tight">
                {techStackIntro.focusValue}
              </span>
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {coreTools.map((tool) => (
                <CoreToolMiniCard
                  key={tool.id}
                  title={tool.title}
                  context={tool.context}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {secondaryTechCategories.map((category) => (
              <div
                key={category.id}
                className={cn(
                  homeBentoCardClass,
                  "flex h-auto flex-col gap-3 self-start p-5 md:p-6",
                )}
              >
                <h3 className={sectionEyebrowClass}>{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className={homeBentoChipClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
