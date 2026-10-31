import {
  BLOG_TOPICS,
  getBlogTopicBySlug,
  type BlogTopic,
} from "@/lib/blog-topics.constants";

export {
  BLOG_TOPICS,
  getBlogTopicBySlug,
  getBlogTopicSlugs,
  type BlogTopic,
} from "@/lib/blog-topics.constants";

export type BlogPostListItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image?: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  readingTime: string;
  readingMinutes: number;
};

export function postMatchesTopic(
  post: BlogPostListItem,
  topic: BlogTopic,
): boolean {
  return post.tags.some((tag) => topic.matchTags.includes(tag));
}

export function filterPostsByTopicSlug<T extends BlogPostListItem>(
  posts: T[],
  topicSlug: string | null | undefined,
): T[] {
  if (!topicSlug) return posts;

  const topic = getBlogTopicBySlug(topicSlug);
  if (!topic) return posts;

  return posts.filter((post) => postMatchesTopic(post, topic));
}

export function normalizeBlogSearchQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function postMatchesSearch(
  post: BlogPostListItem,
  rawQuery: string,
): boolean {
  const query = normalizeBlogSearchQuery(rawQuery);
  if (!query) return true;

  const haystack = [post.title, post.description, ...post.tags]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function filterPostsBySearch<T extends BlogPostListItem>(
  posts: T[],
  rawQuery: string,
): T[] {
  const query = normalizeBlogSearchQuery(rawQuery);
  if (!query) return posts;
  return posts.filter((post) => postMatchesSearch(post, query));
}

export function filterBlogPosts<T extends BlogPostListItem>(
  posts: T[],
  options: { topicSlug?: string | null; searchQuery?: string },
): T[] {
  const byTopic = filterPostsByTopicSlug(posts, options.topicSlug ?? null);
  return filterPostsBySearch(byTopic, options.searchQuery ?? "");
}

export function getTopicsForPost(post: BlogPostListItem): BlogTopic[] {
  return BLOG_TOPICS.filter((topic) => postMatchesTopic(post, topic));
}

export function getCardTopicLabels(
  post: BlogPostListItem,
  limit = 2,
): string[] {
  const labels = getTopicsForPost(post).map((topic) => topic.label);
  return labels.slice(0, limit);
}

export function getTopicSlugForTag(tag: string): string | undefined {
  const topic = BLOG_TOPICS.find((entry) => entry.matchTags.includes(tag));
  return topic?.slug;
}

export function getRelatedPosts<T extends BlogPostListItem>(
  post: BlogPostListItem,
  allPosts: T[],
  limit = 3,
): T[] {
  const tagSet = new Set(post.tags);
  if (tagSet.size === 0) return [];

  const scored = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const shared = candidate.tags.filter((tag) => tagSet.has(tag)).length;
      return { candidate, shared };
    })
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared;
      return b.candidate.date.localeCompare(a.candidate.date);
    });

  return scored.slice(0, limit).map((entry) => entry.candidate);
}
