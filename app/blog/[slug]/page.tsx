import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { BlogToc } from "@/components/blog/BlogToc";
import { BlogTocMobile } from "@/components/blog/BlogTocMobile";
import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import {
  formatBlogDate,
  getAllPosts,
  getPost,
  getPostHeadings,
} from "@/lib/blog";
import { mdxOptions } from "@/lib/mdx";
import { cn } from "@/lib/utils";

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
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} | Yeremia Chris Saragi`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const headings = getPostHeadings(post.content);

  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col gap-8 py-6 md:py-8">
        <div className="flex flex-col gap-4">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-primary inline-flex w-fit items-center gap-1.5 font-mono text-[12px] transition-colors"
          >
            <ArrowLeft className="text-primary size-3.5" aria-hidden />
            Back to blog
          </Link>

          <header className="flex flex-col gap-3">
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-[15px] leading-6">
              {post.description}
            </p>
            {post.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={cn(
                      "text-muted-foreground font-mono text-[10px] tracking-wider uppercase",
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </header>
        </div>

        <BlogTocMobile headings={headings} />

        <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <article className="prose prose-invert prose-headings:scroll-mt-24 prose-headings:font-heading prose-a:text-primary prose-code:font-mono prose-pre:border prose-pre:border-border/60 prose-pre:bg-muted max-w-none min-w-0 lg:col-span-8">
            <MDXRemote source={post.content} options={mdxOptions} />
          </article>

          <aside className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <BlogToc headings={headings} />
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
