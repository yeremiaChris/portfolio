"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { getTocItems, shouldShowToc } from "@/components/blog/BlogToc";
import type { BlogHeading } from "@/lib/blog";
import { projectsFeaturedSpring } from "@/lib/projects-motion";
import { cn } from "@/lib/utils";

const tocScrollOffset = 120;

type BlogPostReadingContextValue = {
  activeHeadingId: string | null;
  tocEnabled: boolean;
};

const BlogPostReadingContext =
  createContext<BlogPostReadingContextValue | null>(null);

export function useBlogPostTocActive() {
  return useContext(BlogPostReadingContext);
}

function useTocActiveHeading(headings: BlogHeading[]) {
  const tocEnabled = shouldShowToc(headings);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!tocEnabled) {
      return undefined;
    }

    const items = getTocItems(headings);

    const sync = () => {
      let active: string | null = null;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (!element) {
          continue;
        }
        if (element.getBoundingClientRect().top <= tocScrollOffset) {
          active = item.id;
        } else {
          break;
        }
      }
      setActiveHeadingId((current) => (current === active ? current : active));
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [headings, tocEnabled]);

  return { activeHeadingId, tocEnabled };
}

export function BlogPostReadingProvider({
  headings,
  children,
}: {
  headings: BlogHeading[];
  children: ReactNode;
}) {
  const { activeHeadingId, tocEnabled } = useTocActiveHeading(headings);

  return (
    <BlogPostReadingContext.Provider value={{ activeHeadingId, tocEnabled }}>
      {children}
    </BlogPostReadingContext.Provider>
  );
}

export function BlogPostArticle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-w-0 lg:col-span-8">
      <article
        className={cn(
          "prose prose-invert prose-headings:scroll-mt-24 prose-headings:font-heading prose-p:leading-[1.7] prose-li:leading-[1.7] prose-a:text-primary prose-code:font-mono prose-pre:border prose-pre:border-border/60 prose-pre:bg-muted max-w-none min-w-0",
          className,
        )}
      >
        {children}
      </article>
    </div>
  );
}

function BlogMdxMediaMotion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.55"],
  });
  const progress = useSpring(scrollYProgress, projectsFeaturedSpring);
  const y = useTransform(progress, [0, 1], [16, 0]);
  const opacity = useTransform(progress, [0, 1], [0.3, 1]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ y, opacity }}
      initial={false}
    >
      {children}
    </m.div>
  );
}

function MdxImg(props: ComponentProps<"img">) {
  return (
    <BlogMdxMediaMotion className="not-prose my-6 block w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={props.alt ?? ""}
        {...props}
        className={cn("rounded-lg", props.className)}
      />
    </BlogMdxMediaMotion>
  );
}

function MdxPre(props: ComponentProps<"pre">) {
  return (
    <BlogMdxMediaMotion>
      <pre {...props} />
    </BlogMdxMediaMotion>
  );
}

function MdxBlockquote(props: ComponentProps<"blockquote">) {
  return (
    <BlogMdxMediaMotion>
      <blockquote {...props} />
    </BlogMdxMediaMotion>
  );
}

export const blogPostMdxComponents = {
  img: MdxImg,
  pre: MdxPre,
  blockquote: MdxBlockquote,
};
