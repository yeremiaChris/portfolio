import { FileSearch } from "lucide-react";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { BlogPost } from "@/lib/blog";

export function BlogPostGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <section
      aria-labelledby="blog-grid-heading"
      className="mb-4 flex w-full min-w-0 flex-col gap-4 md:mb-6 md:gap-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="size-2 shrink-0 rounded-full bg-[#4cd7f6]"
            aria-hidden
          />
          <h2
            id="blog-grid-heading"
            className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            More writing
          </h2>
        </div>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {String(posts.length).padStart(2, "0")} posts
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-muted/60 px-6 py-12 text-center ring-1 ring-border/40">
          <FileSearch
            className="size-10 text-muted-foreground"
            aria-hidden
          />
          <h3 className="font-heading text-lg font-semibold text-foreground">
            No more posts yet
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Featured writing is above. New articles will show up here as they’re
            published.
          </p>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
