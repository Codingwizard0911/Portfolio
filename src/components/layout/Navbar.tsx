"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Sun, Moon, Command, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type Accent } from "@/components/shared/ThemeProvider";
import { usePalette } from "@/components/shared/CommandPalette";
import SoundToggle from "@/components/shared/SoundToggle";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Tech Stack", href: "/tech-stack" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "Now", href: "/now" },
];

const ACCENT_COLORS: { value: Accent; color: string }[] = [
  { value: "blue", color: "#3b82f6" },
  { value: "purple", color: "#a855f7" },
  { value: "green", color: "#22c55e" },
  { value: "orange", color: "#f97316" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAccents, setShowAccents] = useState(false);
  const { theme, accent, toggleTheme, setAccent } = useTheme();
  const { open: openPalette } = usePalette();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setShowAccents(false); }, [pathname]);

  const isLight = theme === "light";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "navbar-scrolled backdrop-blur-xl border-b shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                <Terminal className="w-4 h-4 text-brand-400" />
              </div>
              <span className="font-semibold text-neutral-50 tracking-tight">
                umapathi<span className="text-brand-400">.</span>dev
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                    pathname === link.href
                      ? "text-neutral-50 bg-white/8"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/4"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side controls */}
            <div className="hidden md:flex items-center gap-2">
              {/* Command palette trigger */}
              <button
                type="button"
                onClick={openPalette}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/4 border border-white/8 hover:bg-white/6 transition-colors"
                title="Command palette (Ctrl+K)"
              >
                <Command className="w-3 h-3 text-neutral-500" />
                <span className="text-xs text-neutral-600 font-mono">K</span>
              </button>

              {/* Accent color picker */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAccents((v) => !v)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/4 border border-white/8 hover:bg-white/6 transition-colors"
                  title="Change accent color"
                >
                  <Palette className="w-3.5 h-3.5 text-neutral-500" />
                </button>
                <AnimatePresence>
                  {showAccents && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 4 }}
                      transition={{ duration: 0.12 }}
                      className="nav-dropdown absolute top-10 right-0 flex gap-2 p-2.5 rounded-xl shadow-xl border z-50"
                    >
                      {ACCENT_COLORS.map((a) => (
                        <button
                          key={a.value}
                          type="button"
                          onClick={() => { setAccent(a.value); setShowAccents(false); }}
                          aria-label={`${a.value} accent color`}
                          data-accent-value={a.value}
                          data-active={accent === a.value ? "true" : "false"}
                          className="accent-dot w-6 h-6 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                        >
                          {accent === a.value && (
                            <div className="w-2 h-2 rounded-full bg-white/80" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ambient sound toggle */}
              <SoundToggle />

              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/4 border border-white/8 hover:bg-white/6 transition-colors"
                title={isLight ? "Switch to dark mode" : "Switch to light mode"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isLight ? (
                      <Moon className="w-3.5 h-3.5 text-neutral-500" />
                    ) : (
                      <Sun className="w-3.5 h-3.5 text-neutral-500" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>

              <div className="w-px h-5 bg-white/8 mx-1" />

              <Link
                href="/contact"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/resume"
                className="text-sm font-medium px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors"
              >
                Resume
              </Link>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-neutral-400"
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-neutral-300 hover:text-white hover:bg-white/8 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="navbar-mobile fixed top-16 inset-x-0 z-40 backdrop-blur-xl border-b"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    pathname === link.href
                      ? "text-white bg-white/8"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile accent picker */}
              <div className="px-4 py-3">
                <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-2">Accent color</p>
                <div className="flex gap-3">
                  {ACCENT_COLORS.map((a) => (
                    <button
                      key={a.value}
                      type="button"
                      onClick={() => setAccent(a.value)}
                      aria-label={`${a.value} accent color`}
                      data-accent-value={a.value}
                      data-active={accent === a.value ? "true" : "false"}
                      className="accent-dot w-6 h-6 rounded-full transition-transform active:scale-90"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-2 pt-3 border-t border-white/6 flex gap-3">
                <Link href="/contact" className="flex-1 text-center py-3 rounded-lg bg-white/5 text-sm font-medium text-neutral-300">
                  Contact
                </Link>
                <Link href="/resume" className="flex-1 text-center py-3 rounded-lg bg-brand-500 text-sm font-medium text-white">
                  Resume
                </Link>
              </div>

              {/* Command palette hint */}
              <button
                type="button"
                onClick={() => { setMobileOpen(false); openPalette(); }}
                className="mt-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/6 text-xs text-neutral-600"
              >
                <Command className="w-3 h-3" /> Quick navigate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
