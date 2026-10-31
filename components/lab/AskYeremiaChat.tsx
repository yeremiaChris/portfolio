"use client";

import { ArrowDownIcon, SquarePenIcon } from "lucide-react";
import { useRef, useState, type ReactNode, type UIEvent } from "react";

import { ChatComposer } from "@/components/lab/ChatComposer";
import { ChatMessage } from "@/components/lab/ChatMessage";
import { LabSampleExchange } from "@/components/lab/LabSampleExchange";
import { useChat } from "@/components/lab/useChat";
import { Button } from "@/components/ui/button";
import { askYeremia } from "@/lib/lab";
import type { ChatModel } from "@/lib/lab-models";
import { cn } from "@/lib/utils";

const NEAR_BOTTOM_PX = 96;

type AskYeremiaChatProps = {
  models: ChatModel[];
  emptyStateHeading: ReactNode;
};

export function AskYeremiaChat({
  models,
  emptyStateHeading,
}: AskYeremiaChatProps) {
  const {
    messages,
    isStreaming,
    modelId,
    setModelId,
    send,
    stop,
    regenerate,
    reset,
  } = useChat({ models });

  const [input, setInput] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const isEmpty = messages.length === 0;
  const lastAssistant = messages.findLast(
    (message) => message.role === "assistant",
  );
  const liveAnnouncement =
    messages.findLast(
      (message) =>
        message.role === "assistant" &&
        (message.status === "done" || message.status === "stopped") &&
        message.content.length > 0,
    )?.content ?? "";

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || isStreaming) return;
    setInput("");
    send(trimmed);
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const awayFromBottom = event.currentTarget.scrollTop > NEAR_BOTTOM_PX;
    setShowScrollButton((current) =>
      current === awayFromBottom ? current : awayFromBottom,
    );
  }

  function handleScrollToBottom() {
    viewportRef.current?.scrollTo({ top: 0 });
    setShowScrollButton(false);
  }

  const composer = (
    <ChatComposer
      value={input}
      onChange={setInput}
      onSubmit={() => ask(input)}
      onStop={stop}
      isStreaming={isStreaming}
      modelId={modelId}
      onModelChange={setModelId}
      models={models}
    />
  );

  return (
    <div
      id={askYeremia.id}
      className="bg-background flex h-[calc(100dvh-var(--nav-height))] flex-col overflow-hidden"
    >
      <header className="border-border/40 flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
        <p className="text-foreground/75 text-brand-accent text-xs font-medium tracking-wide uppercase">
          {askYeremia.topBarEyebrow}
        </p>
        {!isEmpty ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={reset}
            aria-label={askYeremia.newChatLabel}
            className="text-muted-foreground hover:text-foreground size-11 sm:size-8"
          >
            <SquarePenIcon />
          </Button>
        ) : (
          <span className="size-11 sm:size-8" aria-hidden />
        )}
      </header>

      <div className="relative mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4 sm:px-6">
        <div className="flex min-h-0 flex-1 flex-col">
          {isEmpty ? (
            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain pt-2 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:gap-6 sm:pt-4 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              <div className="flex w-full flex-col items-center gap-3 text-center sm:gap-4">
                {emptyStateHeading}
              </div>
              <div className="w-full shrink-0">{composer}</div>
              <nav aria-label="Suggested questions" className="w-full shrink-0">
                <ul className="-mx-2 flex [scrollbar-width:none] gap-2 overflow-x-auto overscroll-x-contain px-2 pb-0.5 [-ms-overflow-style:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
                  {askYeremia.suggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="max-w-[min(100%,20rem)] shrink-0 sm:max-w-none sm:shrink"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isStreaming}
                        onClick={() => ask(suggestion)}
                        className="border-border/60 hover:border-brand-accent/35 focus-visible:ring-brand-accent/40 h-auto min-h-11 w-full px-3 py-2 text-left text-xs leading-snug whitespace-normal sm:min-h-9 sm:w-auto"
                      >
                        {suggestion}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
              <LabSampleExchange />
            </div>
          ) : (
            <div
              ref={viewportRef}
              onScroll={handleScroll}
              className={cn(
                "flex min-h-0 flex-1 flex-col-reverse overflow-y-auto overscroll-contain px-1 py-4 motion-safe:scroll-smooth sm:px-0",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              <div className="flex flex-col gap-5">
                <div
                  role="log"
                  aria-live="off"
                  aria-busy={isStreaming}
                  className="flex flex-col gap-5"
                >
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      role={message.role}
                      content={message.content}
                      status={message.status}
                      sources={message.sources}
                      modelId={message.modelId}
                      onRetry={
                        message.status === "error" ? regenerate : undefined
                      }
                      onRegenerate={
                        message.role === "assistant" &&
                        message.id === lastAssistant?.id &&
                        (message.status === "done" ||
                          message.status === "stopped") &&
                        !isStreaming
                          ? regenerate
                          : undefined
                      }
                    />
                  ))}
                </div>
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                  {liveAnnouncement}
                </div>
              </div>
            </div>
          )}
        </div>

        {!isEmpty ? (
          <div
            className={cn(
              "from-background via-background/95 relative shrink-0 bg-gradient-to-t to-transparent pt-2",
              "pb-[max(1rem,env(safe-area-inset-bottom))]",
            )}
          >
            {showScrollButton ? (
              <div className="pointer-events-none absolute inset-x-0 -top-14 flex justify-center">
                <div className="pointer-events-auto">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={handleScrollToBottom}
                    aria-label="Scroll to bottom"
                    className="border-border/50 bg-muted/95 text-foreground size-11 rounded-full border shadow-lg backdrop-blur-sm sm:size-9"
                  >
                    <ArrowDownIcon className="size-4" />
                  </Button>
                </div>
              </div>
            ) : null}
            <div className="mx-auto w-full max-w-3xl">{composer}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
