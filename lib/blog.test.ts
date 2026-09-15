import { afterEach, describe, expect, it, vi } from "vitest";

import {
  blogIntro,
  buildBlogRssFeed,
  formatBlogDate,
  getAllPosts,
  getFeaturedPost,
  getPost,
  getPostHeadings,
  type BlogPost,
} from "./blog";
import { site } from "./site";

const TESTING_SLUG = "frontend-tests-2026-nextjs";
const DRAFT_SLUG = "welcome";

function makePost(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    title: "Example",
    description: "An example post",
    date: "2026-01-01",
    tags: ["test"],
    featured: false,
    draft: false,
    slug: "example",
    content: "",
    readingTime: "1 min read",
    readingMinutes: 1,
    ...overrides,
  };
}

describe("getPostHeadings", () => {
  it("collects h2/h3 text and github-slugger ids", () => {
    const content = [
      "## Hello World",
      "",
      "```js",
      "## Not a heading",
      "```",
      "",
      "### Nested `code` and [link](https://x.com)",
      "",
      "# H1 skipped",
    ].join("\n");

    expect(getPostHeadings(content)).toEqual([
      { depth: 2, text: "Hello World", id: "hello-world" },
      { depth: 3, text: "Nested code and link", id: "nested-code-and-link" },
    ]);
  });

  it("keeps duplicate heading ids stable", () => {
    const headings = getPostHeadings("## Hello\n## Hello");

    expect(headings.map((heading) => heading.id)).toEqual(["hello", "hello-1"]);
  });
});

describe("formatBlogDate", () => {
  it("formats ISO dates as uppercase month and year", () => {
    expect(formatBlogDate("2026-09-15")).toBe("SEP 2026");
  });

  it("returns the original string when the date is invalid", () => {
    expect(formatBlogDate("not-a-date")).toBe("not-a-date");
  });
});

describe("getFeaturedPost", () => {
  it("returns null for an empty list", () => {
    expect(getFeaturedPost([])).toBeNull();
  });

  it("prefers the featured post", () => {
    const featured = makePost({ slug: "featured", featured: true });
    const posts = [
      makePost({ slug: "older", date: "2026-09-14" }),
      featured,
      makePost({ slug: "newer", date: "2026-09-16" }),
    ];

    expect(getFeaturedPost(posts)).toBe(featured);
  });

  it("falls back to the first post when none are featured", () => {
    const first = makePost({ slug: "first" });
    const second = makePost({ slug: "second" });

    expect(getFeaturedPost([first, second])).toBe(first);
  });
});

describe("getPost", () => {
  it("resolves a published slug", () => {
    const post = getPost(TESTING_SLUG);

    expect(post?.slug).toBe(TESTING_SLUG);
    expect(post?.title).toContain("Frontend Tests");
  });

  it("returns null for an unknown slug", () => {
    expect(getPost("does-not-exist")).toBeNull();
  });
});

describe("getAllPosts", () => {
  it("returns posts newest-first and includes the testing article", () => {
    const posts = getAllPosts();
    const dates = posts.map((post) => post.date);

    expect(posts.some((post) => post.slug === TESTING_SLUG)).toBe(true);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });
});

describe("draft filtering", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("hides draft posts in production", () => {
    vi.stubEnv("NODE_ENV", "production");

    expect(getPost(DRAFT_SLUG)).toBeNull();
    expect(getAllPosts().some((post) => post.slug === DRAFT_SLUG)).toBe(false);
  });

  it("includes draft posts outside production", () => {
    vi.stubEnv("NODE_ENV", "test");

    expect(getPost(DRAFT_SLUG)?.title).toBe("Welcome to the blog");
  });
});

describe("buildBlogRssFeed", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("emits rss with channel metadata and post links", () => {
    vi.stubEnv("NODE_ENV", "production");

    const xml = buildBlogRssFeed("https://example.com");
    const postLink = `https://example.com/blog/${TESTING_SLUG}`;

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0">');
    expect(xml).toContain(`<title>${site.fullName} — Blog</title>`);
    expect(xml).toContain(`<link>https://example.com/blog</link>`);
    expect(xml).toContain(
      `<description>${blogIntro.description}</description>`,
    );
    expect(xml).toContain(`<link>${postLink}</link>`);
    expect(xml).toContain(`<guid>${postLink}</guid>`);
    expect(xml).not.toContain(`/blog/${DRAFT_SLUG}`);
  });
});
