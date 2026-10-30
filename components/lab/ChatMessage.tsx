import { useState } from "react";
import Link from "next/link";
import { CheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { MessageStatus, Source } from "@/lib/lab-chat";
import { askYeremia } from "@/lib/lab";
import { getModel } from "@/lib/lab-models";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  status: MessageStatus;
  sources?: Source[];
  modelId?: string;
  onRetry?: () => void;
  onRegenerate?: () => void;
}

export function ChatMessage({
  role,
  content,
  status,
  sources,
  modelId,
  onRetry,
  onRegenerate,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";
  const isThinking = status === "thinking";
  const isStreaming = status === "streaming";
  const isError = status === "error";
  const isStopped = status === "stopped";
  const isDone = status === "done";
  const canCopy = (isDone || isStopped) && content.length > 0;
  const resolvedLabel = modelId
    ? (getModel(modelId)?.label ?? modelId)
    : undefined;

  async function handleCopy() {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can fail without permission; ignore quietly.
    }
  }

  if (isUser) {
    return (
      <div className="flex w-full justify-end">
        <div className="bg-muted text-foreground max-w-[80%] rounded-2xl px-3.5 py-2.5">
          <p className="text-foreground text-[15px] leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex w-full gap-3">
      <Avatar size="sm" className="mt-0.5 shrink-0" aria-hidden>
        <AvatarFallback className="bg-muted text-foreground font-mono text-xs">
          YC
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        {isThinking && !content ? (
          <p className="text-muted-foreground min-h-5 font-mono text-xs tracking-wide">
            {askYeremia.thinkingLabel}
            <span className="ml-1 inline-flex gap-0.5" aria-hidden>
              <span className="motion-safe:animate-pulse motion-reduce:animate-none">
                .
              </span>
              <span className="[animation-delay:120ms] motion-safe:animate-pulse motion-reduce:animate-none">
                .
              </span>
              <span className="[animation-delay:240ms] motion-safe:animate-pulse motion-reduce:animate-none">
                .
              </span>
            </span>
          </p>
        ) : null}

        {isError ? (
          <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-2xl border px-3.5 py-3 text-sm leading-relaxed">
            <p>{content || askYeremia.errorMessage}</p>
            {onRetry ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="border-destructive/40 text-destructive hover:bg-destructive/10 mt-3 min-h-11 sm:min-h-8"
              >
                {askYeremia.retryLabel}
              </Button>
            ) : null}
          </div>
        ) : null}

        {!isError && content ? (
          <p className="text-foreground text-[15px] leading-relaxed whitespace-pre-wrap">
            {content}
            {isStreaming ? (
              <span
                className="bg-foreground ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] align-baseline motion-safe:animate-pulse motion-reduce:animate-none motion-reduce:opacity-80"
                aria-hidden
              />
            ) : null}
          </p>
        ) : null}

        {isStopped ? (
          <p className="text-muted-foreground mt-2 font-mono text-[11px] tracking-wide uppercase">
            {askYeremia.stoppedLabel}
          </p>
        ) : null}

        {isDone && sources && sources.length > 0 ? (
          <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Sources">
            {sources.map((source) => (
              <li key={`${source.id}-${source.url}`}>
                <Link
                  href={source.url}
                  className="border-border/50 bg-muted/60 text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex min-h-9 items-center rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors hover:border-[#4cd7f6]/40 focus-visible:ring-2 focus-visible:outline-none sm:min-h-0"
                >
                  [{source.id}] {source.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {isDone && resolvedLabel ? (
          <p className="text-muted-foreground mt-2 font-mono text-xs tracking-wide">
            via {resolvedLabel}
          </p>
        ) : null}

        {(isDone || isStopped) && (canCopy || onRegenerate) ? (
          <div
            className={cn(
              "mt-2 flex items-center gap-1 transition-opacity",
              "max-sm:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100",
            )}
          >
            {canCopy ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  void handleCopy();
                }}
                className="text-muted-foreground h-11 gap-1.5 px-2 sm:h-8"
                aria-label={
                  copied ? askYeremia.copiedLabel : askYeremia.copyLabel
                }
              >
                {copied ? (
                  <CheckIcon className="size-3.5" />
                ) : (
                  <CopyIcon className="size-3.5" />
                )}
                <span className="text-xs">
                  {copied ? askYeremia.copiedLabel : askYeremia.copyLabel}
                </span>
              </Button>
            ) : null}
            {onRegenerate ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                className="text-muted-foreground h-11 gap-1.5 px-2 sm:h-8"
                aria-label={askYeremia.regenerateLabel}
              >
                <RefreshCwIcon className="size-3.5" />
                <span className="text-xs">{askYeremia.regenerateLabel}</span>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
