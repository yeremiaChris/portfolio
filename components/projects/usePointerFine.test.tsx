// @vitest-environment jsdom

import React from "react";
import { renderToString } from "react-dom/server";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { usePointerFine } from "@/components/projects/usePointerFine";

function PointerFineProbe() {
  const fine = usePointerFine();
  return (
    <span data-testid="pointer-fine" data-value={fine ? "true" : "false"} />
  );
}

describe("usePointerFine", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.restoreAllMocks();
  });

  it("server snapshot defaults to coarse pointer (false)", () => {
    const html = renderToString(<PointerFineProbe />);
    expect(html).toContain('data-value="false"');
  });

  it("reads fine pointer from matchMedia on hydrate", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(pointer: fine)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    act(() => {
      root.render(<PointerFineProbe />);
    });

    const node = container.querySelector('[data-testid="pointer-fine"]');
    expect(node?.getAttribute("data-value")).toBe("true");
  });
});
