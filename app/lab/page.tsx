import type { Metadata } from "next";

import { AskYeremiaChat } from "@/components/lab/AskYeremiaChat";
import { labIntro } from "@/lib/lab";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Lab | Yeremia Chris Saragi",
  description: labIntro.description,
  path: "/lab",
});

export default function LabPage() {
  return (
    <main className="overflow-hidden">
      <AskYeremiaChat />
    </main>
  );
}
