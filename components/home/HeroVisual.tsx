"use client";

import type { ComponentType, SVGProps } from "react";

import { cn } from "@/lib/utils";

type StackIconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

function NextIcon({ className }: StackIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-9", className)}
      fill="currentColor"
    >
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.12 5.243c-.008.18-.008.395-.008.572v6.347c0 .177 0 .392.008.572a11.875 11.875 0 0 0 2.12 5.243C4.25 21.815 7.443 23.654 10.85 23.96c.12.008.24.015.364.021.048.006.182.007.358.007h.856c.176 0 .31-.001.358-.007.124-.006.244-.013.364-.021 3.407-.306 6.6-2.145 8.622-4.972a11.875 11.875 0 0 0 2.12-5.243c.008-.18.008-.395.008-.572V11.43c0-.177 0-.392-.008-.572a11.875 11.875 0 0 0-2.12-5.243C18.557 2.185 15.364.346 11.957.04 11.837.032 11.717.025 11.593.019 11.545.013 11.411.012 11.235.012h-.663zm.634 4.603c2.403 0 4.517 1.212 5.776 3.058l-2.868 2.082a3.152 3.152 0 0 0-2.908-1.955c-1.724 0-3.122 1.398-3.122 3.122s1.398 3.122 3.122 3.122a3.152 3.152 0 0 0 2.908-1.955l2.868 2.082a6.456 6.456 0 0 1-5.776 3.058c-3.569 0-6.458-2.889-6.458-6.458S8.637 4.603 12.206 4.603z" />
    </svg>
  );
}

function ReactIcon({ className }: StackIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-9", className)}
      fill="currentColor"
    >
      <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.45-1.03-.96-1.51-1.46-.73.21-1.42.32-2.09.32-1.38 0-2.52-.47-3.09-1.31-.42-.61-.53-1.36-.32-2.17.47-1.85 2.67-3.55 5.55-4.47-.24-.51-.44-1.04-.59-1.57-3.85 1.05-6.52 3.33-7.15 5.88-.32 1.25-.12 2.45.55 3.38.72 1 1.95 1.57 3.5 1.57.73 0 1.52-.11 2.34-.32.48.5.99.97 1.51 1.42-1.44 1.34-2.77 1.95-3.8 1.95-.52 0-.96-.14-1.28-.4M12 3.04c.73 0 1.52.11 2.34.32.48-.45.99-.92 1.51-1.42-1.44-1.34-2.77-1.95-3.8-1.95-.52 0-.96.14-1.28.4-.63-.38-2.01.2-3.6 1.7.52.45 1.03.96 1.51 1.46.73-.21 1.42-.32 2.09-.32 1.38 0 2.52.47 3.09 1.31.42.61.53 1.36.32 2.17-.47 1.85-2.67 3.55-5.55 4.47.24.51.44 1.04.59 1.57 3.85-1.05 6.52-3.33 7.15-5.88.32-1.25.12-2.45-.55-3.38-.72-1-1.95-1.57-3.5-1.57M18.63 4c-.63-.38-2.01.2-3.6 1.7.52.45 1.03.96 1.51 1.46.73-.21 1.42-.32 2.09-.32 1.38 0 2.52.47 3.09 1.31.42.61.53 1.36.32 2.17-.47 1.85-2.67 3.55-5.55 4.47.24.51.44 1.04.59 1.57 3.85 1.05 6.52 3.33 7.15 5.88.32 1.25.12 2.45-.55 3.38-.72 1-1.95 1.57-3.5 1.57-.73 0-1.52-.11-2.34-.32-.48.5-.99.97-1.51 1.42 1.44 1.34 2.77 1.95 3.8 1.95.52 0 .96-.14 1.28-.4.63.38 2.01-.2 3.6-1.7-.52-.45-1.03-.96-1.51-1.46-.73.21-1.42.32-2.09.32-1.38 0-2.52-.47-3.09-1.31-.42-.61-.53-1.36-.32-2.17.47-1.85 2.67-3.55 5.55-4.47-.24-.51-.44-1.04-.59-1.57-3.85-1.05-6.52-3.33-7.15-5.88-.32-1.25-.12-2.45.55-3.38.72-1 1.95-1.57 3.5-1.57" />
    </svg>
  );
}

function TypeScriptIcon({ className }: StackIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-8", className)}
      fill="currentColor"
    >
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111v6.825c-.375.063-.834.094-1.378.094-1.686 0-2.925-.412-3.717-1.236-.792-.825-1.188-2.088-1.188-3.787V9.75h3.656zm-8.174 0h3.764v8.763c-.632.094-1.316.141-2.052.141-1.601 0-2.825-.316-3.673-.947-.848-.632-1.272-1.554-1.272-2.766 0-1.316.444-2.316 1.332-3C8.25 10.316 9.311 9.75 10.547 9.75c.632 0 1.201.047 1.707.141V9.75z" />
    </svg>
  );
}

function TailwindIcon({ className }: StackIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-8", className)}
      fill="currentColor"
    >
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C13.337 13.382 11.976 12 9.001 12z" />
    </svg>
  );
}

const STACK_GROUPS = [
  {
    id: "frameworks",
    rotation: "-rotate-3",
    offset: "translate-x-2",
    items: [
      { id: "next", Icon: NextIcon, label: "Next.js" },
      { id: "react", Icon: ReactIcon, label: "React" },
    ],
  },
  {
    id: "language-style",
    rotation: "rotate-2",
    offset: "-translate-x-1 translate-y-3",
    items: [
      { id: "typescript", Icon: TypeScriptIcon, label: "TypeScript" },
      { id: "tailwind", Icon: TailwindIcon, label: "Tailwind" },
    ],
  },
] as const;

function StackGlassCard({
  rotation,
  offset,
  items,
}: {
  rotation: string;
  offset: string;
  items: readonly {
    id: string;
    Icon: ComponentType<StackIconProps>;
    label: string;
  }[];
}) {
  return (
    <div
      className={cn(
        "hero-visual-card border-gradient group relative w-full max-w-[220px] overflow-hidden rounded-2xl bg-white/5 p-4 shadow-lg backdrop-blur-md transition-transform duration-300 ease-out",
        rotation,
        offset,
        "motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-0.5",
      )}
    >
      <ul className="relative z-[1] flex flex-col gap-4">
        {items.map(({ id, Icon, label }) => (
          <li key={id} className="flex items-center gap-3">
            <span
              className={cn(
                "text-[#4cd7f6] transition-transform duration-500 ease-out",
                "motion-safe:group-hover:rotate-6",
              )}
            >
              <Icon />
            </span>
            <span className="font-mono text-[11px] tracking-wide text-white/70 uppercase">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div
      aria-hidden
      className="hero-visual relative flex w-full max-w-full flex-col items-end justify-center gap-4 overflow-hidden pr-0 lg:min-h-[280px] lg:pr-4"
    >
      {STACK_GROUPS.map((group) => (
        <StackGlassCard
          key={group.id}
          rotation={group.rotation}
          offset={group.offset}
          items={group.items}
        />
      ))}
    </div>
  );
}
