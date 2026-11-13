import type { Metadata } from "next";

import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutLargeViewportMotion } from "@/components/about/AboutLargeViewportMotion";
import { AboutStoryMotion } from "@/components/about/AboutStoryMotion";
import { AboutWorkflowStatic } from "@/components/about/AboutWorkflowStatic";
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
      <Container className="flex min-h-[calc(100vh-4rem)] flex-col py-6 md:py-8">
        <AboutHeader />
        <AboutStoryMotion />
        <div className="lg:hidden">
          <AboutWorkflowStatic />
        </div>
        <div className="hidden lg:block">
          <AboutLargeViewportMotion fallback={<AboutWorkflowStatic />} />
        </div>
      </Container>
    </main>
  );
}
