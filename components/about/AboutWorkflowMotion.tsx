"use client";

import Link from "next/link";
import {
  Bot,
  GitMerge,
  ListChecks,
  Search,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { m, useInView, useReducedMotion, useScroll } from "motion/react";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { WorkflowStepVisual } from "@/components/about/workflow/WorkflowStepVisual";
import { ScrollProgressRail } from "@/components/motion/ScrollProgressRail";
import { Badge } from "@/components/ui/badge";
import {
  aboutStoryToneClass,
  aboutWorkflowClosing,
  aboutWorkflowExample,
  aboutWorkflowIntro,
  aboutWorkflowSplit,
  aboutWorkflowSteps,
  aboutWorkflowToolGroups,
  type AboutWorkflowStep,
  type AboutWorkflowToolGroup,
  type AboutWorkflowToolItem,
} from "@/lib/about";
import {
  aboutWorkflowSplitPairs,
  aboutWorkflowToolActiveSteps,
} from "@/lib/about-workflow-map";
import {
  projectSurfaceHairlineClass,
  projectSurfacePanelClass,
} from "@/components/projects/projectSurface";
import { aboutStaggerTransition } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const STEP_ICONS: Record<AboutWorkflowStep["icon"], LucideIcon> = {
  plan: Search,
  ticket: Ticket,
  agent: Bot,
  review: ListChecks,
  ship: GitMerge,
};

type TrackBounds = { top: number; height: number };

export function AboutWorkflowMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [trackBounds, setTrackBounds] = useState<TrackBounds>({
    top: 0,
    height: 0,
  });
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const measureTrack = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const list = section.querySelector("[data-workflow-steps]");
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
    const list = section.querySelector("[data-workflow-steps]");
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

  const handleStepVisible = useCallback((index: number) => {
    setActiveStepIndex(index);
  }, []);

  const activeStepId = aboutWorkflowSteps[activeStepIndex]?.id;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-workflow-heading"
      className="mb-8 w-full min-w-0 md:mb-12"
    >
      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="mb-8 min-w-0 lg:sticky lg:top-24 lg:col-span-4 lg:mb-0 lg:self-start">
          <div className="mb-6 max-w-2xl">
            <p className="text-muted-foreground label-caps tracking-widest">
              {aboutWorkflowIntro.eyebrow}
            </p>
            <h2
              id="about-workflow-heading"
              className="font-heading text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {aboutWorkflowIntro.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
              {aboutWorkflowIntro.description}
            </p>
          </div>

          <ToolsPanel
            groups={aboutWorkflowToolGroups}
            activeStepId={activeStepId}
            reducedMotion={!!reducedMotion}
          />
        </div>

        <div className="relative min-w-0 lg:col-span-8">
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
              activeIndex={activeStepIndex}
              segmentCount={aboutWorkflowSteps.length}
            />
          </div>
          <div
            data-workflow-steps
            className="flex flex-col gap-10 pl-0 lg:gap-14 lg:pl-5"
          >
            {aboutWorkflowSteps.map((step, index) => (
              <WorkflowStepArticle
                key={step.id}
                step={step}
                index={index}
                active={activeStepIndex === index}
                onVisible={handleStepVisible}
                reducedMotion={!!reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>

      <AboutWorkflowSplitSection />
      <AboutWorkflowQuote />
      <p className="text-muted-foreground mt-6 block max-w-2xl text-[15px] leading-relaxed">
        {aboutWorkflowClosing}
      </p>
    </section>
  );
}

function ToolsPanel({
  groups,
  activeStepId,
  reducedMotion,
}: {
  groups: AboutWorkflowToolGroup[];
  activeStepId: string | undefined;
  reducedMotion: boolean;
}) {
  return (
    <div className={cn(projectSurfacePanelClass, "w-full min-w-0 p-4 sm:p-5")}>
      <div className={projectSurfaceHairlineClass} />
      <ul className="flex flex-col gap-3">
        {groups.map((group) => {
          const lit =
            activeStepId &&
            (aboutWorkflowToolActiveSteps[activeStepId] ?? []).includes(
              group.id,
            );
          return (
            <li key={group.id}>
              <m.div
                className={cn(
                  "rounded-xl px-3 py-2.5 ring-1 transition-[box-shadow,ring-color] duration-200 motion-reduce:transition-none",
                  lit
                    ? "bg-brand-accent/8 ring-brand-accent/35 shadow-[0_0_20px_rgb(76_215_246_/_0.12)]"
                    : "bg-secondary/40 ring-border/25",
                )}
                initial={false}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: lit ? 1 : 0.72,
                      }
                }
                transition={aboutStaggerTransition}
              >
                <p
                  className={cn(
                    "label-caps mb-1.5 text-[11px] tracking-widest",
                    lit ? "text-brand-accent" : "text-muted-foreground",
                  )}
                >
                  {group.label}
                </p>
                <ul className="text-foreground flex flex-wrap gap-x-2 gap-y-1 text-[13px] font-medium">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <ToolChip item={item} lit={!!lit} />
                    </li>
                  ))}
                </ul>
              </m.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ToolChip({
  item,
  lit,
}: {
  item: AboutWorkflowToolItem;
  lit: boolean;
}) {
  const className = cn(
    "inline-block rounded-md px-1.5 py-0.5 transition-colors duration-200 motion-reduce:transition-none",
    lit ? "text-brand-accent" : "text-foreground",
    item.href &&
      "hover:text-brand-accent/80 underline-offset-4 hover:underline",
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.label}
      </Link>
    );
  }

  return <span className={className}>{item.label}</span>;
}

function WorkflowStepArticle({
  step,
  index,
  active,
  onVisible,
  reducedMotion,
}: {
  step: AboutWorkflowStep;
  index: number;
  active: boolean;
  onVisible: (index: number) => void;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    amount: 0.45,
    margin: "0px 0px -12% 0px",
  });

  useLayoutEffect(() => {
    if (inView) {
      onVisible(index);
    }
  }, [inView, index, onVisible]);

  const Icon = STEP_ICONS[step.icon];
  const toneClass = aboutStoryToneClass[step.tone];

  return (
    <article ref={ref} className="min-w-0 scroll-mt-24">
      <m.div
        className={cn(
          projectSurfacePanelClass,
          "min-w-0 p-5 sm:p-6",
          active && "ring-brand-accent/25",
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
        transition={aboutStaggerTransition}
      >
        <div className={projectSurfaceHairlineClass} />
        <div className="mb-4 flex items-center justify-between gap-2">
          <div
            className={cn(
              "bg-secondary flex size-10 items-center justify-center rounded-lg",
              active ? "text-brand-accent" : toneClass,
            )}
          >
            <Icon className="size-5" aria-hidden />
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "text-xs tracking-widest",
              active ? "text-brand-accent" : toneClass,
            )}
          >
            {step.step}
          </Badge>
        </div>
        <WorkflowStepVisual stepId={step.id} active={active} />
        <h3 className="font-heading text-foreground text-lg font-semibold tracking-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground mt-2 text-[14px] leading-relaxed">
          {step.description}
        </p>
        <p
          className={cn(
            "mt-3 text-[12px]",
            active ? "text-brand-accent" : toneClass,
          )}
        >
          {step.footer}
        </p>
      </m.div>
    </article>
  );
}

function AboutWorkflowSplitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const [hoveredPair, setHoveredPair] = useState<number | null>(null);

  const aiItems = aboutWorkflowSplit.ai.items;
  const meItems = aboutWorkflowSplit.me.items;

  return (
    <div ref={sectionRef} className="mt-12 min-w-0 md:mt-16">
      <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] md:items-stretch md:gap-4">
        <SplitColumn
          title={aboutWorkflowSplit.ai.title}
          items={aiItems}
          tone="accent"
          pairs={aboutWorkflowSplitPairs}
          side="ai"
          hoveredPair={hoveredPair}
          scrollLit={inView && !reducedMotion}
          onHoverPair={setHoveredPair}
          reducedMotion={!!reducedMotion}
        />
        <div className="relative hidden min-h-[12rem] md:block" aria-hidden>
          {aboutWorkflowSplitPairs.map((pair, pairIndex) => {
            const lit =
              !reducedMotion &&
              (hoveredPair === pairIndex ||
                (hoveredPair === null && inView && pairIndex === 0));
            const topAi = splitListOffsetPercent(pair.aiIndex, aiItems.length);
            const topMe = splitListOffsetPercent(pair.meIndex, meItems.length);
            return (
              <m.span
                key={`${pair.aiIndex}-${pair.meIndex}`}
                className="bg-brand-accent/70 absolute right-0 left-0 h-px origin-center shadow-[0_0_10px_rgb(76_215_246_/_0.45)]"
                style={{
                  top: `calc(4.5rem + (${topAi}% + ${topMe}%) / 2 * 0.55)`,
                }}
                initial={false}
                animate={{ opacity: lit ? 0.9 : 0.12 }}
                transition={aboutStaggerTransition}
              />
            );
          })}
        </div>
        <SplitColumn
          title={aboutWorkflowSplit.me.title}
          items={meItems}
          tone="primary"
          pairs={aboutWorkflowSplitPairs}
          side="me"
          hoveredPair={hoveredPair}
          scrollLit={inView && !reducedMotion}
          onHoverPair={setHoveredPair}
          reducedMotion={!!reducedMotion}
        />
      </div>
    </div>
  );
}

