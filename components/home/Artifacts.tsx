import { Container } from "@/components/Container";
import { EdgeStreaming } from "@/components/home/artifacts/EdgeStreaming";
import {
  LazyFsmLab,
  LazyTokenEngine,
} from "@/components/home/artifacts/LazyArtifacts";
import { Badge } from "@/components/ui/badge";

export type ArtifactsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  showLiveBadge?: boolean;
};

const DEFAULT_FRAMING: Required<ArtifactsSectionProps> = {
  id: "ui-demos",
  eyebrow: "UI demos",
  title: "Small UI demos",
  description:
    "Interactive sketches — not client work. Tokens, streaming layout patterns, and accessible UI state.",
  showLiveBadge: false,
};

export function Artifacts({
  id = DEFAULT_FRAMING.id,
  eyebrow = DEFAULT_FRAMING.eyebrow,
  title = DEFAULT_FRAMING.title,
  description = DEFAULT_FRAMING.description,
  showLiveBadge = DEFAULT_FRAMING.showLiveBadge,
}: ArtifactsSectionProps = {}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="w-full py-16 md:py-24"
    >
      <Container className="flex flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-1">
            <Badge
              variant="secondary"
              className="mb-1 w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest text-[#4cd7f6] uppercase"
            >
              <span
                className="size-2.5 rounded-full bg-[#4cd7f6]"
                aria-hidden
              />
              {eyebrow}
            </Badge>
            <h2
              id={headingId}
              className="font-heading text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {title}
            </h2>
            <p className="text-muted-foreground max-w-xl text-[15px] leading-6">
              {description}
            </p>
          </div>
          {showLiveBadge ? (
            <Badge
              variant="secondary"
              className="text-muted-foreground w-fit gap-2 font-mono text-[13px] font-normal tracking-normal normal-case"
            >
              <span className="bg-primary size-2 animate-pulse rounded-full" />
              Interactive canvas live
            </Badge>
          ) : null}
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <LazyTokenEngine />
          <EdgeStreaming />
          <LazyFsmLab />
        </div>
      </Container>
    </section>
  );
}
