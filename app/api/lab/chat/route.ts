import { ipAddress } from "@vercel/functions";

import type { ChatEvent } from "@/lib/lab-chat";
import { askYeremia } from "@/lib/lab";
import { streamLabChat, validateChatBody } from "@/lib/lab-chat-api";
import { parseLabIndex } from "@/lib/lab-index";
import { checkLabChatRateLimit } from "@/lib/lab-rate-limit";
import labIndexJson from "@/lab/index.json";

export const runtime = "nodejs";

const labIndex = (() => {
  const index = parseLabIndex(labIndexJson);
  if (!index) {
    throw new Error("lab/index.json is missing or invalid");
  }
  return index;
})();

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }

  const rate = await checkLabChatRateLimit(ipAddress(request) ?? "anonymous");
  if (!rate.allowed) {
    return Response.json({ error: rate.message }, { status: rate.status });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validated = validateChatBody(raw);
  if (typeof validated === "string") {
    return Response.json({ error: validated }, { status: 400 });
  }

  const abortController = new AbortController();
  const onAbort = () => abortController.abort();
  request.signal.addEventListener("abort", onAbort, { once: true });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const write = (event: ChatEvent) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };

      try {
        for await (const event of streamLabChat(validated, {
          apiKey,
          index: labIndex,
          signal: abortController.signal,
        })) {
          if (abortController.signal.aborted) break;
          write(event);
        }
      } catch {
        if (!abortController.signal.aborted) {
          write({ type: "error", message: askYeremia.errorMessage });
          write({ type: "done" });
        }
      } finally {
        request.signal.removeEventListener("abort", onAbort);
        controller.close();
      }
    },
    cancel() {
      abortController.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