function splitListOffsetPercent(index: number, count: number) {
  if (count <= 1) return 50;
  return (index / (count - 1)) * 100;
}

function SplitColumn({
  title,
  items,
  tone,
  pairs,
  side,
  hoveredPair,
  scrollLit,
  onHoverPair,
  reducedMotion,
}: {
  title: string;
  items: readonly string[];
  tone: "accent" | "primary";
  pairs: typeof aboutWorkflowSplitPairs;
  side: "ai" | "me";
  hoveredPair: number | null;
  scrollLit: boolean;
  onHoverPair: (index: number | null) => void;
  reducedMotion: boolean;
}) {
  const toneClass = aboutStoryToneClass[tone];

  return (
    <SplitCardShell toneClass={toneClass} title={title}>
      <ul className="text-muted-foreground space-y-2 text-[14px] leading-relaxed">
        {items.map((item, index) => {
          const pairIndices = pairs
            .map((p, i) =>
              side === "ai"
                ? p.aiIndex === index
                  ? i
                  : -1
                : p.meIndex === index
                  ? i
                  : -1,
            )
            .filter((i) => i >= 0);
          const lit =
            scrollLit &&
            (hoveredPair === null
              ? pairIndices.includes(0)
              : pairIndices.includes(hoveredPair));

          return (
            <li key={item}>
              <m.button
                type="button"
                className={cn(
                  "flex w-full gap-2 rounded-lg px-2 py-1.5 text-left transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none",
                  lit &&
                    "bg-brand-accent/8 shadow-[0_0_16px_rgb(76_215_246_/_0.1)]",
                )}
                initial={false}
                animate={
                  reducedMotion ? undefined : { opacity: lit ? 1 : 0.85 }
                }
                transition={aboutStaggerTransition}
                onMouseEnter={() => {
                  if (pairIndices[0] !== undefined) {
                    onHoverPair(pairIndices[0]);
                  }
                }}
                onMouseLeave={() => onHoverPair(null)}
                onFocus={() => {
                  if (pairIndices[0] !== undefined) {
                    onHoverPair(pairIndices[0]);
                  }
                }}
                onBlur={() => onHoverPair(null)}
              >
                <span
                  className={cn(
                    "mt-2 size-1.5 shrink-0 rounded-full",
                    lit
                      ? "bg-brand-accent"
                      : tone === "accent"
                        ? "bg-brand-accent/50"
                        : "bg-primary/50",
                  )}
                  aria-hidden
                />
                <span className={lit ? "text-foreground" : undefined}>
                  {item}
                </span>
              </m.button>
            </li>
          );
        })}
      </ul>
    </SplitCardShell>
  );
}

