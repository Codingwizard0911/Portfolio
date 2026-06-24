"use client";

import {
  useState, useEffect, useRef, useCallback, createContext, useContext,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Home, User, Briefcase, BookOpen, Cpu, FlaskConical,
  FileText, Mail, BarChart2, ArrowRight, Command,
  Sun, Moon, Palette as PaletteIcon, ExternalLink, Download, Copy, Check,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { cn } from "@/lib/utils";
import { useTheme, type Accent } from "./ThemeProvider";

// ── Context ──────────────────────────────────────────────────────────

interface PaletteCtx { open: () => void; close: () => void; }
const PaletteContext = createContext<PaletteCtx>({ open: () => {}, close: () => {} });
export function usePalette() { return useContext(PaletteContext); }

// ── Command definitions ───────────────────────────────────────────────

type CmdSection = "Navigate" | "Actions" | "Theme" | "Links";

interface Cmd {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  section: CmdSection;
  href?: string;
  external?: boolean;
  action?: () => void;
  keywords?: string[];
}

function useCommands(): Cmd[] {
  const router = useRouter();
  const { setTheme, setAccent, theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    void navigator.clipboard.writeText("umapathiu0911@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return [
    // Navigate
    { id: "home", label: "Home", icon: Home, section: "Navigate", href: "/" },
    { id: "about", label: "About", icon: User, section: "Navigate", href: "/about", keywords: ["bio", "profile", "info"] },
    { id: "experience", label: "Experience", icon: Briefcase, section: "Navigate", href: "/experience", keywords: ["work", "job", "career"] },
    { id: "projects", label: "Projects", icon: Cpu, section: "Navigate", href: "/projects", keywords: ["portfolio", "work", "built"] },
    { id: "publications", label: "Publications", icon: BookOpen, section: "Navigate", href: "/publications", keywords: ["research", "paper", "journal"] },
    { id: "tech-stack", label: "Tech Stack", icon: Cpu, section: "Navigate", href: "/tech-stack", keywords: ["skills", "technologies"] },
    { id: "ai-lab", label: "AI Lab", icon: FlaskConical, section: "Navigate", href: "/ai-lab" },
    { id: "blog", label: "Blog", icon: FileText, section: "Navigate", href: "/blog" },
    { id: "resume", label: "Resume", icon: Download, section: "Navigate", href: "/resume", keywords: ["cv", "download"] },
    { id: "contact", label: "Contact", icon: Mail, section: "Navigate", href: "/contact", keywords: ["email", "hire"] },
    { id: "analytics", label: "Analytics (Admin)", icon: BarChart2, section: "Navigate", href: "/admin/analytics", keywords: ["dashboard", "stats"] },
    // Actions
    {
      id: "copy-email",
      label: copied ? "Email copied!" : "Copy email address",
      icon: copied ? Check : Copy,
      section: "Actions",
      action: copyEmail,
      keywords: ["email", "contact", "copy"],
    },
    {
      id: "toggle-theme",
      label: theme === "dark" ? "Switch to Light mode" : "Switch to Dark mode",
      icon: theme === "dark" ? Sun : Moon,
      section: "Actions",
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      keywords: ["dark", "light", "mode", "color"],
    },
    // Theme accents
    {
      id: "accent-blue",
      label: "Blue accent",
      icon: PaletteIcon,
      section: "Theme",
      action: () => setAccent("blue"),
      keywords: ["theme", "color"],
    },
    {
      id: "accent-purple",
      label: "Purple accent",
      icon: PaletteIcon,
      section: "Theme",
      action: () => setAccent("purple"),
      keywords: ["theme", "color"],
    },
    {
      id: "accent-green",
      label: "Green accent",
      icon: PaletteIcon,
      section: "Theme",
      action: () => setAccent("green"),
      keywords: ["theme", "color"],
    },
    {
      id: "accent-orange",
      label: "Orange accent",
      icon: PaletteIcon,
      section: "Theme",
      action: () => setAccent("orange"),
      keywords: ["theme", "color"],
    },
    // Links
    {
      id: "github",
      label: "GitHub",
      description: "github.com/Codingwizard0911",
      icon: GithubIcon,
      section: "Links",
      href: "https://github.com/Codingwizard0911",
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      description: "linkedin.com/in/umapathi-ramesh-279289226",
      icon: LinkedinIcon,
      section: "Links",
      href: "https://linkedin.com/in/umapathi-ramesh-279289226",
      external: true,
    },
  ];
}


// ── Main component ────────────────────────────────────────────────────

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const commands = useCommands();
  const { accent } = useTheme();

  useEffect(() => { inputRef.current?.focus(); }, []);

  const filtered = query.trim()
    ? commands.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.label.toLowerCase().includes(q) ||
          c.section.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.keywords?.some((k) => k.includes(q))
        );
      })
    : commands;

  const grouped = filtered.reduce<Record<string, Cmd[]>>((acc, c) => {
    if (!acc[c.section]) acc[c.section] = [];
    acc[c.section].push(c);
    return acc;
  }, {});

  const flat = filtered;

  useEffect(() => { setSelected(0); }, [query]);

  function execute(cmd: Cmd) {
    onClose();
    if (cmd.action) { cmd.action(); return; }
    if (cmd.href) {
      if (cmd.external) { window.open(cmd.href, "_blank", "noopener"); return; }
      router.push(cmd.href);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, flat.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = flat[selected];
        if (cmd) execute(cmd);
      }
      if (e.key === "Escape") { onClose(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flat, selected, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const sections = Object.keys(grouped) as CmdSection[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)]"
        style={{ background: "var(--chat-panel-bg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/6">
          <Search className="w-4 h-4 text-neutral-500 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, actions, settings…"
            className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-600 outline-none"
          />
          <div className="flex items-center gap-1">
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/6 border border-white/10 text-neutral-500 font-mono">ESC</kbd>
          </div>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[360px] overflow-y-auto py-2">
          {flat.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-neutral-600">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            sections.map((section) => (
              <div key={section}>
                <p className="px-4 pt-3 pb-1 text-[10px] font-semibold text-neutral-600 uppercase tracking-widest">
                  {section}
                </p>
                {grouped[section].map((cmd) => {
                  const globalIdx = flat.indexOf(cmd);
                  const isSelected = globalIdx === selected;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      data-idx={globalIdx}
                      onClick={() => execute(cmd)}
                      onMouseEnter={() => setSelected(globalIdx)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                        isSelected ? "bg-brand-500/10" : "hover:bg-white/4"
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors",
                        isSelected
                          ? "bg-brand-500/15 border-brand-500/30 text-brand-400"
                          : "bg-white/4 border-white/8 text-neutral-500"
                      )}>
                        {cmd.id.startsWith("accent-") ? (
                          <div
                            className="accent-dot w-3 h-3 rounded-full"
                            data-accent-value={cmd.id.replace("accent-", "")}
                          />
                        ) : (
                          <cmd.icon className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium truncate", isSelected ? "text-neutral-100" : "text-neutral-300")}>
                          {cmd.label}
                        </p>
                        {cmd.description && (
                          <p className="text-xs text-neutral-600 truncate">{cmd.description}</p>
                        )}
                      </div>
                      {cmd.external && <ExternalLink className="w-3 h-3 text-neutral-700 shrink-0" />}
                      {cmd.href && !cmd.external && isSelected && (
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-white/6 flex items-center gap-4 text-[10px] text-neutral-700">
          <span className="flex items-center gap-1">
            <kbd className="px-1 rounded bg-white/6 border border-white/8 font-mono">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 rounded bg-white/6 border border-white/8 font-mono">↵</kbd> select
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Command className="w-2.5 h-2.5" /><span>K</span> to open
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Provider ──────────────────────────────────────────────────────────

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PaletteContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      <AnimatePresence>
        {isOpen && <Palette onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </PaletteContext.Provider>
  );
}
