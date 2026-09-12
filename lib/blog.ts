import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import readingTime from "reading-time";

import { site } from "@/lib/site";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
};

export type BlogPost = BlogPostMeta & {
  slug: string;
  content: string;
  readingTime: string;
  readingMinutes: number;
};

export type BlogHeading = {
  depth: 2 | 3;
  text: string;
  id: string;
};

export type BlogRibbonTone = "foreground" | "primary" | "cyan";

export type BlogRibbonMetric = {
  label: string;
  value: string;
  tone: BlogRibbonTone;
};

export const blogIntro = {
  breadcrumbRoot: "sys://root/blog",
  breadcrumbLeaf: "writing.log",
  statusBadge: "Writing // Active",
  title: "Notes & Essays",
  description:
    "Practical notes on React, Next.js, Vue, product UI, and shipping reliable software across health-tech and logistics.",
} as const;

export const blogSubscribe = {
  eyebrow: "Stay in the loop",
  title: "Follow new posts",
  description:
    "No marketing newsletter. Grab the RSS feed for occasional notes on frontend craft, APIs, and shipping product UI — or email me directly.",
  rssLabel: "RSS feed",
  rssHref: "/feed.xml",
  emailLabel: "Email me",
  privacyNote: "No trackers · occasional updates only",
} as const;

export const blogContactCta = {
  eyebrow: "Open to opportunities",
  title: "Want to talk about a role or a product problem?",
  description:
    "Open for Software Engineer roles (frontend-heavy) — full-time or contract. Reach out via WhatsApp, email, or LinkedIn.",
} as const;

export const blogRibbonToneClass: Record<BlogRibbonTone, string> = {
  foreground: "text-foreground",
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
};

export function getBlogRibbon(posts: BlogPost[]): BlogRibbonMetric[] {
  const totalMinutes = posts.reduce(
    (sum, post) => sum + Math.max(1, Math.ceil(post.readingMinutes)),
    0,
  );
  const tagCount = new Set(posts.flatMap((post) => post.tags)).size;

  return [
    {
      label: "Posts",
      value: String(posts.length).padStart(2, "0"),
      tone: "primary",
    },
    {
      label: "Topics",
      value: String(tagCount).padStart(2, "0"),
      tone: "cyan",
    },
    {
      label: "Read time",
      value: `${totalMinutes} min`,
      tone: "foreground",
    },
  ];
}

function assertMeta(data: Record<string, unknown>, slug: string): BlogPostMeta {
  const title = data.title;
  const description = data.description;
  const date = data.date;

  if (typeof title !== "string" || !title.trim()) {
    throw new Error(`Post "${slug}" is missing a title`);
  }
  if (typeof description !== "string" || !description.trim()) {
    throw new Error(`Post "${slug}" is missing a description`);
  }
  if (typeof date !== "string" || !date.trim()) {
    throw new Error(`Post "${slug}" is missing a date`);
  }

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];

  return {
    title: title.trim(),
    description: description.trim(),
    date: date.trim(),
    updated: typeof data.updated === "string" ? data.updated : undefined,
    tags,
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
  };
}

function readPostFile(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = assertMeta(data as Record<string, unknown>, slug);
  const stats = readingTime(content);

  return {
    ...meta,
    slug,
    content,
    readingTime: stats.text,
    readingMinutes: stats.minutes,
  };
}

function listMdxSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function isPublished(post: BlogPost): boolean {
  if (!post.draft) return true;
  return process.env.NODE_ENV !== "production";
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getAllPosts(): BlogPost[] {
  return listMdxSlugs()
    .map((slug) => readPostFile(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter(isPublished)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | null {
  const post = readPostFile(slug);
  if (!post || !isPublished(post)) return null;
  return post;
}

/** Heading IDs match `rehype-slug` (github-slugger). */
export function getPostHeadings(content: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  let inCodeFence = false;

  for (const line of content.split("\n")) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .trim();

    if (!text) continue;

    headings.push({
      depth,
      text,
      id: slugger.slug(text),
    });
  }

  return headings;
}

export function getFeaturedPost(posts: BlogPost[]): BlogPost | null {
  if (posts.length === 0) return null;
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}

export function formatBlogDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildBlogRssFeed(siteUrl: string): string {
  const posts = getAllPosts();
  const channelLink = `${siteUrl}/blog`;

  const items = posts
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${site.fullName} — Blog`)}</title>
    <link>${escapeXml(channelLink)}</link>
    <description>${escapeXml(blogIntro.description)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
}
