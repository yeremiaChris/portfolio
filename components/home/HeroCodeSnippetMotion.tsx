"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { m, useReducedMotion } from "motion/react";

import {
  HERO_CODE_LINES,
  HERO_CODE_LINE_COUNT,
  HERO_CODE_SNIPPET_ARIA_LABEL,
  TONE_CLASS,
  commandLineNumbers,
  linePlainText,
  type SnippetLine,
} from "@/lib/hero-code-lines";
import {
  motionDuration,
  motionHeroTerminal,
  motionPresetConfig,
  motionPresetRevealTransition,
  motionSpring,
} from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const terminalLineIndicatorLayoutId = "hero-terminal-line-indicator";

const LINE_ROW_CLASS =
  "relative grid grid-cols-[1.25rem_minmax(0,1fr)] items-baseline gap-x-2.5 rounded-sm px-0.5 -mx-0.5";

type HeroCodeSnippetMotionProps = {
  ready: boolean;
};

type Phase =
  | { type: "idle" }
  | { type: "typing"; lineN: number; visibleChars: number }
  | { type: "stagger"; lineNs: number[]; nextCommandIndex: number }
  | { type: "done" };

function HeroCodeSnippetStatic() {
  const liveRegionId = useId();
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const renderTokens = (
    line: SnippetLine,
    text: string,
    forceAccent: boolean,
  ) => {
    if (line.tokens.length === 0) {
      return "\u00A0";
    }

    return line.tokens.map((token, index) => (
      <span
        key={`${line.n}-${index}`}
        className={
          forceAccent
            ? "text-brand-accent"
            : token.tone
              ? TONE_CLASS[token.tone]
              : undefined
        }
      >
        {token.text}
      </span>
    ));
  };

  return (
    <div className="hero-code-snippet grid gap-y-0.5">
      <p id={liveRegionId} className="sr-only">
        {HERO_CODE_SNIPPET_ARIA_LABEL}
      </p>
      {HERO_CODE_LINES.map((line) => {
        const hovered = hoveredLine === line.n;
        const plain = linePlainText(line);

        return (
          <MotionLineRow
            key={line.n}
            line={line}
            visible
            hovered={hovered}
            plain={plain}
            typedText={plain}
            showCursor={false}
            onPointerEnter={() => setHoveredLine(line.n)}
            onPointerLeave={() =>
              setHoveredLine((current) => (current === line.n ? null : current))
            }
            renderTokens={renderTokens}
          />
        );
      })}
    </div>
  );
}

