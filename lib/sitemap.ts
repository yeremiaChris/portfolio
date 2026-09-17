import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";

export const sitemapPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/experience", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
] as const;

function toAbsoluteUrl(siteUrl: string, path: string): string {
  return `${siteUrl}${path}`;
}

function toPostModified(date: string): Date | undefined {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed;
}

export function buildSitemap(siteUrl: string): MetadataRoute.Sitemap {
  const origin = siteUrl.replace(/\/+$/, "");

  const pages: MetadataRoute.Sitemap = sitemapPages.map((page) => ({
    url: toAbsoluteUrl(origin, page.path),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: toAbsoluteUrl(origin, `/blog/${post.slug}`),
    lastModified: toPostModified(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
