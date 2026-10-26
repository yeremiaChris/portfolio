import { describe, expect, it } from "vitest";

import {
  AUTO_FALLBACK_ORDER,
  CHAT_MODELS,
  DEFAULT_MODEL_ID,
  getModel,
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

describe("resolveAutoModel", () => {
  it("returns the first enabled id in AUTO_FALLBACK_ORDER", () => {
    expect(resolveAutoModel()).toBe(AUTO_FALLBACK_ORDER[0]);
    expect(getModel(resolveAutoModel()!)?.enabled).toBe(true);
  });

  it("skips disabled entries in the fallback order", () => {
    for (const id of AUTO_FALLBACK_ORDER) {
      expect(getModel(id)?.enabled).toBe(true);
    }
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
