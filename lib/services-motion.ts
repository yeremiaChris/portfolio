import { motionEase } from "@/lib/motion-tokens";

export const servicesMotionViewport = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -10% 0px",
} as const;

export const servicesHeroLineTransition = (index: number) => ({
  duration: 0.65,
  ease: motionEase,
  delay: index * 0.1,
});

export const servicesCardRevealTransition = (index: number) => ({
  duration: 0.7,
  ease: motionEase,
  delay: index * 0.14,
});

export const servicesCardRevealOffsetPx = 28;
