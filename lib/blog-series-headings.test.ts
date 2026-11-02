import { describe, expect, it } from "vitest";

import { getAllPosts, getPost, getPostHeadings } from "@/lib/blog";

describe("series heading ids", () => {
  it("stay stable so saved reading positions keep resolving", () => {
    const ids = Object.fromEntries(
      getAllPosts()
        .filter((post) => post.series)
        .sort((a, b) => a.slug.localeCompare(b.slug))
        .map((post) => [
          post.slug,
          getPostHeadings(getPost(post.slug)?.content ?? "").map(
            (heading) => heading.id,
          ),
        ]),
    );
    expect(ids).toMatchSnapshot();
  });
});
