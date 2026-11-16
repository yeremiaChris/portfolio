"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import {
  blogCardHoverTransition,
  useBlogActiveCard,
  useBlogCardEnterMotion,
  useBlogCardFocusMotion,
  useBlogCardListOpacity,
  useBlogMotionHover,
} from "@/components/blog/BlogScrollMotion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatBlogDate, type BlogPostSummary } from "@/lib/blog-shared";
import { getTopicsForPost } from "@/lib/blog-topics";
import { cn } from "@/lib/utils";

type BlogPostCardProps = {
  post: BlogPostSummary;
  scrollMotion?: boolean;
};

function BlogPostCardBody({
  post,
  motionHover,
  hovered,
}: {
  post: BlogPostSummary;
  motionHover: boolean;
  hovered: boolean;
}) {
  const href = `/blog/${post.slug}`;
  const topicChips = getTopicsForPost(post).slice(0, 2);

  const titleLink = motionHover ? (
    <Link href={href} className="focus-ring outline-none">
      <m.span
        className="text-foreground inline"
        initial={false}
        animate={{ color: hovered ? "#4cd7f6" : "var(--foreground)" }}
        transition={blogCardHoverTransition}
      >
        {post.title}
      </m.span>
    </Link>
  ) : (
    <Link
      href={href}
      className="focus-ring group-hover:text-primary transition-colors outline-none motion-reduce:transition-none"
    >
      {post.title}
    </Link>
  );

  const readLink = motionHover ? (
    <Link
      href={href}
      className="press focus-ring text-primary inline-flex items-center gap-0.5 text-[12px] outline-none"
    >
      Read article
      <m.span
        className="inline-flex"
        initial={false}
        animate={{ x: hovered ? 3 : 0 }}
        transition={blogCardHoverTransition}
      >
        <ArrowRight className="size-3.5" aria-hidden />
      </m.span>
    </Link>
  ) : (
    <Link
      href={href}
      className="press focus-ring text-primary inline-flex items-center gap-0.5 text-[12px] transition-transform duration-200 outline-none group-hover:translate-x-0.5 motion-reduce:transform-none"
    >
      Read article
      <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );

  return (
    <>
      <CardHeader className="gap-3 p-4 pb-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {topicChips.length > 0 ? (
              topicChips.map((topic) => (
                <Badge
                  key={topic.slug}
                  variant="secondary"
                  render={<Link href={`/blog/tag/${topic.slug}`} />}
                  className={cn(
                    "focus-ring bg-muted text-primary label-caps hover:text-brand-accent rounded-md px-2 py-0.5 tracking-wider transition-colors duration-200",
                    "motion-reduce:transition-none",
                  )}
                >
                  {topic.label}
                </Badge>
              ))
            ) : (
              <Badge
                variant="secondary"
                className="bg-muted text-primary label-caps rounded-md px-2 py-0.5 tracking-wider"
              >
                Article
              </Badge>
            )}
          </div>
          <span className="text-muted-foreground shrink-0 text-[11px]">
            {post.readingTime}
          </span>
        </div>

        <CardTitle className="font-heading text-base leading-snug font-semibold tracking-tight sm:text-lg">
          {titleLink}
        </CardTitle>

        <CardDescription className="text-muted-foreground line-clamp-3 text-[13px] leading-relaxed">
          {post.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t-0 bg-transparent px-4 py-4">
        <time
          dateTime={post.date}
          className="text-muted-foreground label-caps text-[11px] tracking-wider"
        >
          {formatBlogDate(post.date)}
        </time>
        {readLink}
      </CardFooter>
    </>
  );
}

function BlogPostCardShell({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card
      className={cn(
        "group bg-muted ring-border/40 relative flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-xl py-0",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

function BlogPostCardScroll({ post }: { post: BlogPostSummary }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { y, opacity: enterOpacity } = useBlogCardEnterMotion(targetRef);
  const focus = useBlogCardFocusMotion(targetRef);
  const isActive = useBlogActiveCard(post.slug, focus);
  const opacity = useBlogCardListOpacity(enterOpacity, isActive);
  const motionHover = useBlogMotionHover();
  const [hovered, setHovered] = useState(false);

  const pointerHandlers = motionHover
    ? {
        onPointerEnter: () => setHovered(true),
        onPointerLeave: () => setHovered(false),
      }
    : undefined;

  return (
    <m.div
      ref={targetRef}
      className="relative h-full min-w-0"
      style={{ y, opacity }}
      initial={false}
      {...pointerHandlers}
    >
      <m.div
        className="h-full rounded-xl"
        initial={false}
        animate={{
          boxShadow:
            motionHover && hovered
              ? "0 0 28px rgb(76 215 246 / 0.2)"
              : isActive
                ? "0 0 24px rgb(76 215 246 / 0.14)"
                : "0 0 0 rgb(0 0 0 / 0)",
        }}
        transition={motionHover ? blogCardHoverTransition : { duration: 0 }}
      >
        <BlogPostCardShell
          className={cn(
            "ring-0 transition-[border-color,background-color] duration-300 ease-out motion-reduce:transition-none",
            isActive && "border border-[#4cd7f6]/40",
            !isActive && "border border-transparent",
            motionHover && hovered && "bg-muted/80",
            !motionHover && "hover:bg-muted/80",
          )}
        >
          <m.div
            className="pointer-events-none absolute inset-0 rounded-xl border"
            initial={false}
            animate={{
              borderColor:
                motionHover && hovered
                  ? "rgb(76 215 246 / 0.45)"
                  : isActive
                    ? "rgb(76 215 246 / 0.45)"
                    : "transparent",
            }}
            transition={motionHover ? blogCardHoverTransition : undefined}
            aria-hidden
          />
          <div className="relative z-[1] flex h-full flex-col">
            <BlogPostCardBody
              post={post}
              motionHover={motionHover}
              hovered={hovered}
            />
          </div>
        </BlogPostCardShell>
      </m.div>
    </m.div>
  );
}

function BlogPostCardStatic({ post }: { post: BlogPostSummary }) {
  return (
    <BlogPostCardShell className="hover:bg-muted/80 transition-colors motion-reduce:transition-none">
      <BlogPostCardBody post={post} motionHover={false} hovered={false} />
    </BlogPostCardShell>
  );
}

export function BlogPostCard({
  post,
  scrollMotion = false,
}: BlogPostCardProps) {
  const reducedMotion = useReducedMotion();

  if (scrollMotion && !reducedMotion) {
    return <BlogPostCardScroll post={post} />;
  }

  return <BlogPostCardStatic post={post} />;
}
