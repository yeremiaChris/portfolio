import type { Metadata } from "next";

import { Artifacts } from "@/components/home/Artifacts";
import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { Milestones } from "@/components/home/Milestones";
import { TechStack } from "@/components/home/TechStack";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildHomeJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Yeremia Chris Saragi | Software Engineer",
    description:
      "Software Engineer (frontend-heavy) building production web platforms across health-tech and logistics — React, Next.js, Vue, APIs, and data integration.",
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
      <IntroLoader />
      <Hero />
      <Artifacts />
      <Milestones />
      <TechStack />
      <ContactCta />
    </main>
  );
}
