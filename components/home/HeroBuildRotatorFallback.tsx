import {
  HERO_BUILD_PHRASES,
  HERO_BUILD_PHRASES_SR,
  HERO_BUILD_SLOT_PHRASE,
} from "@/lib/hero-build-phrases";
import { cn } from "@/lib/utils";

type HeroBuildRotatorFallbackProps = {
  className?: string;
};

const phraseClassName =
  "hero-name-saragi col-start-1 row-start-1 block max-w-full max-[390px]:break-words min-[391px]:whitespace-nowrap";

export function HeroBuildRotatorFallback({
  className,
}: HeroBuildRotatorFallbackProps) {
  return (
    <p
      aria-live="off"
      className={cn(
        "font-heading mt-2 max-w-full text-left text-[20px] leading-[1.25] font-semibold tracking-tight md:mt-3 lg:text-[26px]",
        className,
      )}
    >
      <span className="sr-only">{HERO_BUILD_PHRASES_SR}</span>
      <span
        aria-hidden
        className="inline-flex max-w-full flex-wrap items-baseline gap-x-1.5"
      >
        <span className="text-muted-foreground shrink-0 font-semibold">
          I build
        </span>
        <span className="relative inline-grid max-w-full align-bottom">
          <span
            className="invisible col-start-1 row-start-1 max-w-full max-[390px]:break-words min-[391px]:whitespace-nowrap"
            aria-hidden
          >
            {HERO_BUILD_SLOT_PHRASE}
          </span>
          <span className={phraseClassName}>{HERO_BUILD_PHRASES[0]}</span>
        </span>
      </span>
    </p>
  );
}
