import type { CSSProperties } from "react";

export function headerShellMotionStyle(compact: boolean): CSSProperties {
  if (!compact) {
    return {
      borderRadius: 0,
      borderWidth: 0,
      borderStyle: "solid",
      borderColor: "transparent",
      boxShadow: "none",
      backgroundColor: "transparent",
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
    };
  }

  return {
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(223 226 235 / 0.35)",
    boxShadow: "0 8px 32px rgb(0 0 0 / 0.28)",
    backgroundColor: "rgb(22 27 34 / 0.72)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };
}
