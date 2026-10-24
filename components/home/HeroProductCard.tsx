export function HeroProductCard() {
  return (
    <figure className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#4cd7f6]/15 blur-3xl md:-inset-10"
      />
      <div className="border-border/50 bg-card/90 relative overflow-hidden rounded-2xl border shadow-[0_24px_80px_-32px_rgba(76,215,246,0.45)] backdrop-blur-md">
        <figcaption className="border-border/40 flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground font-mono text-[10px] tracking-[0.16em] uppercase">
              Clinical distribution · Node 14
            </span>
            <span className="font-heading text-foreground text-lg font-semibold tracking-tight">
              Cold-Chain Unit #872-A
            </span>
          </div>
          <span className="bg-primary/15 text-primary inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase">
            <span className="bg-primary size-1.5 animate-pulse rounded-full" />
            Live
          </span>
        </figcaption>

        <div className="px-5 pt-6 pb-2 sm:px-6">
          <p className="font-heading text-foreground text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">
            −74.2{" "}
            <span className="text-muted-foreground text-2xl font-medium sm:text-3xl">
              °C
            </span>
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            Thermal stability stream · latency-sensitive UI
          </p>
        </div>

        <div className="px-3 pb-2 sm:px-4" aria-hidden>
          <svg
            viewBox="0 0 360 96"
            className="h-24 w-full text-[#4cd7f6]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="hero-wave-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 58 C40 40, 70 78, 110 52 C150 26, 180 70, 220 48 C260 26, 300 62, 360 38 L360 96 L0 96 Z"
              fill="url(#hero-wave-fill)"
            />
            <path
              d="M0 58 C40 40, 70 78, 110 52 C150 26, 180 70, 220 48 C260 26, 300 62, 360 38"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="border-border/40 grid grid-cols-2 gap-3 border-t px-5 py-4 font-mono text-[11px] sm:grid-cols-3 sm:px-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground tracking-wider uppercase">
              Stability
            </span>
            <span className="text-foreground">99.98%</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground tracking-wider uppercase">
              Corridor
            </span>
            <span className="text-foreground">In transit</span>
          </div>
          <div className="col-span-2 flex flex-col gap-0.5 sm:col-span-1">
            <span className="text-muted-foreground tracking-wider uppercase">
              Latency
            </span>
            <span className="text-[#4cd7f6]">28ms · TLS</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
