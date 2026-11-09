"use client";

import { useEffect, useState } from "react";
import { RotateCcw, X } from "lucide-react";

import {
  saveReadingPosition,
  useReadingStore,
} from "@/components/blog/useReadingStore";
import type { BlogHeading } from "@/lib/blog";
import { resolveResumeHeading } from "@/lib/blog-series";
import {
  scrollDocumentToElement,
  scrollDocumentToY,
} from "@/lib/programmatic-scroll";

const MIN_SCROLL = 240;
const SAVE_INTERVAL = 800;
const HEADING_OFFSET = 120;

export function ReadingResume({
  slug,
  headings,
}: {
  slug: string;
  headings: BlogHeading[];
}) {
  const { positions } = useReadingStore();
  const saved = positions[slug];
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastSave = 0;
    let frame = 0;

    const save = () => {
      frame = 0;
      const scrollY = window.scrollY;
      if (scrollY < MIN_SCROLL) return;
      setHidden(true);
      const now = Date.now();
      if (now - lastSave < SAVE_INTERVAL) return;
      lastSave = now;

      let current: BlogHeading | undefined;
      let currentIndex: number | undefined;
      for (const [index, heading] of headings.entries()) {
        const element = document.getElementById(heading.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= HEADING_OFFSET) {
          current = heading;
          currentIndex = index;
        } else {
          break;
        }
      }

      saveReadingPosition(slug, {
        headingId: current?.id,
        headingText: current?.text,
        headingIndex: currentIndex,
        scrollY: Math.round(scrollY),
        updatedAt: now,
      });
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(save);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [slug, headings]);

  if (!saved || hidden) return null;

  const label = resolveResumeHeading(headings, saved)?.text;

  const resume = () => {
    setHidden(true);
    const target = resolveResumeHeading(headings, saved);
    const element = target ? document.getElementById(target.id) : null;
    window.requestAnimationFrame(() => {
      if (element) {
        scrollDocumentToElement(element);
      } else {
        scrollDocumentToY(saved.scrollY);
      }
    });
  };

  return (
    <div className="bg-muted/40 ring-border/40 flex items-center gap-1 rounded-lg py-1 pr-1 pl-3 text-[14px] ring-1 sm:text-[13px]">
      <button
        type="button"
        onClick={resume}
        className="text-foreground hover:text-primary flex min-h-10 min-w-0 flex-1 items-center gap-2 text-left transition-colors motion-reduce:transition-none"
      >
        <RotateCcw className="text-primary size-3.5 shrink-0" aria-hidden />
        <span className="line-clamp-2 sm:truncate">
          Continue where you left off
          {label ? (
            <span className="text-muted-foreground"> · {label}</span>
          ) : null}
        </span>
      </button>
      <button
        type="button"
        onClick={() => setHidden(true)}
        aria-label="Dismiss"
        className="text-muted-foreground hover:text-foreground flex size-10 shrink-0 items-center justify-center rounded-md transition-colors motion-reduce:transition-none"
      >
        <X className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
