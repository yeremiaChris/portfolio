import { MainBanner } from "../MainBanner";

const Banner = () => {
  return (
    <div className="h-screen flex flex-col justify-center relative">
      <section
        id="banner"
        aria-label="Introduction"
        className="max-w-6xl flex items-center justify-between w-full mx-auto text-white"
      >
        <div className="relative z-20">
          <MainBanner />
        </div>
      </section>
    </div>
  );
};

export default Banner;
