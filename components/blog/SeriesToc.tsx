"use client";

import Link from "next/link";
import { BookOpen, Check, RotateCcw } from "lucide-react";

import {
  setPartRead,
  useReadingStore,
} from "@/components/blog/useReadingStore";
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
                  "flex items-start gap-2 rounded-md px-2 py-1.5 text-[13px] leading-snug transition-colors motion-reduce:transition-none",
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
      <div className="flex flex-col gap-1.5 text-[12px]">
        {latest ? (
          <Link
            href={getResumeHref(latest.part.slug, latest.position)}
            className="text-foreground hover:text-primary flex items-center gap-1.5 transition-colors motion-reduce:transition-none"
          >
            <RotateCcw className="text-primary size-3.5 shrink-0" aria-hidden />
            <span className="truncate">
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
            className="text-muted-foreground hover:text-primary transition-colors motion-reduce:transition-none"
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
            className="text-muted-foreground hover:text-primary flex w-fit items-center gap-1.5 transition-colors motion-reduce:transition-none"
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
    <div className="bg-muted/30 ring-border/40 rounded-lg p-4 ring-1">
      <SeriesTocBody {...props} />
    </div>
  );
}

export function SeriesTocMobile(props: SeriesTocProps) {
  const current = props.parts.find((part) => part.slug === props.currentSlug);
  return (
    <details className="group bg-muted/30 ring-border/40 rounded-lg ring-1 lg:hidden">
      <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-[13px] font-medium">
        <span className="flex items-center gap-1.5">
          <BookOpen className="text-primary size-3.5" aria-hidden />
          Part {current?.part} of {props.parts.length}
        </span>
        <span className="text-muted-foreground text-[11px] group-open:hidden">
          Show parts
        </span>
      </summary>
      <div className="px-4 pb-4">
        <SeriesTocBody {...props} />
      </div>
    </details>
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
        "ring-border/40 flex w-fit items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium ring-1 transition-colors motion-reduce:transition-none",
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
