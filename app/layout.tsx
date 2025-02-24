import type { Metadata } from "next";
import "./globals.css";
import SprinkleSvg from "./assets/svg/sprinkle.svg";
import { Footer } from "./components/Footer";

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
        <div className="fixed flex justify-center items-center inset-0">
          <SprinkleSvg />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
