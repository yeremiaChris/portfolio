import type { Metadata } from "next";

import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutStory } from "@/components/about/AboutStory";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "About | Yeremia Chris Saragi",
  description:
    "About Yeremia Chris Saragi — frontend engineer crafting resilient product interfaces and performance-minded React / Next.js apps.",
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
