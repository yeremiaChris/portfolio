import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { UmamiScript } from "@/components/UmamiScript";
import { INTRO_BOOTSTRAP_SCRIPT } from "@/lib/intro";
import { getSiteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Yeremia Chris Saragi | Software Engineer",
  description:
    "Software Engineer (frontend-heavy) — production web platforms across health-tech and logistics.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Yeremia Chris Saragi",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark font-sans",
        geist.variable,
        jetbrainsMono.variable,
        spaceGrotesk.variable,
      )}
    >
      <body
        suppressHydrationWarning
        className="bg-background text-foreground min-h-screen antialiased"
      >
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP_SCRIPT }} />
        <UmamiScript />
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
