export const INTRO_STORAGE_KEY = "intro-seen";
export const INTRO_SEEN_VALUE = "1";
export const INTRO_DURATION_MS = 520;
export const INTRO_HOLD_MS = 40;
export const INTRO_EXIT_MS = 180;
export const INTRO_BAR_DELAY_MS = 0;
export const INTRO_SEEN_STATE = "seen";
export const INTRO_PLAYING_STATE = "playing";
export const INTRO_MOBILE_MAX_WIDTH_PX = 767;

export interface IntroDecisionInput {
  reducedMotion: boolean;
  seen: boolean;
  slowConnection?: boolean;
  mobileViewport?: boolean;
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

export function isMobileIntroViewport(
  viewportWidth: number | null | undefined,
): boolean {
  if (viewportWidth == null) return false;
  return viewportWidth <= INTRO_MOBILE_MAX_WIDTH_PX;
}

export function shouldShowIntro({
  reducedMotion,
  seen,
  slowConnection = false,
  mobileViewport = false,
}: IntroDecisionInput): boolean {
  if (reducedMotion) return false;
  if (seen) return false;
  if (slowConnection) return false;
  if (mobileViewport) return false;
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

export function isIntroDismissKey(key: string): boolean {
  return (
    key === "Escape" || key === "Enter" || key === " " || key === "Spacebar"
  );
}

export function getIntroTimingCss(): string {
  return `:root{--intro-bar-duration:${INTRO_DURATION_MS}ms;--intro-bar-delay:${INTRO_BAR_DELAY_MS}ms;--intro-exit-delay:${getIntroExitAfterMs()}ms;--intro-exit-duration:${INTRO_EXIT_MS}ms}`;
}

export const INTRO_TIMING_CSS = getIntroTimingCss();

export const INTRO_CRITICAL_CSS = `html[data-intro="${INTRO_SEEN_STATE}"] [data-intro-cover]{display:none!important}@media (max-width:${INTRO_MOBILE_MAX_WIDTH_PX}px){[data-intro-cover]{display:none!important}}@media (prefers-reduced-motion:reduce){[data-intro-cover]{display:none!important}}`;

export function buildIntroBootstrapScript(): string {
  const completeMs = getIntroCompleteAfterMs();
  return `try{var d=document.documentElement;var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var mob=window.matchMedia("(max-width: ${INTRO_MOBILE_MAX_WIDTH_PX}px)").matches;var s=sessionStorage.getItem("${INTRO_STORAGE_KEY}")==="${INTRO_SEEN_VALUE}";var c=navigator.connection;var slow=!!(c&&(c.saveData||c.effectiveType==="slow-2g"||c.effectiveType==="2g"||c.effectiveType==="3g"));if(s||r||slow||mob){d.dataset.intro="${INTRO_SEEN_STATE}"}else{d.dataset.intro="${INTRO_PLAYING_STATE}";var done=false;var t=window.setTimeout(function(){finish()},${completeMs});function finish(){if(done)return;done=true;cleanup();try{sessionStorage.setItem("${INTRO_STORAGE_KEY}","${INTRO_SEEN_VALUE}")}catch(e){}d.dataset.intro="${INTRO_SEEN_STATE}"}function skip(){if(done)return;done=true;window.clearTimeout(t);cleanup();try{sessionStorage.setItem("${INTRO_STORAGE_KEY}","${INTRO_SEEN_VALUE}")}catch(e){}d.dataset.intro="${INTRO_SEEN_STATE}"}function onClick(){skip()}function onKey(e){var k=e.key;if(k==="Escape"||k==="Enter"||k===" "||k==="Spacebar"){e.preventDefault();skip()}}function cleanup(){document.removeEventListener("click",onClick,true);document.removeEventListener("keydown",onKey,true)}document.addEventListener("click",onClick,true);document.addEventListener("keydown",onKey,true)}}catch(e){}`;
}

export const INTRO_BOOTSTRAP_SCRIPT = buildIntroBootstrapScript();
