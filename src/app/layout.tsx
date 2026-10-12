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
  title: "Aditya Choubey | AI Automation & Software Developer",
  description:
    "Explore the software, AI automation, industrial monitoring and hardware-integrated projects of Aditya Choubey.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Aditya Choubey | AI Automation & Software Developer",
    description:
      "Software, AI automation, industrial monitoring and hardware-integrated projects by Aditya Choubey.",
    type: "website",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Choubey | AI Automation & Software Developer",
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
    { media: "(prefers-color-scheme: light)", color: "#F5F4F0" },
    { media: "(prefers-color-scheme: dark)", color: "#101720" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const themeScript = `
    (function () {
      try {
        var stored = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = stored || (prefersDark ? "dark" : "light");
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
