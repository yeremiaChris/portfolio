"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";

import { AboutEntrance } from "@/components/about/AboutEntrance";
import {
  aboutPageSectionClass,
  aboutSectionEyebrowClass,
  aboutSectionLeadClass,
  aboutSectionTitleClass,
} from "@/components/about/aboutSectionStyles";
import { useAboutPageEntrance } from "@/components/about/useAboutPageEntrance";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  aboutIntro,
  aboutProfile,
  aboutProfileMetricToneClass,
  aboutProfileMetrics,
} from "@/lib/about";
import { cn } from "@/lib/utils";

export function AboutHeroSection() {
  const { run, reducedMotion } = useAboutPageEntrance();

  return (
    <section className={cn(aboutPageSectionClass, "relative pb-4 md:pb-6")}>
      <div
        className="from-primary/10 via-primary/5 pointer-events-none absolute top-0 left-1/2 -z-10 h-80 w-[min(100%,54rem)] -translate-x-1/2 bg-linear-to-b to-transparent blur-3xl"
        aria-hidden
      />

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <AboutEntrance
          run={run}
          reducedMotion={reducedMotion}
          order={1}
          className="relative w-full min-w-0 lg:col-span-5"
        >
          <div className="ring-border/40 relative aspect-4/5 min-h-[18rem] w-full overflow-hidden rounded-2xl bg-[#0a0e14] ring-1 sm:min-h-[22rem] lg:min-h-[28rem]">
            <Image
              src={aboutProfile.image}
              alt={aboutProfile.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover object-top"
            />
          </div>
        </AboutEntrance>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl min-w-0">
              <AboutEntrance run={run} reducedMotion={reducedMotion} order={0}>
                <p className={aboutSectionEyebrowClass}>{aboutIntro.eyebrow}</p>
              </AboutEntrance>
              <AboutEntrance run={run} reducedMotion={reducedMotion} order={2}>
                <h1
                  className={cn(aboutSectionTitleClass, "text-3xl sm:text-4xl")}
                >
                  {aboutIntro.title}
                </h1>
              </AboutEntrance>
            </div>
            <AboutEntrance
              run={run}
              reducedMotion={reducedMotion}
              order={3}
              className="shrink-0"
            >
              <Link
                href="/#contact"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "h-11 w-full gap-2 px-6 text-[14px] font-medium sm:w-auto",
                )}
              >
                <MessageCircle className="text-primary size-4" aria-hidden />
                {aboutIntro.chatLabel}
              </Link>
            </AboutEntrance>
          </div>

          <AboutEntrance run={run} reducedMotion={reducedMotion} order={4}>
            <p className={cn(aboutSectionLeadClass, "mt-0 max-w-none")}>
              {aboutIntro.description}
            </p>
          </AboutEntrance>

          <AboutEntrance run={run} reducedMotion={reducedMotion} order={5}>
            <div className="text-foreground flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-relaxed">
              <span className="text-primary font-medium">
                {aboutProfile.status}
              </span>
              <span className="text-muted-foreground" aria-hidden>
                ·
              </span>
              <span className="text-muted-foreground inline-flex items-center gap-1.5">
                <MapPin
                  className="text-brand-accent size-4 shrink-0"
                  aria-hidden
                />
                {aboutProfile.location}
              </span>
            </div>
            <p className="text-muted-foreground mt-3 max-w-2xl text-[15px] leading-[1.75]">
              {aboutProfile.intent}
            </p>
          </AboutEntrance>

          <AboutEntrance run={run} reducedMotion={reducedMotion} order={6}>
            <dl className="border-border/40 mt-2 space-y-4 border-t pt-6">
              {aboutProfileMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="grid gap-1 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="text-muted-foreground text-[13px] font-medium tracking-wide uppercase">
                    {metric.label}
                  </dt>
                  <dd
                    className={cn(
                      "text-[15px] leading-snug font-medium break-words",
                      aboutProfileMetricToneClass[metric.tone],
                    )}
                  >
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </AboutEntrance>
        </div>
      </div>
    </section>
  );
}
