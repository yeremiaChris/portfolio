import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { BlogPostTitleMeta } from "@/components/blog/BlogPostTitleMeta";
import { BlogToc } from "@/components/blog/BlogToc";
import { BlogTocMobile } from "@/components/blog/BlogTocMobile";
import { BlogTagBadge } from "@/components/blog/BlogTagBadge";
import { ReadingResume } from "@/components/blog/ReadingResume";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { SeriesNav } from "@/components/blog/SeriesNav";
import {
  SeriesMarkRead,
  SeriesToc,
  SeriesTocMobile,
} from "@/components/blog/SeriesToc";
import { Container } from "@/components/Container";
import {
  formatBlogDate,
  getAllPosts,
  getPost,
  getPostHeadings,
} from "@/lib/blog";
import { getSeriesNav, getSeriesTitle } from "@/lib/blog-series";
import { getRelatedPosts } from "@/lib/blog-topics";
import { mdxOptions } from "@/lib/mdx";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBlogPostingJsonLd, buildPageMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  return buildPageMetadata({
    title: `${post.title} | Yeremia Chris Saragi`,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const headings = getPostHeadings(post.content);
  const allPosts = getAllPosts();
  const relatedPosts = getRelatedPosts(post, allPosts, 3);
  const seriesNav = getSeriesNav(post, allPosts);
  const seriesParts = seriesNav.parts.map(({ slug, title, series, part }) => ({
    slug,
    title,
    series,
    part,
  }));
  const seriesToc =
    post.series && seriesNav.index !== -1
      ? {
          title: getSeriesTitle(post.series),
          parts: seriesParts,
          currentSlug: post.slug,
        }
      : null;

  return (
    <main>
      <JsonLd
        data={buildBlogPostingJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.date,
          dateModified: post.updated,
          image: post.image,
        })}
      />
      <Container className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col gap-8 py-6 md:py-8">
        <div className="flex flex-col gap-4">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-primary -my-2.5 inline-flex min-h-10 w-fit items-center gap-1.5 text-[12px] font-medium transition-colors sm:my-0 sm:min-h-0"
          >
            <ArrowLeft className="text-primary size-3.5" aria-hidden />
            Back to blog
          </Link>

          <div className="flex flex-col gap-3">
            <BlogPostTitleMeta
              meta={
                <>
                  {seriesToc ? (
                    <>
                      <span className="text-primary">
                        Part {post.part} of {seriesToc.parts.length}
                      </span>
                      <span aria-hidden>·</span>
                    </>
                  ) : null}
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                </>
              }
              title={post.title}
            />
            <p className="text-muted-foreground max-w-2xl text-[15px] leading-[1.7]">
              {post.description}
            </p>
            {post.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <BlogTagBadge key={tag} tag={tag} />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <ReadingResume slug={post.slug} headings={headings} />

        {seriesToc ? <SeriesTocMobile {...seriesToc} /> : null}

        <BlogTocMobile headings={headings} />

        <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <article className="prose prose-invert prose-headings:scroll-mt-24 prose-headings:font-heading prose-p:leading-[1.7] prose-li:leading-[1.7] prose-a:text-primary prose-code:font-mono prose-pre:border prose-pre:border-border/60 prose-pre:bg-muted max-w-none min-w-0 lg:col-span-8">
            <MDXRemote source={post.content} options={mdxOptions} />
            {seriesToc ? (
              <div className="not-prose border-border/40 mt-10 flex flex-col gap-4 border-t pt-6">
                <SeriesMarkRead slug={post.slug} />
                <SeriesNav
                  prev={seriesParts[seriesNav.index - 1] ?? null}
                  next={seriesParts[seriesNav.index + 1] ?? null}
                />
              </div>
            ) : null}
          </article>

          <aside className="min-w-0 lg:col-span-4">
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              {seriesToc ? (
                <div className="hidden lg:block">
                  <SeriesToc {...seriesToc} />
                </div>
              ) : null}
              <BlogToc headings={headings} />
            </div>
          </aside>
        </div>

        <RelatedPosts posts={relatedPosts} />
      </Container>
    </main>
  );
}
