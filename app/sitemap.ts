import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";
import { buildSitemap } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(getSiteUrl());
}
