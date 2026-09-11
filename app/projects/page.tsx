import type { Metadata } from "next";

import { Container } from "@/components/Container";
import {
  ContactCta,
  projectsContactActions,
} from "@/components/home/ContactCta";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { projectsContactCta } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Yeremia Chris Saragi",
  description:
    "Production work across healthcare and logistics — clinical systems, shipping platforms, and product interfaces built with React, Next.js, Vue, and modern APIs.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col overflow-x-hidden py-6 md:py-8">
        <ProjectsHeader />
        <ProjectsGrid />
        <ContactCta
          id="projects-contact"
          withContainer={false}
          className="mb-4"
          eyebrow={projectsContactCta.eyebrow}
          title={projectsContactCta.title}
          description={projectsContactCta.description}
          actions={projectsContactActions()}
        />
      </Container>
    </main>
  );
}
