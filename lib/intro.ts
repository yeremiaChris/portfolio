export const INTRO_STORAGE_KEY = "intro-seen";
export const INTRO_SEEN_VALUE = "1";
export const INTRO_DURATION_MS = 700;
export const INTRO_HOLD_MS = 80;
export const INTRO_EXIT_MS = 250;
export const INTRO_BAR_DELAY_MS = 0;
export const INTRO_SEEN_STATE = "seen";
export const INTRO_PLAYING_STATE = "playing";

export interface IntroDecisionInput {
  reducedMotion: boolean;
  seen: boolean;
  slowConnection?: boolean;
}

export interface IntroDocumentFlags {
  intro?: string;
}

export interface IntroStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

export interface NetworkConnectionHint {
  saveData?: boolean;
  effectiveType?: string;
}

export function getIntroExitAfterMs(): number {
  return INTRO_BAR_DELAY_MS + INTRO_DURATION_MS + INTRO_HOLD_MS;
}

export function getIntroCompleteAfterMs(): number {
  return getIntroExitAfterMs() + INTRO_EXIT_MS;
}

export function isSlowConnection(
  connection: NetworkConnectionHint | null | undefined,
): boolean {
  if (!connection) return false;
  if (connection.saveData) return true;

  const type = connection.effectiveType;
  return type === "slow-2g" || type === "2g" || type === "3g";
}

export function shouldShowIntro({
  reducedMotion,
  seen,
  slowConnection = false,
}: IntroDecisionInput): boolean {
  if (reducedMotion) return false;
  if (seen) return false;
  if (slowConnection) return false;
  return true;
}

export function shouldSkipIntroCover(input: IntroDecisionInput): boolean {
  return !shouldShowIntro(input);
}

export function applyIntroSkipFlags(
  dataset: IntroDocumentFlags,
  input: IntroDecisionInput,
): void {
  if (!shouldSkipIntroCover(input)) return;
  dataset.intro = INTRO_SEEN_STATE;
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

export const INTRO_BOOTSTRAP_SCRIPT = `try{var d=document.documentElement;var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var s=sessionStorage.getItem("${INTRO_STORAGE_KEY}")==="${INTRO_SEEN_VALUE}";var c=navigator.connection;var slow=!!(c&&(c.saveData||c.effectiveType==="slow-2g"||c.effectiveType==="2g"||c.effectiveType==="3g"));if(s||r||slow)d.dataset.intro="${INTRO_SEEN_STATE}";else{d.dataset.intro="${INTRO_PLAYING_STATE}";window.setTimeout(function(){try{sessionStorage.setItem("${INTRO_STORAGE_KEY}","${INTRO_SEEN_VALUE}")}catch(e){}d.dataset.intro="${INTRO_SEEN_STATE}"},${getIntroCompleteAfterMs()})}}catch(e){}`;
