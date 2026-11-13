import { Container } from "@/components/Container";
import {
  homePanelClass,
  homePanelDividerClass,
  homePanelHairlineClass,
  homeSectionSpacingClass,
  homeSectionStackClass,
} from "@/components/home/homeSurface";
import { TechStackIcon } from "@/components/home/TechStackIcon";
import { SectionWithReveal } from "@/components/motion/SectionWithReveal";
import { SectionIntro } from "@/components/typography/SectionTypography";
import { sectionEyebrowClass } from "@/components/typography/typography-tokens";
import { getCoreToolIcon, getTechChipIcon } from "@/lib/tech-stack-icons";
import {
  coreTools,
  secondaryTechCategories,
  techStackIntro,
} from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

const techChipClass =
  "group/chip border-border/55 bg-background/35 text-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium leading-none transition-[border-color] duration-200 hover:border-brand-accent/40 motion-reduce:transition-none sm:text-[13px]";

export function TechStack() {
  return (
    <SectionWithReveal
      id="tech-stack"
      ariaLabelledby="tech-stack-heading"
      className={homeSectionSpacingClass}
    >
      <Container className={homeSectionStackClass}>
        <SectionIntro
          eyebrow={techStackIntro.eyebrow}
          title={techStackIntro.title}
          description={techStackIntro.description}
          headingId="tech-stack-heading"
        />

        <div
          className={cn(
            homePanelClass,
            "relative flex flex-col overflow-hidden p-0 lg:flex-row lg:items-stretch",
          )}
        >
          <div className={homePanelHairlineClass} aria-hidden />
          <div
            className={cn(
              "flex flex-col gap-4 border-b p-5 md:p-6 lg:w-[40%] lg:shrink-0 lg:border-r lg:border-b-0",
              homePanelDividerClass,
              "lg:border-r",
            )}
          >
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

          <div className="grid flex-1 grid-cols-1 md:grid-cols-2 lg:grid lg:grid-cols-3 lg:items-stretch">
            {secondaryTechCategories.map((category, index) => (
              <div
                key={category.id}
                className={cn(
                  "flex h-full min-h-0 flex-col gap-3 p-5 md:p-6",
                  index > 0 && cn("border-t", homePanelDividerClass),
                  index > 0 && "md:border-t-0",
                  index === 1 && cn("md:border-l", homePanelDividerClass),
                  index === 2 &&
                    cn(
                      "md:border-t md:border-l-0 lg:border-t-0 lg:border-l",
                      homePanelDividerClass,
                    ),
                  index > 0 && cn("lg:border-l", homePanelDividerClass),
                )}
              >
                <h3 className={sectionEyebrowClass}>{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className={techChipClass}>
                      <TechStackIcon
                        icon={getTechChipIcon(item)}
                        className="text-muted-foreground/70 group-hover/chip:text-brand-accent transition-colors duration-200 motion-reduce:transition-none"
                      />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWithReveal>
  );
}
