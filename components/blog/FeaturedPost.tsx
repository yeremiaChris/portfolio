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
import { formatBlogDate, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function FeaturedPost({ post }: { post: BlogPost }) {
  const primaryTag = post.tags[0];
  const href = `/blog/${post.slug}`;

  return (
    <section aria-labelledby="featured-post-heading" className="mb-8 md:mb-10">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BadgeCheck className="text-primary size-4" aria-hidden />
          <p
            id="featured-post-heading"
            className="text-primary font-mono text-[10px] font-semibold tracking-widest uppercase"
          >
            Featured
          </p>
        </div>
        <span className="text-muted-foreground font-mono text-[11px]">
          {post.slug}
        </span>
      </div>

      <Card className="bg-muted ring-border/40 hover:bg-muted/80 overflow-hidden rounded-xl py-0 transition-colors">
        <div className="flex flex-col gap-0 xl:flex-row">
          <CardHeader className="border-border/40 min-w-0 gap-4 border-b p-4 xl:w-5/12 xl:border-r xl:border-b-0 xl:p-5">
            <div className="ring-border/40 flex flex-col justify-between gap-4 rounded-lg bg-[#0a0e14] p-4 ring-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="bg-destructive/60 size-2.5 rounded-full" />
                  <span className="size-2.5 rounded-full bg-[#4cd7f6]/60" />
                  <span className="bg-primary/60 size-2.5 rounded-full" />
                </div>
                <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                  post.preview
                </span>
              </div>

              <div className="flex flex-col gap-2 py-2">
                <p className="text-muted-foreground font-mono text-[11px]">
                  {primaryTag ? `topic · ${primaryTag}` : "featured article"}
                </p>
                <div className="bg-primary/70 h-2 w-3/4 rounded-sm" />
                <div className="bg-primary/40 h-2 w-1/2 rounded-sm" />
                <div className="h-2 w-5/6 rounded-sm bg-[#4cd7f6]/50" />
                <div className="mt-2 flex gap-1">
                  <div className="bg-muted/80 h-8 flex-1 rounded-md" />
                  <div className="bg-primary/20 h-8 w-10 rounded-md" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold"
                >
                  {post.readingTime}
                </Badge>
                {primaryTag ? (
                  <Badge
                    variant="secondary"
                    className="text-muted-foreground rounded-md px-2 py-0.5 font-mono text-[11px]"
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
                    className="bg-muted rounded-md px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#4cd7f6] uppercase"
                  >
                    {primaryTag}
                  </Badge>
                ) : null}
                <span className="text-muted-foreground font-mono text-[11px]">
                  · {formatBlogDate(post.date)}
                </span>
                <span className="text-muted-foreground font-mono text-[11px]">
                  · {post.readingTime}
                </span>
              </div>

              <CardTitle className="font-heading text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
                <Link
                  href={href}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </CardTitle>

              <CardDescription className="text-muted-foreground line-clamp-4 text-[15px] leading-relaxed">
                {post.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="border-border/40 mt-auto flex flex-col items-start justify-between gap-4 border-t px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <div className="flex min-w-0 flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-foreground rounded-md px-2 py-0.5 font-mono text-[11px] font-normal"
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
