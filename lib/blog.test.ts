import { afterEach, describe, expect, it, vi } from "vitest";

import {
  blogIntro,
  buildBlogRssFeed,
  formatBlogDate,
  getAllPosts,
  getFeaturedPost,
  getPost,
  getPostHeadings,
  isBlogIndexDeprioritized,
  sortBlogPostsForIndex,
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

  it("skips deprioritized posts when choosing a fallback", () => {
    const sideProject = makePost({
      slug: "hermes",
      tags: ["hermes-agent"],
      date: "2026-10-26",
    });
    const core = makePost({ slug: "core", date: "2026-01-01" });

    expect(getFeaturedPost([sideProject, core])).toBe(core);
  });
});

describe("sortBlogPostsForIndex", () => {
  it("keeps core posts above deprioritized side projects", () => {
    const sideProject = makePost({
      slug: "hermes",
      tags: ["hermes-agent"],
      date: "2026-10-26",
    });
    const core = makePost({ slug: "core", date: "2026-01-01" });

    expect(
      sortBlogPostsForIndex([sideProject, core]).map((post) => post.slug),
    ).toEqual(["core", "hermes"]);
  });
});

describe("isBlogIndexDeprioritized", () => {
  it("marks hermes-agent posts as lower priority on the index", () => {
    expect(isBlogIndexDeprioritized(makePost({ tags: ["hermes-agent"] }))).toBe(
      true,
    );
    expect(isBlogIndexDeprioritized(makePost({ tags: ["react"] }))).toBe(false);
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
  it("returns posts with deprioritized side projects after core notes", () => {
    const posts = getAllPosts();
    const hermesSlug = "hermes-agent-part-1-overview-to-vps-ready";

    expect(posts.some((post) => post.slug === TESTING_SLUG)).toBe(true);
    expect(posts.at(-1)?.slug).toBe(hermesSlug);
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
