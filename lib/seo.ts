import type { Metadata } from "next";

import { aboutProfile } from "@/lib/about";
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

export function toAbsoluteUrl(path: string, origin = getSiteUrl()): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

export const PERSON_KNOWS_ABOUT = [
  "React",
  "Next.js",
  "Vue",
  "TypeScript",
  "FHIR",
] as const;

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
    alternateName: site.name,
    url,
    jobTitle: "Software Engineer",
    description: site.bio,
    image: toAbsoluteUrl(aboutProfile.image, url),
    email: site.links.email.replace(/^mailto:/, ""),
    sameAs: [site.links.github, site.links.linkedin],
    knowsAbout: [...PERSON_KNOWS_ABOUT],
  };
}

export function buildProfilePageJsonLd(path = "/") {
  const origin = getSiteUrl();
  const canonical = toCanonicalPath(path);
  const pageUrl = canonical === "/" ? origin : toAbsoluteUrl(canonical, origin);
  const { "@context": _context, ...mainEntity } = buildPersonJsonLd();

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": canonical === "/" ? `${origin}/#profile` : `${pageUrl}#profile`,
    url: pageUrl,
    name: site.fullName,
    mainEntity,
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
    description: site.tagline,
    inLanguage: "en",
    publisher: { "@id": `${url}/#person` },
  };
}

export function buildHomeJsonLd() {
  return [buildProfilePageJsonLd("/"), buildWebSiteJsonLd()];
}