function HeroCodeSnippetTyping({ ready }: HeroCodeSnippetMotionProps) {
  const liveRegionId = useId();
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set());
  const [typedByLine, setTypedByLine] = useState<Record<number, string>>({});
  const [phase, setPhase] = useState<Phase>({ type: "idle" });
  const [showCursor, setShowCursor] = useState(false);
  const commandNs = useMemo(() => commandLineNumbers(), []);
  const staggerIndexRef = useRef(0);
  const startedRef = useRef(false);

  const lineByN = useMemo(() => {
    const map = new Map<number, SnippetLine>();
    for (const line of HERO_CODE_LINES) {
      map.set(line.n, line);
    }
    return map;
  }, []);

  const outputLinesAfterCommand = useCallback(
    (commandN: number, nextCommandN: number | undefined) => {
      return HERO_CODE_LINES.filter(
        (line) =>
          line.n > commandN &&
          line.kind !== "command" &&
          (nextCommandN === undefined || line.n < nextCommandN),
      ).map((line) => line.n);
    },
    [],
  );

  const beginCommand = useCallback(
    (commandIndex: number) => {
      const commandN = commandNs[commandIndex];
      if (commandN === undefined) {
        setPhase({ type: "done" });
        setShowCursor(false);
        return;
      }
      setRevealed((prev) => new Set(prev).add(commandN));
      setPhase({ type: "typing", lineN: commandN, visibleChars: 0 });
      setShowCursor(true);
    },
    [commandNs],
  );

  const startStaggerAfterCommand = useCallback(
    (commandIndex: number) => {
      const commandN = commandNs[commandIndex];
      const nextCommandN = commandNs[commandIndex + 1];
      if (commandN === undefined) {
        setPhase({ type: "done" });
        return;
      }
      const lineNs = outputLinesAfterCommand(commandN, nextCommandN);
      if (lineNs.length === 0) {
        const next = commandIndex + 1;
        if (next < commandNs.length) {
          beginCommand(next);
        } else {
          setPhase({ type: "done" });
          setShowCursor(false);
        }
        return;
      }
      staggerIndexRef.current = 0;
      setPhase({ type: "stagger", lineNs, nextCommandIndex: commandIndex + 1 });
    },
    [beginCommand, commandNs, outputLinesAfterCommand],
  );

  useEffect(() => {
    if (!ready || startedRef.current) {
      return;
    }
    startedRef.current = true;

    const timer = window.setTimeout(() => {
      beginCommand(0);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [beginCommand, ready]);

  useEffect(() => {
    if (phase.type !== "typing") {
      return;
    }

    const line = lineByN.get(phase.lineN);
    if (!line) {
      return;
    }

    const full = linePlainText(line);
    if (phase.visibleChars >= full.length) {
      const commandIndex = commandNs.indexOf(phase.lineN);
      const timer = window.setTimeout(() => {
        setTypedByLine((prev) => ({ ...prev, [phase.lineN]: full }));
        startStaggerAfterCommand(commandIndex);
      }, motionHeroTerminal.commandPauseMs);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setPhase({
        type: "typing",
        lineN: phase.lineN,
        visibleChars: phase.visibleChars + 1,
      });
    }, motionHeroTerminal.charIntervalMs);

    return () => window.clearTimeout(timer);
  }, [commandNs, lineByN, phase, startStaggerAfterCommand]);

  useEffect(() => {
    if (phase.type !== "stagger") {
      return;
    }

    const { lineNs, nextCommandIndex } = phase;
    if (staggerIndexRef.current >= lineNs.length) {
      const timer = window.setTimeout(() => {
        if (nextCommandIndex < commandNs.length) {
          beginCommand(nextCommandIndex);
        } else {
          setPhase({ type: "done" });
          setShowCursor(false);
        }
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const lineN = lineNs[staggerIndexRef.current];
    const timer = window.setTimeout(() => {
      setRevealed((prev) => new Set(prev).add(lineN));
      staggerIndexRef.current += 1;
      setPhase({ type: "stagger", lineNs, nextCommandIndex });
    }, motionHeroTerminal.lineStaggerMs);

    return () => window.clearTimeout(timer);
  }, [beginCommand, commandNs.length, phase]);

  const cursorOnLine =
    phase.type === "typing" && showCursor ? phase.lineN : null;

  const renderTokens = (
    line: SnippetLine,
    text: string,
    forceAccent: boolean,
  ) => {
    if (line.tokens.length === 0) {
      return "\u00A0";
    }

    let remaining = text;
    return line.tokens.map((token, index) => {
      const slice = remaining.slice(0, token.text.length);
      remaining = remaining.slice(token.text.length);
      if (!slice) {
        return null;
      }
      return (
        <span
          key={`${line.n}-${index}`}
          className={
            forceAccent
              ? "text-brand-accent"
              : token.tone
                ? TONE_CLASS[token.tone]
                : undefined
          }
        >
          {slice}
        </span>
      );
    });
  };

  return (
    <div className="hero-code-snippet grid gap-y-0.5">
      <p id={liveRegionId} className="sr-only">
        {HERO_CODE_SNIPPET_ARIA_LABEL}
      </p>
      {HERO_CODE_LINES.map((line) => {
        const visible = revealed.has(line.n);
        const hovered = hoveredLine === line.n;
        const plain = linePlainText(line);
        const typedText =
          line.kind === "command"
            ? (typedByLine[line.n] ??
              (phase.type === "typing" && phase.lineN === line.n
                ? plain.slice(0, phase.visibleChars)
                : ""))
            : plain;

        return (
          <MotionLineRow
            key={line.n}
            line={line}
            visible={visible}
            hovered={hovered}
            plain={plain}
            typedText={typedText}
            showCursor={cursorOnLine === line.n}
            onPointerEnter={() => setHoveredLine(line.n)}
            onPointerLeave={() =>
              setHoveredLine((current) => (current === line.n ? null : current))
            }
            renderTokens={renderTokens}
          />
        );
      })}
    </div>
  );
}

type MotionLineRowProps = {
  line: SnippetLine;
  visible: boolean;
  hovered: boolean;
  plain: string;
  typedText: string;
  showCursor: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  renderTokens: (
    line: SnippetLine,
    text: string,
    forceAccent: boolean,
  ) => ReactNode;
};

function MotionLineRow({
  line,
  visible,
  hovered,
  plain,
  typedText,
  showCursor,
  onPointerEnter,
  onPointerLeave,
  renderTokens,
}: MotionLineRowProps) {
  const forceAccent = hovered;

  return (
    <m.div
      role="presentation"
      aria-hidden
      className={cn(LINE_ROW_CLASS, !visible && "pointer-events-none")}
      initial={false}
      animate={
        visible
          ? {
              opacity: 1,
              y: 0,
            }
          : { opacity: 0, y: motionPresetConfig.calm.revealOffset }
      }
      transition={motionPresetRevealTransition("calm", "inView")}
      onPointerEnter={visible ? onPointerEnter : undefined}
      onPointerLeave={visible ? onPointerLeave : undefined}
      style={{ minHeight: "1.55em" }}
    >
      {hovered ? (
        <m.span
          layoutId={terminalLineIndicatorLayoutId}
          className="bg-brand-accent absolute top-0.5 bottom-0.5 left-0 w-px rounded-full"
          transition={motionSpring}
        />
      ) : null}
      <span
        className={cn(
          "text-[9px] leading-[1.55] tabular-nums select-none",
          hovered ? "text-brand-accent" : "text-white/25",
        )}
      >
        {line.n}
      </span>
      <span className="min-w-0 font-mono text-[10px] leading-[1.55] break-all sm:text-[10.5px] sm:break-normal sm:whitespace-pre">
        {line.kind === "command" && visible
          ? renderTokens(line, typedText, forceAccent)
          : visible
            ? renderTokens(line, plain, forceAccent)
            : "\u00A0"}
        {showCursor ? (
          <m.span
            aria-hidden
            className="text-brand-accent ml-px inline-block w-[0.45em] font-normal"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{
              duration: motionDuration.reveal,
              repeat: Infinity,
              ease: motionPresetRevealTransition("calm", "inView").ease,
            }}
          >
            ▍
          </m.span>
        ) : null}
      </span>
    </m.div>
  );
}

export const heroCodeBodyMinHeight = `calc(${HERO_CODE_LINE_COUNT} * 1.55em + ${HERO_CODE_LINE_COUNT - 1} * 0.125rem)`;

export function HeroCodeSnippetMotion({ ready }: HeroCodeSnippetMotionProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <HeroCodeSnippetStatic />;
  }

  return <HeroCodeSnippetTyping ready={ready} />;
}
