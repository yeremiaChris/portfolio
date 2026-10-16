import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { askYeremia, labHomeCta } from "@/lib/lab";
import { cn } from "@/lib/utils";

export function LabCta() {
  const headingId = `${labHomeCta.id}-heading`;

  return (
    <section
      id={labHomeCta.id}
      aria-labelledby={headingId}
      className="w-full py-16 md:py-24"
    >
      <Container>
        <div className="bg-muted ring-border/20 relative flex flex-col gap-8 overflow-hidden rounded-3xl p-8 shadow-xl ring-1 md:gap-10 md:p-12">
          <div
            className="pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-[#4cd7f6]/15 blur-3xl"
            aria-hidden
          />
          <div
            className="bg-primary/10 pointer-events-none absolute -right-20 -bottom-24 size-80 rounded-full blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-2xl flex-col">
              <Badge
                variant="secondary"
                className="mb-3 w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest text-[#4cd7f6] uppercase"
              >
                <span
                  className="size-2 animate-pulse rounded-full bg-[#4cd7f6]"
                  aria-hidden
                />
                {labHomeCta.eyebrow}
              </Badge>
              <h2
                id={headingId}
                className="font-heading text-foreground text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {labHomeCta.title}
              </h2>
              <p className="text-muted-foreground mt-3 text-[15px] leading-6">
                {labHomeCta.description}
              </p>
            </div>

            <Link
              href={labHomeCta.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 shrink-0 gap-2 px-5 text-[15px] font-semibold",
                "bg-[#4cd7f6] text-[#0a0e14] hover:bg-[#4cd7f6]/90",
                "shadow-[0_0_24px_rgba(76,215,246,0.28)]",
                "focus-visible:ring-2 focus-visible:ring-[#4cd7f6]/50",
              )}
            >
              <SparklesIcon className="size-4" aria-hidden />
              {labHomeCta.ctaLabel}
              <ArrowRightIcon className="size-4 transition-transform group-hover/button:translate-x-0.5" />
            </Link>
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            <span className="text-muted-foreground font-mono text-[10px] tracking-[0.16em] uppercase">
              Try asking
            </span>
            <ul className="flex flex-wrap gap-2">
              {askYeremia.suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <Link
                    href={labHomeCta.href}
                    className={cn(
                      "bg-background/60 text-muted-foreground ring-border/40",
                      "hover:text-foreground hover:ring-[#4cd7f6]/40",
                      "inline-flex max-w-full items-center rounded-full px-3.5 py-2",
                      "font-mono text-[12px] leading-snug ring-1 transition-colors",
                    )}
                  >
                    {suggestion}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
