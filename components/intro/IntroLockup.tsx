import { site } from "@/lib/site";

export const introOverlayClassName =
  "bg-background fixed inset-0 z-110 flex items-center justify-center overflow-hidden";

export function IntroLockup() {
  return (
    <div className="relative flex flex-col items-center gap-5 px-6">
      <p className="text-primary/90 text-xs font-semibold tracking-tight">
        {"<YC />"}
      </p>
      <p className="font-heading text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        <span className="from-brand-accent/70 via-brand-accent/90 to-brand-accent/60 bg-linear-to-r bg-clip-text text-transparent">
          {site.name}
        </span>
      </p>
      <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
        {site.role}
      </p>
      <div
        aria-hidden
        className="bg-secondary/80 h-px w-36 overflow-hidden rounded-full sm:w-44"
      >
        <div
          data-intro-bar=""
          className="from-brand-accent/70 via-brand-accent/90 to-brand-accent/60 h-full w-full origin-left bg-linear-to-r"
        />
      </div>
    </div>
  );
}
