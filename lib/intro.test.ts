import { describe, expect, it } from "vitest";

import {
  INTRO_BAR_DELAY_MS,
  INTRO_BOOTSTRAP_SCRIPT,
  INTRO_DURATION_MS,
  INTRO_EXIT_MS,
  INTRO_HOLD_MS,
  INTRO_PLAYING_STATE,
  INTRO_SEEN_STATE,
  INTRO_SEEN_VALUE,
  INTRO_STORAGE_KEY,
  applyIntroSkipFlags,
  getIntroCompleteAfterMs,
  getIntroExitAfterMs,
  getIntroSeenFlag,
  isIntroSeen,
  isSlowConnection,
  markIntroSeen,
  shouldShowIntro,
  shouldSkipIntroCover,
  type IntroDocumentFlags,
  type IntroStorage,
} from "./intro";

function createMemoryStorage(
  initial: Record<string, string> = {},
): IntroStorage & { data: Map<string, string> } {
  const data = new Map(Object.entries(initial));

  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value);
    },
  };
}

describe("intro timings", () => {
  it("holds after the bar finishes filling, then fades out", () => {
    expect(INTRO_BAR_DELAY_MS).toBe(0);
    expect(getIntroExitAfterMs()).toBe(
      INTRO_BAR_DELAY_MS + INTRO_DURATION_MS + INTRO_HOLD_MS,
    );
    expect(getIntroCompleteAfterMs()).toBe(
      getIntroExitAfterMs() + INTRO_EXIT_MS,
    );
  });

  it("keeps the first-visit overlay short enough for LCP", () => {
    expect(getIntroExitAfterMs()).toBeLessThanOrEqual(1100);
    expect(getIntroCompleteAfterMs()).toBeLessThanOrEqual(1300);
  });
});

describe("isSlowConnection", () => {
  it("treats missing connection data as fast enough for the intro", () => {
    expect(isSlowConnection(null)).toBe(false);
    expect(isSlowConnection(undefined)).toBe(false);
    expect(isSlowConnection({})).toBe(false);
    expect(isSlowConnection({ effectiveType: "4g" })).toBe(false);
  });

  it("skips on save-data or 2g/3g hints", () => {
    expect(isSlowConnection({ saveData: true })).toBe(true);
    expect(isSlowConnection({ effectiveType: "slow-2g" })).toBe(true);
    expect(isSlowConnection({ effectiveType: "2g" })).toBe(true);
    expect(isSlowConnection({ effectiveType: "3g" })).toBe(true);
  });
});

describe("shouldShowIntro", () => {
  it("shows on a first visit when motion is allowed", () => {
    expect(shouldShowIntro({ reducedMotion: false, seen: false })).toBe(true);
  });

  it("skips when the user prefers reduced motion", () => {
    expect(shouldShowIntro({ reducedMotion: true, seen: false })).toBe(false);
  });

  it("skips when the intro was already seen", () => {
    expect(shouldShowIntro({ reducedMotion: false, seen: true })).toBe(false);
  });

  it("skips on a slow connection", () => {
    expect(
      shouldShowIntro({
        reducedMotion: false,
        seen: false,
        slowConnection: true,
      }),
    ).toBe(false);
  });
});

describe("shouldSkipIntroCover", () => {
  it("keeps the first-paint cover on an unseen visit", () => {
    expect(shouldSkipIntroCover({ reducedMotion: false, seen: false })).toBe(
      false,
    );
  });

  it("skips the cover when the intro should not run", () => {
    expect(shouldSkipIntroCover({ reducedMotion: true, seen: false })).toBe(
      true,
    );
    expect(shouldSkipIntroCover({ reducedMotion: false, seen: true })).toBe(
      true,
    );
    expect(
      shouldSkipIntroCover({
        reducedMotion: false,
        seen: false,
        slowConnection: true,
      }),
    ).toBe(true);
  });
});

