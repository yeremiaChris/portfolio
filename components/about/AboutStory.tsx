import Image from "next/image";
import { BadgeCheck, GitBranch, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

export function AboutStory() {
  return (
    <section
      aria-labelledby="about-story-heading"
      className="mb-12 grid w-full grid-cols-1 items-start gap-8 lg:mb-16 lg:grid-cols-12 lg:gap-10"
    >
      <div className="lg:col-span-5">
        <Card className="bg-muted ring-border/20 relative overflow-hidden rounded-3xl">
          <div
            className="bg-primary/10 pointer-events-none absolute -top-12 -right-12 size-32 rounded-full blur-2xl"
            aria-hidden
          />

          <CardHeader className="relative gap-4">
            <div className="flex items-center justify-between gap-3">
              <Badge
                variant="secondary"
                className="text-primary gap-2 font-mono text-[10px] tracking-widest uppercase"
              >
                <span className="bg-primary size-2.5 animate-ping rounded-full" />
                {aboutProfile.status}
              </Badge>
              <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
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
                priority
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-[#0a0e14] via-[#0a0e14]/20 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                <Badge
                  variant="secondary"
                  className="gap-1 bg-[#0a0e14]/80 font-mono text-[10px] backdrop-blur-md"
                >
                  <MapPin className="text-primary size-3" aria-hidden />
                  {aboutProfile.location}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-[#0a0e14]/80 font-mono text-[11px] text-[#4cd7f6] backdrop-blur-md"
                >
                  {aboutProfile.ageLabel}
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
                    "text-right font-mono text-[12px] font-medium",
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

      <div className="flex flex-col gap-6 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GitBranch className="size-5 text-[#4cd7f6]" aria-hidden />
            <h2
              id="about-story-heading"
              className="font-heading text-foreground text-2xl font-semibold tracking-tight"
            >
              {aboutStoryIntro.title}
            </h2>
          </div>
          <span className="text-muted-foreground font-mono text-[12px]">
            {aboutStoryIntro.meta}
          </span>
        </div>

        <ol className="flex flex-col gap-4">
          {aboutStoryEras.map((era) => (
            <li key={era.id}>
              <Card
                className={cn(
                  "bg-muted ring-border/20 hover:bg-muted/80 rounded-3xl transition-colors",
                  era.current && "ring-primary/30",
                )}
              >
                <CardHeader className="gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "gap-1.5 font-mono text-[10px] tracking-widest uppercase",
                        aboutStoryToneClass[era.tone],
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          aboutStoryDotClass[era.tone],
                          era.current && "animate-ping",
                        )}
                      />
                      {era.label}
                    </Badge>
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-wider uppercase",
                        era.current ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {era.period}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-lg font-semibold tracking-tight">
                    <h3>{era.title}</h3>
                  </CardTitle>
                  <CardDescription className="text-[14px] leading-relaxed">
                    {era.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
