import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Container } from "@/components/Container";
import { getAllPosts, getPost } from "@/lib/blog";
import { mdxOptions } from "@/lib/mdx";

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

  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] flex-col gap-8 py-6 md:py-8">
        <div className="flex flex-col gap-4">
          <Link
            href="/blog"
            className="w-fit font-mono text-[12px] text-muted-foreground hover:text-foreground"
          >
            ← Back to blog
          </Link>

          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <p className="max-w-2xl text-[15px] leading-6 text-muted-foreground">
              {post.description}
            </p>
            {post.tags.length > 0 ? (
              <p className="font-mono text-[11px] text-muted-foreground">
                {post.tags.join(" · ")}
              </p>
            ) : null}
          </header>
        </div>

        <article className="prose prose-invert max-w-3xl prose-headings:font-heading prose-a:text-primary prose-code:font-mono prose-pre:bg-muted prose-pre:border prose-pre:border-border/60">
          <MDXRemote source={post.content} options={mdxOptions} />
        </article>
      </Container>
    </main>
  );
}
