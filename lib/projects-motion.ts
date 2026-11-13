import { motionSpring } from "@/lib/motion-tokens";

export const projectsFeaturedSpring = {
  ...motionSpring,
  stiffness: 380,
  damping: 42,
  mass: 0.9,
};

export const projectsMagneticSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 36,
  mass: 0.55,
};

export const projectsPanTransition = {
  duration: 9,
  ease: [0.45, 0, 0.55, 1] as const,
  repeat: Infinity,
  repeatType: "mirror" as const,
};

export const projectsClipTransition = {
  duration: 0.85,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const projectsStaggerTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const projectsMagneticMaxPx = 6;

export const projectsParallaxMaxPx = 22;

export const projectsIndexDriftMaxPx = 28;
