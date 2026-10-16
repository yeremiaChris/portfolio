import { afterEach, describe, expect, it } from "vitest";

import {
  checkLabChatRateLimit,
  LAB_CHAT_UNAVAILABLE_MESSAGE,
  resetLabChatRateLimitersForTests,
} from "./lab-rate-limit";

describe("checkLabChatRateLimit", () => {
  const originalEnv = process.env.VERCEL_ENV;
  const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
  const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  afterEach(() => {
    process.env.VERCEL_ENV = originalEnv;
    process.env.UPSTASH_REDIS_REST_URL = originalUrl;
    process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
    resetLabChatRateLimitersForTests();
  });

  it("fails closed in production when Upstash env vars are missing", async () => {
    process.env.VERCEL_ENV = "production";
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    resetLabChatRateLimitersForTests();

    await expect(checkLabChatRateLimit("1.1.1.1")).resolves.toEqual({
      allowed: false,
      status: 503,
      message: LAB_CHAT_UNAVAILABLE_MESSAGE,
    });
  });

  it("fails open in local development when Upstash env vars are missing", async () => {
    delete process.env.VERCEL_ENV;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    resetLabChatRateLimitersForTests();

    await expect(checkLabChatRateLimit("1.1.1.1")).resolves.toEqual({
      allowed: true,
    });
  });
});
