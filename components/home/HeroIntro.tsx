import { ArrowRightIcon, FileTextIcon, MailIcon } from "lucide-react";

import { HeroProofCard } from "@/components/home/HeroProofCard";
import { buttonVariants } from "@/components/ui/button";
import { heroCtas } from "@/lib/hero";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const accentButtonClassName = "bg-[#4cd7f6] text-[#042028] hover:bg-[#3bc4e3]";

export function HeroHeadline() {
  return (
    <div className="hero-signal-headline relative w-full min-w-0 text-left">
      <h1
        id="hero-heading"
        className={cn(
          "hero-enter hero-enter--0 font-heading text-left text-[2.65rem] font-bold text-balance sm:text-6xl xl:text-7xl",
          "bg-linear-to-br from-[#4cd7f6] to-[#2dd4bf] bg-clip-text text-transparent",
          "max-w-[16ch] sm:max-w-none",
        )}
      >
        {site.fullName}
      </h1>

      <p
        className={cn(
          "hero-enter hero-enter--1 text-muted-foreground mt-3 text-left text-lg font-medium tracking-tight md:mt-4 md:text-xl md:whitespace-nowrap",
        )}
      >
        {site.role}
      </p>

      <p
        className={cn(
          "hero-enter hero-enter--2 text-foreground/80 mt-5 max-w-[65ch] text-left text-lg leading-[1.7] sm:text-xl md:mt-6",
        )}
      >
        {site.heroBio}
      </p>

      <div className="hero-enter hero-enter--3 mt-6 flex w-full flex-wrap items-start justify-start gap-3 md:mt-8 md:gap-4">
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
    </div>
  );
}

export function HeroProduction() {
  return (
    <div className="hero-enter hero-enter--4 mt-10 w-full md:mt-12">
      <p className="text-muted-foreground mb-4 text-left font-mono text-[11px] tracking-[0.16em] uppercase">
        Production
      </p>
      <nav
        aria-label="Selected production work"
        className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6"
      >
        {site.proof.map((item) => (
          <HeroProofCard
            key={item.id}
            href={item.href}
            label={item.label}
            meta={item.meta}
          />
        ))}
      </nav>
    </div>
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
