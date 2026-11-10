import { afterEach, describe, expect, it, vi } from "vitest";

import {
  scrollDocumentToElement,
  scrollDocumentToY,
  setLenisInstance,
} from "./programmatic-scroll";

describe("programmatic-scroll", () => {
  afterEach(() => {
    setLenisInstance(null);
  });

  it("delegates vertical scroll to lenis when registered", () => {
    const scrollTo = vi.fn();
    setLenisInstance({ scrollTo } as never);
    scrollDocumentToY(480);
    expect(scrollTo).toHaveBeenCalledWith(480, {
      immediate: undefined,
      duration: 0.85,
    });
  });

  it("delegates element scroll to lenis with the shared offset", () => {
    const scrollTo = vi.fn();
    setLenisInstance({ scrollTo } as never);
    scrollDocumentToElement({} as HTMLElement);
    expect(scrollTo).toHaveBeenCalledWith(expect.anything(), {
      offset: -96,
      duration: 0.85,
    });
  });
});
