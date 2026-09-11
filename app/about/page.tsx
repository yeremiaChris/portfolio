import type { Metadata } from "next";

import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutStory } from "@/components/about/AboutStory";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "About | Yeremia Chris Saragi",
  description:
    "About Yeremia Chris Saragi — Software Engineer (frontend-heavy) shipping production platforms across health-tech and logistics.",
};

export default function AboutPage() {
  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] flex-col py-6 md:py-8">
        <AboutHeader />
        <AboutStory />
      </Container>
    </main>
  );
}
