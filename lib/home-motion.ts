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

export const homeSpotlightGradient = "rgb(76 215 246 / 0.13)" as const;
