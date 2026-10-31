export function HeroVisualPlaceholder() {
  return (
    <div
      aria-hidden
      className="hidden w-full min-w-0 xl:flex xl:justify-end xl:self-start"
    >
      <div className="hero-code-stage w-full max-w-[420px]">
        <div className="border-gradient hero-code-shell relative aspect-[420/320] w-full overflow-hidden rounded-2xl bg-[#0a0e14]/80 shadow-[0_0_64px_rgb(76_215_246/0.16)] backdrop-blur-md" />
      </div>
    </div>
  );
}
