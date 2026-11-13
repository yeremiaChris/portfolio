import {
  projectsMagneticMaxPx,
  projectsMagneticSpring,
} from "@/lib/projects-motion";

export const homeParallaxMaxPx = 14;

export const homeMagneticMaxPx = projectsMagneticMaxPx;

export const homeMagneticSpring = projectsMagneticSpring;

export const homeToolsStagger = {
  duration: 0.34,
  ease: [0.16, 1, 0.3, 1] as const,
  stagger: 0.05,
  yPx: 4,
} as const;

export const homeHeroDotGrid = {
  spacing: 22,
  radius: 1.1,
  baseAlpha: 0.14,
  hotAlpha: 0.72,
  fieldRadius: 140,
  pushStrength: 18,
  cyan: { r: 76, g: 215, b: 246 },
} as const;

export const homeWorkReveal = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
  imageScaleFrom: 1.1,
  borderDrawDuration: 0.85,
} as const;

export const homeTerminalFast = {
  charIntervalMs: 10,
  lineStaggerMs: 3,
  commandPauseMs: 4,
  startDelayMs: 300,
} as const;

export const homeConstellation = {
  floatDuration: 4.2,
  floatY: 3,
  floatX: 2,
  dimOpacity: 0.4,
} as const;
