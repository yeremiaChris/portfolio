import { cn } from "@/lib/utils";

export function HeroAtmosphere() {
  return (
    <div
      aria-hidden
      className={cn(
        "hero-signal-atmosphere hero-signal-atmosphere--enhanced pointer-events-none absolute z-0",
      )}
    >
      <div className="hero-signal-grid" />
      <div className="hero-signal-grid-shimmer hidden lg:block" />
      <div className="hero-signal-aurora">
        <span className="hero-signal-aurora-blob hero-signal-aurora-blob--a" />
        <span className="hero-signal-aurora-blob hero-signal-aurora-blob--b" />
        <span className="hero-signal-aurora-blob hero-signal-aurora-blob--c" />
      </div>
    </div>
  );
}
