/** First full-time role: iCreativeLabs, Jan 2022. */
export const CAREER_START = { year: 2022, month: 1 } as const;

/** Whole years of experience since CAREER_START (month precision). */
export function getYearsOfExperience(now: Date = new Date()): number {
  const months =
    (now.getFullYear() - CAREER_START.year) * 12 +
    (now.getMonth() + 1 - CAREER_START.month);
  return Math.max(0, Math.floor(months / 12));
}

/** "4+" style label, computed at build time so it never goes stale. */
export function getExperienceLabel(now: Date = new Date()): string {
  return `${getYearsOfExperience(now)}+`;
}
