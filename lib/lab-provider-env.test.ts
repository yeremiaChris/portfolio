import { describe, expect, it } from "vitest";

import { readOpenAICompatibleProviders } from "./lab-provider-env";

describe("readOpenAICompatibleProviders", () => {
  it("returns only providers with API keys", () => {
    const providers = readOpenAICompatibleProviders({
      NODE_ENV: "test",
      DEEPSEEK_API_KEY: "ds-key",
      QWEN_API_KEY: "",
      MOONSHOT_API_KEY: "  ",
    });

    expect(providers).toEqual({
      deepseek: {
        apiKey: "ds-key",
        baseUrl: "https://api.deepseek.com/v1",
      },
    });
  });

  it("honors custom base URLs", () => {
    const providers = readOpenAICompatibleProviders({
      NODE_ENV: "test",
      QWEN_API_KEY: "qwen-key",
      QWEN_BASE_URL: "https://custom.example/v1",
    });

    expect(providers.qwen).toEqual({
      apiKey: "qwen-key",
      baseUrl: "https://custom.example/v1",
    });
  });
});
