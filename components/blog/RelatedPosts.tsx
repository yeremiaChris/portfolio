import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatBlogDate, type BlogPostSummary } from "@/lib/blog-shared";

type RelatedPostsProps = {
  posts: BlogPostSummary[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-posts-heading"
      className="border-border/40 mt-4 border-t pt-8 lg:col-span-8"
    >
      <h2
        id="related-posts-heading"
        className="font-heading text-foreground mb-4 text-lg font-semibold tracking-tight"
      >
        Related posts
      </h2>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group bg-muted/40 ring-border/40 hover:bg-muted/70 flex flex-col gap-1 rounded-lg px-4 py-3 ring-1 transition-colors motion-reduce:transition-none"
            >
              <span className="font-heading text-foreground group-hover:text-primary text-[15px] font-medium transition-colors motion-reduce:transition-none">
                {post.title}
              </span>
              <span className="text-muted-foreground flex flex-wrap items-center gap-2 text-[11px]">
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
                <ArrowRight
                  className="text-primary ml-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
