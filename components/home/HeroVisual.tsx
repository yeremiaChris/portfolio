"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const TILT_MAX_DEG = 3.5;
const LERP = 0.14;
const SNAP = 0.04;

function CodeSnippet() {
  return (
    <pre className="overflow-hidden font-mono text-[10px] leading-[1.5] sm:text-[11px]">
      <code>
        <span className="text-[#c678dd]">import</span>
        <span className="text-[#abb2bf]"> {"{ useQuery }"} </span>
        <span className="text-[#c678dd]">from</span>
        <span className="text-[#98c379]">
          {" "}
          &apos;@tanstack/react-query&apos;
        </span>
        <span className="text-[#abb2bf]">;</span>
        {"\n\n"}
        <span className="text-[#c678dd]">type</span>
        <span className="text-[#e5c07b]"> Row </span>
        <span className="text-[#abb2bf]">= {"{"} </span>
        <span className="text-[#e5c07b]">id</span>
        <span className="text-[#abb2bf]">: </span>
        <span className="text-[#98c379]">string</span>
        <span className="text-[#abb2bf]">; </span>
        <span className="text-[#e5c07b]">status</span>
        <span className="text-[#abb2bf]">: </span>
        <span className="text-[#98c379]">&apos;open&apos;</span>
        <span className="text-[#abb2bf]"> | </span>
        <span className="text-[#98c379]">&apos;done&apos;</span>
        <span className="text-[#abb2bf]"> {"}"};</span>
        {"\n\n"}
        <span className="text-[#c678dd]">export function</span>
        <span className="text-[#61afef]"> QueuePanel</span>
        <span className="text-[#abb2bf]">() {"{"}</span>
        {"\n  "}
        <span className="text-[#c678dd]">const</span>
        <span className="text-[#abb2bf]"> {"{ data, isPending }"} = </span>
        <span className="text-[#61afef]">useQuery</span>
        <span className="text-[#abb2bf]">({"{"} </span>
        <span className="text-[#e5c07b]">queryKey</span>
        <span className="text-[#abb2bf]">: [</span>
        <span className="text-[#98c379]">&apos;queue&apos;</span>
        <span className="text-[#abb2bf]">], </span>
        <span className="text-[#e5c07b]">queryFn</span>
        <span className="text-[#abb2bf]">: fetchQueue </span>
        <span className="text-[#abb2bf]">{"});"}</span>
        {"\n  "}
        <span className="text-[#c678dd]">if</span>
        <span className="text-[#abb2bf]"> (isPending) </span>
        <span className="text-[#c678dd]">return</span>
        <span className="text-[#abb2bf]"> &lt;</span>
        <span className="text-[#e5c07b]">Skeleton</span>
        <span className="text-[#abb2bf]"> /&gt;;</span>
        {"\n  "}
        <span className="text-[#c678dd]">return</span>
        <span className="text-[#abb2bf]"> data?.map((row: Row) =&gt; (</span>
        {"\n    "}
        <span className="text-[#abb2bf]">&lt;</span>
        <span className="text-[#e5c07b]">li</span>
        <span className="text-[#abb2bf]">
          {" "}
          key={"{"}row.id{"}"}&gt;
        </span>
        <span className="text-[#abb2bf]">{"{row.status}"}</span>
        <span className="text-[#abb2bf]">&lt;/</span>
        <span className="text-[#e5c07b]">li</span>
        <span className="text-[#abb2bf]">&gt;</span>
        {"\n  "}
        <span className="text-[#abb2bf]">));</span>
        {"\n"}
        <span className="text-[#abb2bf]">{"}"}</span>
      </code>
    </pre>
  );
}

export function HeroVisual() {
  const panelRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ rotateX: 0, rotateY: 0 });
  const currentRef = useRef({ rotateX: 0, rotateY: 0 });
  const tiltEnabledRef = useRef(false);
  const hoveringRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const xl = window.matchMedia("(min-width: 1280px)");

    const syncTilt = () => {
      tiltEnabledRef.current =
        !reduced.matches && !coarse.matches && xl.matches;
    };

    syncTilt();
    reduced.addEventListener("change", syncTilt);
    coarse.addEventListener("change", syncTilt);
    xl.addEventListener("change", syncTilt);

    const panel = panelRef.current;
    const tilt = tiltRef.current;
    if (!panel || !tilt) {
      return () => {
        reduced.removeEventListener("change", syncTilt);
        coarse.removeEventListener("change", syncTilt);
        xl.removeEventListener("change", syncTilt);
      };
    }

    const applyFrame = () => {
      frameRef.current = null;
      const cur = currentRef.current;
      const tgt = targetRef.current;

      cur.rotateX += (tgt.rotateX - cur.rotateX) * LERP;
      cur.rotateY += (tgt.rotateY - cur.rotateY) * LERP;

      if (
        Math.abs(tgt.rotateX - cur.rotateX) < SNAP &&
        Math.abs(tgt.rotateY - cur.rotateY) < SNAP
      ) {
        cur.rotateX = tgt.rotateX;
        cur.rotateY = tgt.rotateY;
      }

      tilt.style.transform = `rotateX(${cur.rotateX.toFixed(2)}deg) rotateY(${cur.rotateY.toFixed(2)}deg)`;

      const stillMoving =
        Math.abs(tgt.rotateX - cur.rotateX) > 0.01 ||
        Math.abs(tgt.rotateY - cur.rotateY) > 0.01;

      if (stillMoving || hoveringRef.current) {
        frameRef.current = window.requestAnimationFrame(applyFrame);
      }
    };

    const scheduleFrame = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(applyFrame);
      }
    };

    const onMove = (event: MouseEvent) => {
      if (!tiltEnabledRef.current) return;
      hoveringRef.current = true;

      const rect = panel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetRef.current = {
        rotateX: -y * TILT_MAX_DEG,
        rotateY: x * TILT_MAX_DEG,
      };

      if (codeRef.current) {
        codeRef.current.style.setProperty(
          "--hero-code-spot-x",
          `${event.clientX - rect.left}px`,
        );
        codeRef.current.style.setProperty(
          "--hero-code-spot-y",
          `${event.clientY - rect.top}px`,
        );
      }

      scheduleFrame();
    };

    const onLeave = () => {
      hoveringRef.current = false;
      targetRef.current = { rotateX: 0, rotateY: 0 };
      scheduleFrame();
    };

    panel.addEventListener("mousemove", onMove);
    panel.addEventListener("mouseleave", onLeave);

    return () => {
      panel.removeEventListener("mousemove", onMove);
      panel.removeEventListener("mouseleave", onLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      reduced.removeEventListener("change", syncTilt);
      coarse.removeEventListener("change", syncTilt);
      xl.removeEventListener("change", syncTilt);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="hidden w-full min-w-0 xl:flex xl:justify-end xl:self-start"
    >
      <div className="hero-code-stage w-full max-w-[420px]">
        <div
          ref={panelRef}
          className={cn(
            "border-gradient hero-code-shell relative max-h-[300px] w-full overflow-hidden rounded-2xl bg-[#0a0e14]/80 shadow-[0_0_64px_rgb(76_215_246/0.16)] backdrop-blur-md",
          )}
        >
          <div
            ref={tiltRef}
            className="hero-code-tilt flex max-h-[300px] flex-col will-change-transform"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-muted-foreground ml-1 truncate font-mono text-[10px] tracking-wide">
                QueuePanel.tsx
              </span>
            </div>
            <div
              ref={codeRef}
              className="hero-code-body relative overflow-hidden p-4 sm:p-5"
            >
              <CodeSnippet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
