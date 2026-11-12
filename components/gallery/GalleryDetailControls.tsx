"use client";

import { cn } from "@/lib/utils";
import type {
  GalleryThemeDefinition,
  GalleryThemeId,
  GalleryViewport,
} from "@/lib/gallery/types";

type GalleryDetailControlsProps = {
  themes: GalleryThemeDefinition[];
  themeId: GalleryThemeId;
  onThemeChange: (id: GalleryThemeId) => void;
  viewport: GalleryViewport;
  onViewportChange: (viewport: GalleryViewport) => void;
};

function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div
      className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3"
      role="group"
      aria-label={label}
    >
      <span className="text-muted-foreground label-caps shrink-0 text-[10px] tracking-wider">
        {label}
      </span>
      <div className="border-border/60 bg-muted/30 flex flex-wrap gap-1 rounded-lg border p-1">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                "motion-reduce:transition-none",
                active
                  ? "bg-background text-foreground ring-border/60 shadow-sm ring-1"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function GalleryDetailControls({
  themes,
  themeId,
  onThemeChange,
  viewport,
  onViewportChange,
}: GalleryDetailControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <SegmentedControl
        label="Theme"
        value={themeId}
        options={themes.map((theme) => ({
          value: theme.id,
          label: theme.label,
        }))}
        onChange={onThemeChange}
      />
      <SegmentedControl
        label="Viewport"
        value={viewport}
        options={[
          { value: "mobile", label: "Mobile" },
          { value: "desktop", label: "Desktop" },
        ]}
        onChange={onViewportChange}
      />
    </div>
  );
}
