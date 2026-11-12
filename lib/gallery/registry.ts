import type { ComponentType } from "react";

import { commandPaletteMeta } from "@/gallery/command-palette/meta";
import type {
  GalleryComponentProps,
  GalleryItemMeta,
  GalleryThemeDefinition,
} from "@/lib/gallery/types";

export type GalleryRegistryEntry = {
  slug: string;
  meta: GalleryItemMeta;
  loadComponent: () => Promise<{
    default: ComponentType<GalleryComponentProps>;
  }>;
  loadThemes: () => Promise<{ galleryThemes: GalleryThemeDefinition[] }>;
};

export const galleryRegistry: readonly GalleryRegistryEntry[] = [
  {
    slug: commandPaletteMeta.slug,
    meta: commandPaletteMeta,
    loadComponent: () => import("@/gallery/command-palette/Component"),
    loadThemes: () => import("@/gallery/command-palette/themes"),
  },
] as const;

export function getGallerySlugs(): string[] {
  return galleryRegistry.map((entry) => entry.slug);
}

export function getGalleryEntry(
  slug: string,
): GalleryRegistryEntry | undefined {
  return galleryRegistry.find((entry) => entry.slug === slug);
}

export function getGalleryMetas(): GalleryItemMeta[] {
  return galleryRegistry.map((entry) => entry.meta);
}

export function getGalleryMetasByCategory(
  category: GalleryItemMeta["category"] | "all",
): GalleryItemMeta[] {
  if (category === "all") return getGalleryMetas();
  return galleryRegistry
    .filter((entry) => entry.meta.category === category)
    .map((entry) => entry.meta);
}
