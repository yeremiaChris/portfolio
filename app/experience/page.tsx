import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { ExperienceDisciplines } from "@/components/experience/ExperienceDisciplines";
import { ExperienceHeader } from "@/components/experience/ExperienceHeader";
import { ExperienceMetrics } from "@/components/experience/ExperienceMetrics";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import {
  ContactCta,
  experienceContactActions,
} from "@/components/home/ContactCta";
import { experienceContactCta } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Engineering Experience | Yeremia Chris Saragi",
  description:
    "Software Engineer track record across healthcare platforms, logistics aggregation, and digital product agencies.",
};

export default function ExperiencePage() {
  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] flex-col py-6 md:py-8">
        <ExperienceHeader />
        <ExperienceMetrics />
        <ExperienceTimeline />
        <ExperienceDisciplines />
        <ContactCta
          id="experience-contact"
          withContainer={false}
          className="mb-4"
          eyebrow={experienceContactCta.eyebrow}
          title={experienceContactCta.title}
          description={experienceContactCta.description}
          actions={experienceContactActions()}
        />
      </Container>
    </main>
  );
}
