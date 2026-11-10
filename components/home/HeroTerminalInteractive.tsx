"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { useReducedMotion } from "motion/react";

import {
  formatUnknownCommand,
  runHeroTerminalCommand,
  type TerminalSegment,
} from "@/lib/hero-terminal-commands";
import { motionHeroTerminal } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const QUICK_COMMANDS = ["help", "about", "projects", "contact"] as const;

export const HERO_TERMINAL_INTERACTIVE_SLOT_MIN_HEIGHT = "12.75rem";

type TranscriptEntry =
  | { kind: "input"; text: string }
  | { kind: "output"; lines: TerminalSegment[][]; complete: boolean };

type PendingType = {
  lines: TerminalSegment[][];
  visibleChars: number;
} | null;

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

function OutputLine({ line }: { line: TerminalSegment[] }) {
  return (
    <p>
      {line.map((segment, index) =>
        segment.kind === "link" ? (
          <a
            key={index}
            href={segment.href}
            className="text-brand-accent hover:text-brand-accent-hover underline underline-offset-2"
          >
            {segment.label}
          </a>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

type HeroTerminalInteractiveProps = {
  onFlatTiltChange?: (flat: boolean) => void;
};

export function HeroTerminalInteractive({
  onFlatTiltChange,
}: HeroTerminalInteractiveProps) {
  const reducedMotion = useReducedMotion();
  const inputId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [pending, setPending] = useState<PendingType>(null);
  const pendingRef = useRef<PendingType>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);

  const isTyping = pending !== null;

  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  useEffect(() => {
    onFlatTiltChange?.(inputFocused || isTyping || hasSelection);
  }, [hasSelection, inputFocused, isTyping, onFlatTiltChange]);

  useEffect(() => {
    const node = panelRef.current;
    if (!node) {
      return;
    }
    const syncSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setHasSelection(false);
        return;
      }
      const anchor = selection.anchorNode;
      setHasSelection(Boolean(anchor && node.contains(anchor)));
    };
    document.addEventListener("selectionchange", syncSelection);
    return () => document.removeEventListener("selectionchange", syncSelection);
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [transcript, pending, scrollToBottom]);

  const finishTyping = useCallback((lines: TerminalSegment[][]) => {
    setTranscript((prev) => {
      const next = [...prev];
      const last = next.at(-1);
      if (last?.kind === "output") {
        next[next.length - 1] = { ...last, lines, complete: true };
      }
      return next;
    });
    setPending(null);
  }, []);

  const flushPendingOutput = useCallback(() => {
    const current = pendingRef.current;
    if (!current) {
      return;
    }
    setTranscript((prev) => {
      const next = [...prev];
      const last = next.at(-1);
      if (last?.kind === "output" && !last.complete) {
        next[next.length - 1] = {
          kind: "output",
          lines: current.lines,
          complete: true,
        };
      }
      return next;
    });
    setPending(null);
  }, []);

  const startTypingOutput = useCallback(
    (lines: TerminalSegment[][]) => {
      if (reducedMotion) {
        setTranscript((prev) => [
          ...prev,
          { kind: "output", lines, complete: true },
        ]);
        return;
      }
      setTranscript((prev) => [
        ...prev,
        { kind: "output", lines, complete: false },
      ]);
      setPending({ lines, visibleChars: 0 });
    },
    [reducedMotion],
  );

  useEffect(() => {
    if (!pending || reducedMotion) {
      return;
    }
    const fullPlain = segmentsToPlain(pending.lines);
    if (pending.visibleChars >= fullPlain.length) {
      const doneTimer = window.setTimeout(() => finishTyping(pending.lines), 0);
      return () => window.clearTimeout(doneTimer);
    }
    const timer = window.setTimeout(() => {
      setPending((current) => {
        if (!current) {
          return current;
        }
        const nextChars = current.visibleChars + 1;
        const plain = segmentsToPlain(current.lines);
        if (nextChars >= plain.length) {
          window.setTimeout(() => finishTyping(current.lines), 0);
          return null;
        }
        return { ...current, visibleChars: nextChars };
      });
    }, motionHeroTerminal.responseCharIntervalMs);
    return () => window.clearTimeout(timer);
  }, [finishTyping, pending, reducedMotion]);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) {
        return;
      }
      flushPendingOutput();
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
      setTranscript((prev) => [...prev, { kind: "input", text: trimmed }]);
      setInput("");

      const result = runHeroTerminalCommand(trimmed);
      if (result.kind === "clear") {
        setTranscript([]);
        setPending(null);
        return;
      }
      if (result.kind === "unknown") {
        startTypingOutput(formatUnknownCommand(result.command));
        return;
      }
      startTypingOutput(result.lines);
    },
    [flushPendingOutput, startTypingOutput],
  );

  const skipTyping = useCallback(() => {
    if (!pending) {
      return;
    }
    finishTyping(pending.lines);
  }, [finishTyping, pending]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isTyping && !input.trim()) {
        skipTyping();
        return;
      }
      runCommand(input);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) {
        return;
      }
      const nextIndex =
        historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < 0) {
        return;
      }
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
    }
  };

  const onChip = (command: string) => {
    runCommand(command);
  };

  return (
    <div
      ref={panelRef}
      className="hero-terminal-interactive mt-2 border-t border-white/10 pt-2"
      data-lenis-prevent=""
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        if (
          target.closest("a") ||
          target.closest("button") ||
          target.closest("input")
        ) {
          return;
        }
        inputRef.current?.focus({ preventScroll: true });
      }}
    >
      <div
        ref={scrollRef}
        className="hero-terminal-scroll max-h-[9.5rem] overflow-y-auto overscroll-contain pr-0.5"
      >
        {transcript.map((entry, index) => (
          <div key={`${entry.kind}-${index}`} className="mb-1.5 font-mono">
            {entry.kind === "input" ? (
              <p className="text-brand-accent text-[10px] leading-[1.55] sm:text-[10.5px]">
                <span className="text-white/40">$ </span>
                {entry.text}
              </p>
            ) : entry.complete ? (
              <div className="text-muted-foreground space-y-0.5 text-[10px] leading-[1.55] sm:text-[10.5px]">
                {entry.lines.map((line, lineIndex) => (
                  <OutputLine key={lineIndex} line={line} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-[10px] leading-[1.55] whitespace-pre-wrap sm:text-[10.5px]">
                {pending
                  ? segmentsToPlain(pending.lines).slice(
                      0,
                      pending.visibleChars,
                    )
                  : null}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {QUICK_COMMANDS.map((command) => (
          <button
            key={command}
            type="button"
            className={cn(
              "hero-terminal-chip rounded-md border border-white/12 bg-white/[0.03] px-2 py-1 font-mono text-[9px] text-white/70 transition-colors sm:text-[10px]",
              "hover:border-brand-accent/45 hover:text-brand-accent",
              "focus-visible:border-brand-accent/55 focus-visible:text-brand-accent focus-visible:outline-none",
            )}
            onClick={() => onChip(command)}
          >
            {command}
          </button>
        ))}
      </div>

      <HeroTerminalPromptLine
        inputId={inputId}
        inputRef={inputRef}
        value={input}
        onChange={setInput}
        onKeyDown={onKeyDown}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
    </div>
  );
}

function HeroTerminalPromptLine({
  inputId,
  inputRef,
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
}: {
  inputId: string;
  inputRef: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <>
      <label htmlFor={inputId} className="sr-only">
        Hero terminal command
      </label>
      <div className="mt-2 flex items-center gap-1 font-mono text-[10px] leading-[1.55] sm:text-[10.5px]">
        <span className="text-brand-accent shrink-0">$</span>
        <input
          id={inputId}
          ref={inputRef}
          type="text"
          value={value}
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="go"
          className="text-foreground min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-[10px] leading-[1.55] outline-none sm:text-[10.5px]"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span
          aria-hidden
          className="hero-terminal-input-caret text-brand-accent ml-px w-[0.45em] shrink-0 animate-pulse text-center motion-reduce:animate-none"
        >
          ▍
        </span>
      </div>
    </>
  );
}
