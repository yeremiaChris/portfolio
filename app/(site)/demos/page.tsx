import type { Metadata } from "next";

import { Artifacts } from "@/components/home/Artifacts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "UI demos | Yeremia Chris Saragi",
  description:
    "Small interactive UI demos — not client work. Tokens, streaming patterns, and accessible state sketches.",
  path: "/demos",
});

export default function DemosPage() {
  return (
    <main>
      <Artifacts />
    </main>
  );
}
