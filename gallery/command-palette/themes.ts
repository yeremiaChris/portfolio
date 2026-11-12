import type { GalleryThemeDefinition } from "@/lib/gallery/types";

export const galleryThemes: GalleryThemeDefinition[] = [
  {
    id: "minimal",
    label: "Minimal",
    vars: {
      "--cp-overlay": "oklch(0 0 0 / 45%)",
      "--cp-surface": "oklch(0.99 0 0)",
      "--cp-border": "oklch(0.9 0 0)",
      "--cp-text": "oklch(0.22 0 0)",
      "--cp-muted": "oklch(0.5 0 0)",
      "--cp-accent": "#4cd7f6",
      "--cp-accent-fg": "#042028",
      "--cp-hover": "oklch(0.96 0 0)",
      "--cp-radius": "0.75rem",
      "--cp-font":
        "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    },
  },
  {
    id: "terminal",
    label: "Terminal",
    vars: {
      "--cp-overlay": "oklch(0 0 0 / 70%)",
      "--cp-surface": "#0c1014",
      "--cp-border": "#2a3138",
      "--cp-text": "#c8d4dc",
      "--cp-muted": "#7a8a94",
      "--cp-accent": "#4cd7f6",
      "--cp-accent-fg": "#042028",
      "--cp-hover": "#151b21",
      "--cp-radius": "0.25rem",
      "--cp-font": "var(--font-geist-mono), ui-monospace, monospace",
    },
  },
  {
    id: "editorial",
    label: "Editorial",
    vars: {
      "--cp-overlay": "oklch(0.15 0.02 50 / 55%)",
      "--cp-surface": "#f6f3ee",
      "--cp-border": "#d9d2c6",
      "--cp-text": "#1a1814",
      "--cp-muted": "#6b6560",
      "--cp-accent": "#4cd7f6",
      "--cp-accent-fg": "#042028",
      "--cp-hover": "#ebe6de",
      "--cp-radius": "0.125rem",
      "--cp-font": "var(--font-rethink-sans), ui-serif, Georgia, serif",
    },
  },
];
