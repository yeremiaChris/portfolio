import { Container } from "@/components/Container";
import { HomeSpotlightSurface } from "@/components/home/HomeSpotlightSurface";
import { TechStackSecondaryCategories } from "@/components/home/TechStackSecondaryCategories";
import { homeBentoCardClass } from "@/components/home/homeSurface";
import { TechStackIcon } from "@/components/home/TechStackIcon";
import { SectionIntro } from "@/components/typography/SectionTypography";
import { sectionEyebrowClass } from "@/components/typography/typography-tokens";
import { getCoreToolIcon } from "@/lib/tech-stack-icons";
import { coreTools, techStackIntro } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

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

        <HomeSpotlightSurface
          className={cn(
            homeBentoCardClass,
            "flex flex-col overflow-hidden p-0 lg:flex-row lg:items-stretch",
          )}
        >
          <div className="border-border/40 flex flex-col gap-4 border-b p-5 md:p-6 lg:w-[40%] lg:shrink-0 lg:border-r lg:border-b-0">
            <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
              <span className={sectionEyebrowClass}>
                {techStackIntro.focusLabel}
              </span>
              <span className="text-brand-accent text-[13px] font-semibold tracking-tight">
                {techStackIntro.focusValue}
              </span>
            </p>
            <ul className="flex flex-col gap-3.5">
              {coreTools.map((tool) => (
                <li key={tool.id} className="flex min-w-0 items-start gap-3">
                  <TechStackIcon
                    icon={getCoreToolIcon(tool.id)}
                    className="text-muted-foreground/75 mt-0.5"
                  />
                  <p className="min-w-0">
                    <span className="font-heading text-foreground block text-[15px] font-semibold tracking-tight">
                      {tool.title}
                    </span>
                    <span className="text-muted-foreground block text-[12px] leading-snug">
                      {tool.context}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <TechStackSecondaryCategories />
        </HomeSpotlightSurface>
      </Container>
    </section>
  );
}
