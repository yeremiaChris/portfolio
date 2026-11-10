"use client";

import { ArrowRightIcon, FileTextIcon, MailIcon } from "lucide-react";

import { HeroHighlightPhrase } from "@/components/home/HeroHighlightPhrase";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { buttonVariants } from "@/components/ui/button-variants";
import { getExperienceLabel } from "@/lib/career";
import { heroCtas } from "@/lib/hero";
import { cn } from "@/lib/utils";

const accentButtonClassName =
  "bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover";

const HIGHLIGHT_STAGGER_S = 0.14;

type HeroHeadlineCopyProps = {
  highlightActive?: boolean;
};

export function HeroHeadlineCopy({
  highlightActive = false,
}: HeroHeadlineCopyProps) {
  const yearsLabel = getExperienceLabel();

  return (
    <Stagger when="mount" preset="expressive" className="w-full min-w-0">
      <StaggerItem>
        <p
          className={cn(
            "text-muted-foreground mt-2 text-left text-lg font-medium tracking-tight md:mt-3 md:text-xl md:whitespace-nowrap",
          )}
        >
          Software Engineer ·{" "}
          <HeroHighlightPhrase active={highlightActive} delay={0}>
            Frontend-Heavy
          </HeroHighlightPhrase>
        </p>
      </StaggerItem>

      <StaggerItem>
        <p
          className={cn(
            "text-foreground/80 mt-5 max-w-[65ch] text-left text-lg leading-[1.7] sm:text-xl md:mt-6",
          )}
        >
          {yearsLabel} years on frontend-heavy platforms across{" "}
          <HeroHighlightPhrase
            active={highlightActive}
            delay={HIGHLIGHT_STAGGER_S}
          >
            health-tech (HIS/EMR) and logistics
          </HeroHighlightPhrase>{" "}
          — React, Next.js, and Vue.
        </p>
      </StaggerItem>

      <StaggerItem>
        <div className="mt-6 grid w-full max-w-full grid-cols-2 gap-3 md:mt-8 md:flex md:flex-wrap md:items-start md:justify-start md:gap-4">
          <a
            href={heroCtas.primary.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              accentButtonClassName,
              "col-span-2 h-12 w-full min-w-0 justify-center px-4 text-base sm:px-6 md:col-span-1 md:w-auto",
            )}
          >
            <MailIcon className="size-5 shrink-0" />
            {heroCtas.primary.label}
          </a>
          <a
            href={heroCtas.secondary.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 w-full min-w-0 justify-center px-3 text-base sm:px-4 md:w-auto md:px-6",
            )}
          >
            <span className="truncate">{heroCtas.secondary.label}</span>
            <ArrowRightIcon className="size-5 shrink-0" />
          </a>
          <a
            href={heroCtas.resume.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 w-full min-w-0 justify-center px-3 text-base sm:px-4 md:w-auto md:px-6",
            )}
          >
            <FileTextIcon className="size-5 shrink-0" />
            <span className="truncate">{heroCtas.resume.label}</span>
          </a>
        </div>
      </StaggerItem>
    </Stagger>
  );
}
