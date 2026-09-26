import type { Metadata } from "next";

import { Artifacts } from "@/components/home/Artifacts";
import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { Milestones } from "@/components/home/Milestones";
import { TechStack } from "@/components/home/TechStack";
import { IntroGate } from "@/components/intro/IntroGate";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildHomeJsonLd, buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Yeremia Chris Saragi | Software Engineer",
    description: site.tagline,
    path: "/",
  }),
  keywords: [
    "Yeremia Chris Saragi",
    "Software Engineer",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "Vue Developer",
    "Portfolio",
    "Web Development",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main>
      <JsonLd data={buildHomeJsonLd()} />
      <IntroGate />
      <Hero />
      <Milestones />
      <Artifacts />
      <TechStack />
      <ContactCta />
    </main>
  );
}
