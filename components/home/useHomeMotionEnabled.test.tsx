// @vitest-environment jsdom

import React from "react";
import { renderToString } from "react-dom/server";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionConfig } from "motion/react";

import {
  useHomeMotion,
  useHomePointerEffectsEnabled,
  useHomeScrollMotionEnabled,
} from "@/components/home/useHomeMotionEnabled";

function MotionGateProbe() {
  const motion = useHomeMotion();
  const scroll = useHomeScrollMotionEnabled();
  const pointer = useHomePointerEffectsEnabled();
  return (
    <span
      data-testid="motion-gate"
      data-scroll={scroll ? "1" : "0"}
      data-pointer={pointer ? "1" : "0"}
      data-reduced={motion.reduced ? "1" : "0"}
    />
  );
}

describe("useHomeMotion", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query === "(pointer: fine)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
        onchange: null,
      })),
    );
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.unstubAllGlobals();
  });

  it("server snapshot keeps motion gates off", () => {
    const html = renderToString(<MotionGateProbe />);
    expect(html).toContain('data-scroll="0"');
    expect(html).toContain('data-pointer="0"');
  });

  it("enables scroll and pointer motion after hydration on desktop", () => {
    act(() => {
      root.render(
        <MotionConfig reducedMotion="never">
          <MotionGateProbe />
        </MotionConfig>,
      );
    });
    const node = container.querySelector('[data-testid="motion-gate"]');
    expect(node?.getAttribute("data-scroll")).toBe("1");
    expect(node?.getAttribute("data-pointer")).toBe("1");
    expect(node?.getAttribute("data-reduced")).toBe("0");
  });
});