describe("applyIntroSkipFlags", () => {
  it("leaves the cover visible for a first visit", () => {
    const dataset: IntroDocumentFlags = {};

    applyIntroSkipFlags(dataset, { reducedMotion: false, seen: false });

    expect(dataset.intro).toBeUndefined();
  });

  it("hides the cover before paint on seen, reduced-motion, or slow visits", () => {
    const seen: IntroDocumentFlags = {};
    const reduced: IntroDocumentFlags = {};
    const slow: IntroDocumentFlags = {};

    applyIntroSkipFlags(seen, { reducedMotion: false, seen: true });
    applyIntroSkipFlags(reduced, { reducedMotion: true, seen: false });
    applyIntroSkipFlags(slow, {
      reducedMotion: false,
      seen: false,
      slowConnection: true,
    });

    expect(seen.intro).toBe(INTRO_SEEN_STATE);
    expect(reduced.intro).toBe(INTRO_SEEN_STATE);
    expect(slow.intro).toBe(INTRO_SEEN_STATE);
  });
});

describe("INTRO_BOOTSTRAP_SCRIPT", () => {
  it("hides the cover before paint on seen, reduced-motion, or slow visits", () => {
    expect(INTRO_BOOTSTRAP_SCRIPT).toContain(INTRO_STORAGE_KEY);
    expect(INTRO_BOOTSTRAP_SCRIPT).toContain(INTRO_SEEN_VALUE);
    expect(INTRO_BOOTSTRAP_SCRIPT).toContain("prefers-reduced-motion");
    expect(INTRO_BOOTSTRAP_SCRIPT).toContain("saveData");
    expect(INTRO_BOOTSTRAP_SCRIPT).toContain(
      `d.dataset.intro="${INTRO_SEEN_STATE}"`,
    );
    expect(INTRO_BOOTSTRAP_SCRIPT).not.toContain("introCover");
  });

  it("starts the CSS intro immediately and completes after the overlay exits", () => {
    expect(INTRO_BOOTSTRAP_SCRIPT).toContain(
      `d.dataset.intro="${INTRO_PLAYING_STATE}"`,
    );
    expect(INTRO_BOOTSTRAP_SCRIPT).toContain("setTimeout");
    expect(INTRO_BOOTSTRAP_SCRIPT).toContain(String(getIntroCompleteAfterMs()));
  });
});

describe("isIntroSeen", () => {
  it("treats only the seen flag as seen", () => {
    expect(isIntroSeen(INTRO_SEEN_VALUE)).toBe(true);
    expect(isIntroSeen(null)).toBe(false);
    expect(isIntroSeen("")).toBe(false);
    expect(isIntroSeen("true")).toBe(false);
  });
});

describe("getIntroSeenFlag", () => {
  it("returns false without storage", () => {
    expect(getIntroSeenFlag(null)).toBe(false);
  });

  it("reads the session flag", () => {
    const storage = createMemoryStorage({
      [INTRO_STORAGE_KEY]: INTRO_SEEN_VALUE,
    });

    expect(getIntroSeenFlag(storage)).toBe(true);
    expect(getIntroSeenFlag(createMemoryStorage())).toBe(false);
  });

  it("returns false when storage throws", () => {
    const storage: IntroStorage = {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => undefined,
    };

    expect(getIntroSeenFlag(storage)).toBe(false);
  });
});

describe("markIntroSeen", () => {
  it("no-ops without storage", () => {
    expect(() => markIntroSeen(null)).not.toThrow();
  });

  it("writes the seen flag", () => {
    const storage = createMemoryStorage();

    markIntroSeen(storage);

    expect(storage.data.get(INTRO_STORAGE_KEY)).toBe(INTRO_SEEN_VALUE);
  });

  it("swallows storage write errors", () => {
    const storage: IntroStorage = {
      getItem: () => null,
      setItem: () => {
        throw new Error("denied");
      },
    };

    expect(() => markIntroSeen(storage)).not.toThrow();
  });
});
