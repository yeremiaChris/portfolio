export const artifactThemes = [
  { id: "emerald", hex: "#4edea3", label: "Obsidian Emerald", swatchClass: "text-primary" },
  { id: "cyan", hex: "#4cd7f6", label: "Cyber Cyan", swatchClass: "text-[#4cd7f6]" },
  { id: "tokyo", hex: "#bb86fc", label: "Tokyo Night", swatchClass: "text-[#bb86fc]" },
  { id: "amber", hex: "#fbbf24", label: "Solar Gold", swatchClass: "text-[#fbbf24]" },
] as const;

export type ArtifactThemeId = (typeof artifactThemes)[number]["id"];

export const edgeChunks = [
  {
    id: "root",
    label: "01. Edge Root Scaffolding",
    duration: "12ms",
    colorClass: "bg-primary",
    timeClass: "text-primary",
    width: "28%",
    offset: "0%",
  },
  {
    id: "session",
    label: "02. Dynamic Session Graph",
    duration: "28ms",
    colorClass: "bg-[#4cd7f6]",
    timeClass: "text-[#4cd7f6]",
    width: "58%",
    offset: "20%",
  },
  {
    id: "feed",
    label: "03. Async Feed Payload",
    duration: "45ms",
    colorClass: "bg-[#7bd0ff]",
    timeClass: "text-[#7bd0ff]",
    width: "42%",
    offset: "55%",
  },
] as const;

export const fsmStates = ["IDLE", "FETCHING", "MUTATING", "SUCCESS"] as const;

export type FsmState = (typeof fsmStates)[number];

export const fsmMeta: Record<
  FsmState,
  { fps: string; statusClass: string }
> = {
  IDLE: { fps: "60.0 FPS", statusClass: "text-primary" },
  FETCHING: { fps: "59.8 FPS", statusClass: "text-[#4cd7f6]" },
  MUTATING: { fps: "60.0 FPS", statusClass: "text-[#bb86fc]" },
  SUCCESS: { fps: "60.0 FPS", statusClass: "text-primary" },
};
