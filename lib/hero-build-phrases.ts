export const HERO_BUILD_PHRASES = [
  "React apps",
  "Next.js platforms",
  "design systems",
  "realtime UI",
] as const;

export type HeroBuildPhrase = (typeof HERO_BUILD_PHRASES)[number];

export const HERO_BUILD_PHRASES_SR =
  "I build React apps, Next.js platforms, design systems, and realtime UI.";

export const HERO_BUILD_ROTATE_MS = 3000;

export const HERO_BUILD_SLOT_PHRASE: HeroBuildPhrase = "Next.js platforms";
