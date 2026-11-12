"use client";

import { useCallback, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

type GalleryCodePanelProps = {
  source: string;
};

export function GalleryCodePanel({ source }: GalleryCodePanelProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [source]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => void onCopy()}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "absolute top-3 right-3 z-10",
        )}
        aria-label={copied ? "Copied" : "Copy source code"}
      >
        {copied ? (
          <CheckIcon className="size-4" />
        ) : (
          <CopyIcon className="size-4" />
        )}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
      <pre className="border-border/60 bg-muted/40 max-h-[28rem] overflow-auto rounded-xl border p-4 text-[13px] leading-relaxed">
        <code>{source}</code>
      </pre>
    </div>
  );
}
