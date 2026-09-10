"use client";

import { useState } from "react";
import { PaletteIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { artifactThemes } from "@/lib/artifacts";
import { cn } from "@/lib/utils";

type Theme = (typeof artifactThemes)[number];

const THEME_BUTTON_LABELS: Record<Theme["id"], string> = {
  emerald: "Emerald",
  cyan: "Cyan",
  tokyo: "Tokyo",
  amber: "Solar",
};

export function TokenEngine() {
  const [theme, setTheme] = useState<Theme>(artifactThemes[0]);

  return (
    <Card className="h-full bg-muted ring-border/20 transition-colors hover:bg-card">
      <CardHeader className="has-data-[slot=card-action]:grid-cols-[1fr_auto]">
        <div className="col-span-full mb-2 flex items-center justify-between">
          <span className="rounded-xl bg-secondary p-2 text-primary">
            <PaletteIcon className="size-5" />
          </span>
          <Badge
            variant="secondary"
            className="font-mono text-[10px] tracking-widest text-primary uppercase"
          >
            Realtime Tokenizer
          </Badge>
        </div>
        <CardTitle className="font-heading text-xl font-semibold tracking-tight">
          Autonomous Design System Token Engine
        </CardTitle>
        <CardDescription className="text-[13px] leading-5">
          Zero-runtime CSS variable extraction with contrast-aware previews and
          multi-theme swapping.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3 rounded-xl bg-[#0a0e14] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-foreground">
              {theme.label}
            </span>
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: theme.hex }}
              aria-hidden
            />
          </div>

          <div
            className="grid grid-cols-4 gap-1 pt-1"
            role="group"
            aria-label="Theme presets"
          >
            {artifactThemes.map((preset) => (
              <Button
                key={preset.id}
                type="button"
                variant="secondary"
                size="xs"
                onClick={() => setTheme(preset)}
                aria-pressed={theme.id === preset.id}
                className={cn(
                  "h-auto px-1 py-1 font-mono text-xs",
                  preset.swatchClass,
                  theme.id === preset.id && "ring-1 ring-primary/60",
                )}
              >
                {THEME_BUTTON_LABELS[preset.id]}
              </Button>
            ))}
          </div>

          <ScrollArea className="w-full rounded bg-secondary/80">
            <pre className="p-2 font-mono text-xs text-muted-foreground whitespace-nowrap">
              <code>{`:root { --theme-primary: ${theme.hex}; --alpha: 0.94; }`}</code>
            </pre>
          </ScrollArea>
        </div>
      </CardContent>

      <CardFooter className="justify-between border-t-0 bg-transparent font-mono text-[10px] text-muted-foreground">
        <span>CSS variables &amp; Tailwind tokens</span>
        <span className="text-primary">&lt; 0.4kb preview</span>
      </CardFooter>
    </Card>
  );
}
