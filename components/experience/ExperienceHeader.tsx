import Link from "next/link";
import { ArrowLeft, Download, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { experienceIntro } from "@/lib/experience";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ExperienceHeader() {
  return (
    <section className="flex w-full flex-col gap-4 pt-2 pb-6 md:pt-4 md:pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4 text-primary" aria-hidden />
            <span>{experienceIntro.breadcrumbRoot}</span>
          </Link>
          <span className="text-border" aria-hidden>
            /
          </span>
          <span className="text-foreground">
            {experienceIntro.breadcrumbLeaf}
          </span>
        </nav>

        <Badge
          variant="secondary"
          className="gap-2 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest text-primary uppercase"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {experienceIntro.tenureBadge}
        </Badge>
      </div>

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            {experienceIntro.eyebrow}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {experienceIntro.title}
          </h1>
          <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
            {experienceIntro.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={site.links.email}
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "h-9 gap-2 font-mono text-[13px]",
            )}
          >
            <Terminal className="size-4 text-primary" aria-hidden />
            Contact Recruiter
          </a>
          <a
            href={site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-9 gap-2 font-mono text-[13px] font-semibold shadow-[0_0_16px_rgba(78,222,163,0.25)]",
            )}
          >
            <Download className="size-4" aria-hidden />
            CV.pdf
          </a>
        </div>
      </div>
    </section>
  );
}
