// @vitest-environment jsdom

import { createRoot, type Root } from "react-dom/client";
import { act, StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ChatMessage } from "@/components/lab/ChatMessage";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("ChatMessage assistant markdown", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    root.unmount();
    container.remove();
  });

  it("renders bold markdown and preserves citation markers", async () => {
    await act(async () => {
      root.render(
        <StrictMode>
          <ChatMessage
            role="assistant"
            content="He builds **Next.js** apps [1]."
            status="done"
          />
        </StrictMode>,
      );
    });

    const strong = container.querySelector("strong");
    expect(strong?.textContent).toBe("Next.js");
    expect(container.textContent).toContain("[1]");
  });

  it("does not render raw HTML from assistant content", async () => {
    await act(async () => {
      root.render(
        <StrictMode>
          <ChatMessage
            role="assistant"
            content={'<script>alert("xss")</script>'}
            status="done"
          />
        </StrictMode>,
      );
    });

    expect(container.querySelector("script")).toBeNull();
    expect(container.innerHTML).not.toMatch(/<script/i);
  });
});
