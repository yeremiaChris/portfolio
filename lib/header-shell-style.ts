import type { CSSProperties } from "react";

export function headerShellMotionStyle(compact: boolean): CSSProperties {
  return {
    borderRadius: 9999,
    borderWidth: compact ? 1 : 0,
    borderStyle: "solid",
    borderColor: compact ? "rgb(223 226 235 / 0.35)" : "transparent",
  };
}
