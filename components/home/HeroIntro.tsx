import Link from "next/link";
import { ArrowRightIcon, FileTextIcon, SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { labHomeCta } from "@/lib/lab";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const platformStat = site.stats.find((stat) => stat.label === "Platform");

export function HeroIntro() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-start">
      <Badge
        variant="secondary"
        className="bg-secondary text-primary mb-8 h-auto gap-1.5 px-3 py-1 text-[10px] font-medium tracking-[0.08em] uppercase"
      >
        <span className="relative flex size-2">
          <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-80" />
          <span className="bg-primary relative inline-flex size-2 rounded-full" />
        </span>
        {site.availability}
      </Badge>

      <h1
        id="hero-heading"
        className="font-heading text-foreground mb-4 text-[1.75rem] font-bold tracking-tight sm:text-4xl sm:leading-tight md:text-[2.75rem] md:leading-[1.12]"
      >
        {site.role}
      </h1>

      <p className="mb-6 text-lg font-semibold tracking-tight text-[#4cd7f6] sm:text-xl">
        {site.fullName}
      </p>

      <p className="text-muted-foreground mb-10 text-base leading-relaxed sm:text-lg sm:leading-8">
        {site.heroBio}
      </p>

      <nav
        aria-label="Selected production work"
        className="border-border/60 mb-12 flex w-full flex-wrap items-center gap-x-3 gap-y-2 border-y py-5"
      >
        <span className="text-muted-foreground w-full font-mono text-[10px] tracking-[0.16em] uppercase sm:w-auto sm:shrink-0">
          Production
        </span>
        {site.proof.map((item, index) => (
          <span key={item.id} className="inline-flex items-center gap-3">
            {index > 0 ? (
              <span
                aria-hidden
                className="text-border hidden h-4 w-px bg-current opacity-40 sm:inline-block"
              />
            ) : null}
            <a
              href={item.href}
              className="group text-muted-foreground hover:text-foreground inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5 transition-colors"
            >
              <span className="text-foreground font-mono text-[13px] font-medium">
                {item.label}
              </span>
              <span className="font-mono text-[11px] tracking-wide uppercase sm:tracking-normal sm:normal-case">
                {item.id === "primaku" && platformStat
                  ? `${platformStat.value} ${platformStat.detail}`
                  : item.meta}
              </span>
            </a>
          </span>
        ))}
      </nav>

      <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
        <a
          href="#work"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hover:bg-primary bg-[#10b981] text-[#00422b]",
          )}
        >
          Selected work
          <ArrowRightIcon />
        </a>
        <a
          href={site.links.resume}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "border-border/60",
          )}
        >
          <FileTextIcon />
          CV (PDF)
        </a>
        <Link
          href={labHomeCta.href}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "border border-[#4cd7f6]/35 bg-[#4cd7f6]/10 text-[#4cd7f6]",
            "hover:bg-[#4cd7f6]/15 hover:text-[#4cd7f6]",
            "focus-visible:ring-2 focus-visible:ring-[#4cd7f6]/50",
          )}
        >
          <SparklesIcon />
          {labHomeCta.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
