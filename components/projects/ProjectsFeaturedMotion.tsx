"use client";

import { useScroll } from "motion/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { FeaturedCaseStudyMotion } from "@/components/projects/FeaturedCaseStudyMotion";
import { ProjectsScrollRail } from "@/components/projects/ProjectsScrollRail";
import type { Project } from "@/lib/projects";

type TrackBounds = {
  top: number;
  height: number;
};

type ProjectsFeaturedMotionProps = {
  projects: Project[];
};

export function ProjectsFeaturedMotion({
  projects,
}: ProjectsFeaturedMotionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackBounds, setTrackBounds] = useState<TrackBounds>({
    top: 0,
    height: 0,
  });

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const measureTrack = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const list = section.querySelector("[data-featured-list]");
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
    measureTrack();
    const section = sectionRef.current;
    if (!section) return;
    const observer = new ResizeObserver(() => measureTrack());
    observer.observe(section);
    const list = section.querySelector("[data-featured-list]");
    if (list) {
      observer.observe(list);
      for (const article of list.querySelectorAll(":scope > article")) {
        observer.observe(article);
      }
    }
    window.addEventListener("resize", measureTrack);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureTrack);
    };
  }, [measureTrack, projects.length]);

  const handleVisible = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects-grid"
      aria-label="Featured projects"
      className="relative mb-10 w-full min-w-0 md:mb-16"
    >
      <div
        ref={trackRef}
        className="pointer-events-none absolute left-0 hidden w-5 sm:block"
        style={{
          top: trackBounds.top,
          height: Math.max(trackBounds.height, 1),
        }}
      >
        <ProjectsScrollRail
          progress={scrollYProgress}
          activeIndex={activeIndex}
          projectCount={projects.length}
        />
      </div>
      <div
        data-featured-list
        className="flex w-full min-w-0 flex-col gap-14 pl-0 sm:pl-5 md:gap-20"
      >
        {projects.map((project, index) => (
          <FeaturedCaseStudyMotion
            key={project.id}
            project={project}
            index={index}
            reverse={index % 2 === 1}
            onVisible={handleVisible}
          />
        ))}
      </div>
    </section>
  );
}
