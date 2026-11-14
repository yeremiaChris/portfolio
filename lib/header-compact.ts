export const HEADER_COMPACT_SCROLL_THRESHOLD_PX = 60;

export function isHeaderCompact(scrollY: number): boolean {
  return scrollY > HEADER_COMPACT_SCROLL_THRESHOLD_PX;
}
