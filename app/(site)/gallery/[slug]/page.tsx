import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { getGalleryEntry, getGallerySlugs } from "@/lib/gallery/registry";
import { readGalleryComponentSource } from "@/lib/gallery/read-source";
import type { GalleryThemeDefinition } from "@/lib/gallery/types";
import { buildPageMetadata } from "@/lib/seo";

const GalleryDetailView = dynamic(
  () =>
    import("@/components/gallery/GalleryDetailView").then((mod) => ({
      default: mod.GalleryDetailView,
    })),
  {
    loading: () => (
      <div className="min-h-[20rem] animate-pulse motion-reduce:animate-none" />
    ),
  },
);

type GalleryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getGallerySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GalleryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGalleryEntry(slug);

  if (!entry) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }

  return buildPageMetadata({
    title: `${entry.meta.name} | UI Gallery`,
    description: entry.meta.description,
    path: `/gallery/${slug}`,
  });
}

export default async function GalleryDetailPage({
  params,
}: GalleryDetailPageProps) {
  const { slug } = await params;
  const entry = getGalleryEntry(slug);

  if (!entry) {
    notFound();
  }

  const source = readGalleryComponentSource(slug);
  const { galleryThemes } = (await entry.loadThemes()) as {
    galleryThemes: GalleryThemeDefinition[];
  };

  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col overflow-x-hidden py-6 md:py-8">
        <GalleryDetailView
          meta={entry.meta}
          source={source}
          themes={galleryThemes}
        />
      </Container>
    </main>
  );
}
