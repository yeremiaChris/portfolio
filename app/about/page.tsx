import type { Metadata } from "next";

import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { AboutJourneySection } from "@/components/about/AboutJourneySection";
import { AboutWorkflowMotion } from "@/components/about/AboutWorkflowMotion";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutIntro } from "@/lib/about";
import { buildPageMetadata, buildProfilePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About | Yeremia Chris Saragi",
  description: aboutIntro.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <style>{`.about-hide-header-resume{display:none!important}`}</style>
      <JsonLd
        data={buildProfilePageJsonLd("/about", { includeContact: false })}
      />
      <Container className="flex min-w-0 flex-col overflow-x-hidden py-8 md:py-12">
        <AboutHeroSection />
        <AboutJourneySection />
        <AboutWorkflowMotion />
      </Container>
    </main>
  );
}
