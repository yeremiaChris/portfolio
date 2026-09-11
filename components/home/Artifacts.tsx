import { Container } from "@/components/Container";
import { EdgeStreaming } from "@/components/home/artifacts/EdgeStreaming";
import { FsmLab } from "@/components/home/artifacts/FsmLab";
import { TokenEngine } from "@/components/home/artifacts/TokenEngine";
import { Badge } from "@/components/ui/badge";

export function Artifacts() {
  return (
    <section
      id="lab"
      aria-labelledby="artifacts-heading"
      className="w-full py-16 md:py-24"
    >
      <Container className="flex flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-1">
            <Badge
              variant="secondary"
              className="mb-1 w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest text-[#4cd7f6] uppercase"
            >
              <span className="size-2.5 rounded-full bg-[#4cd7f6]" aria-hidden />
              Interactive Laboratory
            </Badge>
            <h2
              id="artifacts-heading"
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Engineering Artifacts
            </h2>
            <p className="max-w-xl text-[15px] leading-6 text-muted-foreground">
              Direct proof-of-work: interactive demos for tokens, streaming
              patterns, and accessible UI state.
            </p>
          </div>
          <Badge
            variant="secondary"
            className="w-fit gap-2 font-mono text-[13px] font-normal normal-case tracking-normal text-muted-foreground"
          >
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            Interactive canvas live
          </Badge>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <TokenEngine />
          <EdgeStreaming />
          <FsmLab />
        </div>
      </Container>
    </section>
  );
}
