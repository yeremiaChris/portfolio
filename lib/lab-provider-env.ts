export type OpenAICompatibleProvider = "deepseek" | "qwen" | "moonshot";

export type ProviderCredentials = {
  apiKey: string;
  baseUrl: string;
};

const DEFAULT_BASE_URLS: Record<OpenAICompatibleProvider, string> = {
  deepseek: "https://api.deepseek.com/v1",
  qwen: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  moonshot: "https://api.moonshot.cn/v1",
};

const ENV_KEYS: Record<
  OpenAICompatibleProvider,
  { apiKey: string; baseUrl: string }
> = {
  deepseek: { apiKey: "DEEPSEEK_API_KEY", baseUrl: "DEEPSEEK_BASE_URL" },
  qwen: { apiKey: "QWEN_API_KEY", baseUrl: "QWEN_BASE_URL" },
  moonshot: { apiKey: "MOONSHOT_API_KEY", baseUrl: "MOONSHOT_BASE_URL" },
};

export function readOpenAICompatibleProviders(
  env: Record<string, string | undefined> = process.env,
): Partial<Record<OpenAICompatibleProvider, ProviderCredentials>> {
  const providers: Partial<
    Record<OpenAICompatibleProvider, ProviderCredentials>
  > = {};

  for (const provider of Object.keys(ENV_KEYS) as OpenAICompatibleProvider[]) {
    const keys = ENV_KEYS[provider];
    const apiKey = env[keys.apiKey]?.trim();
    if (!apiKey) continue;
    const baseUrl = env[keys.baseUrl]?.trim() || DEFAULT_BASE_URLS[provider];
    providers[provider] = { apiKey, baseUrl };
  }

  return providers;
}
