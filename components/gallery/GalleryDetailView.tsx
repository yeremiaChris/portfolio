"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { ArrowLeft } from "lucide-react";

import { GalleryCodePanel } from "@/components/gallery/GalleryCodePanel";
import { GalleryDetailControls } from "@/components/gallery/GalleryDetailControls";
import {
  GalleryDetailTabs,
  type GalleryDetailTab,
} from "@/components/gallery/GalleryDetailTabs";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { getGalleryEntry } from "@/lib/gallery/registry";
import type {
  GalleryComponentProps,
  GalleryItemMeta,
  GalleryThemeDefinition,
  GalleryThemeId,
  GalleryViewport,
} from "@/lib/gallery/types";
import { cn } from "@/lib/utils";

type GalleryDetailViewProps = {
  meta: GalleryItemMeta;
  source: string;
  themes: GalleryThemeDefinition[];
};

export function GalleryDetailView({
  meta,
  source,
  themes,
}: GalleryDetailViewProps) {
  const [tab, setTab] = useState<GalleryDetailTab>("preview");
  const [themeId, setThemeId] = useState<GalleryThemeId>(
    themes[0]?.id ?? "minimal",
  );
  const [viewport, setViewport] = useState<GalleryViewport>("desktop");
  const [Component, setComponent] =
    useState<ComponentType<GalleryComponentProps> | null>(null);

  const themeVars = useMemo(() => {
    return themes.find((t) => t.id === themeId)?.vars ?? themes[0]?.vars ?? {};
  }, [themeId, themes]);

  useEffect(() => {
    let cancelled = false;
    const entry = getGalleryEntry(meta.slug);
    if (!entry) return;

    void entry.loadComponent().then((mod) => {
      if (!cancelled) setComponent(() => mod.default);
    });

    return () => {
      cancelled = true;
    };
  }, [meta.slug]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/gallery"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-fit gap-2 px-0",
          )}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to gallery
        </Link>
        <header className="flex flex-col gap-3">
          <h1 className="font-heading text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            {meta.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-[15px] leading-relaxed">
            {meta.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {meta.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </header>
      </div>

      <GalleryDetailControls
        themes={themes}
        themeId={themeId}
        onThemeChange={setThemeId}
        viewport={viewport}
        onViewportChange={setViewport}
      />

      <GalleryDetailTabs active={tab} onChange={setTab} />

      <div
        role="tabpanel"
        id="gallery-panel-preview"
        aria-labelledby="gallery-tab-preview"
        hidden={tab !== "preview"}
        className={tab !== "preview" ? "hidden" : undefined}
      >
        <div
          className={cn(
            "border-border/60 bg-muted/20 mx-auto w-full overflow-hidden rounded-xl border p-6 transition-[max-width] motion-reduce:transition-none",
            viewport === "mobile" ? "max-w-sm" : "max-w-3xl",
          )}
          style={themeVars}
          data-gallery-preview={meta.slug}
        >
          {Component ? <Component mode="detail" /> : null}
        </div>
      </div>

      <div
        role="tabpanel"
        id="gallery-panel-code"
        aria-labelledby="gallery-tab-code"
        hidden={tab !== "code"}
        className={tab !== "code" ? "hidden" : undefined}
      >
        <GalleryCodePanel source={source} />
      </div>

      <section
        aria-labelledby="gallery-notes-heading"
        className="flex flex-col gap-3"
      >
        <h2
          id="gallery-notes-heading"
          className="font-heading text-foreground text-lg font-semibold tracking-tight"
        >
          Design notes
        </h2>
        <ul className="text-muted-foreground flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed">
          {meta.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
