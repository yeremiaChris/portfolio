import type { Metadata } from "next";

import { AskYeremiaChat } from "@/components/lab/AskYeremiaChat";
import { LabEmptyStateHeading } from "@/components/lab/LabEmptyStateHeading";
import { labIntro } from "@/lib/lab";
import { chatModelsForRuntime } from "@/lib/lab-models";
import { readOpenAICompatibleProviders } from "@/lib/lab-provider-env";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Ask Yeremia | Yeremia Chris Saragi",
  description: labIntro.description,
  path: "/lab",
});

export default function LabPage() {
  const models = chatModelsForRuntime(readOpenAICompatibleProviders());

  return (
    <main className="overflow-hidden">
      <AskYeremiaChat
        models={models}
        emptyStateHeading={<LabEmptyStateHeading />}
      />
    </main>
  );
}
