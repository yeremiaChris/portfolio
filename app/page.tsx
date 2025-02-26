import { Header } from "./components/Header";
import { MainBanner } from "./components/MainBanner";
import { EmailSeparator } from "./components/EmailSeparator";
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
      <div className="h-screen flex flex-col justify-center relative">
        <Header />

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
      <EmailSeparator />
    </>
  );
}
