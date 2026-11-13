"use client";

import { useScroll } from "motion/react";
import { useCallback, useRef, useState } from "react";

import { FeaturedCaseStudyMotion } from "@/components/projects/FeaturedCaseStudyMotion";
import { ProjectsScrollRail } from "@/components/projects/ProjectsScrollRail";
import type { Project } from "@/lib/projects";

type ProjectsFeaturedMotionProps = {
  projects: Project[];
};

export function ProjectsFeaturedMotion({
  projects,
}: ProjectsFeaturedMotionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.2", "end 0.85"],
  });

  const handleVisible = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="relative w-full min-w-0 pl-0 sm:pl-5">
      <ProjectsScrollRail
        progress={scrollYProgress}
        activeIndex={activeIndex}
        projectCount={projects.length}
      />
      <section
        ref={sectionRef}
        id="projects-grid"
        aria-label="Featured projects"
        className="mb-10 flex w-full min-w-0 flex-col gap-14 md:mb-16 md:gap-20"
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
      </section>
    </div>
  );
}
