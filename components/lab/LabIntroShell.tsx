import { Container } from "@/components/Container";
import { labIntro } from "@/lib/lab";

export function LabIntroShell() {
  return (
    <section
      aria-labelledby="lab-intro-heading"
      className="border-border/40 shrink-0 border-b"
    >
      <Container className="max-w-3xl py-5 md:py-6">
        <p className="text-foreground/75 mb-2 text-xs font-medium tracking-wide text-[#4cd7f6] uppercase">
          {labIntro.eyebrow}
        </p>
        <h1
          id="lab-intro-heading"
          className="font-heading text-foreground text-2xl tracking-tight sm:text-3xl"
        >
          {labIntro.title}
        </h1>
        <div className="text-muted-foreground mt-3 flex flex-col gap-3 text-[15px] leading-relaxed sm:text-base">
          {labIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="text-muted-foreground/90 mt-4 text-xs leading-relaxed sm:text-[13px]">
          {labIntro.notice}
        </p>
      </Container>
    </section>
  );
}
