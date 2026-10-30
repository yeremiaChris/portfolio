import { ArrowRightIcon, FileTextIcon } from "lucide-react";

import { HeroProofCard } from "@/components/home/HeroProofCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroIntro() {
  return (
    <div className="flex w-full flex-col items-start text-left">
      <div className="hero-signal-headline relative w-full max-w-[900px]">
        <Badge
          variant="secondary"
          className={cn(
            "hero-enter hero-enter--0 bg-secondary/80 text-primary mb-12 h-auto gap-1.5 border border-white/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] uppercase backdrop-blur-sm md:mb-14",
          )}
        >
          <span className="relative flex size-2">
            <span className="bg-primary relative inline-flex size-2 rounded-full" />
          </span>
          {site.availability}
        </Badge>

        <h1
          id="hero-heading"
          className={cn(
            "hero-enter hero-enter--1 font-heading text-left text-5xl font-bold tracking-[-0.03em] text-balance md:text-7xl md:leading-[1.05]",
            "bg-linear-to-br from-[#4cd7f6] to-[#2dd4bf] bg-clip-text text-transparent",
          )}
        >
          {site.fullName}
        </h1>

        <p
          className={cn(
            "hero-enter hero-enter--2 text-muted-foreground mt-5 text-left text-lg font-medium tracking-tight md:mt-6 md:text-xl md:whitespace-nowrap",
          )}
        >
          {site.role}
        </p>

        <p
          className={cn(
            "hero-enter hero-enter--3 text-muted-foreground mt-8 line-clamp-2 max-w-2xl text-left text-lg leading-relaxed sm:text-xl sm:leading-8 md:mt-10",
          )}
        >
          {site.heroBio}
        </p>
      </div>

      <div className="hero-enter hero-enter--4 mt-12 w-full md:mt-16">
        <p className="text-muted-foreground mb-5 text-left font-mono text-[11px] tracking-[0.16em] uppercase">
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

      <div className="hero-enter hero-enter--5 mt-14 flex w-full flex-wrap items-start justify-start gap-3 sm:mt-16 md:gap-4">
        <a
          href="#work"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 bg-[#4cd7f6] px-6 text-base text-[#042028] hover:bg-[#3bc4e3]",
          )}
        >
          Selected work
          <ArrowRightIcon className="size-5" />
        </a>
        <a
          href={site.links.resume}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-12 px-6 text-base",
          )}
        >
          <FileTextIcon className="size-5" />
          CV (PDF)
        </a>
      </div>
    </div>
  );
}
