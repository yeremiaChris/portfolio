import Link from "next/link";
import { ArrowLeft, Download, MessageCircle, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { aboutIntro } from "@/lib/about";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AboutHeader() {
  return (
    <section className="relative flex w-full flex-col gap-6 pt-2 pb-8 md:pt-4 md:pb-10">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-[min(100%,54rem)] -translate-x-1/2 bg-linear-to-b from-primary/10 via-primary/5 to-transparent blur-3xl"
        aria-hidden
      />

      <Card className="rounded-xl bg-muted py-0 ring-border/40">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5">
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-2 truncate font-mono text-[12px] text-muted-foreground"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary/80"
            >
              <ArrowLeft className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{aboutIntro.breadcrumbRoot}</span>
            </Link>
            <span className="text-border" aria-hidden>
              /
            </span>
            <span className="truncate text-foreground">
              {aboutIntro.breadcrumbLeaf}
            </span>
          </nav>

          <Badge
            variant="secondary"
            className="gap-2 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest text-primary uppercase"
          >
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            {aboutIntro.statusBadge}
          </Badge>
        </CardContent>
      </Card>

      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            <Terminal className="size-3.5 text-primary" aria-hidden />
            {aboutIntro.eyebrow}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {aboutIntro.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {aboutIntro.description}
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          <Link
            href={site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-11 w-full gap-2 px-6 text-[14px] font-semibold shadow-[0_0_24px_rgba(78,222,163,0.28)] sm:w-auto",
            )}
          >
            <Download className="size-4" aria-hidden />
            {aboutIntro.resumeLabel}
          </Link>
          <Link
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "h-11 w-full gap-2 px-6 text-[14px] font-medium sm:w-auto",
            )}
          >
            <MessageCircle className="size-4 text-primary" aria-hidden />
            {aboutIntro.chatLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
