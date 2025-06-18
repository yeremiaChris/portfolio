import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { EmailSeparator } from "./components/EmailSeparator";
import { DotPatternBackground } from "./components/DotPatternBackground";
import { Spotlight } from "@/components/ui/spotlight-new";

export const metadata: Metadata = {
  title: "Yeremia Portfolio",
  description: "Yeremia Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <div className="text-white h-[200px] fixed right-0 left-0 top-0 bg-gradient-to-b from-gray-800 to-transparent" /> */}
        <Header />
        <div className="md:block hidden absolute top-0 left-0 w-full h-full overflow-hidden">
          <Spotlight />
        </div>
        <DotPatternBackground />
        {children}
        <EmailSeparator />
        <Footer />
      </body>
    </html>
  );
}
