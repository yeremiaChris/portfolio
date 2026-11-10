import {
  HERO_BUILD_PHRASES,
  type HeroBuildPhrase,
} from "@/lib/hero-build-phrases";

export function heroBuildRotatorVisiblePhrase(
  active: boolean,
  reducedMotion: boolean,
  index: number,
): HeroBuildPhrase {
  if (!active || reducedMotion) {
    return HERO_BUILD_PHRASES[0];
  }
  return HERO_BUILD_PHRASES[index] ?? HERO_BUILD_PHRASES[0];
}

export function heroBuildRotatorUsesMotionSwap(
  active: boolean,
  reducedMotion: boolean,
  hasRotated: boolean,
): boolean {
  return active && !reducedMotion && hasRotated;
}
