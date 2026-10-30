import { ArrowRightIcon, FileTextIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroIntro() {
  return (
    <div className="flex w-full flex-col items-start text-left">
      <div className="w-full max-w-[900px]">
        <Badge
          variant="secondary"
          className="bg-secondary text-primary mb-10 h-auto gap-1.5 px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] uppercase md:mb-12"
        >
          <span className="relative flex size-2">
            <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-80" />
            <span className="bg-primary relative inline-flex size-2 rounded-full" />
          </span>
          {site.availability}
        </Badge>

        <h1
          id="hero-heading"
          className="font-heading text-foreground text-left text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl md:leading-[1.08]"
        >
          {site.heroTitle}
        </h1>

        <p className="text-muted-foreground mt-4 text-left text-xl font-medium tracking-tight text-balance sm:text-2xl md:mt-5">
          {site.heroSubtitle}
        </p>

        <p className="mt-5 text-left text-xl font-semibold tracking-tight text-[#4cd7f6] sm:text-2xl md:mt-6">
          {site.fullName}
        </p>

        <p className="text-muted-foreground mt-8 text-left text-lg leading-relaxed sm:text-xl sm:leading-8 md:mt-10">
          {site.heroBio}
        </p>
      </div>

      <div className="mt-10 w-full md:mt-12">
        <p className="text-muted-foreground mb-4 text-left font-mono text-[11px] tracking-[0.16em] uppercase">
          Production
        </p>
        <nav
          aria-label="Selected production work"
          className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6"
        >
          {site.proof.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="border-border/50 bg-muted/50 hover:bg-muted group flex flex-col items-start gap-2 rounded-xl border px-4 py-4 text-left transition-colors sm:px-5 sm:py-5"
            >
              <span className="text-foreground font-mono text-[15px] font-semibold sm:text-base">
                {item.label}
              </span>
              <span className="text-muted-foreground group-hover:text-foreground text-sm leading-snug sm:text-[15px]">
                {item.meta}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-12 flex w-full flex-wrap items-start justify-start gap-3 sm:mt-14 md:gap-4">
        <a
          href="#work"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hover:bg-primary h-12 bg-[#10b981] px-6 text-base text-[#00422b]",
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
