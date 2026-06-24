import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { CommandPaletteProvider } from "@/components/shared/CommandPalette";
import PageLoader from "@/components/shared/PageLoader";
import CursorEffect from "@/components/shared/CursorEffect";
import DevPanel from "@/components/shared/DevPanel";
import ScrollProgress from "@/components/shared/ScrollProgress";
import Terminal from "@/components/shared/Terminal";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#080808" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://umapathi.dev"),
  title: {
    default: "Umapathi R · Full Stack & ML",
    template: "%s · Umapathi R",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
    type: "website", locale: "en_US", url: "https://umapathi.dev", siteName: "Umapathi R",
    title: "Umapathi R — Full Stack Engineer & ML Researcher",
    description: "Full Stack Developer and Published ML Researcher building data-driven products at the intersection of software and intelligence.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Umapathi R" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umapathi R — Full Stack Engineer & ML Researcher",
    description: "Building data-driven products at the intersection of software and intelligence.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
      data-theme="dark"
      data-accent="blue"
    >
      <body className="min-h-screen bg-surface-0 text-neutral-50 antialiased">
        <ThemeProvider>
          <CommandPaletteProvider>
            {/* Layer order: progress (199) → page loader (200) → content → cursor (9999) */}
            <ScrollProgress />
            <PageLoader />
            <CursorEffect />
            <DevPanel />
            <Terminal />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatBot />
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
