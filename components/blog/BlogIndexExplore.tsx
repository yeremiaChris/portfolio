"use client";

import { useMemo, useState } from "react";
import { FileSearch } from "lucide-react";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogSearchInput } from "@/components/blog/BlogSearchInput";
import { BlogTopicChips } from "@/components/blog/BlogTopicChips";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { filterBlogPosts } from "@/lib/blog-topics";
import type { BlogPostSummary } from "@/lib/blog-shared";

type BlogIndexExploreProps = {
  posts: BlogPostSummary[];
  featuredSlug: string | null;
  activeTopicSlug: string | null;
  showFeatured: boolean;
  showTopicChips?: boolean;
  basePath?: string;
};

export function BlogIndexExplore({
  posts,
  featuredSlug,
  activeTopicSlug,
  showFeatured,
  showTopicChips = true,
  basePath = "/blog",
}: BlogIndexExploreProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(
    () =>
      filterBlogPosts(posts, {
        topicSlug: activeTopicSlug,
        searchQuery,
      }),
    [posts, activeTopicSlug, searchQuery],
  );

  const featured =
    showFeatured && featuredSlug
      ? (filtered.find((post) => post.slug === featuredSlug) ?? null)
      : null;

  const remaining = featured
    ? filtered.filter((post) => post.slug !== featured.slug)
    : filtered;

  const emptyMessage =
    searchQuery.trim().length > 0
      ? "No posts match your search. Try another keyword or clear the filter."
      : activeTopicSlug
        ? "No posts in this topic yet."
        : "No posts yet.";

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-4">
        {showTopicChips ? (
          <BlogTopicChips activeSlug={activeTopicSlug} basePath={basePath} />
        ) : null}
        <BlogSearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>

      {featured ? <FeaturedPost post={featured} /> : null}

      <section
        aria-labelledby="blog-grid-heading"
        className="mb-4 flex w-full min-w-0 flex-col gap-4 md:mb-6 md:gap-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="bg-brand-accent size-2 shrink-0 rounded-full"
              aria-hidden
            />
            <h2
              id="blog-grid-heading"
              className="font-heading text-foreground text-xl font-semibold tracking-tight sm:text-2xl"
            >
              {featured ? "More writing" : "All posts"}
            </h2>
          </div>
          <span className="text-muted-foreground label-caps tracking-wider">
            {String(filtered.length).padStart(2, "0")} posts
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-muted/60 ring-border/40 flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-12 text-center ring-1">
            <FileSearch className="text-muted-foreground size-10" aria-hidden />
            <h3 className="font-heading text-foreground text-lg font-semibold">
              Nothing here yet
            </h3>
            <p className="text-muted-foreground max-w-sm text-sm">
              {emptyMessage}
            </p>
          </div>
        ) : remaining.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            The featured post above is the only match for this filter.
          </p>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {remaining.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
