import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatBlogDate, type BlogPost } from "@/lib/blog";

export function BlogPostCard({ post }: { post: BlogPost }) {
  const href = `/blog/${post.slug}`;
  const primaryTag = post.tags[0] ?? "Article";

  return (
    <Card className="group flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-xl bg-muted py-0 ring-border/40 transition-colors hover:bg-muted/80">
      <CardHeader className="gap-3 p-4 pb-0">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] tracking-wider text-primary uppercase"
          >
            {primaryTag}
          </Badge>
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
            {post.readingTime}
          </span>
        </div>

        <CardTitle className="font-heading text-base leading-snug font-semibold tracking-tight text-foreground sm:text-lg">
          <Link
            href={href}
            className="transition-colors group-hover:text-primary"
          >
            {post.title}
          </Link>
        </CardTitle>

        <CardDescription className="line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
          {post.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col gap-3 px-4 pt-4 pb-0">
        {post.tags.length > 0 ? (
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-md px-1.5 py-0.5 font-mono text-[11px] font-normal text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t-0 bg-transparent px-4 py-4">
        <time
          dateTime={post.date}
          className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase"
        >
          {formatBlogDate(post.date)}
        </time>
        <Link
          href={href}
          className="inline-flex items-center gap-0.5 font-mono text-[12px] text-primary transition-transform group-hover:translate-x-0.5"
        >
          Read article
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </CardFooter>
    </Card>
  );
}
