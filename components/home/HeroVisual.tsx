"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const TILT_MAX_DEG = 6;

function CodeSnippet() {
  return (
    <pre className="overflow-x-auto font-mono text-[11px] leading-[1.55] sm:text-xs">
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
        <span className="text-[#abb2bf]">({"{"}</span>
        {"\n    "}
        <span className="text-[#e5c07b]">queryKey</span>
        <span className="text-[#abb2bf]">: [</span>
        <span className="text-[#98c379]">&apos;queue&apos;</span>
        <span className="text-[#abb2bf]">],</span>
        {"\n    "}
        <span className="text-[#e5c07b]">queryFn</span>
        <span className="text-[#abb2bf]">: fetchQueue,</span>
        {"\n  "}
        <span className="text-[#abb2bf]">{"});"}</span>
        {"\n\n  "}
        <span className="text-[#c678dd]">if</span>
        <span className="text-[#abb2bf]"> (isPending) </span>
        <span className="text-[#c678dd]">return</span>
        <span className="text-[#abb2bf]"> &lt;</span>
        <span className="text-[#e5c07b]">Skeleton</span>
        <span className="text-[#abb2bf]"> /&gt;;</span>
        {"\n\n  "}
        <span className="text-[#c678dd]">return</span>
        <span className="text-[#abb2bf]"> (</span>
        {"\n    "}
        <span className="text-[#abb2bf]">&lt;</span>
        <span className="text-[#e5c07b]">ul</span>
        <span className="text-[#abb2bf]">&gt;</span>
        {"\n      "}
        <span className="text-[#abb2bf]">{"{data?.map((row: Row) => ("}</span>
        {"\n        "}
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
        {"\n      "}
        <span className="text-[#abb2bf]">{"))}"}</span>
        {"\n    "}
        <span className="text-[#abb2bf]">&lt;/</span>
        <span className="text-[#e5c07b]">ul</span>
        <span className="text-[#abb2bf]">&gt;</span>
        {"\n  "}
        <span className="text-[#abb2bf]">);</span>
        {"\n"}
        <span className="text-[#abb2bf]">{"}"}</span>
      </code>
    </pre>
  );
}

export function HeroVisual() {
  const hostRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ rotateX: 0, rotateY: 0 });
  const tiltEnabledRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const lg = window.matchMedia("(min-width: 1024px)");

    const syncTilt = () => {
      const enabled = !reduced.matches && !coarse.matches && lg.matches;
      tiltEnabledRef.current = enabled;
      if (!enabled && panelRef.current) {
        panelRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
      }
    };

    syncTilt();
    reduced.addEventListener("change", syncTilt);
    coarse.addEventListener("change", syncTilt);
    lg.addEventListener("change", syncTilt);

    const section = hostRef.current?.closest("section");
    if (!section) {
      return () => {
        reduced.removeEventListener("change", syncTilt);
        coarse.removeEventListener("change", syncTilt);
        lg.removeEventListener("change", syncTilt);
      };
    }

    const applyTilt = () => {
      frameRef.current = null;
      const panel = panelRef.current;
      if (!panel) return;
      const { rotateX, rotateY } = targetRef.current;
      panel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const scheduleTilt = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(applyTilt);
    };

    const onMove = (event: MouseEvent) => {
      if (!tiltEnabledRef.current) return;
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetRef.current = {
        rotateX: -y * TILT_MAX_DEG,
        rotateY: x * TILT_MAX_DEG,
      };
      scheduleTilt();
    };

    const onLeave = () => {
      targetRef.current = { rotateX: 0, rotateY: 0 };
      scheduleTilt();
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      reduced.removeEventListener("change", syncTilt);
      coarse.removeEventListener("change", syncTilt);
      lg.removeEventListener("change", syncTilt);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="hero-code-backdrop pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="hero-code-stage absolute inset-0 flex items-start justify-end pt-6 pr-0 md:pt-8 lg:pt-2 lg:pr-2">
        <div
          ref={panelRef}
          className={cn(
            "border-gradient hero-code-panel relative w-[min(100%,520px)] max-w-[min(520px,calc(100vw-2.5rem))] shrink-0 overflow-hidden rounded-2xl bg-[#0a0e14]/75 shadow-[0_0_80px_rgb(76_215_246/0.18)] backdrop-blur-md transition-[transform,opacity] duration-300 ease-out will-change-transform",
            "max-lg:opacity-[0.06] lg:opacity-[0.7]",
            "max-lg:translate-x-6 lg:translate-x-0",
          )}
        >
          <div className="border-border/30 flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-muted-foreground ml-1 truncate font-mono text-[10px] tracking-wide">
              QueuePanel.tsx
            </span>
          </div>
          <div className="relative p-4 sm:p-5">
            <CodeSnippet />
          </div>
        </div>
      </div>
    </div>
  );
}
