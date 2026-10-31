import { askYeremia } from "@/lib/lab";

export function LabSampleExchange() {
  const { question, answer } = askYeremia.sampleExchange;

  return (
    <aside
      aria-label="Example question and answer"
      className="border-border/60 bg-muted/25 hidden w-full rounded-xl border border-dashed px-3.5 py-3 sm:block"
    >
      <p className="text-brand-accent mb-2 text-[10px] font-semibold tracking-[0.14em] uppercase">
        Example
      </p>
      <p className="text-muted-foreground text-xs leading-relaxed">
        <span className="text-foreground/85 block font-medium">{question}</span>
        <span className="mt-1 block">{answer}</span>
      </p>
    </aside>
  );
}
