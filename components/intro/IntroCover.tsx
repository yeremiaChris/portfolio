import {
  IntroLockup,
  introOverlayClassName,
} from "@/components/intro/IntroLockup";

export function IntroCover() {
  return (
    <>
      <noscript>
        <style>{`[data-intro-cover]{display:none!important}`}</style>
      </noscript>
      <div data-intro-cover="" aria-hidden className={introOverlayClassName}>
        <IntroLockup />
      </div>
    </>
  );
}
