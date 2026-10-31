"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

type BlogSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
};

export function BlogSearchInput({
  value,
  onChange,
  id = "blog-search",
  className,
}: BlogSearchInputProps) {
  return (
    <div className={cn("relative min-w-0", className)}>
      <label htmlFor={id} className="sr-only">
        Search posts
      </label>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search title, description, or tags"
        className={cn(
          "border-border/60 bg-muted/40 text-foreground placeholder:text-muted-foreground w-full min-w-0 rounded-xl border py-2.5 pr-3 pl-10 text-sm",
          "focus-visible:border-brand-accent/50 focus-visible:ring-brand-accent/20 focus-visible:ring-2 focus-visible:outline-none",
        )}
      />
    </div>
  );
}
