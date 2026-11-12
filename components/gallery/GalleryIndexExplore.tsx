"use client";

import { useMemo, useState } from "react";

import { GalleryCard } from "@/components/gallery/GalleryCard";
import {
  GalleryCategoryFilter,
  type GalleryCategoryFilterValue,
} from "@/components/gallery/GalleryCategoryFilter";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { GalleryItemMeta } from "@/lib/gallery/types";

type GalleryIndexExploreProps = {
  items: GalleryItemMeta[];
};

export function GalleryIndexExplore({ items }: GalleryIndexExploreProps) {
  const [category, setCategory] = useState<GalleryCategoryFilterValue>("all");

  const filtered = useMemo(() => {
    if (category === "all") return items;
    return items.filter((item) => item.category === category);
  }, [category, items]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 md:gap-8">
      <GalleryCategoryFilter value={category} onChange={setCategory} />

      <section
        aria-labelledby="gallery-grid-heading"
        className="mb-8 flex w-full min-w-0 flex-col gap-4"
      >
        <Reveal when="mount" preset="calm">
          <h2 id="gallery-grid-heading" className="sr-only">
            Gallery items
          </h2>
          <p className="text-muted-foreground label-caps tracking-wider">
            {String(filtered.length).padStart(2, "0")} items
          </p>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No items in this category yet.
          </p>
        ) : (
          <Stagger
            when="mount"
            preset="calm"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((meta) => (
              <StaggerItem key={meta.slug}>
                <GalleryCard meta={meta} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>
    </div>
  );
}
