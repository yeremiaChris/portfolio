"use client";

import { useSyncExternalStore } from "react";

const POINTER_FINE_QUERY = "(pointer: fine)";

function subscribe(onStoreChange: () => void): () => void {
  const media = window.matchMedia(POINTER_FINE_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getPointerFineSnapshot(): boolean {
  return window.matchMedia(POINTER_FINE_QUERY).matches;
}

function getPointerFineServerSnapshot(): boolean {
  return false;
}

export function usePointerFine(): boolean {
  return useSyncExternalStore(
    subscribe,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot,
  );
}
