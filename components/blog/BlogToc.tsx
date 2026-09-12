"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { List } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { BlogHeading } from "@/lib/blog";
import { cn } from "@/lib/utils";

const MIN_HEADINGS = 3;

export function getTocItems(headings: BlogHeading[]) {
  return headings.filter((heading) => heading.depth === 2);
}

export function shouldShowToc(headings: BlogHeading[]) {
  return getTocItems(headings).length >= MIN_HEADINGS;
}

type TocLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

export function BlogTocNav({
  items,
  itemClassName,
  renderLink,
}: {
  items: ReturnType<typeof getTocItems>;
  itemClassName?: string;
  renderLink?: (props: TocLinkProps) => ReactNode;
}) {
  return (
    <ol className="flex flex-col gap-0.5">
      {items.map((heading, index) => {
        const className = cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "h-auto w-full justify-start gap-2 px-2 py-1.5 font-normal whitespace-normal text-muted-foreground",
          itemClassName,
        );

        const children = (
          <>
            <span className="text-muted-foreground/80 shrink-0 font-mono text-[11px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-left leading-snug">{heading.text}</span>
          </>
        );

        const linkProps: TocLinkProps = {
          href: `#${heading.id}`,
          className,
          children,
        };

        return (
          <li key={heading.id}>
            {renderLink ? renderLink(linkProps) : <Link {...linkProps} />}
          </li>
        );
      })}
    </ol>
  );
}

export function BlogTocHeader({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Badge
        variant="secondary"
        className="text-primary w-fit gap-1.5 bg-transparent px-0 font-mono text-[10px] tracking-widest uppercase"
      >
        <List className="size-3.5" aria-hidden />
        On this page
      </Badge>
      <span className="text-muted-foreground font-mono text-[11px]">
        {String(count).padStart(2, "0")} sections
      </span>
    </div>
  );
}

/** Desktop sticky TOC — hidden below lg. */
export function BlogToc({ headings }: { headings: BlogHeading[] }) {
  const items = getTocItems(headings);
  if (items.length < MIN_HEADINGS) return null;

  return (
    <Card className="bg-muted ring-border/40 hidden gap-0 rounded-xl py-0 lg:block">
      <CardHeader className="border-border/40 border-b p-4 pb-3">
        <BlogTocHeader count={items.length} />
      </CardHeader>
      <CardContent className="p-2">
        <nav aria-label="On this page">
          <BlogTocNav items={items} />
        </nav>
      </CardContent>
    </Card>
  );
}
