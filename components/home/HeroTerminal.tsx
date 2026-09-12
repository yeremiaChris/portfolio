import type { ReactNode } from "react";
import { TerminalIcon } from "lucide-react";

export function HeroTerminal() {
  return (
    <figure className="border-border/60 bg-muted w-full overflow-hidden rounded-xl border shadow-xl backdrop-blur-md">
      <figcaption className="bg-card flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="bg-destructive/80 inline-block size-3 rounded-full" />
          <span className="inline-block size-3 rounded-full bg-[#4cd7f6]/80" />
          <span className="bg-primary/80 inline-block size-3 rounded-full" />
          <span className="text-muted-foreground ml-2 font-mono text-[13px]">
            yeremia.kernel.ts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-secondary text-primary rounded px-1.5 py-0.5 font-mono text-[10px]">
            v4.8.0-prod
          </span>
          <TerminalIcon className="text-muted-foreground size-4" />
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

      <div className="bg-card text-muted-foreground flex items-center justify-between px-4 py-2 font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <span className="bg-primary inline-block size-1.5 animate-pulse rounded-full" />
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
      <span className="text-muted-foreground/70 text-right">
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
  return <span className="text-[#8b9a92]">{children}</span>;
}
