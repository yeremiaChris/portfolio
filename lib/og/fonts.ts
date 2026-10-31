import { readFileSync } from "node:fs";
import { join } from "node:path";

const fontsDir = join(process.cwd(), "assets/og-fonts");

export const OG_FONT_RETHINK_SANS_BOLD = readFileSync(
  join(fontsDir, "RethinkSans-Bold.ttf"),
);

export const OG_FONT_GEIST_REGULAR = readFileSync(
  join(fontsDir, "Geist-Regular.ttf"),
);

export const OG_FONT_GEIST_MONO_REGULAR = readFileSync(
  join(fontsDir, "GeistMono-Regular.ttf"),
);

export const ogImageFonts = [
  {
    name: "Rethink Sans",
    data: OG_FONT_RETHINK_SANS_BOLD,
    style: "normal" as const,
    weight: 700 as const,
  },
  {
    name: "Geist",
    data: OG_FONT_GEIST_REGULAR,
    style: "normal" as const,
    weight: 400 as const,
  },
  {
    name: "Geist Mono",
    data: OG_FONT_GEIST_MONO_REGULAR,
    style: "normal" as const,
    weight: 400 as const,
  },
];
