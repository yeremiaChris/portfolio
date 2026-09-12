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
      className="bg-muted ring-border/40 mb-6 overflow-hidden rounded-xl p-6 ring-1 md:mb-8 md:p-8"
    >
      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex max-w-xl flex-col gap-2">
          <Badge
            variant="secondary"
            className="text-primary w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest uppercase"
          >
            <span className="bg-primary size-2 animate-pulse rounded-full" />
            {blogSubscribe.eyebrow}
          </Badge>
          <h2
            id="blog-subscribe-heading"
            className="font-heading text-foreground text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {blogSubscribe.title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
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

      <div className="border-border/40 text-muted-foreground mt-5 flex flex-wrap items-center gap-4 border-t pt-4 font-mono text-[11px]">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="text-primary size-3.5" aria-hidden />
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