function SplitCardShell({
  toneClass,
  title,
  children,
}: {
  toneClass: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <SplitRevealPanel className={cn(projectSurfacePanelClass, "p-5 sm:p-6")}>
      <div className={projectSurfaceHairlineClass} />
      <h3
        className={cn(
          "font-heading mb-3 text-lg font-semibold tracking-tight",
          toneClass,
        )}
      >
        {title}
      </h3>
      {children}
    </SplitRevealPanel>
  );
}

function SplitRevealPanel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        reducedMotion
          ? { opacity: 1, translateY: 0 }
          : {
              opacity: inView ? 1 : 0.9,
              translateY: inView ? 0 : 10,
            }
      }
      transition={aboutStaggerTransition}
    >
      {children}
    </m.div>
  );
}

function AboutWorkflowQuote() {
  const text = `${aboutWorkflowExample.beforeLink}${aboutWorkflowExample.linkLabel}${aboutWorkflowExample.afterLink}`;
  const words = text.split(/(\s+)/);
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLQuoteElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <m.blockquote
      ref={ref}
      className={cn(
        projectSurfacePanelClass,
        "border-brand-accent/30 mt-8 max-w-3xl border-l-2 px-5 py-4",
      )}
    >
      <div className={projectSurfaceHairlineClass} />
      <p className="text-foreground text-[15px] leading-relaxed">
        {words.map((segment, index) => {
          if (/^\s+$/.test(segment)) {
            return <span key={`ws-${index}`}>{segment}</span>;
          }
          const isLink = segment === aboutWorkflowExample.linkLabel;
          const delay = reducedMotion ? 0 : index * 0.03;
          const content = isLink ? (
            <Link
              href={aboutWorkflowExample.linkHref}
              className="text-foreground decoration-brand-accent hover:text-brand-accent font-medium underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none"
            >
              {aboutWorkflowExample.linkLabel}
            </Link>
          ) : (
            segment
          );

          return (
            <m.span
              key={`w-${index}-${segment}`}
              className="inline"
              initial={false}
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: inView ? 1 : 0.55,
                    }
              }
              transition={{ ...aboutStaggerTransition, delay }}
            >
              {content}
            </m.span>
          );
        })}
      </p>
    </m.blockquote>
  );
}
