import Image from "next/image";
import { BadgeCheck, GitBranch, MapPin } from "lucide-react";

import {
  aboutSurfaceCardClass,
  projectSurfaceHairlineClass,
} from "@/components/about/aboutSurface";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  aboutProfile,
  aboutProfileMetrics,
  aboutProfileMetricToneClass,
  aboutStoryDotClass,
  aboutStoryEras,
  aboutStoryIntro,
  aboutStoryToneClass,
} from "@/lib/about";
import { cn } from "@/lib/utils";

export function AboutStoryStatic() {
  return (
    <section
      aria-labelledby="about-story-heading"
      className="mb-8 grid w-full min-w-0 grid-cols-1 items-stretch gap-6 lg:mb-10 lg:grid-cols-12 lg:gap-8"
    >
      <div className="flex min-h-0 min-w-0 flex-col lg:col-span-5">
        <Card className="bg-muted ring-border/20 relative flex h-full flex-col overflow-hidden rounded-3xl">
          <CardHeader className="relative gap-4">
            <div className="flex items-center justify-between gap-3">
              <Badge
                variant="secondary"
                className="text-primary label-caps gap-2 tracking-widest"
              >
                <span className="bg-status-available size-2.5 shrink-0 rounded-full" />
                {aboutProfile.status}
              </Badge>
              <span className="text-muted-foreground label-caps tracking-wider">
                {aboutProfile.nodeId}
              </span>
            </div>
            <div className="ring-border/40 relative aspect-4/3 overflow-hidden rounded-xl bg-[#0a0e14] ring-1">
              <Image
                src={aboutProfile.image}
                alt={aboutProfile.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-3 bottom-3">
                <Badge
                  variant="secondary"
                  className="gap-1 bg-[#0a0e14]/80 text-xs backdrop-blur-md"
                >
                  <MapPin className="text-primary size-3" aria-hidden />
                  {aboutProfile.location}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative flex flex-col gap-2">
            {aboutProfileMetrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-secondary/60 flex items-center justify-between gap-3 rounded-lg px-3 py-2"
              >
                <span className="text-muted-foreground text-[13px]">
                  {metric.label}
                </span>
                <span
                  className={cn(
                    "text-right text-[12px] font-medium",
                    aboutProfileMetricToneClass[metric.tone],
                  )}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="relative items-start gap-2 border-t-0 bg-transparent">
            <div className="bg-secondary/80 flex w-full items-start gap-2 rounded-xl p-3">
              <BadgeCheck
                className="text-primary mt-0.5 size-5 shrink-0"
                aria-hidden
              />
              <p className="text-foreground text-[13px] leading-relaxed">
                {aboutProfile.intent}
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex min-h-0 min-w-0 flex-col gap-4 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GitBranch className="text-brand-accent size-5" aria-hidden />
            <h2
              id="about-story-heading"
              className="font-heading text-foreground text-2xl font-semibold tracking-tight"
            >
              {aboutStoryIntro.title}
            </h2>
          </div>
          <span className="text-muted-foreground text-[12px]">
            {aboutStoryIntro.meta}
          </span>
        </div>
        <div className="flex flex-col gap-3 lg:pl-9">
          {aboutStoryEras.map((era) => (
            <div
              key={era.id}
              className={cn(
                aboutSurfaceCardClass,
                era.current && "ring-primary/30",
              )}
            >
              <div className={projectSurfaceHairlineClass} />
              <p
                className={cn(
                  "text-[12px] leading-relaxed font-medium",
                  aboutStoryToneClass[era.tone],
                )}
              >
                <span
                  className={cn(
                    "mr-1.5 inline-block size-1.5 rounded-full align-middle",
                    aboutStoryDotClass[era.tone],
                  )}
                  aria-hidden
                />
                <span className="align-middle break-words">{era.label}</span>
                <span className="text-muted-foreground align-middle"> · </span>
                <span
                  className={cn(
                    "text-muted-foreground align-middle break-words",
                    era.current && "text-primary",
                  )}
                >
                  {era.period}
                </span>
              </p>
              <h3 className="font-heading text-foreground mt-3 text-lg font-semibold tracking-tight">
                {era.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-[14px] leading-relaxed">
                {era.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
