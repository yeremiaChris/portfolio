import { describe, expect, it } from "vitest";

import {
  galleryRegistry,
  getGalleryEntry,
  getGalleryMetasByCategory,
  getGallerySlugs,
} from "@/lib/gallery/registry";

describe("galleryRegistry", () => {
  it("exposes unique slugs with valid meta", () => {
    const slugs = getGallerySlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const entry of galleryRegistry) {
      expect(entry.meta.slug).toBe(entry.slug);
      expect(entry.meta.name.length).toBeGreaterThan(0);
      expect(["sections", "components"]).toContain(entry.meta.category);
      expect(entry.meta.tags.length).toBeGreaterThan(0);
      expect(entry.meta.notes.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("resolves entries by slug", () => {
    const slug = galleryRegistry[0]!.slug;
    expect(getGalleryEntry(slug)?.slug).toBe(slug);
    expect(getGalleryEntry("missing-slug")).toBeUndefined();
  });

  it("filters metas by category", () => {
    const components = getGalleryMetasByCategory("components");
    expect(components.every((m) => m.category === "components")).toBe(true);
    expect(getGalleryMetasByCategory("all").length).toBe(
      galleryRegistry.length,
    );
  });
});
