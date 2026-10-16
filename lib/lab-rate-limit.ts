import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const LAB_CHAT_RATE_LIMIT_MESSAGE =
  "Too many questions right now. Please wait a minute and try again.";

export const LAB_CHAT_UNAVAILABLE_MESSAGE = "Chat is temporarily unavailable";

const MINUTE_LIMIT = 10;
const DAY_LIMIT = 50;

let minuteLimiter: Ratelimit | null | undefined;
let dayLimiter: Ratelimit | null | undefined;

function isProduction(): boolean {
  return process.env.VERCEL_ENV === "production";
}

function getLimiters(): { minute: Ratelimit; day: Ratelimit } | null {
  if (minuteLimiter === null) return null;
  if (minuteLimiter && dayLimiter) {
    return { minute: minuteLimiter, day: dayLimiter };
  }

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    minuteLimiter = null;
    dayLimiter = null;
    return null;
  }

  const redis = new Redis({ url, token });
  minuteLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(MINUTE_LIMIT, "1 m"),
    prefix: "lab-chat:minute",
    analytics: false,
  });
  dayLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(DAY_LIMIT, "1 d"),
    prefix: "lab-chat:day",
    analytics: false,
  });

  return { minute: minuteLimiter, day: dayLimiter };
}

export type LabChatRateLimitResult =
  { allowed: true } | { allowed: false; status: 429 | 503; message: string };

/**
 * Per-IP minute + daily limits.
 * Fail closed in production when Redis env is missing or Redis errors;
 * fail open only in local development.
 */
export async function checkLabChatRateLimit(
  ip: string,
): Promise<LabChatRateLimitResult> {
  try {
    const limiters = getLimiters();
    if (!limiters) {
      if (isProduction()) {
        return {
          allowed: false,
          status: 503,
          message: LAB_CHAT_UNAVAILABLE_MESSAGE,
        };
      }
      return { allowed: true };
    }

    const [minute, day] = await Promise.all([
      limiters.minute.limit(ip),
      limiters.day.limit(ip),
    ]);

    if (!minute.success || !day.success) {
      return {
        allowed: false,
        status: 429,
        message: LAB_CHAT_RATE_LIMIT_MESSAGE,
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error("Lab chat rate limit error", error);
    if (isProduction()) {
      return {
        allowed: false,
        status: 503,
        message: LAB_CHAT_UNAVAILABLE_MESSAGE,
      };
    }
    return { allowed: true };
  }
}

/** Test helper — clears cached limiter singletons. */
export function resetLabChatRateLimitersForTests() {
  minuteLimiter = undefined;
  dayLimiter = undefined;
}
