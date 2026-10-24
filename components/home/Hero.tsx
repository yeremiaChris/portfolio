import { Container } from "@/components/Container";
import { HeroIntro } from "@/components/home/HeroIntro";
import { HeroTerminal } from "@/components/home/HeroTerminal";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden pt-8 pb-20 md:pt-10 md:pb-32"
    >
      <div
        aria-hidden
        className="bg-primary/5 pointer-events-none absolute -top-24 left-1/4 hidden size-96 rounded-full blur-3xl md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-10 hidden size-80 rounded-full bg-[#4cd7f6]/5 blur-3xl md:block"
      />

      <Container className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <HeroIntro />
        </div>

        <div className="flex w-full flex-col lg:col-span-5">
          <HeroTerminal />
        </div>
      </Container>
    </section>
  );
}
