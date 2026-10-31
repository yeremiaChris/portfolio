import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Rethink_Sans } from "next/font/google";

import { Header } from "@/components/Header";
import { UmamiScript } from "@/components/UmamiScript";
import {
  INTRO_BOOTSTRAP_SCRIPT,
  INTRO_CRITICAL_CSS,
  INTRO_TIMING_CSS,
} from "@/lib/intro";
import { buildAlternates } from "@/lib/seo";
import { getSiteUrl, site } from "@/lib/site";
import { WEB_APP_BACKGROUND_COLOR } from "@/lib/web-manifest";
import { cn } from "@/lib/utils";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  preload: true,
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  preload: true,
  display: "swap",
});

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
  preload: true,
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: WEB_APP_BACKGROUND_COLOR,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Yeremia Chris Saragi | Software Engineer",
  description: site.tagline,
  alternates: buildAlternates(),
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
        geistMono.variable,
        rethinkSans.variable,
      )}
    >
      <body
        suppressHydrationWarning
        className="bg-background text-foreground min-h-screen antialiased"
      >
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP_SCRIPT }} />
        <style
          dangerouslySetInnerHTML={{
            __html: `${INTRO_CRITICAL_CSS}${INTRO_TIMING_CSS}`,
          }}
        />
        <UmamiScript />
        <Header />
        <div className="pt-[var(--nav-height)]">{children}</div>
      </body>
    </html>
  );
}
