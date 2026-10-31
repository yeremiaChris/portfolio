import type { Metadata } from "next";

import { AskYeremiaChat } from "@/components/lab/AskYeremiaChat";
import { LabIntroShell } from "@/components/lab/LabIntroShell";
import { labIntro } from "@/lib/lab";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Ask Yeremia | Yeremia Chris Saragi",
  description: labIntro.description,
  path: "/lab",
});

export default function LabPage() {
  return (
    <main className="flex h-[calc(100dvh-var(--nav-height))] flex-col overflow-hidden">
      <LabIntroShell />
      <div className="flex min-h-0 flex-1 flex-col">
        <AskYeremiaChat />
      </div>
    </main>
  );
}
