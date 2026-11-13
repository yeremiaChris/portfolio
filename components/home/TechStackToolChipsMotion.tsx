"use client";

import { m } from "motion/react";

import { TechStackIcon } from "@/components/home/TechStackIcon";
import {
  useHomeMotionReduced,
  useHomeScrollMotionEnabled,
} from "@/components/home/useHomeMotionEnabled";
import { homeToolsStagger } from "@/lib/home-motion";
import { getTechChipIcon } from "@/lib/tech-stack-icons";

const techChipClass =
  "group/chip border-border/55 bg-background/35 text-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium leading-none transition-[border-color] duration-200 hover:border-brand-accent/40 motion-reduce:transition-none sm:text-[13px]";

type TechStackToolChipsMotionProps = {
  items: readonly string[];
  categoryIndex?: number;
};

export function TechStackToolChipsMotion({
  items,
  categoryIndex = 0,
}: TechStackToolChipsMotionProps) {
  const scrollMotion = useHomeScrollMotionEnabled();
  const reduced = useHomeMotionReduced();
  const baseDelay = categoryIndex * 0.04;

  if (reduced || !scrollMotion) {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={techChipClass}>
            <TechStackIcon
              icon={getTechChipIcon(item)}
              className="text-muted-foreground/70 group-hover/chip:text-brand-accent transition-colors duration-200 motion-reduce:transition-none"
            />
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => {
        const delay = Math.min(
          baseDelay + index * homeToolsStagger.stagger,
          0.5,
        );

        return (
          <m.span
            key={item}
            className={techChipClass}
            initial={{ opacity: 0, y: homeToolsStagger.yPx }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
            transition={{
              duration: homeToolsStagger.duration,
              ease: homeToolsStagger.ease,
              delay,
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
