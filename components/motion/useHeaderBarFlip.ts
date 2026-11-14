"use client";

import { type RefObject, useLayoutEffect, useRef } from "react";

import { runHeaderBarFlip } from "@/lib/header-bar-flip";
import {
  consumeHeaderFlipFirstRects,
  registerHeaderFlipBar,
} from "@/lib/header-flip-snapshot";

const FLIP_ITEM_SELECTOR = "[data-flip-item]";

export function useHeaderBarFlip(
  barRef: RefObject<HTMLElement | null>,
  compact: boolean,
  reducedMotion: boolean,
) {
  const compactRef = useRef(compact);

  useLayoutEffect(() => {
    registerHeaderFlipBar(barRef.current);
    return () => registerHeaderFlipBar(null);
  }, [barRef]);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const items = Array.from(bar.querySelectorAll(FLIP_ITEM_SELECTOR)).filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );

    const compactChanged = compactRef.current !== compact;

    if (!reducedMotion && compactChanged && items.length > 0) {
      const firstRects = consumeHeaderFlipFirstRects();
      if (firstRects) {
        runHeaderBarFlip(items, firstRects, { preToggleFirst: true });
      }
    }

    compactRef.current = compact;
  }, [barRef, compact, reducedMotion]);
}
