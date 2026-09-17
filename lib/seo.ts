import type { Metadata } from "next";

import { getSiteUrl, site } from "@/lib/site";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function toCanonicalPath(path: string): string {
  const trimmed = path.trim();
  if (trimmed === "" || trimmed === "/") return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Yeremia Chris Saragi — Software Engineer",
} as const;

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonical = toCanonicalPath(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      locale: "en_US",
      siteName: site.fullName,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export function buildPersonJsonLd() {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}/#person`,
    name: site.fullName,
    url,
    jobTitle: "Software Engineer",
    description: site.bio,
    email: site.links.email.replace(/^mailto:/, ""),
    sameAs: [site.links.github, site.links.linkedin],
  };
}

export function buildWebSiteJsonLd() {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: `${site.fullName} | Software Engineer`,
    url,
    description: site.bio,
    inLanguage: "en",
    publisher: { "@id": `${url}/#person` },
  };
}

export function buildHomeJsonLd() {
  return [buildPersonJsonLd(), buildWebSiteJsonLd()];
}
