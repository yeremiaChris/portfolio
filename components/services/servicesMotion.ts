import type { Transition, Variant, Variants } from "motion/react";

export const servicesEase = [0.22, 1, 0.36, 1] as const;

export const servicesInViewViewport = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -56px 0px",
} as const;

const riseTransition = (delay = 0): Transition => ({
  duration: 0.45,
  ease: servicesEase,
  delay,
});

export const servicesOfferingsGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.04 },
  },
};

export const servicesOfferingCardVariants: Variants = {
  hidden: { y: 22, opacity: 0.35 },
  visible: {
    y: 0,
    opacity: 1,
    transition: riseTransition(),
  },
};

export const servicesOfferingBulletsVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

export const servicesOfferingBulletVariants: Variants = {
  hidden: { y: 8, opacity: 0.4 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: servicesEase },
  },
};

export const servicesOfferingHoverGlow = {
  boxShadow:
    "0 0 0 1px rgba(76,215,246,0.5), 0 0 18px -6px rgba(76,215,246,0.35)",
  borderColor: "rgba(76,215,246,0.55)",
} satisfies Variant;

export const servicesProcessPanelVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 0.08 },
  },
};

export const servicesProcessLineHorizontalVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0.35 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: servicesEase },
  },
};

export const servicesProcessLineVerticalVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0.35 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: servicesEase },
  },
};

export const servicesProcessStepVariants: Variants = {
  hidden: {},
  visible: {},
};

export const servicesProcessBadgeVariants: Variants = {
  hidden: {
    opacity: 1,
    boxShadow: "0 0 0 0 rgba(76,215,246,0)",
    backgroundColor: "rgba(76,215,246,0.1)",
    borderColor: "rgba(76,215,246,0.35)",
  },
  visible: {
    opacity: 1,
    boxShadow: "0 0 14px -2px rgba(76,215,246,0.55)",
    backgroundColor: "rgba(76,215,246,0.22)",
    borderColor: "rgba(76,215,246,0.75)",
    transition: { duration: 0.4, ease: servicesEase },
  },
};

export const servicesContactRevealVariants: Variants = {
  hidden: { y: 18, opacity: 0.4 },
  visible: {
    y: 0,
    opacity: 1,
    transition: riseTransition(),
  },
};

export function servicesHeroTitleWords(title: string): string[] {
  return title.split(/\s+/).filter(Boolean);
}
