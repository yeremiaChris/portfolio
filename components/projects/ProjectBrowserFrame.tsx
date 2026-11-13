import {
  featuredScreenshotMobileHeight,
  featuredScreenshotMobileWidth,
  getFeaturedScreenshotMobileSrc,
} from "@/lib/projects-screenshots";
import { cn } from "@/lib/utils";

type ProjectBrowserFrameProps = {
  src: string;
  alt: string;
  tilt?: "left" | "right";
  deferMobileSrc?: boolean;
  className?: string;
};

export function ProjectBrowserFrame({
  src,
  alt,
  tilt = "left",
  deferMobileSrc = false,
  className,
}: ProjectBrowserFrameProps) {
  const mobileSrc = getFeaturedScreenshotMobileSrc(src);
  const tiltClass =
    tilt === "left"
      ? "md:[transform:perspective(1200px)_rotateY(-1.25deg)] md:hover:translate-x-1.5"
      : "md:[transform:perspective(1200px)_rotateY(1.25deg)] md:hover:-translate-x-1.5";

  return (
    <div className={cn("relative min-w-0", className)}>
      <div
        className="bg-brand-accent/14 pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:blur-[80px]"
        aria-hidden
      />
      <div
        className={cn(
          "relative w-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          tiltClass,
        )}
      >
        <div className="bg-muted ring-border/40 overflow-hidden rounded-2xl shadow-xl ring-1">
          <div
            className="border-border/40 bg-background/80 flex items-center gap-1.5 border-b px-3 py-2.5"
            aria-hidden
          >
            <span className="size-2 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2 rounded-full bg-[#febc2e]/90" />
            <span className="size-2 rounded-full bg-[#28c840]/90" />
            <span className="bg-secondary/80 ml-2 h-2 max-w-[40%] flex-1 rounded-full" />
          </div>
          <div className="relative aspect-[8/5] w-full bg-[#070b10]">
            <picture className="absolute inset-0 block size-full">
              <source
                media="(min-width: 768px)"
                srcSet={src}
                type="image/webp"
              />
              {deferMobileSrc ? (
                <img
                  data-deferred-shot=""
                  data-src={mobileSrc}
                  alt={alt}
                  width={featuredScreenshotMobileWidth}
                  height={featuredScreenshotMobileHeight}
                  decoding="async"
                  loading="lazy"
                  fetchPriority="low"
                  className="size-full object-cover object-top"
                />
              ) : (
                <img
                  src={mobileSrc}
                  alt={alt}
                  width={featuredScreenshotMobileWidth}
                  height={featuredScreenshotMobileHeight}
                  decoding="async"
                  loading="lazy"
                  fetchPriority="low"
                  className="size-full object-cover object-top"
                />
              )}
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
