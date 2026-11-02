"use client";

import { useSyncExternalStore } from "react";

import type { ReadingPosition } from "@/lib/blog-series";

const READ_KEY = "blog-read-parts";
const POSITION_KEY = "blog-reading-positions";

type ReadingSnapshot = {
  read: string[];
  positions: Record<string, ReadingPosition>;
};

const EMPTY: ReadingSnapshot = { read: [], positions: {} };
const listeners = new Set<() => void>();
let cache: ReadingSnapshot | null = null;

function parseStored(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function isPosition(value: unknown): value is ReadingPosition {
  if (!value || typeof value !== "object") return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.scrollY === "number" && typeof entry.updatedAt === "number"
  );
}

function readSnapshot(): ReadingSnapshot {
  if (cache) return cache;
  const read = parseStored(READ_KEY);
  const positions = parseStored(POSITION_KEY);
  cache = {
    read: Array.isArray(read)
      ? read.filter((slug): slug is string => typeof slug === "string")
      : [],
    positions:
      positions && typeof positions === "object" && !Array.isArray(positions)
        ? Object.fromEntries(
            Object.entries(positions).filter(([, value]) => isPosition(value)),
          )
        : {},
  };
  return cache;
}

function writeSnapshot(next: ReadingSnapshot) {
  cache = next;
  try {
    window.localStorage.setItem(READ_KEY, JSON.stringify(next.read));
    window.localStorage.setItem(POSITION_KEY, JSON.stringify(next.positions));
  } catch {}
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === null ||
      event.key === READ_KEY ||
      event.key === POSITION_KEY
    ) {
      cache = null;
      listener();
    }
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useReadingStore(): ReadingSnapshot {
  return useSyncExternalStore(subscribe, readSnapshot, () => EMPTY);
}

export function setPartRead(slug: string, isRead: boolean) {
  const current = readSnapshot();
  const read = new Set(current.read);
  if (isRead) read.add(slug);
  else read.delete(slug);
  writeSnapshot({ ...current, read: [...read] });
}

export function saveReadingPosition(slug: string, position: ReadingPosition) {
  const current = readSnapshot();
  writeSnapshot({
    ...current,
    positions: { ...current.positions, [slug]: position },
  });
}
