import type { GalleryItemMeta } from "@/lib/gallery/types";

export const commandPaletteMeta = {
  slug: "command-palette",
  name: "Command palette",
  category: "components",
  description:
    "Keyboard-first command surface with fuzzy search, focus management, and combobox semantics.",
  tags: ["keyboard", "a11y", "search", "overlay"],
  notes: [
    "Fuzzy matching surfaces commands when labels do not match exact strings.",
    "Focus stays trapped in the dialog and returns to the trigger on close.",
    "A live region announces result counts so screen readers track filtering.",
  ],
} as const satisfies GalleryItemMeta;
