export type BlogTopic = {
  slug: string;
  label: string;
  matchTags: readonly string[];
};

export const BLOG_TOPICS: readonly BlogTopic[] = [
  {
    slug: "react",
    label: "React",
    matchTags: [
      "react",
      "hooks",
      "patterns",
      "context",
      "forms",
      "fundamentals",
    ],
  },
  {
    slug: "js-typescript",
    label: "JS & TypeScript",
    matchTags: ["javascript", "typescript"],
  },
  {
    slug: "nextjs-security",
    label: "Next.js & Security",
    matchTags: [
      "nextjs",
      "nuxt",
      "security",
      "testing",
      "vitest",
      "playwright",
      "lighthouse",
      "motion",
    ],
  },
  {
    slug: "ai-engineering",
    label: "AI Engineering",
    matchTags: [
      "ai-engineering",
      "llm",
      "rag",
      "embeddings",
      "tokens",
      "api",
      "semantic-search",
    ],
  },
  {
    slug: "css-web",
    label: "CSS & Web",
    matchTags: ["css", "fonts", "tailwind"],
  },
  {
    slug: "learning-in-public",
    label: "Learning in public",
    matchTags: ["learning-in-public"],
  },
  {
    slug: "side-projects",
    label: "Side project",
    matchTags: ["hermes-agent"],
  },
] as const;

export function getBlogTopicSlugs(): string[] {
  return BLOG_TOPICS.map((topic) => topic.slug);
}

export function getBlogTopicBySlug(slug: string): BlogTopic | undefined {
  return BLOG_TOPICS.find((topic) => topic.slug === slug);
}
