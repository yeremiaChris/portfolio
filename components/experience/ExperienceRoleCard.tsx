import { CircleCheck } from "lucide-react";

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

export function ExperienceRoleCard({ role }: { role: ExperienceRole }) {
  const toneClass = experienceRoleToneClass[role.tone];

  return (
    <Card
      id={role.id}
      className="bg-muted ring-border/20 hover:bg-muted/80 scroll-mt-24 rounded-3xl py-6 transition-colors md:py-8"
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
            {role.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CircleCheck
                  className={cn("mt-0.5 size-4.5 shrink-0", toneClass)}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
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
