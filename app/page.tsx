import Banner from "./components/home/Home";
import { TechStack } from "./components/home/TechStack";
export const metadata = {
  title: "Yeremia Chris Saragi | Frontend Web Developer",
  description:
    "Frontend Web Developer specializing in building exceptional digital experiences. Explore my portfolio showcasing web development projects and professional experience.",
  keywords: [
    "Yeremia Chris Saragi",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Web Development",
  ],
  openGraph: {
    title: "Yeremia Chris Saragi | Frontend Web Developer",
    description:
      "Frontend Web Developer specializing in building exceptional digital experiences",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <Banner />

      <section className="text-white mb-32 px-5 max-w-6xl mx-auto space-y-14">
        <div className="space-y-5">
          <h2 className="text-3xl md:text-4xl lg:text-5xl">
            <span className="text-neutral-200 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
              With Cutting-Edge Tech Stack
            </span>
            <span> 🚀</span>
          </h2>
        </div>
        <TechStack />
      </section>
    </>
  );
}
