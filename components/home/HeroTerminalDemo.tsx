"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "motion/react";

import { aboutIntro } from "@/lib/about";
import {
  HERO_TERMINAL_DEMO_COMMANDS,
  runHeroTerminalCommand,
  type TerminalSegment,
} from "@/lib/hero-terminal-commands";
import { motionHeroTerminal } from "@/lib/motion-tokens";

export const HERO_TERMINAL_DEMO_SLOT_HEIGHT = "12.75rem";

const SR_SUMMARY = `Terminal preview: cycles sample about, projects, and contact responses. ${aboutIntro.description}`;

type DemoMode =
  | { step: "idle" }
  | { step: "typing-command"; index: number; visibleChars: number }
  | {
      step: "typing-response";
      index: number;
      command: string;
      lines: TerminalSegment[][];
      visibleChars: number;
    }
  | {
      step: "hold";
      index: number;
      command: string;
      lines: TerminalSegment[][];
    }
  | { step: "cycle-gap"; nextIndex: number };

function segmentsToPlain(lines: TerminalSegment[][]): string {
  return lines
    .map((line) =>
      line
        .map((segment) =>
          segment.kind === "text" ? segment.text : segment.label,
        )
        .join(""),
    )
    .join("\n");
}

function outputLinesForCommand(command: string): TerminalSegment[][] {
  const result = runHeroTerminalCommand(command);
  if (result.kind === "output") {
    return result.lines;
  }
  return [];
}

