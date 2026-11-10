export const motionEase = [0.16, 1, 0.3, 1] as const;

export type MotionPreset = "expressive" | "calm";

export type MotionRevealWhen = "mount" | "inView";

export const motionDuration = {
  fast: 0.2,
  page: 0.3,
  base: 0.4,
  reveal: 0.3,
  heroName: 0.8,
} as const;

export const motionSpring = {
  type: "spring" as const,
  stiffness: 480,
  damping: 48,
  mass: 1,
};

export const motionHeroScrollCue = {
  duration: 1.4,
  ease: motionEase,
  chevronNudgePx: 3,
  scrollFadeEnd: 0.12,
} as const;

export const motionHeroScrollFade = {
  opacityEnd: 0.4,
  yEnd: -24,
} as const;

type MotionViewportMargin =
  | `${number}px`
  | `${number}px ${number}px`
  | `${number}px ${number}px ${number}px`
  | `${number}px ${number}px ${number}px ${number}px`
  | `${number}px ${number}px ${number}% ${number}px`;

export type MotionViewportPreset = {
  once: boolean;
  amount: number | "some";
  margin: MotionViewportMargin;
  inViewInitial: boolean;
};

export const motionPresetConfig = {
  expressive: {
    revealDuration: 0.7,
    revealDurationMount: 0.5,
    revealOffset: 28,
    revealOffsetMount: 16,
    staggerGap: 0.06,
    staggerMaxDelay: 0.36,
    viewport: {
      once: true,
      amount: 0.18,
      margin: "0px 0px -10% 0px",
      inViewInitial: false,
    },
  },
  calm: {
    revealDuration: 0.4,
    revealDurationMount: 0.25,
    revealOffset: 8,
    revealOffsetMount: 4,
    staggerGap: 0.025,
    staggerMaxDelay: 0.15,
    viewport: {
      once: true,
      amount: 0.05,
      margin: "0px 0px 0px 0px",
      inViewInitial: true,
    },
  },
} as const;

export const motionTransition = {
  duration: motionDuration.base,
  ease: motionEase,
};

export const motionRevealOffset = motionPresetConfig.calm.revealOffset;

export const motionStaggerGap = motionPresetConfig.calm.staggerGap;

export const motionStaggerMaxDelay = motionPresetConfig.calm.staggerMaxDelay;

export const motionRevealTransition = {
  duration: motionPresetConfig.calm.revealDuration,
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
  lineHoverDuration: 0.18,
} as const;

export const motionPageTransition = {
  duration: motionDuration.page,
  ease: motionEase,
};

export const motionViewport = motionPresetConfig.expressive.viewport;

export function motionPresetViewport(
  preset: MotionPreset,
): MotionViewportPreset {
  return motionPresetConfig[preset].viewport;
}

export function staggerUsesPerItemInViewReveal(
  preset: MotionPreset,
  when: MotionRevealWhen,
): boolean {
  return preset === "calm" && when === "inView";
}

export const motionAnchorScrollOffset = -96;

export function motionPresetRevealOffset(
  preset: MotionPreset,
  when: MotionRevealWhen,
): number {
  const config = motionPresetConfig[preset];
  return when === "mount" ? config.revealOffsetMount : config.revealOffset;
}

export function motionPresetRevealTransition(
  preset: MotionPreset,
  when: MotionRevealWhen,
  extraDelay = 0,
) {
  const config = motionPresetConfig[preset];
  const duration =
    when === "mount" ? config.revealDurationMount : config.revealDuration;
  return { duration, ease: motionEase, delay: extraDelay };
}

export function motionStaggerChildDelay(
  index: number,
  preset: MotionPreset = "calm",
): number {
  const { staggerGap, staggerMaxDelay } = motionPresetConfig[preset];
  return Math.min(index * staggerGap, staggerMaxDelay);
}
