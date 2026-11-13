import type { SimpleIcon } from "simple-icons";

import { cn } from "@/lib/utils";

type TechStackIconProps = {
  icon: SimpleIcon | null;
  className?: string;
  dotClassName?: string;
};

export function TechStackIcon({
  icon,
  className,
  dotClassName,
}: TechStackIconProps) {
  if (!icon) {
    return (
      <span
        className={cn(
          "bg-muted-foreground/45 size-1.5 shrink-0 rounded-full",
          dotClassName,
        )}
        aria-hidden
      />
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-3.5 shrink-0 fill-current", className)}
      aria-hidden
    >
      <path d={icon.path} />
    </svg>
  );
}
