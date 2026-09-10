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
    "Featured production projects across healthcare, logistics, and modern frontend architectures.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] flex-col py-6 md:py-8">
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
