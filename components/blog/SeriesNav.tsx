import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { SeriesItem } from "@/lib/blog-series";

export function SeriesNav({
  prev,
  next,
}: {
  prev: SeriesItem | null;
  next: SeriesItem | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Series navigation"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group bg-muted/40 ring-border/40 hover:bg-muted/70 flex flex-col gap-1 rounded-lg px-4 py-3 ring-1 transition-colors motion-reduce:transition-none"
        >
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-medium">
            <ArrowLeft className="text-primary size-3.5" aria-hidden />
            Part {prev.part}
          </span>
          <span className="font-heading text-foreground group-hover:text-primary text-[15px] leading-snug font-medium transition-colors motion-reduce:transition-none">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group bg-muted/40 ring-border/40 hover:bg-muted/70 flex flex-col gap-1 rounded-lg px-4 py-3 text-right ring-1 transition-colors motion-reduce:transition-none sm:items-end"
        >
          <span className="text-muted-foreground flex items-center gap-1.5 self-end text-[11px] font-medium">
            Part {next.part}
            <ArrowRight className="text-primary size-3.5" aria-hidden />
          </span>
          <span className="font-heading text-foreground group-hover:text-primary text-[15px] leading-snug font-medium transition-colors motion-reduce:transition-none">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
