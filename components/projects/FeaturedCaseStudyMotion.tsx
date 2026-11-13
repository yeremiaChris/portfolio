"use client";

import { ExternalLink } from "lucide-react";
import {
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

import { MagneticProjectCta } from "@/components/projects/MagneticProjectCta";
import { ProjectBrowserFrameMotion } from "@/components/projects/ProjectBrowserFrameMotion";
import {
  projectSurfaceHairlineClass,
  projectSurfacePanelClass,
} from "@/components/projects/projectSurface";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  projectsFeaturedSpring,
  projectsIndexDriftMaxPx,
  projectsStaggerTransition,
} from "@/lib/projects-motion";
import {
  featuredProjectRole,
  getProjectToolChips,
  type Project,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

const copyContainer = {
  rest: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const copyItem = {
  rest: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...projectsStaggerTransition,
      from: { opacity: 1, y: 14 },
    },
  },
};

type FeaturedCaseStudyMotionProps = {
  project: Project;
  index: number;
  reverse?: boolean;
  onVisible?: (index: number) => void;
};

export function FeaturedCaseStudyMotion({
  project,
  index,
  reverse = false,
  onVisible,
}: FeaturedCaseStudyMotionProps) {
  const reducedMotion = useReducedMotion();
  const articleRef = useRef<HTMLElement>(null);
  const inView = useInView(articleRef, {
    amount: 0.42,
    margin: "0px 0px -8% 0px",
  });
  const toolChips = getProjectToolChips(project.tools, true);
  const tagline = project.tagline ?? project.summary;
  const highlights = project.highlights ?? [];
  const indexLabel = String(index + 1).padStart(2, "0");
  const revealFrom = reverse ? "right" : "left";

  useEffect(() => {
    if (inView) {
      onVisible?.(index);
    }
  }, [inView, index, onVisible]);

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start end", "end start"],
  });

  const driftY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [projectsIndexDriftMaxPx, -projectsIndexDriftMaxPx],
    ),
    projectsFeaturedSpring,
  );

  return (
    <article
      ref={articleRef}
      id={project.id}
      data-defer-shot-frame={index > 0 ? "" : undefined}
      className={cn(
        "flex w-full min-w-0 scroll-mt-24 flex-col gap-8 md:gap-10 lg:gap-12",
        index > 0 &&
          "[contain-intrinsic-size:auto_640px] [content-visibility:auto]",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-8 md:items-center md:gap-10 lg:gap-14",
          reverse ? "md:flex-row-reverse" : "md:flex-row",
        )}
      >
        <div className="order-1 w-full min-w-0 md:order-none md:flex-1">
          <ProjectBrowserFrameMotion
            src={project.image}
            alt={project.imageAlt}
            revealFrom={revealFrom}
            revealFromStart={index === 0}
            deferMobileSrc
          />
        </div>

        <m.div
          className={cn(
            "order-2 w-full min-w-0 md:order-none md:max-w-md md:flex-1 lg:max-w-lg",
            projectSurfacePanelClass,
            "relative flex flex-col px-6 py-7 sm:px-8 sm:py-8",
          )}
          initial={false}
          variants={copyContainer}
          animate="rest"
          whileInView={reducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className={projectSurfaceHairlineClass} aria-hidden />
          <m.p
            className="text-brand-accent/25 font-heading mb-3 text-5xl font-bold tracking-tighter tabular-nums sm:text-6xl"
            aria-hidden
            initial={false}
            style={{ opacity: 1, y: reducedMotion ? 0 : driftY }}
          >
            {indexLabel}
          </m.p>
          <m.div
            className="flex min-w-0 flex-wrap items-start justify-between gap-2"
            variants={copyItem}
            initial={false}
            style={{ opacity: 1 }}
          >
            <h2 className="font-heading text-foreground min-w-0 text-2xl font-semibold tracking-tight text-balance sm:text-[1.65rem]">
              {project.title}
            </h2>
            {project.domain ? (
              <Badge
                variant="secondary"
                className="text-brand-accent shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
              >
                {project.domain}
              </Badge>
            ) : null}
          </m.div>
          <m.div
            className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]"
            variants={copyItem}
            initial={false}
            style={{ opacity: 1 }}
          >
            <dl className="contents">
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Role</dt>
                <dd>{featuredProjectRole}</dd>
              </div>
              <span className="text-border" aria-hidden>
                ·
              </span>
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Years</dt>
                <dd className="tabular-nums">{project.year}</dd>
              </div>
            </dl>
          </m.div>

          <m.p
            className="text-foreground mt-5 text-[15px] leading-snug font-medium"
            variants={copyItem}
            initial={false}
            style={{ opacity: 1 }}
          >
            {tagline}
          </m.p>

          {highlights.length > 0 ? (
            <m.div
              className="mt-5"
              variants={copyItem}
              initial={false}
              style={{ opacity: 1 }}
            >
              <p className="text-foreground/75 mb-2 text-xs font-medium tracking-wide uppercase">
                What I did
              </p>
              <ul className="text-muted-foreground list-none space-y-2 text-[13px] leading-snug">
                {highlights.map((item) => (
                  <m.li
                    key={item}
                    className="flex gap-2"
                    variants={copyItem}
                    initial={false}
                    style={{ opacity: 1 }}
                  >
                    <span
                      className="bg-brand-accent mt-1.5 size-1.5 shrink-0 rounded-full"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </m.li>
                ))}
              </ul>
            </m.div>
          ) : null}

          <m.div
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            variants={copyItem}
            initial={false}
            style={{ opacity: 1 }}
          >
            <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
              {toolChips.map((tool) => (
                <m.span
                  key={tool}
                  variants={copyItem}
                  initial={false}
                  style={{ opacity: 1 }}
                  className="inline-flex"
                >
                  <Badge
                    variant="secondary"
                    className="max-w-full rounded-md px-2 py-0.5 text-[11px] font-medium"
                  >
                    {tool}
                  </Badge>
                </m.span>
              ))}
            </div>
            {project.href && project.ctaLabel ? (
              <MagneticProjectCta>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({
                      variant:
                        project.ctaLabel === "Webview" ? "link" : "outline",
                      size: "sm",
                    }),
                    "border-border/60 text-foreground/90 hover:border-brand-accent/45 hover:text-brand-accent h-8 shrink-0 gap-1.5",
                  )}
                >
                  {project.ctaLabel}
                  {project.ctaLabel === "Open Site" ? (
                    <ExternalLink className="size-3.5" aria-hidden />
                  ) : null}
                </a>
              </MagneticProjectCta>
            ) : null}
          </m.div>
        </m.div>
      </div>
    </article>
  );
}
