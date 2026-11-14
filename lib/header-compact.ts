export const HEADER_COMPACT_ENTER_PX = 64;
export const HEADER_COMPACT_EXIT_PX = 40;

export function resolveHeaderCompact(
  scrollY: number,
  compact: boolean,
): boolean {
  if (compact) {
    return scrollY >= HEADER_COMPACT_EXIT_PX;
  }
  return scrollY > HEADER_COMPACT_ENTER_PX;
}
