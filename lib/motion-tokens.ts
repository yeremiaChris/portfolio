export const motionEase = [0.16, 1, 0.3, 1] as const;

export const motionDuration = {
  fast: 0.2,
  page: 0.3,
  base: 0.4,
  reveal: 0.75,
  heroName: 0.8,
} as const;

export const motionSpring = {
  type: "spring" as const,
  stiffness: 480,
  damping: 48,
  mass: 1,
};

export const motionHeroTiltSpring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 36,
  mass: 0.85,
};

export const motionHeroScrollCue = {
  duration: 1.4,
  ease: motionEase,
  offset: 6,
} as const;

export const motionRevealOffset = 12;

export const motionStaggerGap = 0.07;

export const motionTransition = {
  duration: motionDuration.base,
  ease: motionEase,
};

export const motionRevealTransition = {
  duration: motionDuration.reveal,
  ease: motionEase,
};

export const motionHeroNameRevealTransition = {
  duration: motionDuration.heroName,
  ease: motionEase,
};

export const motionHeroTerminal = {
  charIntervalMs: 25,
  lineStaggerMs: 8,
  commandPauseMs: 10,
} as const;

export const motionPageTransition = {
  duration: motionDuration.page,
  ease: motionEase,
};

export const motionViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;

export const motionAnchorScrollOffset = -96;
