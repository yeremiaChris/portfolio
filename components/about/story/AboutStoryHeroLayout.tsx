import Image from "next/image";
import { BadgeCheck, GitBranch, MapPin } from "lucide-react";
import type { ReactNode } from "react";

import {
  aboutSurfaceCardClass,
  projectSurfaceHairlineClass,
} from "@/components/about/aboutSurface";
import { aboutStoryHeroContent } from "@/components/about/story/aboutStoryHero";
import { Badge } from "@/components/ui/badge";
import {
  aboutProfileMetricToneClass,
  aboutStoryDotClass,
  aboutStoryToneClass,
  type AboutStoryEra,
} from "@/lib/about";
import { cn } from "@/lib/utils";

type AboutStoryHeroLayoutProps = {
  profileSlot?: (node: ReactNode) => ReactNode;
  metricSlot?: (node: ReactNode, index: number) => ReactNode;
  intentSlot?: (node: ReactNode) => ReactNode;
  journeyHeaderSlot?: (node: ReactNode) => ReactNode;
  journeyItemSlot?: (era: AboutStoryEra, index: number) => ReactNode;
  journeyRail?: ReactNode;
};

export function AboutStoryHeroLayout({
  profileSlot = (n) => n,
  metricSlot = (n) => n,
  intentSlot = (n) => n,
  journeyHeaderSlot = (n) => n,
  journeyItemSlot = (era) => (
    <li key={era.id} className="list-none">
      <JourneyTimelineRow era={era} />
    </li>
  ),
  journeyRail,
}: AboutStoryHeroLayoutProps) {
  const { profile, metrics, journeyIntro, eras } = aboutStoryHeroContent;

  const photoCard = (
    <div
      className={cn(
        aboutSurfaceCardClass,
        "relative overflow-hidden p-0 lg:col-span-5 lg:row-span-1",
      )}
    >
      <div className={projectSurfaceHairlineClass} />
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="text-primary label-caps gap-2 tracking-widest"
          >
            <span className="bg-status-available size-2.5 shrink-0 rounded-full" />
            {profile.status}
          </Badge>
          <span className="text-muted-foreground label-caps tracking-wider">
            {profile.nodeId}
          </span>
        </div>
        <div className="ring-border/40 relative aspect-5/4 max-h-[min(20rem,42vw)] overflow-hidden rounded-2xl bg-[#0a0e14] ring-1">
          <Image
            src={profile.image}
            alt={profile.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 32vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-x-3 bottom-3">
            <Badge
              variant="secondary"
              className="gap-1 bg-[#0a0e14]/80 text-xs backdrop-blur-md"
            >
              <MapPin className="text-primary size-3" aria-hidden />
              {profile.location}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      aria-labelledby="about-story-heading"
      className="mb-8 w-full min-w-0 lg:mb-10"
    >
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-start">
        {profileSlot(photoCard)}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
          {metrics.map((metric, index) =>
            metricSlot(
              <div
                key={metric.label}
                className={cn(
                  aboutSurfaceCardClass,
                  "flex flex-col gap-2 py-4",
                )}
              >
                <SurfaceHairline />
                <span className="text-muted-foreground text-[12px] font-medium tracking-wide uppercase">
                  {metric.label}
                </span>
                <span
                  className={cn(
                    "text-[13px] leading-snug font-medium break-words",
                    aboutProfileMetricToneClass[metric.tone],
                  )}
                >
                  {metric.value}
                </span>
              </div>,
              index,
            ),
          )}
          {intentSlot(
            <div
              className={cn(
                aboutSurfaceCardClass,
                "sm:col-span-3 lg:col-span-1",
              )}
            >
              <SurfaceHairline />
              <div className="flex items-start gap-2.5">
                <BadgeCheck
                  className="text-primary mt-0.5 size-5 shrink-0"
                  aria-hidden
                />
                <p className="text-foreground text-[13px] leading-relaxed">
                  {profile.intent}
                </p>
              </div>
            </div>,
          )}
        </div>

        <div className="relative flex min-w-0 flex-col gap-4 lg:col-span-7 lg:col-start-6 lg:row-span-3 lg:row-start-1">
          {journeyHeaderSlot(
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <GitBranch
                  className="text-brand-accent size-5 shrink-0"
                  aria-hidden
                />
                <h2
                  id="about-story-heading"
                  className="font-heading text-foreground text-2xl font-semibold tracking-tight"
                >
                  {journeyIntro.title}
                </h2>
              </div>
              <span className="text-muted-foreground text-[12px]">
                {journeyIntro.meta}
              </span>
            </div>,
          )}

          <div className="relative min-w-0">
            {journeyRail}
            <ul
              data-journey-list
              className="relative flex flex-col gap-1 pl-0 lg:pl-10"
            >
              {eras.map((era, index) => journeyItemSlot(era, index))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SurfaceHairline() {
  return <div className={projectSurfaceHairlineClass} />;
}

export function JourneyTimelineRow({
  era,
  active,
}: {
  era: AboutStoryEra;
  active?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative grid min-w-0 scroll-mt-24 grid-cols-1 gap-2 rounded-2xl px-3 py-4 transition-colors duration-200 motion-reduce:transition-none sm:px-4 lg:grid-cols-[8.25rem_minmax(0,1fr)] lg:gap-5 lg:px-2",
        active
          ? "bg-brand-accent/8 ring-brand-accent/20 ring-1"
          : "hover:bg-secondary/45",
        era.current && !active && "bg-primary/5",
      )}
    >
      <div className="hidden lg:absolute lg:top-[1.35rem] lg:-left-[1.65rem] lg:block">
        <span
          className={cn(
            "ring-background block size-2.5 rounded-full ring-2",
            active ? "bg-brand-accent" : aboutStoryDotClass[era.tone],
            active ? "shadow-[0_0_12px_rgb(76_215_246_/_0.45)]" : "",
          )}
          aria-hidden
        />
      </div>
      <header className="min-w-0 lg:text-right">
        <p
          className={cn(
            "text-[12px] font-semibold tracking-wide break-words",
            aboutStoryToneClass[era.tone],
          )}
        >
          {era.label}
        </p>
        <p
          className={cn(
            "text-muted-foreground mt-1 text-[12px] leading-snug break-words",
            era.current && "text-primary",
          )}
        >
          {era.period}
        </p>
      </header>
      <div className="min-w-0">
        <h3 className="font-heading text-foreground text-lg font-semibold tracking-tight">
          {era.title}
        </h3>
        <p className="text-muted-foreground mt-2 text-[14px] leading-relaxed break-words">
          {era.body}
        </p>
      </div>
    </article>
  );
}
