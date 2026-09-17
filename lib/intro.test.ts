import { describe, expect, it } from "vitest";

import {
  INTRO_BAR_DELAY_MS,
  INTRO_DURATION_MS,
  INTRO_HOLD_MS,
  INTRO_SEEN_VALUE,
  INTRO_STAGGER_MS,
  INTRO_STORAGE_KEY,
  completeIntro,
  getIntroClientSnapshot,
  getIntroExitAfterMs,
  getIntroSeenFlag,
  getIntroServerSnapshot,
  getSessionStorage,
  isIntroSeen,
  markIntroSeen,
  prefersReducedMotion,
  shouldShowIntro,
  subscribeIntroVisibility,
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

describe("getIntroExitAfterMs", () => {
  it("holds after the staggered bar finishes filling", () => {
    expect(INTRO_BAR_DELAY_MS).toBe(INTRO_STAGGER_MS * 3);
    expect(getIntroExitAfterMs()).toBe(
      INTRO_BAR_DELAY_MS + INTRO_DURATION_MS + INTRO_HOLD_MS,
    );
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

  it("skips when both reduced motion and seen apply", () => {
    expect(shouldShowIntro({ reducedMotion: true, seen: true })).toBe(false);
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

describe("browser-safe intro helpers", () => {
  it("returns null storage and no reduced motion in Node", () => {
    expect(getSessionStorage()).toBeNull();
    expect(prefersReducedMotion()).toBe(false);
    expect(getIntroClientSnapshot()).toBe(true);
    expect(getIntroServerSnapshot()).toBe(true);
  });

  it("subscribe is a no-op without window", () => {
    const unsubscribe = subscribeIntroVisibility(() => undefined);

    expect(() => unsubscribe()).not.toThrow();
  });

  it("completeIntro marks storage without a window", () => {
    const storage = createMemoryStorage();

    completeIntro(storage);

    expect(storage.data.get(INTRO_STORAGE_KEY)).toBe(INTRO_SEEN_VALUE);
  });
});
