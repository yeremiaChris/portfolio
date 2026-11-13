import { cn } from "@/lib/utils";

type ProjectCardVisualProps = {
  projectId: string;
  size: "large" | "compact";
  className?: string;
};

const visualThemes: Record<
  string,
  {
    gradient: string;
    accent: "panels" | "grid" | "bars" | "nodes";
  }
> = {
  mazecare: {
    gradient: "linear-gradient(145deg, #0a1218 0%, #0d1a22 45%, #061018 100%)",
    accent: "panels",
  },
  primaku: {
    gradient: "linear-gradient(145deg, #0b1016 0%, #0f1a24 50%, #080d12 100%)",
    accent: "grid",
  },
  kiriminaja: {
    gradient: "linear-gradient(145deg, #0a0f14 0%, #0c161c 50%, #070b10 100%)",
    accent: "bars",
  },
  primacare: {
    gradient: "linear-gradient(145deg, #0b1118 0%, #0d1820 50%, #080c12 100%)",
    accent: "nodes",
  },
};

type AccentKind = (typeof visualThemes)[string]["accent"];

function MockUi({ accent }: { accent: AccentKind }) {
  const kind = accent;

  if (kind === "panels") {
    return (
      <div className="flex h-full w-full gap-2 p-4 pt-5">
        <div className="bg-brand-accent/8 ring-brand-accent/15 flex min-h-0 flex-1 flex-col gap-2 rounded-lg p-2 ring-1">
          <div className="bg-brand-accent/25 h-2 w-12 rounded-full" />
          <div className="bg-foreground/6 h-1.5 w-full rounded" />
          <div className="bg-foreground/6 h-1.5 w-[80%] rounded" />
          <div className="mt-auto grid grid-cols-2 gap-1.5">
            <div className="bg-brand-accent/12 h-8 rounded-md" />
            <div className="bg-brand-accent/12 h-8 rounded-md" />
          </div>
        </div>
        <div className="flex min-h-0 w-[38%] flex-col gap-2">
          <div className="bg-brand-accent/10 ring-brand-accent/20 h-full min-h-[3rem] flex-1 rounded-lg ring-1" />
          <div className="bg-foreground/5 h-6 rounded-md" />
        </div>
      </div>
    );
  }

  if (kind === "grid") {
    return (
      <div className="grid h-full w-full grid-cols-3 gap-2 p-4 pt-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "rounded-md ring-1",
              i % 3 === 0
                ? "bg-brand-accent/14 ring-brand-accent/25"
                : "bg-foreground/5 ring-border/30",
            )}
          />
        ))}
      </div>
    );
  }

  if (kind === "bars") {
    return (
      <div className="flex h-full w-full flex-col justify-end gap-2 p-4 pt-5">
        <div className="flex items-end gap-1.5">
          {[40, 65, 48, 80, 55, 72].map((h, i) => (
            <div
              key={i}
              className="bg-brand-accent/20 w-full rounded-t-sm"
              style={{ height: `${h}%`, maxHeight: "4.5rem" }}
            />
          ))}
        </div>
        <div className="bg-foreground/6 h-1 w-full rounded" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full p-4 pt-5">
      <svg
        className="text-brand-accent/30 h-full w-full"
        viewBox="0 0 200 100"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="40" cy="50" r="6" fill="currentColor" opacity="0.5" />
        <circle cx="100" cy="35" r="8" fill="currentColor" opacity="0.35" />
        <circle cx="160" cy="60" r="5" fill="currentColor" opacity="0.45" />
        <path
          d="M40 50 L100 35 L160 60"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

export function ProjectCardVisual({
  projectId,
  size,
  className,
}: ProjectCardVisualProps) {
  const theme = visualThemes[projectId] ?? visualThemes.mazecare;

  return (
    <div
      className={cn(
        "project-card-visual ring-border/35 relative w-full overflow-hidden rounded-xl bg-[#070b10] ring-1",
        size === "large"
          ? "aspect-[16/9] min-h-[9.5rem]"
          : "aspect-[16/10] min-h-[7rem]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.gradient }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-8 right-0 size-40 rounded-full bg-[#4cd7f6]/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 size-32 rounded-full bg-[#4cd7f6]/8 blur-2xl"
        aria-hidden
      />
      <div className="relative z-[1] h-full min-h-0">
        <MockUi accent={theme.accent} />
      </div>
    </div>
  );
}
