"use client";

import { m, useReducedMotion, useScroll } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  AboutStoryHeroLayout,
  JourneyTimelineRow,
} from "@/components/about/story/AboutStoryHeroLayout";
import { ScrollProgressRail } from "@/components/motion/ScrollProgressRail";
import { aboutStoryEras } from "@/lib/about";
import type { AboutStoryEra } from "@/lib/about";
import {
  ABOUT_HERO_ENTRANCE_BASE_DELAY_S,
  ABOUT_HERO_ENTRANCE_STAGGER_S,
  aboutHeroEntranceSpring,
} from "@/lib/scroll-motion";

type TrackBounds = { top: number; height: number };

const HERO_METRIC_START = 4;
const HERO_INTENT_ORDER = HERO_METRIC_START + 3;
const HERO_JOURNEY_HEADER_ORDER = HERO_INTENT_ORDER + 1;
const HERO_JOURNEY_ITEM_START = HERO_JOURNEY_HEADER_ORDER + 1;

export function AboutStoryMotion() {
  const reducedMotion = useReducedMotion();
  const [run, setRun] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackBounds, setTrackBounds] = useState<TrackBounds>({
    top: 0,
    height: 0,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const frame = requestAnimationFrame(() => setRun(true));
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  const measureTrack = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const list = section.querySelector("[data-journey-list]");
    if (!list) return;
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
    const list = section.querySelector("[data-journey-list]");
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

  const wrapEntrance = useCallback(
    (node: ReactNode, order: number) => {
      if (reducedMotion) {
        return node;
      }
      const delay =
        ABOUT_HERO_ENTRANCE_BASE_DELAY_S +
        order * ABOUT_HERO_ENTRANCE_STAGGER_S;
      return (
        <m.div
          initial={false}
          style={{ opacity: 1 }}
          animate={
            run
              ? { opacity: 1, translateY: [10, 0] }
              : { opacity: 1, translateY: 0 }
          }
          transition={{ ...aboutHeroEntranceSpring, delay }}
        >
          {node}
        </m.div>
      );
    },
    [reducedMotion, run],
  );

  const journeyRail = reducedMotion ? (
    <div
      className="border-brand-accent/35 pointer-events-none absolute top-2 bottom-2 left-3 hidden w-px border-l-2 lg:block"
      aria-hidden
    />
  ) : (
    <div
      ref={trackRef}
      className="pointer-events-none absolute left-2 hidden w-5 lg:block"
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
  );

  return (
    <div ref={sectionRef}>
      <AboutStoryHeroLayout
        profileSlot={(node) => wrapEntrance(node, 3)}
        metricSlot={(node, index) =>
          wrapEntrance(node, HERO_METRIC_START + index)
        }
        intentSlot={(node) => wrapEntrance(node, HERO_INTENT_ORDER)}
        journeyHeaderSlot={(node) =>
          wrapEntrance(node, HERO_JOURNEY_HEADER_ORDER)
        }
        journeyRail={journeyRail}
        journeyItemSlot={(era, index) => (
          <JourneyTimelineMotionRow
            key={era.id}
            era={era}
            order={HERO_JOURNEY_ITEM_START + index}
            reducedMotion={!!reducedMotion}
            run={run}
            active={activeIndex === index}
            onActive={() => setActiveIndex(index)}
          />
        )}
      />
    </div>
  );
}

function JourneyTimelineMotionRow({
  era,
  order,
  reducedMotion,
  run,
  active,
  onActive,
}: {
  era: AboutStoryEra;
  order: number;
  reducedMotion: boolean;
  run: boolean;
  active: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onActive();
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [onActive]);

  if (reducedMotion) {
    return (
      <li ref={ref} className="list-none">
        <JourneyTimelineRow era={era} active={active} />
      </li>
    );
  }

  const delay =
    ABOUT_HERO_ENTRANCE_BASE_DELAY_S + order * ABOUT_HERO_ENTRANCE_STAGGER_S;

  return (
    <m.li
      ref={ref}
      className="list-none"
      initial={false}
      style={{ opacity: 1 }}
      animate={
        run
          ? { opacity: 1, translateY: [10, 0] }
          : { opacity: 1, translateY: 0 }
      }
      transition={{ ...aboutHeroEntranceSpring, delay }}
    >
      <JourneyTimelineRow era={era} active={active} />
    </m.li>
  );
}
