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

function CoreToolRow({ title, context }: { title: string; context: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <p className="font-heading text-foreground text-[15px] font-semibold tracking-tight">
        {title}
      </p>
      <p className="text-muted-foreground text-[13px] leading-snug">
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

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
          <div
            className={cn(
              homeBentoCardClass,
              "flex flex-col gap-5 p-5 md:p-6 lg:col-span-2",
            )}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <p className={sectionEyebrowClass}>Focus</p>
              <p className="text-muted-foreground text-[13px]">
                {techStackIntro.focusLabel}{" "}
                <span className="text-brand-accent font-semibold">
                  {techStackIntro.focusValue}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {coreTools.map((tool) => (
                <CoreToolRow
                  key={tool.id}
                  title={tool.title}
                  context={tool.context}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            {secondaryTechCategories.map((category) => (
              <div
                key={category.id}
                className={cn(
                  homeBentoCardClass,
                  "flex flex-col gap-3 p-5 md:p-6",
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
