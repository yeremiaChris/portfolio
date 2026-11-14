"use client";

import { type RefObject, useLayoutEffect, useRef } from "react";

import {
  captureFlipRects,
  hasActiveHeaderFlipAnimation,
  runHeaderBarFlip,
} from "@/lib/header-bar-flip";

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

    const items = Array.from(bar.querySelectorAll(FLIP_ITEM_SELECTOR)).filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );

    const compactChanged = compactRef.current !== compact;

    if (
      !reducedMotion &&
      previousRectsRef.current &&
      compactChanged &&
      items.length > 0
    ) {
      runHeaderBarFlip(items, previousRectsRef.current);
    }

    compactRef.current = compact;

    if (reducedMotion) {
      previousRectsRef.current = null;
      return;
    }

    if (!items.some(hasActiveHeaderFlipAnimation)) {
      previousRectsRef.current = captureFlipRects(items);
    }
  }, [barRef, compact, reducedMotion]);
}
