import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatBlogDate, type BlogPostSummary } from "@/lib/blog-shared";
import { getTopicsForPost } from "@/lib/blog-topics";
import { cn } from "@/lib/utils";

export function FeaturedPost({ post }: { post: BlogPostSummary }) {
  const topicChips = getTopicsForPost(post).slice(0, 2);
  const href = `/blog/${post.slug}`;

  return (
    <section aria-labelledby="featured-post-heading" className="mb-8 md:mb-10">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <BadgeCheck className="text-primary size-4" aria-hidden />
        <p
          id="featured-post-heading"
          className="text-primary label-caps font-semibold tracking-widest"
        >
          Featured
        </p>
      </div>

      <Card className="bg-muted ring-border/40 hover:bg-muted/80 overflow-hidden rounded-xl py-0 transition-colors">
        <CardHeader className="gap-4 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {topicChips.map((topic) => (
              <Badge
                key={topic.slug}
                variant="secondary"
                render={<Link href={`/blog/tag/${topic.slug}`} />}
                className="bg-muted text-brand-accent rounded-md px-2 py-0.5 text-xs tracking-wider uppercase transition-opacity hover:opacity-90 motion-reduce:transition-none"
              >
                {topic.label}
              </Badge>
            ))}
            <span className="text-muted-foreground text-[11px]">
              · {formatBlogDate(post.date)}
            </span>
            <span className="text-muted-foreground text-[11px]">
              · {post.readingTime}
            </span>
          </div>

          <CardTitle className="font-heading text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
            <Link
              href={href}
              className="hover:text-primary transition-colors motion-reduce:transition-none"
            >
              {post.title}
            </Link>
          </CardTitle>

          <CardDescription className="text-muted-foreground line-clamp-4 text-[15px] leading-relaxed">
            {post.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="border-border/40 mt-auto flex justify-end border-t px-4 py-4 sm:px-5">
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
      </Card>
    </section>
  );
}
