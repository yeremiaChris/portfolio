"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

export function DotPatternBackground() {
  return (
    <DotPattern
      className={cn(
        "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        "fixed top-0 left-0 right-0 bottom-0"
      )}
    />
  );
}
