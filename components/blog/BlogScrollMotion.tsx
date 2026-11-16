"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { usePointerFine } from "@/components/projects/usePointerFine";
import { projectsFeaturedSpring } from "@/lib/projects-motion";

const blogCardEnterOffset: ["start end", "start 0.45"] = [
  "start end",
  "start 0.45",
];

const blogCardFocusOffset: ["start end", "end start"] = [
  "start end",
  "end start",
];

const blogHoverEase = [0, 0, 0.2, 1] as const;

export const blogCardHoverTransition = {
  duration: 0.3,
  ease: blogHoverEase,
} as const;

type BlogActiveCardContextValue = {
  activeSlug: string | null;
  registerFocus: (slug: string, focus: MotionValue<number>) => void;
  unregisterFocus: (slug: string) => void;
  syncActive: () => void;
};

const BlogActiveCardContext = createContext<BlogActiveCardContextValue | null>(
  null,
);

function recomputeActiveSlug(
  entries: Map<string, MotionValue<number>>,
): string | null {
  let bestSlug: string | null = null;
  let best = 0;
  for (const [slug, focus] of entries) {
    const value = focus.get();
    if (value > best) {
      best = value;
      bestSlug = slug;
    }
  }
  return best > 0.08 ? bestSlug : null;
}

export function BlogActiveCardProvider({ children }: { children: ReactNode }) {
  const entriesRef = useRef(new Map<string, MotionValue<number>>());
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const syncActive = useCallback(() => {
    const next = recomputeActiveSlug(entriesRef.current);
    setActiveSlug((current) => (current === next ? current : next));
  }, []);

  const registerFocus = useCallback(
    (slug: string, focus: MotionValue<number>) => {
      entriesRef.current.set(slug, focus);
      syncActive();
    },
    [syncActive],
  );

  const unregisterFocus = useCallback(
    (slug: string) => {
      entriesRef.current.delete(slug);
      syncActive();
    },
    [syncActive],
  );

  const value = useMemo(
    () => ({ activeSlug, registerFocus, unregisterFocus, syncActive }),
    [activeSlug, registerFocus, unregisterFocus, syncActive],
  );

  return (
    <BlogActiveCardContext.Provider value={value}>
      {children}
    </BlogActiveCardContext.Provider>
  );
}

export function useBlogActiveCard(slug: string, focus: MotionValue<number>) {
  const context = useContext(BlogActiveCardContext);
  const isActive = context?.activeSlug === slug;

  useEffect(() => {
    if (!context) {
      return undefined;
    }
    context.registerFocus(slug, focus);
    return () => context.unregisterFocus(slug);
  }, [context, slug, focus]);

  useMotionValueEvent(focus, "change", () => {
    context?.syncActive();
  });

  return isActive;
}

export function useBlogCardEnterMotion(
  targetRef: RefObject<HTMLElement | null>,
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: blogCardEnterOffset,
  });
  const progress = useSpring(scrollYProgress, projectsFeaturedSpring);
  const y = useTransform(progress, [0, 1], [56, 0]);
  const opacity = useTransform(progress, [0, 1], [0.3, 1]);
  return { y, opacity };
}

export function useBlogCardFocusMotion(
  targetRef: RefObject<HTMLElement | null>,
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: blogCardFocusOffset,
  });
  return useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
    projectsFeaturedSpring,
  );
}

export function useBlogCardListOpacity(
  enterOpacity: MotionValue<number>,
  isActive: boolean,
) {
  const dim = useMotionValue(isActive ? 1 : 0.6);
  useEffect(() => {
    dim.set(isActive ? 1 : 0.6);
  }, [dim, isActive]);
  return useTransform(
    [enterOpacity, dim],
    (values: number[]) => (values[0] ?? 1) * (values[1] ?? 1),
  );
}

export function useBlogMotionHover() {
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  return pointerFine && !reducedMotion;
}
