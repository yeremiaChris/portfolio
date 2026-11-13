"use client";

import { TechStackToolChipsMotion } from "@/components/home/TechStackToolChipsMotion";
import { sectionEyebrowClass } from "@/components/typography/typography-tokens";
import { secondaryTechCategories } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

export function TechStackSecondaryCategories() {
  return (
    <div className="grid flex-1 grid-cols-1 md:grid-cols-2 lg:grid lg:grid-cols-3 lg:items-stretch">
      {secondaryTechCategories.map((category, index) => (
        <div
          key={category.id}
          className={cn(
            "flex h-full min-h-0 flex-col gap-3 p-5 md:p-6",
            index > 0 && "border-border/40 border-t md:border-t-0",
            index === 1 && "md:border-border/40 md:border-l",
            index === 2 &&
              "md:border-border/40 md:border-t md:border-l-0 lg:border-t-0 lg:border-l",
            index > 0 && "lg:border-border/40 lg:border-l",
          )}
        >
          <h3 className={sectionEyebrowClass}>{category.title}</h3>
          <TechStackToolChipsMotion
            items={category.items}
            categoryIndex={index}
          />
        </div>
      ))}
    </div>
  );
}
