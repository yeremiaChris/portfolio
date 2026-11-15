import { motionEase } from "@/lib/motion-tokens";

export const servicesMotionViewport = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -8% 0px",
} as const;

export const servicesHeroLineTransition = (index: number) => ({
  duration: 0.65,
  ease: motionEase,
  delay: index * 0.1,
});

export const servicesCardRevealTransition = (index: number) => ({
  duration: 0.6,
  ease: motionEase,
  delay: index * 0.1,
});

export const servicesCardRevealOffsetPx = 24;

export const servicesStepRevealTransition = (index: number) => ({
  duration: 0.6,
  ease: motionEase,
  delay: index * 0.08,
});

export const servicesCtaEnterTransition = {
  duration: 0.6,
  ease: motionEase,
} as const;
