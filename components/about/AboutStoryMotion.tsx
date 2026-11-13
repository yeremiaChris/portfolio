"use client";

import Image from "next/image";
import { BadgeCheck, GitBranch, MapPin } from "lucide-react";
import { m, useInView, useReducedMotion, useScroll } from "motion/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { ScrollProgressRail } from "@/components/motion/ScrollProgressRail";
import {
  projectSurfaceHairlineClass,
  projectSurfacePanelClass,
} from "@/components/projects/projectSurface";
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
  type AboutStoryEra,
} from "@/lib/about";
import { aboutStaggerTransition } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

type TrackBounds = { top: number; height: number };

export function AboutStoryMotion() {
  const reducedMotion = useReducedMotion();
  const profileRef = useRef<HTMLDivElement>(null);
  const profileInView = useInView(profileRef, { once: true, amount: 0.2 });

  return (
    <section
      aria-labelledby="about-story-heading"
      className="mb-12 grid w-full min-w-0 grid-cols-1 items-start gap-8 lg:mb-16 lg:grid-cols-12 lg:gap-10"
    >
      <m.div
        ref={profileRef}
        className="min-w-0 lg:col-span-5"
        initial={false}
        animate={
          reducedMotion
            ? { opacity: 1, translateY: 0 }
            : {
                opacity: profileInView ? 1 : 0.92,
                translateY: profileInView ? 0 : 14,
              }
        }
        transition={aboutStaggerTransition}
      >
        <Card className="bg-muted ring-border/20 relative overflow-hidden rounded-3xl">
          <div
            className="bg-primary/10 pointer-events-none absolute -top-12 -right-12 size-32 rounded-full blur-2xl"
            aria-hidden
          />

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
                priority
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-[#0a0e14] via-[#0a0e14]/20 to-transparent"
                aria-hidden
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
      </m.div>

      <JourneyTimeline reducedMotion={!!reducedMotion} />
    </section>
  );
}

function JourneyTimeline({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackBounds, setTrackBounds] = useState<TrackBounds>({
    top: 0,
    height: 0,
  });
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const measureTrack = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const list = section.querySelector("[data-journey-list]");
    if (!list) return;
    const articles = list.querySelectorAll(":scope > article");
    const first = articles[0];
    const last = articles[articles.length - 1];
    if (!first || !last) return;
    const sectionRect = section.getBoundingClientRect();
    const firstRect = first.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();
    const top = firstRect.top - sectionRect.top;
    const height = lastRect.bottom - firstRect.top;
    if (height > 0) {
      setTrackBounds({ top, height });
    }
  }, []);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => measureTrack());
    const section = sectionRef.current;
    if (!section) return () => cancelAnimationFrame(frame);
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(measureTrack);
    });
    observer.observe(section);
    const list = section.querySelector("[data-journey-list]");
    if (list) {
      observer.observe(list);
      for (const article of list.querySelectorAll(":scope > article")) {
        observer.observe(article);
      }
    }
    const onResize = () => requestAnimationFrame(measureTrack);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measureTrack]);

  const handleVisible = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex min-w-0 flex-col gap-6 lg:col-span-7"
    >
      <m.div
        ref={headerRef}
        initial={false}
        animate={
          reducedMotion
            ? { opacity: 1, translateY: 0 }
            : {
                opacity: headerInView ? 1 : 0.9,
                translateY: headerInView ? 0 : 10,
              }
        }
        transition={aboutStaggerTransition}
      >
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
      </m.div>

      <div className="relative min-w-0">
        <div
          ref={trackRef}
          className="pointer-events-none absolute left-0 hidden w-5 lg:block"
          style={{
            top: trackBounds.top,
            height: Math.max(trackBounds.height, 1),
          }}
        >
          <ScrollProgressRail
            progress={scrollYProgress}
            activeIndex={activeIndex}
            segmentCount={aboutStoryEras.length}
          />
        </div>
        <div data-journey-list className="flex flex-col gap-4 pl-0 lg:pl-5">
          {aboutStoryEras.map((era, index) => (
            <JourneyEraCard
              key={era.id}
              era={era}
              index={index}
              active={activeIndex === index}
              onVisible={handleVisible}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function JourneyEraCard({
  era,
  index,
  active,
  onVisible,
  reducedMotion,
}: {
  era: AboutStoryEra;
  index: number;
  active: boolean;
  onVisible: (index: number) => void;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    amount: 0.35,
    margin: "0px 0px -8% 0px",
  });

  useLayoutEffect(() => {
    if (inView) {
      onVisible(index);
    }
  }, [inView, index, onVisible]);

  return (
    <article ref={ref} className="min-w-0 scroll-mt-24">
      <m.div
        className={cn(
          projectSurfacePanelClass,
          "min-w-0",
          era.current && "ring-primary/30",
          active && "ring-brand-accent/20",
        )}
        initial={false}
        animate={
          reducedMotion
            ? { opacity: 1, translateY: 0 }
            : {
                opacity: inView ? 1 : 0.88,
                translateY: inView ? 0 : 12,
              }
        }
        transition={{
          ...aboutStaggerTransition,
          delay: reducedMotion ? 0 : index * 0.05,
        }}
      >
        <div className={projectSurfaceHairlineClass} />
        <CardHeader className="gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge
              variant="secondary"
              className={cn(
                "label-caps gap-1.5 tracking-widest",
                aboutStoryToneClass[era.tone],
              )}
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  aboutStoryDotClass[era.tone],
                )}
              />
              {era.label}
            </Badge>
            <span
              className={cn(
                "label-caps tracking-wider",
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
      </m.div>
    </article>
  );
}
