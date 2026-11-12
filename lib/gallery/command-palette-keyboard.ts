export type CommandPaletteKey =
  "ArrowDown" | "ArrowUp" | "Enter" | "Escape" | "Tab";

export function nextActiveIndex(
  current: number,
  direction: "up" | "down",
  length: number,
): number {
  if (length <= 0) return -1;
  if (current < 0) return direction === "down" ? 0 : length - 1;
  if (direction === "down") {
    return current >= length - 1 ? 0 : current + 1;
  }
  return current <= 0 ? length - 1 : current - 1;
}

export type CommandPaletteKeyboardInput = {
  key: string;
  shiftKey?: boolean;
  metaKey?: boolean;
  ctrlKey?: boolean;
  open: boolean;
  activeIndex: number;
  resultCount: number;
};

export type CommandPaletteKeyboardAction =
  | { type: "open" }
  | { type: "close" }
  | { type: "move"; index: number }
  | { type: "select"; index: number }
  | { type: "none" };

function isModK(
  event: Pick<CommandPaletteKeyboardInput, "key" | "metaKey" | "ctrlKey">,
) {
  return (
    event.key.toLowerCase() === "k" &&
    (event.metaKey === true || event.ctrlKey === true)
  );
}

export function resolveCommandPaletteKey(
  event: CommandPaletteKeyboardInput,
): CommandPaletteKeyboardAction {
  if (isModK(event)) {
    return event.open ? { type: "close" } : { type: "open" };
  }

  if (!event.open) {
    return { type: "none" };
  }

  if (event.key === "Escape") {
    return { type: "close" };
  }

  if (event.key === "ArrowDown") {
    return {
      type: "move",
      index: nextActiveIndex(event.activeIndex, "down", event.resultCount),
    };
  }

  if (event.key === "ArrowUp") {
    return {
      type: "move",
      index: nextActiveIndex(event.activeIndex, "up", event.resultCount),
    };
  }

  if (event.key === "Enter" && event.activeIndex >= 0) {
    return { type: "select", index: event.activeIndex };
  }

  return { type: "none" };
}

export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

export function handleFocusTrap(root: HTMLElement, event: KeyboardEvent): void {
  if (event.key !== "Tab") return;
  const focusable = getFocusableElements(root);
  if (focusable.length === 0) return;

  const first = focusable[0]!;
  const last = focusable[focusable.length - 1]!;
  const active = document.activeElement;

  if (event.shiftKey) {
    if (active === first || !root.contains(active)) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (active === last) {
    event.preventDefault();
    first.focus();
  }
}
