"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { getTocItems, shouldShowToc } from "@/components/blog/BlogToc";
import type { BlogHeading } from "@/lib/blog";
import { projectsFeaturedSpring } from "@/lib/projects-motion";
import { cn } from "@/lib/utils";

const tocScrollOffset = 120;

type BlogPostReadingContextValue = {
  activeHeadingId: string | null;
  tocEnabled: boolean;
  titleRegionRef: RefObject<HTMLDivElement | null>;
};

const BlogPostReadingContext =
  createContext<BlogPostReadingContextValue | null>(null);

export function useBlogPostTocActive() {
  return useContext(BlogPostReadingContext);
}

type BlogReadingProgressMotion = {
  scaleX: MotionValue<number>;
  opacity: MotionValue<number>;
};

let blogReadingProgressBar: BlogReadingProgressMotion | null = null;
const blogReadingProgressListeners = new Set<() => void>();

function publishBlogReadingProgress() {
  blogReadingProgressListeners.forEach((listener) => listener());
}

function subscribeBlogReadingProgress(listener: () => void) {
  blogReadingProgressListeners.add(listener);
  return () => blogReadingProgressListeners.delete(listener);
}

function getBlogReadingProgressSnapshot() {
  return blogReadingProgressBar;
}

function useBlogReadingProgressBar() {
  return useSyncExternalStore(
    subscribeBlogReadingProgress,
    getBlogReadingProgressSnapshot,
    () => null,
  );
}

export function BlogHeaderReadingProgress() {
  const bar = useBlogReadingProgressBar();

  if (!bar) {
    return null;
  }

  return (
    <m.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#4cd7f6] shadow-[0_0_12px_rgb(76_215_246_/_0.28)]"
      style={{ scaleX: bar.scaleX, opacity: bar.opacity }}
      initial={false}
    />
  );
}

function BlogReadingProgressControl({
  articleRef,
  titleRegionRef,
}: {
  articleRef: RefObject<HTMLElement | null>;
  titleRegionRef: RefObject<HTMLElement | null>;
}) {
  const reducedMotion = useReducedMotion();

  const { scrollYProgress: articleProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: titleReveal } = useScroll({
    target: titleRegionRef,
    offset: ["end 64px", "end 56px"],
  });

  const scaleXSpring = useSpring(articleProgress, projectsFeaturedSpring);
  const scaleX: MotionValue<number> = reducedMotion
    ? articleProgress
    : scaleXSpring;
  const opacity = useTransform(titleReveal, [0, 1], [0, 1]);

  useEffect(() => {
    blogReadingProgressBar = { scaleX, opacity };
    publishBlogReadingProgress();
    return () => {
      blogReadingProgressBar = null;
      publishBlogReadingProgress();
    };
  }, [opacity, scaleX]);

  return null;
}

export function BlogPostTitleSection({ children }: { children: ReactNode }) {
  const context = useContext(BlogPostReadingContext);

  return (
    <div ref={context?.titleRegionRef} className="flex flex-col gap-4">
      {children}
    </div>
  );
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
  const titleRegionRef = useRef<HTMLDivElement>(null);

  return (
    <BlogPostReadingContext.Provider
      value={{ activeHeadingId, tocEnabled, titleRegionRef }}
    >
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
  const articleRef = useRef<HTMLElement>(null);
  const context = useContext(BlogPostReadingContext);
  const titleRegionRef = context?.titleRegionRef ?? { current: null };

  return (
    <div className="min-w-0 lg:col-span-8">
      <BlogReadingProgressControl
        articleRef={articleRef}
        titleRegionRef={titleRegionRef}
      />
      <article
        ref={articleRef}
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
