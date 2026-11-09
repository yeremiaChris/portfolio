export const motionEase = [0.2, 0, 0, 1] as const;

export const motionDuration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
} as const;

export const motionSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};

export const motionRevealOffset = 20;

export const motionStaggerGap = 0.08;

export const motionTransition = {
  duration: motionDuration.base,
  ease: motionEase,
};

export const motionRevealTransition = {
  duration: motionDuration.slow,
  ease: motionEase,
};

export const motionViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;
