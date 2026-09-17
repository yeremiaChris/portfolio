export const INTRO_STORAGE_KEY = "intro-seen";
export const INTRO_SEEN_VALUE = "1";
export const INTRO_DURATION_MS = 1400;
export const INTRO_STAGGER_MS = 80;
export const INTRO_HOLD_MS = 250;
export const INTRO_EXIT_MS = 560;
export const INTRO_BAR_DELAY_MS = INTRO_STAGGER_MS * 3;
export const INTRO_EASE = [0.22, 1, 0.36, 1] as const;
export const INTRO_VISIBILITY_EVENT = "intro:visibility";

export const INTRO_BOOTSTRAP_SCRIPT = `try{var d=document.documentElement;var s=sessionStorage.getItem("${INTRO_STORAGE_KEY}")==="${INTRO_SEEN_VALUE}";var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(s)d.dataset.intro="seen";if(s||r)d.dataset.introReady="true"}catch(e){}`;

export interface IntroDecisionInput {
  reducedMotion: boolean;
  seen: boolean;
}

export interface IntroStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

export function getIntroExitAfterMs(): number {
  return INTRO_BAR_DELAY_MS + INTRO_DURATION_MS + INTRO_HOLD_MS;
}

export function shouldShowIntro({
  reducedMotion,
  seen,
}: IntroDecisionInput): boolean {
  if (reducedMotion) return false;
  if (seen) return false;
  return true;
}

export function isIntroSeen(value: string | null): boolean {
  return value === INTRO_SEEN_VALUE;
}

export function getIntroSeenFlag(storage: IntroStorage | null): boolean {
  if (!storage) return false;

  try {
    return isIntroSeen(storage.getItem(INTRO_STORAGE_KEY));
  } catch {
    return false;
  }
}

export function markIntroSeen(storage: IntroStorage | null): void {
  if (!storage) return;

  try {
    storage.setItem(INTRO_STORAGE_KEY, INTRO_SEEN_VALUE);
  } catch {
    return;
  }
}

export function markIntroReady(): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.introReady = "true";
}

export function getSessionStorage(): IntroStorage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function getIntroClientSnapshot(): boolean {
  return shouldShowIntro({
    reducedMotion: prefersReducedMotion(),
    seen: getIntroSeenFlag(getSessionStorage()),
  });
}

export function getIntroServerSnapshot(): boolean {
  return true;
}

export function notifyIntroVisibility(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(INTRO_VISIBILITY_EVENT));
}

export function subscribeIntroVisibility(
  onStoreChange: () => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  window.addEventListener(INTRO_VISIBILITY_EVENT, onStoreChange);

  return () => {
    media.removeEventListener("change", onStoreChange);
    window.removeEventListener(INTRO_VISIBILITY_EVENT, onStoreChange);
  };
}

export function completeIntro(storage: IntroStorage | null): void {
  markIntroSeen(storage);
  markIntroReady();
  notifyIntroVisibility();
}
