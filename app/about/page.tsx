import type { Metadata } from "next";

import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutWorkflow } from "@/components/about/AboutWorkflow";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, buildPersonJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About | Yeremia Chris Saragi",
  description:
    "Software Engineer (frontend-heavy) building production platforms across health-tech and logistics. Strong in React, Next.js, and Vue, with solid experience in API integration, authentication flows, and data-aware delivery.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={buildPersonJsonLd()} />
      <Container className="flex min-h-[calc(100vh-4rem)] flex-col py-6 md:py-8">
        <AboutHeader />
        <AboutStory />
        <AboutWorkflow />
      </Container>
    </main>
  );
}
