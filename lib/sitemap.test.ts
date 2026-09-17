import { afterEach, describe, expect, it, vi } from "vitest";

import { buildSitemap, sitemapPages } from "./sitemap";

const TESTING_SLUG = "frontend-tests-2026-nextjs";
const DRAFT_SLUG = "welcome";
const SITE_URL = "https://example.com";

describe("buildSitemap", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("lists the static routes on the given origin", () => {
    const urls = buildSitemap(SITE_URL).map((entry) => entry.url);

    expect(urls).toEqual(
      expect.arrayContaining(
        sitemapPages.map((page) => `${SITE_URL}${page.path}`),
      ),
    );
    expect(urls).toContain(`${SITE_URL}`);
    expect(urls).not.toContain(`${SITE_URL}/feed.xml`);
  });

  it("includes published posts with lastModified from the post date", () => {
    vi.stubEnv("NODE_ENV", "production");

    const entries = buildSitemap(`${SITE_URL}/`);
    const testingPost = entries.find(
      (entry) => entry.url === `${SITE_URL}/blog/${TESTING_SLUG}`,
    );

    expect(testingPost).toMatchObject({
      url: `${SITE_URL}/blog/${TESTING_SLUG}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
    expect(testingPost?.lastModified).toEqual(new Date("2026-09-15T00:00:00"));
    expect(
      entries.some((entry) => entry.url.endsWith(`/blog/${DRAFT_SLUG}`)),
    ).toBe(false);
  });
});
