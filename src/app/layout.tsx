import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { getSiteUrl } from "@/lib/site";
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
  title: {
    default: "Aditya Choubey | AI Automation & Software Developer",
    template: "%s | Aditya Choubey",
  },
  description:
    "Portfolio for Aditya Choubey, an AI Automation & Software Developer focused on software, workflow automation, analytics and industrial technology.",
  metadataBase: new URL(getSiteUrl()),
  applicationName: "ADITYA OS",
  authors: [{ name: "Aditya Choubey", url: "https://github.com/adityachoubey259" }],
  creator: "Aditya Choubey",
  publisher: "Aditya Choubey",
  keywords: [
    "Aditya Choubey",
    "AI Automation Developer",
    "Software Developer",
    "Industrial Technology",
    "n8n",
    "RS485",
    "Python",
  ],
  openGraph: {
    title: "Aditya Choubey | AI Automation & Software Developer",
    description:
      "Explore Aditya Choubey's software, AI automation, analytics and industrial technology portfolio.",
    type: "website",
    siteName: "ADITYA OS",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Choubey | AI Automation & Software Developer",
    description: "Explore practical software, AI automation and connected industrial systems work by Aditya Choubey.",
    images: ["/opengraph-image"],
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
