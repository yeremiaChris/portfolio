export const homeHeroDotGrid = {
  spacing: 28,
  radius: 1,
  baseAlpha: 0.07,
  hotAlpha: 0.3,
  fieldRadius: 96,
  pushStrength: 5,
} as const;

export const homeTerminalFast = {
  charIntervalMs: 10,
  lineStaggerMs: 3,
  commandPauseMs: 4,
  startDelayMs: 300,
} as const;

export const homeSectionReveal = {
  duration: 0.5,
  offsetY: 16,
  ease: [0.16, 1, 0.3, 1] as const,
} as const;
