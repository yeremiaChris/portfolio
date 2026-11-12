"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";

import {
  handleFocusTrap,
  resolveCommandPaletteKey,
} from "@/lib/gallery/command-palette-keyboard";
import { fuzzyFilterItems } from "@/lib/gallery/fuzzy-filter";
import type { GalleryComponentProps } from "@/lib/gallery/types";
import { cn } from "@/lib/utils";

const DEMO_COMMANDS = [
  { id: "home", label: "Go to Overview", keywords: "dashboard start" },
  { id: "projects", label: "Open Projects", keywords: "work portfolio" },
  { id: "blog", label: "Browse Blog", keywords: "writing posts" },
  { id: "lab", label: "Open Lab", keywords: "chat experiment" },
  { id: "copy", label: "Copy page link", keywords: "share url clipboard" },
  { id: "contact", label: "Contact", keywords: "email hire" },
] as const;

type CommandPaletteProps = GalleryComponentProps;

export default function CommandPalette({
  mode = "detail",
}: CommandPaletteProps) {
  const [open, setOpen] = useState(mode === "preview");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const inputId = useId();
  const liveId = useId();

  const results = fuzzyFilterItems(DEMO_COMMANDS, query);

  const activeOptionIndex =
    results.length === 0
      ? -1
      : activeIndex >= results.length || activeIndex < 0
        ? 0
        : activeIndex;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }, []);

  const openPalette = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    if (mode === "preview") return;

    const onKeyDown = (event: KeyboardEvent) => {
      const action = resolveCommandPaletteKey({
        key: event.key,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        open,
        activeIndex: activeOptionIndex,
        resultCount: results.length,
      });

      if (action.type === "open") {
        event.preventDefault();
        openPalette();
        return;
      }
      if (action.type === "close") {
        event.preventDefault();
        close();
        return;
      }
      if (action.type === "move") {
        event.preventDefault();
        setActiveIndex(action.index);
        return;
      }
      if (action.type === "select") {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeOptionIndex, close, mode, open, openPalette, results.length]);

  useEffect(() => {
    if (!open || mode === "preview") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (dialogRef.current) {
        handleFocusTrap(dialogRef.current, event);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mode, open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const resultLabel =
    results.length === 1 ? "1 result" : `${results.length} results`;

  return (
    <div
      className={cn(
        "relative w-full font-[family-name:var(--cp-font)] text-[color:var(--cp-text)]",
        mode === "preview" ? "min-h-[11rem]" : "min-h-[12rem]",
      )}
      data-gallery-item="command-palette"
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-2",
          mode === "preview" ? "justify-center" : "justify-start",
        )}
      >
        <button
          ref={triggerRef}
          type="button"
          onClick={() => (open ? close() : openPalette())}
          className={cn(
            "inline-flex items-center gap-2 rounded-[var(--cp-radius)] border border-[color:var(--cp-border)] bg-[color:var(--cp-surface)] px-3 py-2 text-sm",
            "transition-colors hover:bg-[color:var(--cp-hover)] motion-reduce:transition-none",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cp-accent)]",
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
        >
          <SearchIcon
            className="size-4 text-[color:var(--cp-muted)]"
            aria-hidden
          />
          <span>Search commands</span>
          {mode !== "preview" ? (
            <kbd className="text-muted-foreground ml-2 hidden rounded border border-[color:var(--cp-border)] bg-[color:var(--cp-hover)] px-1.5 py-0.5 text-[10px] font-medium sm:inline">
              ⌘K
            </kbd>
          ) : null}
        </button>
      </div>

      {open ? (
        <div
          className={cn(
            "absolute inset-0 z-10 flex items-start justify-center pt-2",
            mode === "preview" ? "pt-0" : "sm:pt-6",
          )}
          style={{ backgroundColor: "var(--cp-overlay)" }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={inputId}
            className={cn(
              "w-full max-w-md overflow-hidden border border-[color:var(--cp-border)] bg-[color:var(--cp-surface)] shadow-lg",
              "motion-reduce:transition-none",
            )}
            style={{ borderRadius: "var(--cp-radius)" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-[color:var(--cp-border)] px-3 py-2">
              <SearchIcon
                className="size-4 shrink-0 text-[color:var(--cp-muted)]"
                aria-hidden
              />
              <input
                ref={inputRef}
                id={inputId}
                type="search"
                role="combobox"
                aria-expanded="true"
                aria-controls={listboxId}
                aria-autocomplete="list"
                aria-activedescendant={
                  activeOptionIndex >= 0
                    ? `${listboxId}-option-${activeOptionIndex}`
                    : undefined
                }
                placeholder="Type a command…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={(event) => {
                  const action = resolveCommandPaletteKey({
                    key: event.key,
                    open: true,
                    activeIndex: activeOptionIndex,
                    resultCount: results.length,
                  });
                  if (action.type === "move") {
                    event.preventDefault();
                    setActiveIndex(action.index);
                  }
                  if (action.type === "select") {
                    event.preventDefault();
                    close();
                  }
                  if (action.type === "close") {
                    event.preventDefault();
                    close();
                  }
                }}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--cp-muted)]"
              />
            </div>

            <p
              id={liveId}
              className="sr-only"
              aria-live="polite"
              aria-atomic="true"
            >
              {resultLabel}
            </p>

            <ul
              id={listboxId}
              role="listbox"
              aria-label="Commands"
              className="max-h-48 overflow-y-auto py-1"
            >
              {results.length === 0 ? (
                <li
                  role="presentation"
                  className="px-3 py-6 text-center text-sm text-[color:var(--cp-muted)]"
                >
                  No matches
                </li>
              ) : (
                results.map((item, index) => {
                  const selected = index === activeOptionIndex;
                  return (
                    <li
                      key={item.id}
                      id={`${listboxId}-option-${index}`}
                      role="option"
                      aria-selected={selected}
                    >
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => close()}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={cn(
                          "flex w-full items-center px-3 py-2 text-left text-sm transition-colors",
                          "motion-reduce:transition-none",
                          selected
                            ? "bg-[color:var(--cp-accent)] text-[color:var(--cp-accent-fg)]"
                            : "hover:bg-[color:var(--cp-hover)]",
                        )}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
