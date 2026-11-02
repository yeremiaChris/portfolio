import { describe, expect, it } from "vitest";

import {
  getFirstUnreadPart,
  getLatestPosition,
  getResumeHref,
  getSeriesNav,
  getSeriesPosts,
} from "@/lib/blog-series";

const posts = [
  { slug: "c", title: "C", series: "s", part: 3 },
  { slug: "a", title: "A", series: "s", part: 1 },
  { slug: "b", title: "B", series: "s", part: 2 },
  { slug: "x", title: "X" },
];

describe("blog series", () => {
  it("orders parts by part number", () => {
    expect(getSeriesPosts("s", posts).map((p) => p.slug)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("returns prev and next only for published parts", () => {
    const nav = getSeriesNav(posts[2], posts);
    expect(nav.prev?.slug).toBe("a");
    expect(nav.next?.slug).toBe("c");
    expect(getSeriesNav(posts[0], posts).next).toBeNull();
    expect(getSeriesNav(posts[3], posts).parts).toEqual([]);
    const withoutLast = posts.filter((p) => p.slug !== "c");
    expect(getSeriesNav(posts[2], withoutLast).next).toBeNull();
  });

  it("finds the first unread part", () => {
    const parts = getSeriesPosts("s", posts);
    expect(getFirstUnreadPart(parts, ["a"])?.slug).toBe("b");
    expect(getFirstUnreadPart(parts, ["a", "b", "c"])).toBeNull();
  });

  it("picks the most recent reading position", () => {
    const parts = getSeriesPosts("s", posts);
    const latest = getLatestPosition(parts, {
      a: { scrollY: 10, updatedAt: 1 },
      c: { scrollY: 20, updatedAt: 5, headingId: "intro" },
    });
    expect(latest?.part.slug).toBe("c");
    expect(getResumeHref("c", latest?.position)).toBe("/blog/c#intro");
    expect(getResumeHref("a")).toBe("/blog/a");
  });
});
