import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { EmailSeparator } from "./components/EmailSeparator";

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
        <Header />
        {children}
        <EmailSeparator />
        <Footer />
      </body>
    </html>
  );
}