function DemoOutputLine({ line }: { line: TerminalSegment[] }) {
  return (
    <p className="break-all sm:break-normal">
      {line.map((segment, index) =>
        segment.kind === "link" ? (
          <span
            key={index}
            className="text-brand-accent underline underline-offset-2"
          >
            {segment.label}
          </span>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

function ReducedMotionDemo() {
  const lines = outputLinesForCommand("about");
  return (
    <>
      <p className="sr-only">{SR_SUMMARY}</p>
      <div
        aria-hidden
        className="hero-terminal-demo mt-2 flex h-full min-h-0 flex-col border-t border-white/10 pt-2"
        style={
          {
            "--hero-terminal-demo-slot": HERO_TERMINAL_DEMO_SLOT_HEIGHT,
          } as CSSProperties
        }
      >
        <p className="text-brand-accent shrink-0 font-mono text-[10px] leading-[1.55] sm:text-[10.5px]">
          <span className="text-white/40">$ </span>
          about
        </p>
        <div className="text-muted-foreground mt-2 min-h-0 flex-1 space-y-0.5 overflow-hidden font-mono text-[10px] leading-[1.55] sm:text-[10.5px]">
          {lines.map((line, index) => (
            <DemoOutputLine key={index} line={line} />
          ))}
        </div>
      </div>
    </>
  );
}

type HeroTerminalDemoProps = {
  active: boolean;
};

export function HeroTerminalDemo({ active }: HeroTerminalDemoProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [mode, setMode] = useState<DemoMode>({ step: "idle" });
  const [display, setDisplay] = useState<{
    command: string;
    commandChars: number;
    lines: TerminalSegment[][];
    responseChars: number;
    responseComplete: boolean;
    showCursor: boolean;
  }>({
    command: "",
    commandChars: 0,
    lines: [],
    responseChars: 0,
    responseComplete: false,
    showCursor: false,
  });

  const paused = !tabVisible || !inView || !active;

  useEffect(() => {
    const onVisibility = () =>
      setTabVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const startCycle = useCallback(() => {
    setMode({ step: "typing-command", index: 0, visibleChars: 0 });
    setDisplay({
      command: HERO_TERMINAL_DEMO_COMMANDS[0] ?? "",
      commandChars: 0,
      lines: [],
      responseChars: 0,
      responseComplete: false,
      showCursor: true,
    });
  }, []);

  useEffect(() => {
    if (!active || reducedMotion || paused) {
      return;
    }
    if (mode.step === "idle") {
      const timer = window.setTimeout(() => startCycle(), 0);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [active, mode.step, paused, reducedMotion, startCycle]);

  useEffect(() => {
    if (reducedMotion || paused || !active) {
      return;
    }

    if (mode.step === "typing-command") {
      const command = HERO_TERMINAL_DEMO_COMMANDS[mode.index] ?? "";
      if (mode.visibleChars >= command.length) {
        const lines = outputLinesForCommand(command);
        const timer = window.setTimeout(() => {
          setMode({
            step: "typing-response",
            index: mode.index,
            command,
            lines,
            visibleChars: 0,
          });
          setDisplay((current) => ({
            ...current,
            command,
            commandChars: command.length,
            lines,
            responseChars: 0,
            responseComplete: false,
            showCursor: false,
          }));
        }, motionHeroTerminal.commandPauseMs);
        return () => window.clearTimeout(timer);
      }

      const timer = window.setTimeout(() => {
        const next = mode.visibleChars + 1;
        setMode({ ...mode, visibleChars: next });
        setDisplay((current) => ({
          ...current,
          command,
          commandChars: next,
          showCursor: true,
        }));
      }, motionHeroTerminal.charIntervalMs);
      return () => window.clearTimeout(timer);
    }

    if (mode.step === "typing-response") {
      const plain = segmentsToPlain(mode.lines);
      if (mode.visibleChars >= plain.length) {
        const timer = window.setTimeout(() => {
          setMode({
            step: "hold",
            index: mode.index,
            command: mode.command,
            lines: mode.lines,
          });
          setDisplay((current) => ({
            ...current,
            responseChars: plain.length,
            responseComplete: true,
            showCursor: false,
          }));
        }, 0);
        return () => window.clearTimeout(timer);
      }

      const timer = window.setTimeout(() => {
        const next = mode.visibleChars + 1;
        setMode({ ...mode, visibleChars: next });
        setDisplay((current) => ({
          ...current,
          responseChars: next,
          responseComplete: false,
        }));
      }, motionHeroTerminal.responseCharIntervalMs);
      return () => window.clearTimeout(timer);
    }

    if (mode.step === "hold") {
      const timer = window.setTimeout(() => {
        const nextIndex = mode.index + 1;
        if (nextIndex >= HERO_TERMINAL_DEMO_COMMANDS.length) {
          setMode({ step: "cycle-gap", nextIndex: 0 });
          setDisplay({
            command: "",
            commandChars: 0,
            lines: [],
            responseChars: 0,
            responseComplete: false,
            showCursor: false,
          });
          return;
        }
        setMode({
          step: "typing-command",
          index: nextIndex,
          visibleChars: 0,
        });
        setDisplay({
          command: HERO_TERMINAL_DEMO_COMMANDS[nextIndex] ?? "",
          commandChars: 0,
          lines: [],
          responseChars: 0,
          responseComplete: false,
          showCursor: true,
        });
      }, motionHeroTerminal.demoHoldMs);
      return () => window.clearTimeout(timer);
    }

    if (mode.step === "cycle-gap") {
      const timer = window.setTimeout(() => {
        setMode({ step: "typing-command", index: 0, visibleChars: 0 });
        setDisplay({
          command: HERO_TERMINAL_DEMO_COMMANDS[0] ?? "",
          commandChars: 0,
          lines: [],
          responseChars: 0,
          responseComplete: false,
          showCursor: true,
        });
      }, motionHeroTerminal.demoCycleGapMs);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [active, mode, paused, reducedMotion]);

  if (reducedMotion) {
    return active ? <ReducedMotionDemo /> : null;
  }

  if (!active) {
    return null;
  }

  const commandText = display.command.slice(0, display.commandChars);
  const plainResponse = segmentsToPlain(display.lines);
  const responsePlain = plainResponse.slice(0, display.responseChars);

  return (
    <>
      <p className="sr-only">{SR_SUMMARY}</p>
      <div
        ref={rootRef}
        aria-hidden
        className="hero-terminal-demo mt-2 flex h-full min-h-0 flex-col border-t border-white/10 pt-2"
        style={
          {
            "--hero-terminal-demo-slot": HERO_TERMINAL_DEMO_SLOT_HEIGHT,
          } as CSSProperties
        }
      >
        <p className="text-brand-accent shrink-0 font-mono text-[10px] leading-[1.55] sm:text-[10.5px]">
          <span className="text-white/40">$ </span>
          {commandText}
          {display.showCursor ? (
            <span className="text-brand-accent ml-px">▍</span>
          ) : null}
        </p>
        <div className="text-muted-foreground mt-2 min-h-0 flex-1 overflow-hidden font-mono text-[10px] leading-[1.55] sm:text-[10.5px]">
          {display.responseComplete ? (
            <div className="space-y-0.5">
              {display.lines.map((line, index) => (
                <DemoOutputLine key={index} line={line} />
              ))}
            </div>
          ) : responsePlain ? (
            <p className="break-all whitespace-pre-wrap sm:break-normal">
              {responsePlain}
            </p>
          ) : (
            <span className="block min-h-[1.55em]">&nbsp;</span>
          )}
        </div>
      </div>
    </>
  );
}
