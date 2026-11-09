import { ArrowRightIcon, FileTextIcon, MailIcon } from "lucide-react";

import { HeroProduction } from "@/components/home/HeroProduction";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { buttonVariants } from "@/components/ui/button-variants";
import { heroCtas } from "@/lib/hero";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const accentButtonClassName =
  "bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover";

export function HeroHeadline() {
  return (
    <Stagger
      when="mount"
      className="hero-signal-headline relative w-full min-w-0 text-left"
    >
      <StaggerItem>
        <h1
          id="hero-heading"
          className={cn(
            "font-heading text-left text-[2.65rem] font-bold text-balance sm:text-6xl xl:text-7xl",
            "from-brand-accent to-brand-accent/70 bg-linear-to-br bg-clip-text text-transparent",
            "max-w-[16ch] sm:max-w-none",
          )}
        >
          {site.fullName}
        </h1>
      </StaggerItem>

      <StaggerItem>
        <p
          className={cn(
            "text-muted-foreground mt-3 text-left text-lg font-medium tracking-tight md:mt-4 md:text-xl md:whitespace-nowrap",
          )}
        >
          {site.role}
        </p>
      </StaggerItem>

      <StaggerItem>
        <p
          className={cn(
            "text-foreground/80 mt-5 max-w-[65ch] text-left text-lg leading-[1.7] sm:text-xl md:mt-6",
          )}
        >
          {site.heroBio}
        </p>
      </StaggerItem>

      <StaggerItem>
        <div className="mt-6 flex w-full flex-wrap items-start justify-start gap-3 md:mt-8 md:gap-4">
          <a
            href={heroCtas.primary.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              accentButtonClassName,
              "h-12 px-6 text-base",
            )}
          >
            <MailIcon className="size-5" />
            {heroCtas.primary.label}
          </a>
          <a
            href={heroCtas.secondary.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-6 text-base",
            )}
          >
            {heroCtas.secondary.label}
            <ArrowRightIcon className="size-5" />
          </a>
          <a
            href={heroCtas.resume.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-6 text-base",
            )}
          >
            <FileTextIcon className="size-5" />
            {heroCtas.resume.label}
          </a>
        </div>
      </StaggerItem>
    </Stagger>
  );
}

export function HeroIntro() {
  return (
    <div className="flex w-full flex-col items-start text-left">
      <HeroHeadline />
      <HeroProduction />
    </div>
  );
}
