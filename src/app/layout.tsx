import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "ADITYA OS | Interactive Engineering Portfolio",
  description:
    "A premium purple-noir portfolio application for Aditya Choubey's software, automation, analytics and industrial engineering work.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "ADITYA OS | Interactive Engineering Portfolio",
    description:
      "Software, AI automation, analytics and industrial engineering work by Aditya Choubey.",
    type: "website",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADITYA OS | Interactive Engineering Portfolio",
    description: "Explore practical software, AI automation and connected industrial systems work.",
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#080710" },
    { media: "(prefers-color-scheme: dark)", color: "#080710" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const themeScript = `
    (function () {
      try {
        var stored = localStorage.getItem("theme");
        var theme = stored || "dark";
        document.documentElement.dataset.theme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = "light";
      }
    })();
  `;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
