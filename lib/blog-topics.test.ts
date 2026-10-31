import { describe, expect, it } from "vitest";

import {
  BLOG_TOPICS,
  filterBlogPosts,
  filterPostsBySearch,
  filterPostsByTopicSlug,
  getBlogTopicBySlug,
  getCardTopicLabels,
  getRelatedPosts,
  getTopicSlugForTag,
  getTopicsForPost,
  postMatchesSearch,
  type BlogPostListItem,
} from "./blog-topics";

function makePost(overrides: Partial<BlogPostListItem> = {}): BlogPostListItem {
  return {
    title: "Example",
    description: "An example post",
    date: "2026-01-01",
    tags: ["react"],
    featured: false,
    draft: false,
    slug: "example",
    readingTime: "1 min read",
    readingMinutes: 1,
    ...overrides,
  };
}

describe("getBlogTopicBySlug", () => {
  it("resolves curated topic slugs", () => {
    expect(getBlogTopicBySlug("ai-engineering")?.label).toBe("AI Engineering");
    expect(getBlogTopicBySlug("missing")).toBeUndefined();
  });
});

describe("filterPostsByTopicSlug", () => {
  const posts = [
    makePost({ slug: "a", tags: ["react", "hooks"] }),
    makePost({ slug: "b", tags: ["ai-engineering", "learning-in-public"] }),
    makePost({ slug: "c", tags: ["nextjs", "security"] }),
  ];

  it("returns all posts when topic is empty", () => {
    expect(filterPostsByTopicSlug(posts, null)).toHaveLength(3);
  });

  it("filters by mapped tags without exposing raw-only tags as topics", () => {
    expect(filterPostsByTopicSlug(posts, "react").map((p) => p.slug)).toEqual([
      "a",
    ]);
    expect(
      filterPostsByTopicSlug(posts, "ai-engineering").map((p) => p.slug),
    ).toEqual(["b"]);
    expect(
      filterPostsByTopicSlug(posts, "nextjs-security").map((p) => p.slug),
    ).toEqual(["c"]);
  });

  it("ignores unknown topic slugs", () => {
    expect(filterPostsByTopicSlug(posts, "learning-in-public")).toHaveLength(3);
  });
});

describe("filterPostsBySearch", () => {
  const posts = [
    makePost({
      slug: "rag",
      title: "Mini RAG pipeline",
      description: "Retrieval basics",
      tags: ["rag", "llm"],
    }),
    makePost({
      slug: "fiber",
      title: "React Fiber",
      description: "Scheduling in React",
      tags: ["react"],
    }),
  ];

  it("matches title, description, and tags", () => {
    expect(filterPostsBySearch(posts, "fiber").map((p) => p.slug)).toEqual([
      "fiber",
    ]);
    expect(filterPostsBySearch(posts, "retrieval").map((p) => p.slug)).toEqual([
      "rag",
    ]);
    expect(filterPostsBySearch(posts, "llm").map((p) => p.slug)).toEqual([
      "rag",
    ]);
  });

  it("returns all posts for blank search", () => {
    expect(filterPostsBySearch(posts, "   ")).toHaveLength(2);
  });
});

describe("postMatchesSearch", () => {
  it("is case insensitive", () => {
    const post = makePost({ title: "Hello World" });
    expect(postMatchesSearch(post, "HELLO")).toBe(true);
  });
});

describe("filterBlogPosts", () => {
  it("combines topic and search filters", () => {
    const posts = [
      makePost({
        slug: "one",
        title: "React reconciliation",
        tags: ["react"],
      }),
      makePost({
        slug: "two",
        title: "React security",
        tags: ["react", "security"],
      }),
      makePost({ slug: "three", title: "LLM intro", tags: ["llm"] }),
    ];

    expect(
      filterBlogPosts(posts, {
        topicSlug: "react",
        searchQuery: "security",
      }).map((p) => p.slug),
    ).toEqual(["two"]);
  });
});

describe("getTopicsForPost and card labels", () => {
  it("maps posts to curated topics only", () => {
    const post = makePost({
      tags: ["ai-engineering", "learning-in-public", "rag"],
    });

    expect(getTopicsForPost(post).map((t) => t.slug)).toEqual([
      "ai-engineering",
    ]);
    expect(getCardTopicLabels(post)).toEqual(["AI Engineering"]);
  });

  it("returns up to two topic labels", () => {
    const post = makePost({
      tags: ["react", "javascript", "typescript"],
    });

    expect(getCardTopicLabels(post, 2)).toEqual(["React", "JS & TypeScript"]);
  });
});

describe("getTopicSlugForTag", () => {
  it("links raw tags to curated topic pages", () => {
    expect(getTopicSlugForTag("rag")).toBe("ai-engineering");
    expect(getTopicSlugForTag("learning-in-public")).toBeUndefined();
  });
});

describe("getRelatedPosts", () => {
  it("ranks by shared tags then recency", () => {
    const current = makePost({
      slug: "current",
      tags: ["react", "performance"],
      date: "2026-03-01",
    });
    const allPosts = [
      current,
      makePost({
        slug: "best",
        tags: ["react", "performance", "hooks"],
        date: "2026-02-01",
      }),
      makePost({
        slug: "older-shared",
        tags: ["react", "performance"],
        date: "2026-01-01",
      }),
      makePost({ slug: "unrelated", tags: ["css"], date: "2026-04-01" }),
    ];

    expect(getRelatedPosts(current, allPosts, 2).map((p) => p.slug)).toEqual([
      "best",
      "older-shared",
    ]);
  });

  it("excludes the current post and empty tag sets", () => {
    const current = makePost({ slug: "solo", tags: [] });
    expect(getRelatedPosts(current, [current])).toEqual([]);
  });
});

describe("BLOG_TOPICS", () => {
  it("keeps unique slugs", () => {
    const slugs = BLOG_TOPICS.map((topic) => topic.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
