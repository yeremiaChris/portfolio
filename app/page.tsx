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
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            With Cutting-Edge Tech Stack
          </span>
          <span> 🚀</span>
        </h2>
        {/* <p className="text-gray-300 font-normal text-center text-sm md:text-lg">
          As a software engineer, I leverage these modern development
          technologies to build innovative, scalable applications. My tech stack
          includes industry-standard tools for creating exceptional digital
          experiences, ensuring high-quality, maintainable code.
        </p> */}
        <TechStack />
      </section>
    </>
  );
}
