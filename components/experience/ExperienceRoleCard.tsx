"use client";

import { CircleCheck } from "lucide-react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import {
  useExperienceBulletMotion,
  useExperienceRoleCardScroll,
} from "@/components/experience/ExperienceScrollMotion";
import { useServicesMotionHover } from "@/components/services/ServicesScrollMotion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  experienceRoleToneClass,
  formatExperienceStackLine,
  type ExperienceRole,
} from "@/lib/experience";
import { cn } from "@/lib/utils";

function HighlightItem({
  item,
  bulletIndex,
  toneClass,
}: {
  item: string;
  bulletIndex: number;
  toneClass: string;
}) {
  const reducedMotion = useReducedMotion();
  const scroll = useExperienceRoleCardScroll();
  const fallbackEnter = useMotionValue(0);
  const fallbackFocus = useMotionValue(0);
  const enterProgress = scroll?.enterProgress ?? fallbackEnter;
  const focus = scroll?.focus ?? fallbackFocus;
  const { x, opacity } = useExperienceBulletMotion(enterProgress, bulletIndex);
  const iconColor = useTransform(
    focus,
    [0, 0.55, 1],
    [
      "rgba(148, 163, 184, 0.85)",
      "rgba(76, 215, 246, 0.65)",
      "rgba(76, 215, 246, 1)",
    ],
  );

  if (reducedMotion) {
    return (
      <li className="flex items-start gap-2">
        <CircleCheck
          className={cn("mt-0.5 size-4.5 shrink-0", toneClass)}
          aria-hidden
        />
        <span>{item}</span>
      </li>
    );
  }

  return (
    <m.li className="flex items-start gap-2" style={{ x, opacity }}>
      <m.span className="mt-0.5 shrink-0" style={{ color: iconColor }}>
        <CircleCheck className="size-4.5" aria-hidden />
      </m.span>
      <span>{item}</span>
    </m.li>
  );
}

export function ExperienceRoleCard({ role }: { role: ExperienceRole }) {
  const toneClass = experienceRoleToneClass[role.tone];
  const motionHover = useServicesMotionHover();

  return (
    <Card
      id={role.id}
      className={cn(
        "bg-muted ring-border/20 scroll-mt-24 rounded-3xl border-0 py-6 shadow-none ring-1 md:py-8",
        !motionHover && "hover:bg-muted/80 transition-colors",
      )}
    >
      <CardHeader className="gap-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "label-caps gap-1.5 rounded-md tracking-wide",
                  toneClass,
                )}
              >
                {role.current ? (
                  <span className="bg-primary size-1.5 shrink-0 rounded-full" />
                ) : null}
                {role.status}
              </Badge>
              <span className="text-muted-foreground label-caps text-[11px] tracking-wider">
                {role.locationPeriod}
              </span>
            </div>

            <CardTitle className="font-heading flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xl font-semibold tracking-tight sm:text-2xl">
              <h2 className="text-foreground">{role.title}</h2>
              <span className="text-muted-foreground">@</span>
              <span className={toneClass}>{role.company}</span>
              <span className="text-muted-foreground text-sm font-normal">
                {role.companyLegal}
              </span>
            </CardTitle>

            <CardDescription className="mt-2 max-w-3xl text-[14px] leading-relaxed">
              {role.summary}
            </CardDescription>
          </div>

          <div className="flex shrink-0 flex-row flex-wrap gap-2 lg:flex-col lg:items-end">
            {role.sideStats.map((stat, index) => (
              <Badge
                key={stat}
                variant="secondary"
                className={cn(
                  "h-auto rounded-md px-3 py-1 text-[12px] font-medium tracking-normal normal-case",
                  index === 0 ? toneClass : "text-muted-foreground",
                )}
              >
                {stat}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-foreground/75 text-xs font-semibold tracking-wide uppercase">
            What I owned
          </p>
          <ul className="text-muted-foreground space-y-3 text-[14px] leading-relaxed">
            {role.highlights.map((item, bulletIndex) => (
              <HighlightItem
                key={item}
                item={item}
                bulletIndex={bulletIndex}
                toneClass={toneClass}
              />
            ))}
          </ul>
        </div>

        <p className="text-muted-foreground text-[12px] leading-relaxed">
          {formatExperienceStackLine(role.stack)}
        </p>
      </CardContent>
    </Card>
  );
}
