import { describe, expect, it } from "vitest";

import {
  AUTO_FALLBACK_ORDER,
  CHAT_MODELS,
  DEFAULT_MODEL_ID,
  chatModelsForRuntime,
  getModel,
  modelRuntimeEnabled,
  resolveAutoModel,
} from "./lab-models";

describe("getModel", () => {
  it("returns the model for a known id", () => {
    expect(getModel("auto")).toMatchObject({
      id: "auto",
      label: "Auto",
      provider: "auto",
      enabled: true,
    });
    expect(getModel("gemini-3.8-flash")?.provider).toBe("google");
  });

  it("returns undefined for an unknown id", () => {
    expect(getModel("not-a-model")).toBeUndefined();
  });

  it("exposes the disabled Claude placeholder", () => {
    const claude = getModel("claude-placeholder");
    expect(claude).toMatchObject({
      provider: "anthropic",
      enabled: false,
      description: "Coming soon",
    });
  });

  it("includes DeepSeek and Qwen entries", () => {
    expect(getModel("deepseek-chat")).toMatchObject({
      provider: "deepseek",
      enabled: true,
      apiModel: "deepseek-chat",
    });
    expect(getModel("qwen-flash")?.provider).toBe("qwen");
  });
});

describe("modelRuntimeEnabled", () => {
  it("requires provider keys for OpenAI-compatible models", () => {
    const deepseek = getModel("deepseek-chat")!;
    expect(modelRuntimeEnabled(deepseek, {})).toBe(false);
    expect(
      modelRuntimeEnabled(deepseek, {
        deepseek: { apiKey: "ds-key", baseUrl: "https://api.deepseek.com" },
      }),
    ).toBe(true);
    expect(modelRuntimeEnabled(getModel("gemini-3.8-flash")!, {})).toBe(true);
  });
});

describe("resolveAutoModel", () => {
  it("prefers DeepSeek when configured, otherwise Gemini", () => {
    expect(resolveAutoModel()).toBe("gemini-3.8-flash");
    expect(
      resolveAutoModel({
        deepseek: { apiKey: "ds-key", baseUrl: "https://api.deepseek.com" },
      }),
    ).toBe("deepseek-chat");
  });

  it("lists DeepSeek first in AUTO_FALLBACK_ORDER", () => {
    expect(AUTO_FALLBACK_ORDER[0]).toBe("deepseek-chat");
    for (const id of AUTO_FALLBACK_ORDER.slice(1)) {
      expect(getModel(id)?.provider).toBe("google");
    }
  });
});

describe("chatModelsForRuntime", () => {
  it("disables DeepSeek in the picker when the key is missing", () => {
    const models = chatModelsForRuntime({});
    expect(models.find((m) => m.id === "deepseek-chat")?.enabled).toBe(false);
    expect(models.find((m) => m.id === "gemini-3.8-flash")?.enabled).toBe(true);
  });
});

describe("CHAT_MODELS", () => {
  it("includes DEFAULT_MODEL_ID as an enabled auto entry", () => {
    expect(DEFAULT_MODEL_ID).toBe("auto");
    expect(CHAT_MODELS.some((model) => model.id === DEFAULT_MODEL_ID)).toBe(
      true,
    );
    expect(getModel(DEFAULT_MODEL_ID)?.enabled).toBe(true);
  });
});
