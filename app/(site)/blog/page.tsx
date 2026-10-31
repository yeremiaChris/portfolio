import type { Metadata } from "next";

import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogIndexExplore } from "@/components/blog/BlogIndexExplore";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { Container } from "@/components/Container";
import { ContactCta, blogContactActions } from "@/components/home/ContactCta";
import {
  blogContactCta,
  blogIntro,
  getAllPosts,
  getFeaturedPost,
  toBlogPostSummary,
} from "@/lib/blog";
import { getBlogTopicBySlug } from "@/lib/blog-topics";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog | Yeremia Chris Saragi",
  description: blogIntro.description,
  path: "/blog",
});

type BlogPageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag: tagParam } = await searchParams;
  const posts = getAllPosts();
  const summaries = posts.map(toBlogPostSummary);
  const featured = getFeaturedPost(posts);
  const activeTopicSlug =
    tagParam && getBlogTopicBySlug(tagParam) ? tagParam : null;

  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col overflow-x-hidden py-6 md:py-8">
        <BlogHeader />

        <BlogIndexExplore
          posts={summaries}
          featuredSlug={featured?.slug ?? null}
          activeTopicSlug={activeTopicSlug}
          showFeatured
        />

        <BlogSubscribe />

        <ContactCta
          id="blog-contact"
          withContainer={false}
          className="mb-4"
          eyebrow={blogContactCta.eyebrow}
          title={blogContactCta.title}
          description={blogContactCta.description}
          actions={blogContactActions()}
        />
      </Container>
    </main>
  );
}
