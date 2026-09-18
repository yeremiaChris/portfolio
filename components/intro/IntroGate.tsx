import { IntroMotion } from "@/components/intro/IntroMotion";

export function IntroGate() {
  return (
    <>
      <div
        data-intro-cover=""
        aria-hidden
        className="bg-background pointer-events-none fixed inset-0 z-[109]"
      />
      <IntroMotion />
    </>
  );
}
