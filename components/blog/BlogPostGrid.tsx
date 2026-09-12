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
            className="font-heading text-foreground text-xl font-semibold tracking-tight sm:text-2xl"
          >
            More writing
          </h2>
        </div>
        <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
          {String(posts.length).padStart(2, "0")} posts
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="bg-muted/60 ring-border/40 flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-12 text-center ring-1">
          <FileSearch className="text-muted-foreground size-10" aria-hidden />
          <h3 className="font-heading text-foreground text-lg font-semibold">
            No more posts yet
          </h3>
          <p className="text-muted-foreground max-w-sm text-sm">
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
