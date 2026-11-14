export const motionHeaderBackdropEase = [0.22, 1, 0.36, 1] as const;

export const motionHeaderBackdropDuration = 0.45;

export function motionHeaderBackdropTransition(reducedMotion: boolean) {
  if (reducedMotion) {
    return { duration: 0 } as const;
  }
  return {
    duration: motionHeaderBackdropDuration,
    ease: motionHeaderBackdropEase,
  };
}
