import type { ReactNode } from "react";
import { TerminalIcon } from "lucide-react";

export function HeroTerminal() {
  return (
    <figure className="w-full overflow-hidden rounded-xl border border-border/60 bg-muted shadow-xl backdrop-blur-md">
      <figcaption className="flex items-center justify-between bg-card px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full bg-destructive/80" />
          <span className="inline-block size-3 rounded-full bg-[#4cd7f6]/80" />
          <span className="inline-block size-3 rounded-full bg-primary/80" />
          <span className="ml-2 font-mono text-[13px] text-muted-foreground">
            yeremia.kernel.ts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-primary">
            v4.8.0-prod
          </span>
          <TerminalIcon className="size-4 text-muted-foreground" />
        </div>
      </figcaption>

      <div className="overflow-x-auto bg-[#0a0e14] p-4 font-mono text-[14px] leading-5.5">
        <div className="grid grid-cols-[2rem_1fr] gap-x-3 text-[#86948a] select-none">
          <Line n={1}>
            <Kw>import</Kw> {"{ Architect, FullStack }"} <Kw>from</Kw>{" "}
            <Str>&apos;@core/runtime&apos;</Str>;
          </Line>
          <Line n={2}>
            <Kw>export const</Kw> <Ident>engineer</Ident> = <Kw>new</Kw>{" "}
            <Type>Architect</Type>({"{"}
          </Line>
          <Line n={3} indent>
            identity: <Str>&apos;Yeremia Chris Saragi&apos;</Str>,
          </Line>
          <Line n={4} indent>
            role: <Str>&apos;Software Engineer · Frontend-Heavy&apos;</Str>,
          </Line>
          <Line n={5} indent>
            focus: [<Str>&apos;Product Platforms&apos;</Str>,{" "}
            <Str>&apos;APIs · UI Craft&apos;</Str>],
          </Line>
          <Line n={6} indent>
            uptimeSla: <Type>0.9995</Type>,{" "}
            <Comment>{"// 99.95% Target"}</Comment>
          </Line>
          <Line n={7} indent>
            status: <Ident>STATUS.OPEN_FOR_OPPORTUNITY</Ident>,
          </Line>
          <Line n={8}>{"}"});</Line>
          <Line n={9} />
          <Line n={10}>
            <Comment>{"// Self-executing pipeline"}</Comment>
          </Line>
          <Line n={11}>
            <Kw>await</Kw> <Ident>engineer</Ident>.
            <Type>deployEnterpriseSolutions</Type>({"{"}
          </Line>
          <Line n={12} indent>
            cleanCode: <Ident>true</Ident>, testCoverage:{" "}
            <Str>&apos;&gt;90%&apos;</Str>
          </Line>
          <Line n={13}>{"}"});</Line>
        </div>
      </div>

      <div className="flex items-center justify-between bg-card px-4 py-2 font-mono text-[10px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-primary" />
          <span className="text-primary">STATUS:</span>
          <span className="text-foreground">
            Available for hire &amp; freelance contracts
          </span>
        </div>
        <span>LAT: 12ms</span>
      </div>
    </figure>
  );
}

function Line({
  n,
  indent,
  children,
}: {
  n: number;
  indent?: boolean;
  children?: ReactNode;
}) {
  return (
    <>
      <span className="text-right text-muted-foreground/70">
        {String(n).padStart(2, "0")}
      </span>
      <div className={indent ? "pl-4" : undefined}>{children}</div>
    </>
  );
}

function Kw({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-[#4cd7f6]">{children}</span>;
}

function Ident({ children }: { children: ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

function Type({ children }: { children: ReactNode }) {
  return <span className="text-[#7bd0ff]">{children}</span>;
}

function Str({ children }: { children: ReactNode }) {
  return <span className="text-[#6ffbbe]">{children}</span>;
}

function Comment({ children }: { children: ReactNode }) {
  return <span className="text-[#3c4a42]">{children}</span>;
}
