import type { FormEvent, KeyboardEvent } from "react";
import { ArrowUpIcon, SquareIcon } from "lucide-react";

import { ModelPicker } from "@/components/lab/ModelPicker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { askYeremia } from "@/lib/lab";
import type { ChatModel } from "@/lib/lab-models";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop: () => void;
  isStreaming: boolean;
  modelId: string;
  onModelChange: (modelId: string) => void;
  models: ChatModel[];
  className?: string;
}

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  onStop,
  isStreaming,
  modelId,
  onModelChange,
  models,
  className,
}: ChatComposerProps) {
  const trimmed = value.trim();
  const charLimit = askYeremia.charLimit;
  const nearLimit = value.length >= Math.floor(charLimit * 0.8);
  const atLimit = value.length >= charLimit;
  const canSend = trimmed.length > 0 && !isStreaming;
  const disclaimerId = "ask-yeremia-disclaimer";
  const counterId = "ask-yeremia-char-count";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isStreaming) {
      onStop();
      return;
    }
    if (!canSend) return;
    onSubmit();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey) return;
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col gap-2", className)}
    >
      <div
        className={cn(
          "bg-muted ring-border/40 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] ring-1 transition-[box-shadow,ring-color] duration-200 motion-reduce:transition-none",
          "focus-within:ring-2 focus-within:ring-[#4cd7f6]/40",
        )}
      >
        <label htmlFor="ask-yeremia-composer" className="sr-only">
          Message
        </label>
        <div
          data-value={`${value} `}
          className={cn(
            "grid max-h-52 overflow-y-auto",
            "after:invisible after:col-start-1 after:row-start-1 after:block after:max-h-52 after:overflow-hidden after:break-words after:whitespace-pre-wrap",
            "after:px-4 after:pt-3.5 after:pb-2 after:text-base after:leading-normal md:after:text-sm",
            "after:content-[attr(data-value)]",
          )}
        >
          <Textarea
            id="ask-yeremia-composer"
            name="message"
            value={value}
            onChange={(event) =>
              onChange(event.target.value.slice(0, charLimit))
            }
            onKeyDown={handleKeyDown}
            placeholder={askYeremia.placeholder}
            rows={1}
            maxLength={charLimit}
            aria-describedby={`${disclaimerId} ${counterId}`}
            className="col-start-1 row-start-1 field-sizing-content h-full max-h-52 min-h-12 resize-none overflow-y-auto border-0 bg-transparent px-4 pt-3.5 pb-2 text-base leading-normal shadow-none focus-visible:ring-0 md:text-sm dark:bg-transparent"
          />
        </div>

        <div className="flex items-center justify-between gap-2 px-2 pb-2">
          <ModelPicker
            modelId={modelId}
            onModelChange={onModelChange}
            disabled={isStreaming}
            models={models}
          />

          <div className="flex items-center gap-2">
            <p
              id={counterId}
              role={atLimit ? "status" : undefined}
              className={cn(
                "font-mono text-[10px]",
                nearLimit
                  ? "text-muted-foreground"
                  : "text-muted-foreground invisible",
                atLimit && "text-destructive",
              )}
              aria-hidden={!nearLimit}
            >
              {value.length}/{charLimit}
            </p>

            <Button
              type="submit"
              size="icon"
              disabled={isStreaming ? false : !canSend}
              aria-label={
                isStreaming ? askYeremia.stopLabel : askYeremia.sendLabel
              }
              className={cn(
                "size-11 shrink-0 rounded-full sm:size-9",
                "focus-visible:ring-2 focus-visible:ring-[#4cd7f6]/50",
                isStreaming
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-[#4cd7f6] text-[#0a0e14] hover:bg-[#4cd7f6]/90 disabled:bg-[#4cd7f6]/40",
              )}
            >
              {isStreaming ? (
                <SquareIcon className="size-3.5 fill-current" />
              ) : (
                <ArrowUpIcon className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <p
        id={disclaimerId}
        className="text-muted-foreground px-1 text-center text-[11px] leading-relaxed"
      >
        {askYeremia.disclaimer}
      </p>
    </form>
  );
}
