"use client";

import { type RefObject, useLayoutEffect, useRef } from "react";

import { captureFlipRects, runHeaderBarFlip } from "@/lib/header-bar-flip";

const FLIP_ITEM_SELECTOR = "[data-flip-item]";

export function useHeaderBarFlip(
  barRef: RefObject<HTMLElement | null>,
  compact: boolean,
  reducedMotion: boolean,
) {
  const previousRectsRef = useRef<Map<Element, DOMRect> | null>(null);
  const compactRef = useRef(compact);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const items = Array.from(bar.querySelectorAll(FLIP_ITEM_SELECTOR));

    if (
      !reducedMotion &&
      previousRectsRef.current &&
      compactRef.current !== compact
    ) {
      runHeaderBarFlip(items, previousRectsRef.current);
    }

    compactRef.current = compact;
    previousRectsRef.current = reducedMotion ? null : captureFlipRects(items);
  }, [barRef, compact, reducedMotion]);
}
