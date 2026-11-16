"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef, useState } from "react";

import {
  blogCardHoverTransition,
  useBlogCardEnterMotion,
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

export function BlogPostCard({
  post,
  scrollMotion = false,
}: BlogPostCardProps) {
  const reducedMotion = useReducedMotion();
  const motionHover = useBlogMotionHover();
  const animateEnter = scrollMotion && !reducedMotion;

  const targetRef = useRef<HTMLDivElement>(null);
  const { y, opacity } = useBlogCardEnterMotion(targetRef);
  const [hovered, setHovered] = useState(false);
  const spotlightX = useMotionValue(-120);
  const spotlightY = useMotionValue(-120);
  const spotlightOpacity = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotlightX}px ${spotlightY}px, color-mix(in oklab, var(--color-primary) 20%, transparent), color-mix(in oklab, var(--color-primary) 4%, transparent) 38%, transparent 58%)`;

  const href = `/blog/${post.slug}`;
  const topicChips = getTopicsForPost(post).slice(0, 2);

  const pointerHandlers =
    motionHover && animateEnter
      ? {
          onPointerEnter: (event: React.PointerEvent<HTMLDivElement>) => {
            setHovered(true);
            spotlightOpacity.set(1);
            const rect = event.currentTarget.getBoundingClientRect();
            spotlightX.set(event.clientX - rect.left);
            spotlightY.set(event.clientY - rect.top);
          },
          onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => {
            const rect = event.currentTarget.getBoundingClientRect();
            spotlightX.set(event.clientX - rect.left);
            spotlightY.set(event.clientY - rect.top);
          },
          onPointerLeave: () => {
            setHovered(false);
            spotlightOpacity.set(0);
          },
        }
      : undefined;

  const shellClass = cn(
    "group bg-muted ring-border/40 relative flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-transparent py-0",
    !motionHover &&
      "hover:bg-muted/80 transition-colors motion-reduce:transition-none",
    animateEnter && motionHover && "ring-0",
  );

  const body = (
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

        <CardTitle className="font-heading text-foreground text-base leading-snug font-semibold tracking-tight sm:text-lg">
          <Link
            href={href}
            className="focus-ring group-hover:text-primary transition-colors outline-none motion-reduce:transition-none"
          >
            {post.title}
          </Link>
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
        <Link
          href={href}
          className="press focus-ring text-primary inline-flex items-center gap-0.5 text-[12px] transition-transform duration-200 outline-none group-hover:translate-x-0.5 motion-reduce:transform-none"
        >
          Read article
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </CardFooter>
    </>
  );

  const cardInner = (
    <Card className={shellClass}>
      {motionHover && animateEnter ? (
        <m.div
          className="pointer-events-none absolute inset-0 z-[1] rounded-xl border border-transparent"
          style={{ backgroundImage: spotlight, opacity: spotlightOpacity }}
          initial={false}
          animate={{
            borderColor: hovered
              ? "color-mix(in oklab, var(--color-primary) 45%, transparent)"
              : "color-mix(in oklab, var(--color-primary) 0%, transparent)",
            backgroundColor: hovered
              ? "rgb(255 255 255 / 0.02)"
              : "transparent",
          }}
          transition={blogCardHoverTransition}
          aria-hidden
        />
      ) : null}
      <div className="relative z-[2] flex h-full flex-col">{body}</div>
    </Card>
  );

  if (animateEnter) {
    return (
      <m.div
        ref={targetRef}
        className="relative h-full min-w-0"
        style={{ y, opacity }}
        initial={false}
        {...pointerHandlers}
      >
        {cardInner}
      </m.div>
    );
  }

  return (
    <div ref={targetRef} className="h-full min-w-0">
      {cardInner}
    </div>
  );
}
