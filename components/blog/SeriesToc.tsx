"use client";

import Link from "next/link";
import { BookOpen, Check, ChevronDown, RotateCcw } from "lucide-react";

import {
  setPartRead,
  useReadingStore,
} from "@/components/blog/useReadingStore";
import { Reveal } from "@/components/motion/Reveal";
import {
  getFirstUnreadPart,
  getLatestPosition,
  getResumeHref,
  type SeriesItem,
} from "@/lib/blog-series";
import { cn } from "@/lib/utils";

type SeriesTocProps = {
  title: string;
  parts: SeriesItem[];
  currentSlug: string;
};

function SeriesTocBody({ title, parts, currentSlug }: SeriesTocProps) {
  const { read, positions } = useReadingStore();
  const readSet = new Set(read);
  const readCount = parts.filter((part) => readSet.has(part.slug)).length;
  const firstUnread = getFirstUnreadPart(parts, read);
  const latest = getLatestPosition(
    parts.filter((part) => part.slug !== currentSlug),
    positions,
  );
  const current = parts.find((part) => part.slug === currentSlug);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-primary label-caps flex items-center gap-1.5 text-[11px] tracking-widest">
          <BookOpen className="size-3.5" aria-hidden />
          Series
        </span>
        <span className="text-muted-foreground text-[11px]">
          {readCount}/{parts.length} read
        </span>
      </div>
      <p className="font-heading text-foreground text-[14px] leading-snug font-medium">
        {title}
      </p>
      <ol className="flex flex-col gap-0.5">
        {parts.map((part) => {
          const active = part.slug === currentSlug;
          const isRead = readSet.has(part.slug);
          return (
            <li key={part.slug}>
              <Link
                href={`/blog/${part.slug}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-2.5 rounded-md px-2 py-2 text-[14px] leading-snug transition-colors motion-reduce:transition-none lg:min-h-0 lg:items-start lg:py-1.5 lg:text-[13px]",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <span className="w-4 shrink-0 text-[11px] tabular-nums">
                  {isRead ? (
                    <Check
                      className="text-primary size-3.5"
                      aria-label="Read"
                    />
                  ) : (
                    part.part
                  )}
                </span>
                <span>{part.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="border-border/40 flex flex-col gap-1 border-t pt-3 text-[13px] lg:gap-1.5 lg:text-[12px]">
        {latest ? (
          <Link
            href={getResumeHref(latest.part.slug, latest.position)}
            className="text-foreground hover:text-primary flex min-h-10 items-center gap-2 transition-colors motion-reduce:transition-none lg:min-h-0"
          >
            <RotateCcw className="text-primary size-3.5 shrink-0" aria-hidden />
            <span className="line-clamp-2 lg:truncate">
              Continue reading Part {latest.part.part}
              {latest.position.headingText
                ? ` · ${latest.position.headingText}`
                : ""}
            </span>
          </Link>
        ) : null}
        {firstUnread && firstUnread.slug !== currentSlug ? (
          <Link
            href={`/blog/${firstUnread.slug}`}
            className="text-muted-foreground hover:text-primary flex min-h-10 items-center transition-colors motion-reduce:transition-none lg:min-h-0"
          >
            First unread: Part {firstUnread.part}
          </Link>
        ) : null}
        {current ? (
          <button
            type="button"
            onClick={() =>
              setPartRead(current.slug, !readSet.has(current.slug))
            }
            className="text-muted-foreground hover:text-primary flex min-h-10 w-fit items-center gap-2 transition-colors motion-reduce:transition-none lg:min-h-0"
          >
            <Check className="size-3.5" aria-hidden />
            {readSet.has(current.slug) ? "Mark as unread" : "Mark as read"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function SeriesToc(props: SeriesTocProps) {
  return (
    <Reveal when="mount" preset="calm">
      <div className="bg-muted/30 ring-border/40 rounded-lg p-4 ring-1">
        <SeriesTocBody {...props} />
      </div>
    </Reveal>
  );
}

export function SeriesTocMobile(props: SeriesTocProps) {
  const current = props.parts.find((part) => part.slug === props.currentSlug);
  return (
    <Reveal when="mount" preset="calm">
      <details className="group bg-muted/30 ring-border/40 rounded-lg ring-1 lg:hidden">
        <summary className="text-foreground flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-[14px] font-medium [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-1.5">
            <BookOpen className="text-primary size-3.5" aria-hidden />
            Part {current?.part} of {props.parts.length}
          </span>
          <span className="text-muted-foreground flex items-center gap-1 text-[12px]">
            <span className="group-open:hidden">Show parts</span>
            <span className="hidden group-open:inline">Hide</span>
            <ChevronDown
              className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden
            />
          </span>
        </summary>
        <div className="px-4 pb-4">
          <SeriesTocBody {...props} />
        </div>
      </details>
    </Reveal>
  );
}

export function SeriesMarkRead({ slug }: { slug: string }) {
  const { read } = useReadingStore();
  const isRead = read.includes(slug);
  return (
    <button
      type="button"
      onClick={() => setPartRead(slug, !isRead)}
      aria-pressed={isRead}
      className={cn(
        "ring-border/40 flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-[14px] font-medium ring-1 transition-colors motion-reduce:transition-none sm:min-h-9 sm:w-fit sm:px-3 sm:text-[12px]",
        isRead
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-primary",
      )}
    >
      <Check className="size-3.5" aria-hidden />
      {isRead ? "Read" : "Mark as read"}
    </button>
  );
}
