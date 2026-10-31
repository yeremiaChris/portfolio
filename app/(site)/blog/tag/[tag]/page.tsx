import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogIndexExplore } from "@/components/blog/BlogIndexExplore";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { Container } from "@/components/Container";
import { ContactCta, blogContactActions } from "@/components/home/ContactCta";
import {
  blogContactCta,
  blogIntro,
  getAllPosts,
  getBlogRibbon,
  getFeaturedPost,
  toBlogPostSummary,
} from "@/lib/blog";
import {
  filterPostsByTopicSlug,
  getBlogTopicBySlug,
  getBlogTopicSlugs,
} from "@/lib/blog-topics";
import { buildPageMetadata } from "@/lib/seo";

type BlogTagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getBlogTopicSlugs().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: BlogTagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const topic = getBlogTopicBySlug(tag);

  if (!topic) {
    return {
      title: "Topic not found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `${topic.label} · Blog | Yeremia Chris Saragi`,
    description: `${blogIntro.description} Filtered by ${topic.label}.`,
    path: `/blog/tag/${tag}`,
  });
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag } = await params;
  const topic = getBlogTopicBySlug(tag);

  if (!topic) notFound();

  const posts = getAllPosts();
  const topicPosts = filterPostsByTopicSlug(posts, tag);
  const summaries = topicPosts.map(toBlogPostSummary);
  const metrics = getBlogRibbon(topicPosts);
  const featured = getFeaturedPost(topicPosts);

  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col overflow-x-hidden py-6 md:py-8">
        <BlogHeader metrics={metrics} />

        <p className="text-muted-foreground label-caps -mt-4 mb-2 tracking-wider">
          Topic · {topic.label}
        </p>

        <BlogIndexExplore
          posts={summaries}
          featuredSlug={featured?.slug ?? null}
          activeTopicSlug={tag}
          showFeatured={Boolean(featured)}
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
