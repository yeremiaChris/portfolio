import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { askYeremia } from "@/lib/lab";

export function LabSampleExchange() {
  const { question, answer } = askYeremia.sampleExchange;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full justify-end">
        <div className="bg-muted text-foreground max-w-[85%] rounded-2xl px-3.5 py-2.5">
          <p className="text-[15px] leading-relaxed">{question}</p>
        </div>
      </div>
      <div className="flex w-full gap-3">
        <Avatar size="sm" className="mt-0.5 shrink-0" aria-hidden>
          <AvatarFallback className="bg-muted text-foreground text-xs">
            YC
          </AvatarFallback>
        </Avatar>
        <p className="text-foreground min-w-0 flex-1 text-[15px] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
