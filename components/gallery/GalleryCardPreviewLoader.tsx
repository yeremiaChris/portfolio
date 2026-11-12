"use client";

import dynamic from "next/dynamic";

const GalleryCardPreview = dynamic(
  () =>
    import("@/components/gallery/GalleryCardPreview").then((mod) => ({
      default: mod.GalleryCardPreview,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-muted/40 min-h-[11rem] animate-pulse rounded-lg motion-reduce:animate-none"
        aria-hidden
      />
    ),
  },
);

type GalleryCardPreviewLoaderProps = {
  slug: string;
};

export function GalleryCardPreviewLoader({
  slug,
}: GalleryCardPreviewLoaderProps) {
  return <GalleryCardPreview slug={slug} />;
}
