export const motionKeffiExpoOut = [0.19, 1, 0.22, 1] as const;

export const motionKeffiPower2Out = [0.5, 1, 0.89, 1] as const;

export const motionKeffiBarCssDurationMs = 500;

export const motionHeaderFlipTransition = (reducedMotion: boolean) =>
  reducedMotion
    ? ({ duration: 0 } as const)
    : ({ duration: 0.8, ease: motionKeffiExpoOut } as const);

export const motionHeaderNavIndicatorTransition = (reducedMotion: boolean) =>
  reducedMotion
    ? ({ duration: 0 } as const)
    : ({ duration: 0.7, ease: motionKeffiExpoOut } as const);

export const motionHeaderNavIndicatorHideTransition = (
  reducedMotion: boolean,
) =>
  reducedMotion
    ? ({ duration: 0 } as const)
    : ({ duration: 0.4, ease: motionKeffiPower2Out } as const);
