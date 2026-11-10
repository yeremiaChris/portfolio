"use client";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { ReactNode } from "react";

type BlogPostTitleMetaProps = {
  meta: ReactNode;
  title: ReactNode;
};

export function BlogPostTitleMeta({ meta, title }: BlogPostTitleMetaProps) {
  return (
    <Stagger when="mount" preset="calm" className="flex flex-col gap-3">
      <StaggerItem>
        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-[11px] font-medium">
          {meta}
        </div>
      </StaggerItem>
      <StaggerItem>
        <h1 className="font-heading text-foreground text-3xl sm:text-4xl">
          {title}
        </h1>
      </StaggerItem>
    </Stagger>
  );
}
