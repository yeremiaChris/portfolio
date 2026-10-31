import { describe, expect, it } from "vitest";

import { aboutProfile } from "./about";
import {
  PERSON_KNOWS_ABOUT,
  RSS_FEED_PATH,
  buildAlternates,
  buildBlogPostingJsonLd,
  buildHomeJsonLd,
  buildPageMetadata,
  buildPersonJsonLd,
  buildProfilePageJsonLd,
  buildWebSiteJsonLd,
  toAbsoluteUrl,
  toCanonicalPath,
} from "./seo";
import { getSiteUrl, site } from "./site";

describe("toAbsoluteUrl", () => {
  it("joins a site origin with a local path", () => {
    expect(toAbsoluteUrl("/yeremia-1.JPG", "https://example.com")).toBe(
      "https://example.com/yeremia-1.JPG",
    );
    expect(toAbsoluteUrl("portrait.jpg", "https://example.com")).toBe(
      "https://example.com/portrait.jpg",
    );
  });

  it("leaves absolute http(s) URLs unchanged", () => {
    expect(toAbsoluteUrl("https://cdn.example.com/a.jpg")).toBe(
      "https://cdn.example.com/a.jpg",
    );
  });
});

describe("toCanonicalPath", () => {
  it("normalizes empty and root paths to /", () => {
    expect(toCanonicalPath("")).toBe("/");
    expect(toCanonicalPath("/")).toBe("/");
    expect(toCanonicalPath("  ")).toBe("/");
  });

  it("prefixes a leading slash when missing", () => {
    expect(toCanonicalPath("about")).toBe("/about");
    expect(toCanonicalPath("/blog/example")).toBe("/blog/example");
  });
});

describe("buildAlternates", () => {
  it("includes the RSS feed type and optional canonical", () => {
    expect(buildAlternates()).toEqual({
      types: { "application/rss+xml": RSS_FEED_PATH },
    });
    expect(buildAlternates("/blog")).toEqual({
      canonical: "/blog",
      types: { "application/rss+xml": RSS_FEED_PATH },
    });
    expect(buildAlternates("about")).toEqual({
      canonical: "/about",
      types: { "application/rss+xml": RSS_FEED_PATH },
    });
  });
});

describe("buildPageMetadata", () => {
  it("sets canonical, Open Graph, and a large Twitter card", () => {
    const metadata = buildPageMetadata({
      title: "About | Yeremia Chris Saragi",
      description: "About the engineer.",
      path: "about",
    });

    expect(metadata.alternates).toEqual({
      canonical: "/about",
      types: { "application/rss+xml": RSS_FEED_PATH },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "/about",
      type: "website",
      siteName: site.fullName,
    });
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Yeremia Chris Saragi — Software Engineer",
      },
    ]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "About | Yeremia Chris Saragi",
    });
  });

  it("marks blog posts as articles", () => {
    const metadata = buildPageMetadata({
      title: "A post",
      description: "Details",
      path: "/blog/a-post",
      type: "article",
    });

    expect(metadata.openGraph).toMatchObject({ type: "article" });
    expect(metadata.alternates).toEqual({
      canonical: "/blog/a-post",
      types: { "application/rss+xml": RSS_FEED_PATH },
    });
  });
});

describe("JSON-LD", () => {
  it("describes the person with real profile URLs", () => {
    const person = buildPersonJsonLd();

    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe(site.fullName);
    expect(person.alternateName).toBe(site.name);
    expect(person.sameAs).toEqual([site.links.github, site.links.linkedin]);
    expect(person.sameAs).not.toContain("https://twitter.com/");
    expect(person.email).toBe("yeremia997@gmail.com");
    expect(person.image).toBe(toAbsoluteUrl(aboutProfile.image, getSiteUrl()));
    expect(person.knowsAbout).toEqual([...PERSON_KNOWS_ABOUT]);
  });

  it("wraps Person as ProfilePage mainEntity on the home graph", () => {
    const profile = buildProfilePageJsonLd("/");
    const website = buildWebSiteJsonLd();

    expect(buildHomeJsonLd().map((entry) => entry["@type"])).toEqual([
      "ProfilePage",
      "WebSite",
    ]);
    expect(profile.mainEntity).toMatchObject({
      "@type": "Person",
      "@id": buildPersonJsonLd()["@id"],
      name: site.fullName,
      alternateName: site.name,
    });
    expect(profile.mainEntity).not.toHaveProperty("@context");
    expect(website.publisher).toEqual({
      "@id": buildPersonJsonLd()["@id"],
    });
    expect(website.description).toBe(site.tagline);
  });

  it("points an about ProfilePage at the same person", () => {
    const page = buildProfilePageJsonLd("/about");

    expect(page["@type"]).toBe("ProfilePage");
    expect(page.url).toBe(`${getSiteUrl()}/about`);
    expect(page["@id"]).toBe(`${getSiteUrl()}/about#profile`);
    expect(page.mainEntity["@id"]).toBe(buildPersonJsonLd()["@id"]);
  });

  it("omits contact details when includeContact is false", () => {
    const page = buildProfilePageJsonLd("/about", { includeContact: false });

    expect(page.mainEntity).not.toHaveProperty("email");
    expect(JSON.stringify(page)).not.toMatch(/yeremia997|mailto:|wa\.me|6281/);
    expect(buildProfilePageJsonLd("/").mainEntity).toHaveProperty("email");
  });

  it("describes a blog post with author linked to the person entity", () => {
    const posting = buildBlogPostingJsonLd({
      title: "React Fiber",
      description: "How reconciliation works.",
      slug: "react-fiber",
      datePublished: "2026-01-15",
    });
    const url = `${getSiteUrl()}/blog/react-fiber`;

    expect(posting["@type"]).toBe("BlogPosting");
    expect(posting.headline).toBe("React Fiber");
    expect(posting.description).toBe("How reconciliation works.");
    expect(posting.url).toBe(url);
    expect(posting.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": url,
    });
    expect(posting.datePublished).toBe("2026-01-15");
    expect(posting).not.toHaveProperty("dateModified");
    expect(posting.author).toEqual({ "@id": buildPersonJsonLd()["@id"] });
    expect(posting).not.toHaveProperty("image");
  });

  it("includes dateModified and absolute image when provided", () => {
    const posting = buildBlogPostingJsonLd({
      title: "Updated post",
      description: "Revised.",
      slug: "updated-post",
      datePublished: "2026-01-01",
      dateModified: "2026-02-01",
      image: "/blog/cover.jpg",
    });

    expect(posting.dateModified).toBe("2026-02-01");
    expect(posting.image).toBe(`${getSiteUrl()}/blog/cover.jpg`);
  });
});
