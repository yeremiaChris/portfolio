import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { Container } from "@/components/Container";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { galleryIntro } from "@/lib/gallery/intro";
import { getGalleryMetas } from "@/lib/gallery/registry";
import { buildPageMetadata } from "@/lib/seo";

const GalleryIndexExplore = dynamic(
  () =>
    import("@/components/gallery/GalleryIndexExplore").then((mod) => ({
      default: mod.GalleryIndexExplore,
    })),
  {
    loading: () => (
      <div className="min-h-[12rem] animate-pulse motion-reduce:animate-none" />
    ),
  },
);

export const metadata: Metadata = buildPageMetadata({
  title: "UI Gallery | Yeremia Chris Saragi",
  description: galleryIntro.description,
  path: "/gallery",
});

export default function GalleryPage() {
  const items = getGalleryMetas();

  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col overflow-x-hidden py-6 md:py-8">
        <GalleryHeader />
        <GalleryIndexExplore items={items} />
      </Container>
    </main>
  );
}
