import { describe, expect, it } from "vitest";

import { aboutProfile } from "./about";
import {
  PERSON_KNOWS_ABOUT,
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

describe("buildPageMetadata", () => {
  it("sets canonical, Open Graph, and a large Twitter card", () => {
    const metadata = buildPageMetadata({
      title: "About | Yeremia Chris Saragi",
      description: "About the engineer.",
      path: "about",
    });

    expect(metadata.alternates).toEqual({ canonical: "/about" });
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
    expect(metadata.alternates).toEqual({ canonical: "/blog/a-post" });
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
});
