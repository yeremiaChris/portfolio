import { site } from "@/lib/site";

export const introOverlayClassName =
  "bg-background pointer-events-none fixed inset-0 z-110 flex items-center justify-center overflow-hidden";

export function IntroLockup() {
  return (
    <>
      <div
        aria-hidden
        className="from-primary/15 pointer-events-none absolute top-1/4 left-1/2 hidden size-112 -translate-x-1/2 rounded-full bg-linear-to-b to-transparent blur-3xl md:block"
      />
      <div
        aria-hidden
        className="bg-brand-accent/10 pointer-events-none absolute right-[12%] bottom-1/4 hidden size-72 rounded-full blur-3xl md:block"
      />
      <div className="relative flex flex-col items-center gap-7 px-6">
        <p className="text-primary text-[13px] font-bold tracking-tight">
          {"<YC />"}
        </p>
        <p className="font-heading text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="from-brand-accent/80 via-brand-accent to-brand-accent/60 bg-linear-to-r bg-clip-text text-transparent">
            {site.name}
          </span>
        </p>
        <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
          {site.role}
        </p>
        <div
          aria-hidden
          className="bg-secondary h-0.5 w-44 overflow-hidden rounded-full sm:w-56"
        >
          <div
            data-intro-bar=""
            className="from-brand-accent/80 via-brand-accent to-brand-accent/60 h-full w-full origin-left bg-linear-to-r"
          />
        </div>
      </div>
    </>
  );
}
