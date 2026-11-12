"use client";

import { cn } from "@/lib/utils";
import type { GalleryCategory } from "@/lib/gallery/types";

export type GalleryCategoryFilterValue = GalleryCategory | "all";

type GalleryCategoryFilterProps = {
  value: GalleryCategoryFilterValue;
  onChange: (value: GalleryCategoryFilterValue) => void;
};

const filters: { value: GalleryCategoryFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sections", label: "Sections" },
  { value: "components", label: "Components" },
];

export function GalleryCategoryFilter({
  value,
  onChange,
}: GalleryCategoryFilterProps) {
  return (
    <div
      className="flex min-w-0 flex-wrap gap-2"
      role="group"
      aria-label="Filter by category"
    >
      {filters.map((filter) => {
        const isActive = filter.value === value;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(filter.value)}
            className={cn(
              "label-caps rounded-full border px-3 py-1.5 text-[11px] tracking-wider transition-colors",
              "motion-reduce:transition-none",
              isActive
                ? "border-brand-accent/50 bg-brand-accent/10 text-brand-accent"
                : "border-border/60 text-muted-foreground hover:text-foreground hover:border-brand-accent/30 bg-transparent",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
