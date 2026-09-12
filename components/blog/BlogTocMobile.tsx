"use client";

import { useState } from "react";
import Link from "next/link";
import { List } from "lucide-react";

import {
  BlogTocHeader,
  BlogTocNav,
  getTocItems,
  shouldShowToc,
} from "@/components/blog/BlogToc";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { BlogHeading } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function BlogTocMobile({ headings }: { headings: BlogHeading[] }) {
  const [open, setOpen] = useState(false);
  const items = getTocItems(headings);

  if (!shouldShowToc(headings)) return null;

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="secondary"
              className={cn(
                "fixed right-4 bottom-4 z-40 h-11 gap-2 rounded-full px-4 shadow-lg",
                "border border-border/60 bg-background/70 font-mono text-[12px]",
                "backdrop-blur-xl hover:bg-background/85",
                open && "pointer-events-none opacity-0",
              )}
            />
          }
        >
          <List className="size-3.5" aria-hidden />
          Table of Contents
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="max-h-[70vh] gap-0 rounded-t-2xl bg-muted p-0 ring-1 ring-border/40"
        >
          <SheetHeader className="border-b border-border/40 px-4 pt-4 pb-3">
            <SheetTitle className="sr-only">On this page</SheetTitle>
            <SheetDescription className="sr-only">
              Jump to a section in this article
            </SheetDescription>
            <BlogTocHeader count={items.length} />
          </SheetHeader>

          <ScrollArea className="max-h-[min(50vh,24rem)]">
            <nav aria-label="On this page" className="px-2 py-3">
              <BlogTocNav
                items={items}
                itemClassName="py-2.5"
                renderLink={({ children, ...props }) => (
                  <SheetClose
                    nativeButton={false}
                    render={<Link {...props} />}
                  >
                    {children}
                  </SheetClose>
                )}
              />
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
