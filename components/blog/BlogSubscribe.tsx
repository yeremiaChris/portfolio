import Link from "next/link";
import { Lock, Mail, Rss } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { blogSubscribe } from "@/lib/blog";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function BlogSubscribe() {
  return (
    <section
      aria-labelledby="blog-subscribe-heading"
      className="mb-6 overflow-hidden rounded-xl bg-muted p-6 ring-1 ring-border/40 md:mb-8 md:p-8"
    >
      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex max-w-xl flex-col gap-2">
          <Badge
            variant="secondary"
            className="w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest text-primary uppercase"
          >
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            {blogSubscribe.eyebrow}
          </Badge>
          <h2
            id="blog-subscribe-heading"
            className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {blogSubscribe.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {blogSubscribe.description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href={blogSubscribe.rssHref}
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-10 gap-1.5 sm:min-w-40",
            )}
          >
            <Rss className="size-3.5" aria-hidden />
            {blogSubscribe.rssLabel}
          </Link>
          <a
            href={site.links.email}
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "h-10 gap-1.5",
            )}
          >
            <Mail className="size-3.5" aria-hidden />
            {blogSubscribe.emailLabel}
          </a>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border/40 pt-4 font-mono text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3.5 text-primary" aria-hidden />
          {blogSubscribe.privacyNote}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Rss className="size-3.5 text-[#4cd7f6]" aria-hidden />
          <Link
            href={blogSubscribe.rssHref}
            className="text-[#4cd7f6] transition-colors hover:underline"
          >
            {blogSubscribe.rssHref}
          </Link>
        </span>
      </div>
    </section>
  );
}
