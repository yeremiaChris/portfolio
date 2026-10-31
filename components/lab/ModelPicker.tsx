import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DEFAULT_MODEL_ID,
  type ChatModel,
  type ModelProvider,
} from "@/lib/lab-models";
import { cn } from "@/lib/utils";

interface ModelPickerProps {
  modelId: string;
  onModelChange: (modelId: string) => void;
  models: ChatModel[];
  disabled?: boolean;
  className?: string;
}

const PROVIDER_ORDER: ModelProvider[] = [
  "auto",
  "google",
  "deepseek",
  "qwen",
  "moonshot",
  "anthropic",
  "openai",
];

const PROVIDER_LABELS: Record<ModelProvider, string> = {
  auto: "Auto",
  google: "Google",
  deepseek: "DeepSeek",
  qwen: "Qwen",
  moonshot: "Moonshot",
  anthropic: "Anthropic",
  openai: "OpenAI",
};

const PROVIDER_DOT: Record<ModelProvider, string> = {
  auto: "bg-[#4cd7f6]",
  google: "bg-[#4edea3]",
  deepseek: "bg-[#3b82f6]",
  qwen: "bg-[#f97316]",
  moonshot: "bg-[#a855f7]",
  anthropic: "bg-[#bb86fc]",
  openai: "bg-[#4cd7f6]",
};

function modelsByProvider(
  models: ChatModel[],
  provider: ModelProvider,
): ChatModel[] {
  return models.filter((model) => model.provider === provider);
}

export function ModelPicker({
  modelId,
  onModelChange,
  models,
  disabled = false,
  className,
}: ModelPickerProps) {
  const selected =
    models.find((model) => model.id === modelId) ??
    models.find((model) => model.id === DEFAULT_MODEL_ID);
  const label = selected?.label ?? "Auto";
  const provider = selected?.provider ?? "auto";
  const labelId = "ask-yeremia-model-label";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled}
        className={className}
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            aria-labelledby={labelId}
            className="text-muted-foreground hover:text-foreground h-8 min-h-11 gap-1.5 rounded-full px-2.5 text-xs sm:min-h-8"
          />
        }
      >
        <span
          className={cn("size-1.5 rounded-full", PROVIDER_DOT[provider])}
          aria-hidden
        />
        <span id={labelId} className="max-w-[9rem] truncate">
          {label}
        </span>
        <ChevronDownIcon className="size-3.5 opacity-70" aria-hidden />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" side="top" className="w-72 min-w-72">
        <DropdownMenuRadioGroup
          value={modelId}
          onValueChange={(value) => {
            if (typeof value === "string") onModelChange(value);
          }}
        >
          {PROVIDER_ORDER.map((providerKey, index) => {
            const groupModels = modelsByProvider(models, providerKey);
            if (groupModels.length === 0) return null;

            return (
              <DropdownMenuGroup key={providerKey}>
                {index > 0 ? <DropdownMenuSeparator /> : null}
                <DropdownMenuLabel>
                  {PROVIDER_LABELS[providerKey]}
                </DropdownMenuLabel>
                {groupModels.map((model) => (
                  <DropdownMenuRadioItem
                    key={model.id}
                    value={model.id}
                    disabled={!model.enabled}
                    className="items-start py-2"
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5 pr-2">
                      <span className="text-foreground flex items-center gap-1.5 text-sm font-medium">
                        {model.label}
                        {!model.enabled ? (
                          <span className="label-caps text-[9px] tracking-wide">
                            Coming soon
                          </span>
                        ) : null}
                      </span>
                      <span className="text-muted-foreground text-xs leading-snug">
                        {model.description}
                      </span>
                    </span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuGroup>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
