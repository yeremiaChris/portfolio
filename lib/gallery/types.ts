export type GalleryCategory = "sections" | "components";

export type GalleryThemeId = "minimal" | "terminal" | "editorial";

export type GalleryViewport = "mobile" | "desktop";

export type GalleryItemMeta = {
  slug: string;
  name: string;
  category: GalleryCategory;
  description: string;
  tags: readonly string[];
  notes: readonly string[];
};

export type GalleryThemeDefinition = {
  id: GalleryThemeId;
  label: string;
  vars: Record<string, string>;
};

export type GalleryComponentMode = "detail" | "preview";

export type GalleryComponentProps = {
  mode?: GalleryComponentMode;
};
