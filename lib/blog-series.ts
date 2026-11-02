export type SeriesItem = {
  slug: string;
  title: string;
  series?: string;
  part?: number;
};

export type ReadingPosition = {
  headingId?: string;
  headingText?: string;
  headingIndex?: number;
  scrollY: number;
  updatedAt: number;
};

const SERIES_TITLES: Record<string, string> = {
  "learning-ai-engineering": "Learning AI Engineering in Public",
};

export function getSeriesTitle(series: string): string {
  return SERIES_TITLES[series] ?? series;
}

export function getSeriesPosts<T extends SeriesItem>(
  series: string,
  posts: T[],
): T[] {
  return posts
    .filter((post) => post.series === series && typeof post.part === "number")
    .sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
}

export function getSeriesNav<T extends SeriesItem>(
  post: SeriesItem,
  posts: T[],
): { parts: T[]; index: number; prev: T | null; next: T | null } {
  if (!post.series) return { parts: [], index: -1, prev: null, next: null };
  const parts = getSeriesPosts(post.series, posts);
  const index = parts.findIndex((entry) => entry.slug === post.slug);
  if (index === -1) return { parts, index, prev: null, next: null };
  return {
    parts,
    index,
    prev: parts[index - 1] ?? null,
    next: parts[index + 1] ?? null,
  };
}

export function getFirstUnreadPart<T extends SeriesItem>(
  parts: T[],
  readSlugs: readonly string[],
): T | null {
  const read = new Set(readSlugs);
  return parts.find((part) => !read.has(part.slug)) ?? null;
}

export function getLatestPosition<T extends SeriesItem>(
  parts: T[],
  positions: Record<string, ReadingPosition>,
): { part: T; position: ReadingPosition } | null {
  let latest: { part: T; position: ReadingPosition } | null = null;
  for (const part of parts) {
    const position = positions[part.slug];
    if (!position) continue;
    if (!latest || position.updatedAt > latest.position.updatedAt) {
      latest = { part, position };
    }
  }
  return latest;
}

export function getResumeHref(slug: string, position?: ReadingPosition) {
  return position?.headingId
    ? `/blog/${slug}#${position.headingId}`
    : `/blog/${slug}`;
}

type ResumeHeading = { id: string; text: string };

function normalizeHeading(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

export function resolveResumeHeading<T extends ResumeHeading>(
  headings: readonly T[],
  position?: ReadingPosition,
): T | null {
  if (!position) return null;
  if (position.headingId) {
    const byId = headings.find((heading) => heading.id === position.headingId);
    if (byId) return byId;
  }
  if (position.headingText) {
    const text = normalizeHeading(position.headingText);
    const byText = headings.find(
      (heading) => normalizeHeading(heading.text) === text,
    );
    if (byText) return byText;
  }
  if (
    typeof position.headingIndex === "number" &&
    position.headingIndex >= 0 &&
    position.headingIndex < headings.length
  ) {
    return headings[position.headingIndex];
  }
  return null;
}
