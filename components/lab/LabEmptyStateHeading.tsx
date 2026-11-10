"use client";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { askYeremia, labIntro } from "@/lib/lab";

export function LabEmptyStateHeading() {
  return (
    <Stagger
      when="mount"
      preset="calm"
      className="flex max-w-lg flex-col gap-2"
    >
      <StaggerItem>
        <h1 className="sr-only">{askYeremia.title}</h1>
        <h2 className="font-heading text-foreground text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {askYeremia.greeting}
        </h2>
      </StaggerItem>
      <StaggerItem>
        <p className="text-muted-foreground text-sm leading-relaxed sm:text-[15px]">
          {labIntro.emptyStateSummary}
        </p>
      </StaggerItem>
    </Stagger>
  );
}
