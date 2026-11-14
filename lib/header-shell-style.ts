import type { CSSProperties } from "react";

export function headerShellBackdropStyle(compact: boolean): CSSProperties {
  return {
    borderRadius: 9999,
    backgroundColor: compact ? "rgb(22 27 34 / 0.82)" : "rgb(22 27 34 / 0)",
    boxShadow: compact ? "0 12px 40px -16px rgb(0 0 0 / 0.5)" : "none",
    backdropFilter: compact ? "blur(14px)" : "blur(0px)",
    WebkitBackdropFilter: compact ? "blur(14px)" : "blur(0px)",
  };
}
