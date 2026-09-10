import { Container } from "@/components/Container";
import { HeroIntro } from "@/components/home/HeroIntro";
import { HeroStats } from "@/components/home/HeroStats";
import { HeroTerminal } from "@/components/home/HeroTerminal";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden pt-8 pb-16 md:pt-10 md:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 size-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-10 size-80 rounded-full bg-[#4cd7f6]/10 blur-3xl"
      />

      <Container className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both lg:col-span-7">
          <HeroIntro />
        </div>

        <div className="flex w-full flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 delay-150 duration-700 fill-mode-both lg:col-span-5">
          <HeroTerminal />
          <div className="animate-in fade-in slide-in-from-bottom-2 delay-300 duration-700 fill-mode-both">
            <HeroStats />
          </div>
        </div>
      </Container>
    </section>
  );
}
