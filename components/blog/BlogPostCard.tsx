import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

export function BlogPostCard({ post }: { post: BlogPostSummary }) {
  const href = `/blog/${post.slug}`;
  const topicChips = getTopicsForPost(post).slice(0, 2);

  return (
    <Card className="group bg-muted ring-border/40 hover:bg-muted/80 flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-xl py-0 transition-colors motion-reduce:transition-none">
      <CardHeader className="gap-3 p-4 pb-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {topicChips.length > 0 ? (
              topicChips.map((topic) => (
                <Badge
                  key={topic.slug}
                  variant="secondary"
                  render={<Link href={`/blog/tag/${topic.slug}`} />}
                  className={cn(
                    "bg-muted text-primary label-caps hover:text-brand-accent rounded-md px-2 py-0.5 tracking-wider transition-colors",
                    "motion-reduce:transition-none",
                  )}
                >
                  {topic.label}
                </Badge>
              ))
            ) : (
              <Badge
                variant="secondary"
                className="bg-muted text-primary label-caps rounded-md px-2 py-0.5 tracking-wider"
              >
                Article
              </Badge>
            )}
          </div>
          <span className="text-muted-foreground shrink-0 text-[11px]">
            {post.readingTime}
          </span>
        </div>

        <CardTitle className="font-heading text-foreground text-base leading-snug font-semibold tracking-tight sm:text-lg">
          <Link
            href={href}
            className="group-hover:text-primary transition-colors motion-reduce:transition-none"
          >
            {post.title}
          </Link>
        </CardTitle>

        <CardDescription className="text-muted-foreground line-clamp-3 text-[13px] leading-relaxed">
          {post.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t-0 bg-transparent px-4 py-4">
        <time
          dateTime={post.date}
          className="text-muted-foreground label-caps text-[11px] tracking-wider"
        >
          {formatBlogDate(post.date)}
        </time>
        <Link
          href={href}
          className="text-primary inline-flex items-center gap-0.5 text-[12px] transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
        >
          Read article
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </CardFooter>
    </Card>
  );
}
