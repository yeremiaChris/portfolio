import type { Metadata } from "next";

import { Artifacts } from "@/components/home/Artifacts";
import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { Milestones } from "@/components/home/Milestones";
import { TechStack } from "@/components/home/TechStack";

export const metadata: Metadata = {
  title: "Yeremia Chris Saragi | Software Engineer",
  description:
    "Software Engineer (frontend-heavy) building production web platforms across health-tech and logistics — React, Next.js, Vue, APIs, and data integration.",
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
  openGraph: {
    title: "Yeremia Chris Saragi | Software Engineer",
    description:
      "Software Engineer (frontend-heavy) building production platforms across health-tech and logistics",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Artifacts />
      <Milestones />
      <TechStack />
      <ContactCta />
    </main>
  );
}
