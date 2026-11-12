import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { GalleryItemMeta } from "@/lib/gallery/types";

import { GalleryCardPreviewLoader } from "./GalleryCardPreviewLoader";

type GalleryCardProps = {
  meta: GalleryItemMeta;
};

export function GalleryCard({ meta }: GalleryCardProps) {
  return (
    <article className="border-border/60 bg-card ring-border/40 hover:border-brand-accent/35 flex h-full min-w-0 flex-col overflow-hidden rounded-xl border ring-1 transition-colors motion-reduce:transition-none">
      <Link
        href={`/gallery/${meta.slug}`}
        className="focus-visible:ring-brand-accent focus-visible:ring-offset-background flex h-full min-w-0 flex-col outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <GalleryCardPreviewLoader slug={meta.slug} />
        <div className="flex flex-1 flex-col gap-3 p-4">
          <h2 className="font-heading text-foreground text-lg font-semibold tracking-tight">
            {meta.name}
          </h2>
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
        </div>
      </Link>
    </article>
  );
}
