export type ModelProvider =
  "auto" | "google" | "anthropic" | "openai" | "deepseek" | "qwen" | "moonshot";

export interface ChatModel {
  id: string;
  label: string;
  provider: ModelProvider;
  description: string;
  enabled: boolean;
  apiModel?: string;
}

export const DEFAULT_MODEL_ID = "auto";

export const CHAT_MODELS: ChatModel[] = [
  {
    id: "auto",
    label: "Auto",
    provider: "auto",
    description: "Picks the best available model",
    enabled: true,
  },
  {
    id: "gemini-3.8-flash",
    label: "Gemini 3.8 Flash",
    provider: "google",
    description: "Fast and balanced",
    enabled: true,
  },
  {
    id: "gemini-3.5-flash",
    label: "Gemini 3.5 Flash",
    provider: "google",
    description: "Reliable fallback",
    enabled: true,
  },
  {
    id: "gemini-3.1-flash-lite",
    label: "Gemini 3.1 Flash Lite",
    provider: "google",
    description: "Fastest and lightest",
    enabled: true,
  },
  {
    id: "claude-placeholder",
    label: "Claude",
    provider: "anthropic",
    description: "Coming soon",
    enabled: false,
  },
  {
    id: "deepseek-chat",
    label: "DeepSeek Chat",
    provider: "deepseek",
    description: "Fast, low-cost general chat",
    enabled: true,
    apiModel: "deepseek-chat",
  },
  {
    id: "deepseek-reasoner",
    label: "DeepSeek Reasoner",
    provider: "deepseek",
    description: "Stronger reasoning mode",
    enabled: true,
    apiModel: "deepseek-reasoner",
  },
  {
    id: "qwen-flash",
    label: "Qwen Flash",
    provider: "qwen",
    description: "Alibaba DashScope, fast and cheap",
    enabled: true,
    apiModel: "qwen-flash",
  },
  {
    id: "moonshot-v1-8k",
    label: "Kimi 8K",
    provider: "moonshot",
    description: "Moonshot short-context chat",
    enabled: true,
    apiModel: "moonshot-v1-8k",
  },
];

/** Kept exported for tests that assert Auto fallback order. */
export const AUTO_FALLBACK_ORDER = [
  "gemini-3.8-flash",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
] as const;

export function getModel(id: string): ChatModel | undefined {
  return CHAT_MODELS.find((model) => model.id === id);
}

export function getApiModelId(model: ChatModel): string {
  return model.apiModel ?? model.id;
}

export function isOpenAICompatibleProvider(
  provider: ModelProvider,
): provider is "deepseek" | "qwen" | "moonshot" {
  return (
    provider === "deepseek" || provider === "qwen" || provider === "moonshot"
  );
}

/** First enabled model id in AUTO_FALLBACK_ORDER, or undefined if none. */
export function resolveAutoModel(): string | undefined {
  for (const id of AUTO_FALLBACK_ORDER) {
    const model = getModel(id);
    if (model?.enabled) return model.id;
  }
  return undefined;
}
