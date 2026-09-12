import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatBlogDate,
  type BlogPost,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

export function FeaturedPost({ post }: { post: BlogPost }) {
  const primaryTag = post.tags[0];
  const href = `/blog/${post.slug}`;

  return (
    <section aria-labelledby="featured-post-heading" className="mb-8 md:mb-10">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BadgeCheck className="size-4 text-primary" aria-hidden />
          <p
            id="featured-post-heading"
            className="font-mono text-[10px] font-semibold tracking-widest text-primary uppercase"
          >
            Featured
          </p>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          {post.slug}
        </span>
      </div>

      <Card className="overflow-hidden rounded-xl bg-muted py-0 ring-border/40 transition-colors hover:bg-muted/80">
        <div className="flex flex-col gap-0 xl:flex-row">
          <CardHeader className="min-w-0 gap-4 border-b border-border/40 p-4 xl:w-5/12 xl:border-r xl:border-b-0 xl:p-5">
            <div className="flex flex-col justify-between gap-4 rounded-lg bg-[#0a0e14] p-4 ring-1 ring-border/40">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-destructive/60" />
                  <span className="size-2.5 rounded-full bg-[#4cd7f6]/60" />
                  <span className="size-2.5 rounded-full bg-primary/60" />
                </div>
                <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                  post.preview
                </span>
              </div>

              <div className="flex flex-col gap-2 py-2">
                <p className="font-mono text-[11px] text-muted-foreground">
                  {primaryTag ? `topic · ${primaryTag}` : "featured article"}
                </p>
                <div className="h-2 w-3/4 rounded-sm bg-primary/70" />
                <div className="h-2 w-1/2 rounded-sm bg-primary/40" />
                <div className="h-2 w-5/6 rounded-sm bg-[#4cd7f6]/50" />
                <div className="mt-2 flex gap-1">
                  <div className="h-8 flex-1 rounded-md bg-muted/80" />
                  <div className="h-8 w-10 rounded-md bg-primary/20" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-primary"
                >
                  {post.readingTime}
                </Badge>
                {primaryTag ? (
                  <Badge
                    variant="secondary"
                    className="rounded-md px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {primaryTag}
                  </Badge>
                ) : null}
              </div>
            </div>
          </CardHeader>

          <div className="flex min-w-0 flex-1 flex-col xl:w-7/12">
            <CardContent className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                {primaryTag ? (
                  <Badge
                    variant="secondary"
                    className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#4cd7f6] uppercase"
                  >
                    {primaryTag}
                  </Badge>
                ) : null}
                <span className="font-mono text-[11px] text-muted-foreground">
                  · {formatBlogDate(post.date)}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  · {post.readingTime}
                </span>
              </div>

              <CardTitle className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                <Link
                  href={href}
                  className="transition-colors hover:text-primary"
                >
                  {post.title}
                </Link>
              </CardTitle>

              <CardDescription className="line-clamp-4 text-[15px] leading-relaxed text-muted-foreground">
                {post.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="mt-auto flex flex-col items-start justify-between gap-4 border-t border-border/40 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <div className="flex min-w-0 flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-md px-2 py-0.5 font-mono text-[11px] font-normal text-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <Link
                href={href}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "h-9 shrink-0 gap-1.5",
                )}
              >
                Read article
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </CardFooter>
          </div>
        </div>
      </Card>
    </section>
  );
}
