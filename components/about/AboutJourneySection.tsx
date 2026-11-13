"use client";

import { GitBranch } from "lucide-react";
import { m, useInView, useScroll } from "motion/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { AboutEntrance } from "@/components/about/AboutEntrance";
import {
  aboutPageSectionClass,
  aboutSectionSpacingClass,
  aboutSectionTitleClass,
} from "@/components/about/aboutSectionStyles";
import { useAboutPageEntrance } from "@/components/about/useAboutPageEntrance";
import { ScrollProgressRail } from "@/components/motion/ScrollProgressRail";
import {
  aboutStoryDotClass,
  aboutStoryEras,
  aboutStoryIntro,
  aboutStoryToneClass,
  type AboutStoryEra,
} from "@/lib/about";
import { aboutHeroEntranceSpring } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

type TrackBounds = { top: number; height: number };

export function AboutJourneySection() {
  const { run, reducedMotion } = useAboutPageEntrance();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const railBoxRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackBounds, setTrackBounds] = useState<TrackBounds>({
    top: 0,
    height: 0,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const measureTrack = useCallback(() => {
    const list = listRef.current;
    const section = sectionRef.current;
    if (!list || !section) return;
    const items = list.querySelectorAll(":scope > li");
    const first = items[0];
    const last = items[items.length - 1];
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
    const list = listRef.current;
    if (list) {
      observer.observe(list);
      list
        .querySelectorAll(":scope > li")
        .forEach((item) => observer.observe(item));
    }
    const onResize = () => requestAnimationFrame(measureTrack);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measureTrack]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-story-heading"
      className={cn(aboutPageSectionClass, aboutSectionSpacingClass)}
    >
      <AboutEntrance run={run} reducedMotion={reducedMotion} order={7}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div className="flex min-w-0 items-center gap-2.5">
            <GitBranch
              className="text-brand-accent size-5 shrink-0"
              aria-hidden
            />
            <h2
              id="about-story-heading"
              className={cn(aboutSectionTitleClass, "mt-0")}
            >
              {aboutStoryIntro.title}
            </h2>
          </div>
          <p className="text-muted-foreground text-[14px]">
            {aboutStoryIntro.meta}
          </p>
        </div>
      </AboutEntrance>

      <div className="relative w-full min-w-0">
        {reducedMotion ? (
          <div
            className="border-brand-accent/35 pointer-events-none absolute top-2 bottom-2 left-[0.4rem] w-px border-l-2"
            aria-hidden
          />
        ) : (
          <div
            ref={railBoxRef}
            className="pointer-events-none absolute left-0 hidden w-5 sm:block"
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
        )}

        <ul ref={listRef} className="flex flex-col gap-2 pl-0 sm:pl-10">
          {aboutStoryEras.map((era, index) => (
            <JourneyRow
              key={era.id}
              era={era}
              index={index}
              run={run}
              reducedMotion={reducedMotion}
              entranceOrder={8 + index}
              active={activeIndex === index}
              onActive={() => setActiveIndex(index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function JourneyRow({
  era,
  index,
  run,
  reducedMotion,
  entranceOrder,
  active,
  onActive,
}: {
  era: AboutStoryEra;
  index: number;
  run: boolean;
  reducedMotion: boolean;
  entranceOrder: number;
  active: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  useLayoutEffect(() => {
    if (inView) {
      onActive();
    }
  }, [inView, onActive]);

  const content = <JourneyArticle era={era} active={active} />;

  if (reducedMotion) {
    return (
      <li ref={ref} className="list-none">
        {content}
      </li>
    );
  }

  const delay = 0.05 + entranceOrder * 0.04;

  return (
    <m.li
      ref={ref}
      className="list-none"
      initial={false}
      style={{ opacity: 1 }}
      animate={
        inView && run
          ? { opacity: 1, translateY: [10, 0] }
          : { opacity: 1, translateY: 0 }
      }
      transition={{
        ...aboutHeroEntranceSpring,
        delay: inView ? index * 0.06 : delay,
      }}
    >
      {content}
    </m.li>
  );
}

function JourneyArticle({
  era,
  active,
}: {
  era: AboutStoryEra;
  active: boolean;
}) {
  return (
    <article
      className={cn(
        "group rounded-2xl px-3 py-5 transition-colors duration-200 motion-reduce:transition-none sm:px-4 sm:py-6",
        active
          ? "bg-brand-accent/8 ring-brand-accent/25 ring-1"
          : "hover:bg-secondary/40",
        era.current && !active && "bg-primary/5",
      )}
    >
      <header className="mb-2 space-y-1">
        <p
          className={cn(
            "text-[13px] font-semibold tracking-wide sm:text-sm",
            aboutStoryToneClass[era.tone],
          )}
        >
          {era.label}
        </p>
        <p
          className={cn(
            "text-muted-foreground text-[14px] leading-snug break-words",
            era.current && "text-primary",
          )}
        >
          {era.period}
        </p>
      </header>
      <h3 className="font-heading text-foreground text-xl font-semibold tracking-tight sm:text-[1.35rem]">
        {era.title}
      </h3>
      <p className="text-muted-foreground mt-3 text-[15px] leading-[1.75] break-words">
        {era.body}
      </p>
      <span
        className={cn(
          "mt-4 inline-block size-2 rounded-full sm:hidden",
          active ? "bg-brand-accent" : aboutStoryDotClass[era.tone],
        )}
        aria-hidden
      />
    </article>
  );
}
