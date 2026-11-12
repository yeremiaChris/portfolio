"use client";

import {
  useEffect,
  useState,
  type ComponentType,
  type CSSProperties,
} from "react";

import type {
  GalleryComponentProps,
  GalleryThemeDefinition,
} from "@/lib/gallery/types";
import { getGalleryEntry } from "@/lib/gallery/registry";

type GalleryCardPreviewProps = {
  slug: string;
};

export function GalleryCardPreview({ slug }: GalleryCardPreviewProps) {
  const [Component, setComponent] =
    useState<ComponentType<GalleryComponentProps> | null>(null);
  const [themes, setThemes] = useState<GalleryThemeDefinition[]>([]);

  useEffect(() => {
    let cancelled = false;
    const entry = getGalleryEntry(slug);
    if (!entry) return;

    void Promise.all([entry.loadComponent(), entry.loadThemes()]).then(
      ([componentMod, themeMod]) => {
        if (cancelled) return;
        setComponent(() => componentMod.default);
        setThemes(themeMod.galleryThemes);
      },
    );

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const theme = themes[0];

  if (!Component || !theme) {
    return (
      <div
        className="bg-muted/40 flex min-h-[11rem] items-center justify-center rounded-lg"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="bg-muted/30 relative flex min-h-[11rem] items-center justify-center overflow-hidden rounded-lg p-4"
      style={theme.vars as CSSProperties}
    >
      <div className="pointer-events-none w-full max-w-xs">
        <Component mode="preview" />
      </div>
    </div>
  );
}
