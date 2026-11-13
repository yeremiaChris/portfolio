import { motionSpring } from "@/lib/motion-tokens";

export const scrollProgressRailSpring = {
  ...motionSpring,
  stiffness: 380,
  damping: 42,
  mass: 0.9,
};

export const aboutStaggerTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
};
