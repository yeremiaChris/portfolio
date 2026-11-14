"use client";

import { type RefObject, useLayoutEffect, useRef } from "react";

import { runHeaderBarFlip } from "@/lib/header-bar-flip";

const FLIP_ITEM_SELECTOR = "[data-flip-item]";

export function useHeaderBarFlip(
  barRef: RefObject<HTMLElement | null>,
  compact: boolean,
  reducedMotion: boolean,
) {
  const compactRef = useRef(compact);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const items = Array.from(bar.querySelectorAll(FLIP_ITEM_SELECTOR)).filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );

    if (!reducedMotion && compactRef.current !== compact && items.length > 0) {
      runHeaderBarFlip(items);
    }

    compactRef.current = compact;
  }, [barRef, compact, reducedMotion]);
}
