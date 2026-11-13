"use client";

import { m } from "motion/react";
import { useId, useMemo, useState, type ReactNode } from "react";

import { TechStackIcon } from "@/components/home/TechStackIcon";
import { homeBentoCardClass } from "@/components/home/homeSurface";
import {
  useHomeMotionReduced,
  useHomeScrollMotionEnabled,
} from "@/components/home/useHomeMotionEnabled";
import { homeConstellation } from "@/lib/home-motion";
import { getCoreToolIcon, getTechChipIcon } from "@/lib/tech-stack-icons";
import {
  coreTools,
  secondaryTechCategories,
  techStackIntro,
} from "@/lib/tech-stack";
import { sectionEyebrowClass } from "@/components/typography/typography-tokens";
import { cn } from "@/lib/utils";

type GroupId = "core" | string;

const chipClass =
  "group/chip border-border/55 bg-background/35 text-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium leading-none transition-[border-color,box-shadow,opacity] duration-300 hover:border-brand-accent/50 motion-reduce:transition-none sm:text-[13px]";

function floatTransition(index: number) {
  return {
    duration: homeConstellation.floatDuration + index * 0.35,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
    delay: index * 0.12,
  };
}

function FloatingChip({
  children,
  index,
  glow,
}: {
  children: ReactNode;
  index: number;
  glow: boolean;
}) {
  const motionEnabled = useHomeScrollMotionEnabled();
  const reduced = useHomeMotionReduced();

  if (reduced || !motionEnabled) {
    return (
      <span
        className={cn(
          chipClass,
          glow &&
            "border-brand-accent/55 shadow-[0_0_12px_rgb(76_215_246/0.35)]",
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <m.span
      className={cn(
        chipClass,
        glow &&
          "border-brand-accent/60 text-[#eafcff] shadow-[0_0_14px_rgb(76_215_246/0.45)]",
      )}
      animate={{
        x: [0, homeConstellation.floatX, 0],
        y: [0, -homeConstellation.floatY, 0],
      }}
      transition={floatTransition(index)}
    >
      {children}
    </m.span>
  );
}

function ConstellationLines({
  count,
  active,
}: {
  count: number;
  active: boolean;
}) {
  const gid = useId();
  if (!active || count < 2) return null;

  const hubY = 8;
  const lines = Array.from({ length: count }, (_, i) => {
    const x = 8 + (i / Math.max(count - 1, 1)) * 84;
    const y = 88;
    return { x1: 50, y1: hubY, x2: x, y2: y, key: `${gid}-${i}` };
  });

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 size-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {lines.map((line) => (
        <m.line
          key={line.key}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#4cd7f6"
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.75 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function ConstellationColumn({
  groupId,
  title,
  hovered,
  onEnter,
  onLeave,
  children,
  className,
}: {
  groupId: GroupId;
  title: ReactNode;
  hovered: GroupId | null;
  onEnter: (id: GroupId) => void;
  onLeave: () => void;
  children: ReactNode;
  className?: string;
}) {
  const isActive = hovered === groupId;
  const dimmed = hovered !== null && !isActive;

  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 flex-col gap-3 p-5 transition-opacity duration-300 md:p-6",
        dimmed && "opacity-40",
        className,
      )}
      onPointerEnter={() => onEnter(groupId)}
      onPointerLeave={onLeave}
    >
      {typeof title === "string" ? (
        <h3 className={sectionEyebrowClass}>{title}</h3>
      ) : (
        title
      )}
      <div className="relative z-[1] flex flex-1 flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

export function TechStackConstellation() {
  const [hovered, setHovered] = useState<GroupId | null>(null);
  const categoryChipCounts = useMemo(
    () =>
      Object.fromEntries(
        secondaryTechCategories.map((c) => [c.id, c.items.length]),
      ),
    [],
  );

  return (
    <div
      className={cn(
        homeBentoCardClass,
        "flex flex-col overflow-hidden p-0 lg:flex-row lg:items-stretch",
      )}
    >
      <ConstellationColumn
        groupId="core"
        hovered={hovered}
        onEnter={setHovered}
        onLeave={() => setHovered(null)}
        className="border-border/40 border-b lg:w-[40%] lg:shrink-0 lg:border-r lg:border-b-0"
        title={
          <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
            <span className={sectionEyebrowClass}>
              {techStackIntro.focusLabel}
            </span>
            <span className="text-brand-accent text-[13px] font-semibold tracking-tight">
              {techStackIntro.focusValue}
            </span>
          </p>
        }
      >
        <ConstellationLines
          count={coreTools.length}
          active={hovered === "core"}
        />
        <ul className="relative z-[1] flex flex-col gap-3.5">
          {coreTools.map((tool, index) => (
            <li key={tool.id} className="flex min-w-0 items-start gap-3">
              <FloatingCoreIcon index={index} glow={hovered === "core"}>
                <TechStackIcon
                  icon={getCoreToolIcon(tool.id)}
                  className={cn(
                    "mt-0.5 transition-colors duration-300",
                    hovered === "core"
                      ? "text-brand-accent"
                      : "text-muted-foreground/75",
                  )}
                />
              </FloatingCoreIcon>
              <p className="min-w-0">
                <span className="font-heading text-foreground block text-[15px] font-semibold tracking-tight">
                  {tool.title}
                </span>
                <span className="text-muted-foreground block text-[12px] leading-snug">
                  {tool.context}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </ConstellationColumn>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-2 lg:grid lg:grid-cols-3 lg:items-stretch">
        {secondaryTechCategories.map((category, index) => (
          <ConstellationColumn
            key={category.id}
            groupId={category.id}
            title={category.title}
            hovered={hovered}
            onEnter={setHovered}
            onLeave={() => setHovered(null)}
            className={cn(
              index > 0 && "border-border/40 border-t md:border-t-0",
              index === 1 && "md:border-border/40 md:border-l",
              index === 2 &&
                "md:border-border/40 md:border-t md:border-l-0 lg:border-t-0 lg:border-l",
              index > 0 && "lg:border-border/40 lg:border-l",
            )}
          >
            <ConstellationLines
              count={categoryChipCounts[category.id] ?? 0}
              active={hovered === category.id}
            />
            <div className="relative z-[1] flex flex-wrap gap-2">
              {category.items.map((item, chipIndex) => (
                <FloatingChip
                  key={item}
                  index={chipIndex + index}
                  glow={hovered === category.id}
                >
                  <TechStackIcon
                    icon={getTechChipIcon(item)}
                    className={cn(
                      "transition-colors duration-300",
                      hovered === category.id
                        ? "text-brand-accent"
                        : "text-muted-foreground/70",
                    )}
                  />
                  {item}
                </FloatingChip>
              ))}
            </div>
          </ConstellationColumn>
        ))}
      </div>
    </div>
  );
}

function FloatingCoreIcon({
  children,
  index,
  glow,
}: {
  children: ReactNode;
  index: number;
  glow: boolean;
}) {
  const motionEnabled = useHomeScrollMotionEnabled();
  const reduced = useHomeMotionReduced();

  if (reduced || !motionEnabled) {
    return (
      <span className={glow ? "text-brand-accent" : undefined}>{children}</span>
    );
  }

  return (
    <m.span
      className="inline-flex shrink-0"
      animate={{
        y: [0, -homeConstellation.floatY * 1.2, 0],
        x: [0, homeConstellation.floatX, 0],
      }}
      transition={floatTransition(index)}
    >
      {children}
    </m.span>
  );
}
