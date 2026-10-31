export type BlogPostMeta = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  image?: string;
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

export type BlogPostSummary = Omit<BlogPost, "content">;

export function toBlogPostSummary(post: BlogPost): BlogPostSummary {
  const { content: _content, ...summary } = post;
  return summary;
}

export function formatBlogDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
}
