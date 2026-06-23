import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://umapathi.dev"),
  title: {
    default: "Umapathi R — Full Stack Engineer & ML Researcher",
    template: "%s · Umapathi R",
  },
  description:
    "Full Stack Developer and Published ML Researcher. I build data-driven products at the intersection of software engineering and machine intelligence. Currently at Vaken Technologies.",
  keywords: [
    "Umapathi R", "Full Stack Developer", "Machine Learning Engineer", "Data Engineer",
    "Backend Developer", "Python", "PostgreSQL", "Vue.js", "Next.js", "FastAPI",
    "ML Researcher", "Tamil Nadu", "India", "Software Engineer",
  ],
  authors: [{ name: "Umapathi R", url: "https://umapathi.dev" }],
  creator: "Umapathi R",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://umapathi.dev",
    siteName: "Umapathi R",
    title: "Umapathi R — Full Stack Engineer & ML Researcher",
    description:
      "Full Stack Developer and Published ML Researcher building data-driven products at the intersection of software and intelligence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Umapathi R — Full Stack Engineer & ML Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umapathi R — Full Stack Engineer & ML Researcher",
    description: "Building data-driven products at the intersection of software and intelligence.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${inter.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#080808] text-neutral-50 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
