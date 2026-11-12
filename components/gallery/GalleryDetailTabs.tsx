"use client";

import { cn } from "@/lib/utils";

export type GalleryDetailTab = "preview" | "code";

type GalleryDetailTabsProps = {
  active: GalleryDetailTab;
  onChange: (tab: GalleryDetailTab) => void;
};

const tabs: { id: GalleryDetailTab; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
];

export function GalleryDetailTabs({
  active,
  onChange,
}: GalleryDetailTabsProps) {
  return (
    <div
      className="border-border/60 flex gap-1 border-b"
      role="tablist"
      aria-label="Gallery detail"
    >
      {tabs.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`gallery-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`gallery-panel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              "motion-reduce:transition-none",
              selected
                ? "border-brand-accent text-foreground"
                : "text-muted-foreground hover:text-foreground border-transparent",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
