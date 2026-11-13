"use client";

import { m, useReducedMotion } from "motion/react";

import { TechStackIcon } from "@/components/home/TechStackIcon";
import { homeToolsStagger } from "@/lib/home-motion";
import { getTechChipIcon } from "@/lib/tech-stack-icons";

const techChipClass =
  "group/chip border-border/55 bg-background/35 text-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium leading-none transition-[border-color] duration-200 hover:border-brand-accent/40 motion-reduce:transition-none sm:text-[13px]";

type TechStackToolChipsMotionProps = {
  items: readonly string[];
  visible: boolean;
  categoryIndex?: number;
};

export function TechStackToolChipsMotion({
  items,
  visible,
  categoryIndex = 0,
}: TechStackToolChipsMotionProps) {
  const reducedMotion = useReducedMotion();
  const baseDelay = categoryIndex * 0.04;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => {
        const delay = Math.min(
          baseDelay + index * homeToolsStagger.stagger,
          0.5,
        );
        const show = reducedMotion || visible;

        return (
          <m.span
            key={item}
            className={techChipClass}
            initial={false}
            animate={
              show
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: homeToolsStagger.yPx }
            }
            transition={{
              duration: reducedMotion ? 0 : homeToolsStagger.duration,
              ease: homeToolsStagger.ease,
              delay: reducedMotion ? 0 : delay,
            }}
          >
            <TechStackIcon
              icon={getTechChipIcon(item)}
              className="text-muted-foreground/70 group-hover/chip:text-brand-accent transition-colors duration-200 motion-reduce:transition-none"
            />
            {item}
          </m.span>
        );
      })}
    </div>
  );
}
