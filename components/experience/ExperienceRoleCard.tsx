import { BadgeCheck, CircleCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  experienceRoleBarClass,
  experienceRoleToneClass,
  type ExperienceRole,
} from "@/lib/experience";
import { cn } from "@/lib/utils";

export function ExperienceRoleCard({ role }: { role: ExperienceRole }) {
  const toneClass = experienceRoleToneClass[role.tone];
  const barClass = experienceRoleBarClass[role.tone];

  return (
    <Card className="rounded-3xl bg-muted py-6 ring-border/20 transition-colors hover:bg-muted/80 md:py-8">
      <CardHeader className="gap-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "rounded-md font-mono text-[11px] tracking-wide",
                  toneClass,
                )}
              >
                {role.roleCode}
              </Badge>
              <Badge
                variant="secondary"
                className={cn(
                  "gap-1.5 rounded-md font-mono text-[10px] tracking-wider uppercase",
                  toneClass,
                )}
              >
                {role.current ? (
                  <span className="size-1.5 animate-ping rounded-full bg-primary" />
                ) : null}
                {role.status}
              </Badge>
              <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                {role.locationPeriod}
              </span>
            </div>

            <CardTitle className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
              <h2 className="text-foreground">{role.title}</h2>
              <span className="font-mono text-muted-foreground">@</span>
              <span className={toneClass}>{role.company}</span>
              <span className="text-sm font-normal text-muted-foreground">
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
                  "h-auto rounded-md px-3 py-1 font-mono text-[12px] font-medium normal-case tracking-normal",
                  index === 0 ? toneClass : "text-muted-foreground",
                )}
              >
                {stat}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-8">
            <p className="font-mono text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              // Architectural Impact & Scope
            </p>
            <ul className="space-y-3 text-[14px] leading-relaxed text-muted-foreground">
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

          <aside className="flex flex-col justify-between gap-3 rounded-xl bg-[#0a0e14] p-4 lg:col-span-4">
            <div>
              <div className="mb-2 flex items-center justify-between gap-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                <span>{role.panel.title}</span>
                <span className={cn("normal-case", toneClass)}>
                  {role.panel.score}
                </span>
              </div>
              <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn("h-full rounded-full", barClass)}
                  style={{ width: `${role.panel.progressPct}%` }}
                />
              </div>
              <div className="space-y-1.5 font-mono text-[12px]">
                {role.panel.rows.map((row) => (
                  <dl
                    key={row.label}
                    className="flex justify-between gap-3 text-muted-foreground"
                  >
                    <dt>{row.label}</dt>
                    <dd
                      className={cn(
                        "shrink-0 text-right",
                        row.emphasize ? toneClass : "text-foreground",
                        row.emphasize && "font-semibold",
                      )}
                    >
                      {row.value}
                    </dd>
                  </dl>
                ))}
              </div>
            </div>
            <p className="flex items-center gap-2 rounded-md bg-muted px-2 py-1.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              <BadgeCheck
                className={cn("size-3.5 shrink-0", toneClass)}
                aria-hidden
              />
              <span className="normal-case tracking-normal">
                {role.panel.footnote}
              </span>
            </p>
          </aside>
        </div>

        <ul className="flex flex-wrap gap-2">
          {role.stack.map((tech) => (
            <li key={tech}>
              <Badge
                variant="secondary"
                className="rounded-md font-mono text-[11px] font-normal normal-case tracking-normal text-foreground"
              >
                {tech}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
