import type { Metadata } from "next";

import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Container } from "@/components/Container";
import { ContactCta, blogContactActions } from "@/components/home/ContactCta";
import {
  blogContactCta,
  blogIntro,
  getAllPosts,
  getBlogRibbon,
  getFeaturedPost,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Yeremia Chris Saragi",
  description: blogIntro.description,
};

export default function BlogPage() {
  const posts = getAllPosts();
  const metrics = getBlogRibbon(posts);
  const featured = getFeaturedPost(posts);
  const remaining = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : posts;

  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col overflow-x-hidden py-6 md:py-8">
        <BlogHeader metrics={metrics} />

        {featured ? <FeaturedPost post={featured} /> : null}

        {posts.length === 0 ? (
          <p className="text-muted-foreground mb-8 text-sm">No posts yet.</p>
        ) : (
          <BlogPostGrid posts={remaining} />
        )}

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
