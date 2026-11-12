// @vitest-environment jsdom

import { createRoot, type Root } from "react-dom/client";
import { act, StrictMode, useEffect, useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { getLenisInstance, setLenisInstance } from "@/lib/programmatic-scroll";

vi.mock("@/lib/schedule-idle", () => ({
  scheduleIdle: (task: () => void) => {
    task();
    return () => undefined;
  },
}));

vi.mock("lenis/dist/lenis.css", () => ({}));

vi.mock("lenis", () => ({
  default: class MockLenis {
    destroy = vi.fn();
  },
}));

describe("SmoothScroll", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    setLenisInstance(null);
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    root.unmount();
    container.remove();
    setLenisInstance(null);
  });

  it("keeps the same header and main nodes after Lenis becomes ready", async () => {
    const nodes = {
      header: null as HTMLElement | null,
      main: null as HTMLElement | null,
    };

    function LayoutProbe() {
      const headerRef = useRef<HTMLElement>(null);
      const mainRef = useRef<HTMLElement>(null);

      useEffect(() => {
        if (headerRef.current && mainRef.current && !nodes.header) {
          nodes.header = headerRef.current;
          nodes.main = mainRef.current;
        }
      });

      return (
        <>
          <header ref={headerRef} data-layout-probe="header">
            Header
          </header>
          <main ref={mainRef} data-layout-probe="main">
            Main
          </main>
        </>
      );
    }

    await act(async () => {
      root.render(
        <StrictMode>
          <SmoothScroll>
            <LayoutProbe />
          </SmoothScroll>
        </StrictMode>,
      );
    });

    await vi.waitFor(() => {
      expect(getLenisInstance()).not.toBeNull();
    });

    const header = container.querySelector('[data-layout-probe="header"]');
    const main = container.querySelector('[data-layout-probe="main"]');

    expect(header).toBe(nodes.header);
    expect(main).toBe(nodes.main);
    expect(document.body.contains(header)).toBe(true);
    expect(document.body.contains(main)).toBe(true);
  });

  it("renders layout probes without a Lenis wrapper element", async () => {
    await act(async () => {
      root.render(
        <SmoothScroll>
          <header data-layout-probe="header">Header</header>
          <main data-layout-probe="main">Main</main>
        </SmoothScroll>,
      );
    });

    expect(
      container.querySelector('[data-layout-probe="header"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-layout-probe="main"]'),
    ).not.toBeNull();
  });
});
