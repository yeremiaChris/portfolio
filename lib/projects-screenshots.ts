export const featuredScreenshotMobileSuffix = "-sm";

export function getFeaturedScreenshotMobileSrc(desktopSrc: string): string {
  return desktopSrc.replace(
    /\.webp$/i,
    `${featuredScreenshotMobileSuffix}.webp`,
  );
}

export const featuredScreenshotMobileWidth = 720;
export const featuredScreenshotMobileHeight = 450;

export const featuredScreenshotSizes =
  "(max-width: 767px) 100vw, (max-width: 1200px) min(50vw, 560px), 560px";
