"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Monitor, Zap, Route, Palette, Keyboard, Layers,
  Activity, Code2, Sliders, Sparkles, Terminal,
  Download, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type Accent } from "./ThemeProvider";

// ── Types ─────────────────────────────────────────────────────────────
interface DebugState {
  grid: boolean;
  outlines: boolean;
  reducedMotion: boolean;
}

type RadiusPreset = "sharp" | "default" | "rounded" | "pill";
type CardStyle    = "default" | "glass" | "flat" | "elevated";
type SpeedPreset  = "fast" | "normal" | "slow";

const SHORTCUTS = [
  { key: "Ctrl + K",   desc: "Command palette" },
  { key: "` (backtick)", desc: "Toggle Dev Panel" },
  { key: "terminal",   desc: "Secret terminal 🖥️" },
  { key: "T",          desc: "Toggle dark / light" },
  { key: "Esc",        desc: "Close any overlay" },
  { key: "↑↑↓↓←→←→BA", desc: "Easter egg 🎮" },
];

const ACCENT_OPTIONS: { value: Accent; label: string; color: string }[] = [
  { value: "blue",   label: "Blue",   color: "#3b82f6" },
  { value: "purple", label: "Purple", color: "#a855f7" },
  { value: "green",  label: "Green",  color: "#22c55e" },
  { value: "orange", label: "Orange", color: "#f97316" },
];

const RADIUS_PRESETS: { value: RadiusPreset; label: string; preview: string }[] = [
  { value: "sharp",   label: "Sharp",   preview: "⬛" },
  { value: "default", label: "Default", preview: "▣" },
  { value: "rounded", label: "Rounded", preview: "⬜" },
  { value: "pill",    label: "Pill",    preview: "⭕" },
];

const CARD_STYLES: { value: CardStyle; label: string }[] = [
  { value: "default",  label: "Default"  },
  { value: "glass",    label: "Glass"    },
  { value: "flat",     label: "Flat"     },
  { value: "elevated", label: "Elevated" },
];

// ── FPS counter ────────────────────────────────────────────────────────
function useFps() {
  const [fps, setFps] = useState(0);
  const frameRef = useRef(0);
  const lastRef  = useRef(performance.now());
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    function tick(now: number) {
      frameRef.current++;
      if (now - lastRef.current >= 1000) {
        setFps(frameRef.current);
        frameRef.current = 0;
        lastRef.current = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return fps;
}

// ── Viewport hook ────────────────────────────────────────────────────
function useViewport() {
  const [vp, setVp] = useState({ w: 0, h: 0, bp: "" });

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const bp =
        w >= 1536 ? "2xl" :
        w >= 1280 ? "xl"  :
        w >= 1024 ? "lg"  :
        w >= 768  ? "md"  :
        w >= 640  ? "sm"  : "xs";
      setVp({ w, h, bp });
    }
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return vp;
}

// ── Small sub-components ────────────────────────────────────────────────
function Section({ title, icon: Icon, children }: {
  title: string; icon: React.ElementType; children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2.5">
        <Icon className="w-3 h-3 text-brand-400" />
        <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-white/4 last:border-0">
      <span className="text-[11px] text-neutral-600">{label}</span>
      <span className="text-[11px] font-mono text-neutral-300">{value}</span>
    </div>
  );
}

function Toggle({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between py-1.5 text-left"
    >
      <span className="text-[11px] text-neutral-400">{label}</span>
      <div className={cn("w-7 h-4 rounded-full transition-colors flex items-center px-0.5",
        checked ? "bg-brand-500" : "bg-white/10"
      )}>
        <motion.div
          animate={{ x: checked ? 12 : 0 }}
          transition={{ duration: 0.15 }}
          className="w-3 h-3 rounded-full bg-white shadow"
        />
      </div>
    </button>
  );
}

// ── Main panel ─────────────────────────────────────────────────────────
export default function DevPanel() {
  const [open, setOpen]           = useState(false);
  const [debug, setDebug]         = useState<DebugState>({ grid: false, outlines: false, reducedMotion: false });
  const [radius, setRadiusState]  = useState<RadiusPreset>("default");
  const [cardStyle, setCardState] = useState<CardStyle>("default");
  const [speed, setSpeedState]    = useState<SpeedPreset>("normal");
  const [noise, setNoiseState]    = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [konami, setKonami]       = useState(false);
  const [copied, setCopied]       = useState(false);

  const pathname      = usePathname();
  const fps           = useFps();
  const vp            = useViewport();
  const { theme, accent, toggleTheme, setAccent } = useTheme();
  const [loadTime, setLoadTime]   = useState<string>("—");
  const konamiSeq     = useRef<string[]>([]);
  const spotlightCleanup = useRef<(() => void) | null>(null);

  // Page load time
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav) setLoadTime(`${Math.round(nav.loadEventEnd - nav.startTime)}ms`);
  }, [pathname]);

  // Backtick toggle + T for theme + Konami
  useEffect(() => {
    const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "`") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "t" && !e.ctrlKey && !e.metaKey) toggleTheme();

      konamiSeq.current.push(e.key);
      if (konamiSeq.current.length > KONAMI.length) konamiSeq.current.shift();
      if (konamiSeq.current.join(",") === KONAMI.join(",")) {
        setKonami(true);
        konamiSeq.current = [];
        setTimeout(() => setKonami(false), 3000);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleTheme]);

  // Apply debug / appearance attributes
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("debug-grid", debug.grid);
    html.classList.toggle("debug-outlines", debug.outlines);
    html.style[debug.reducedMotion ? "setProperty" : "removeProperty"]("--motion-duration", "0s");
  }, [debug]);

  const setRadius = useCallback((r: RadiusPreset) => {
    setRadiusState(r);
    const html = document.documentElement;
    if (r === "default") html.removeAttribute("data-radius");
    else html.setAttribute("data-radius", r);
  }, []);

  const setCard = useCallback((c: CardStyle) => {
    setCardState(c);
    const html = document.documentElement;
    if (c === "default") html.removeAttribute("data-card");
    else html.setAttribute("data-card", c);
  }, []);

  const setSpeed = useCallback((s: SpeedPreset) => {
    setSpeedState(s);
    const html = document.documentElement;
    if (s === "normal") html.removeAttribute("data-speed");
    else html.setAttribute("data-speed", s);
  }, []);

  const setNoise = useCallback((v: boolean) => {
    setNoiseState(v);
    const html = document.documentElement;
    if (v) html.setAttribute("data-noise", "true");
    else html.removeAttribute("data-noise");
  }, []);

  const toggleSpotlight = useCallback((v: boolean) => {
    setSpotlight(v);
    const html = document.documentElement;
    if (v) {
      html.classList.add("spotlight-active");
      function onMove(e: MouseEvent) {
        html.style.setProperty("--sx", `${e.clientX}px`);
        html.style.setProperty("--sy", `${e.clientY}px`);
      }
      window.addEventListener("mousemove", onMove);
      spotlightCleanup.current = () => {
        window.removeEventListener("mousemove", onMove);
        html.classList.remove("spotlight-active");
      };
    } else {
      spotlightCleanup.current?.();
      spotlightCleanup.current = null;
    }
  }, []);

  // Cleanup spotlight on unmount
  useEffect(() => () => { spotlightCleanup.current?.(); }, []);

  const setDbg = useCallback((key: keyof DebugState, val: boolean) => {
    setDebug((d) => ({ ...d, [key]: val }));
  }, []);

  function exportTheme() {
    const params = new URLSearchParams({ theme, accent, radius, card: cardStyle, speed });
    const url = `${window.location.origin}?${params}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function openTerminal() {
    window.dispatchEvent(new CustomEvent("open-terminal"));
    setOpen(false);
  }

  const dpi = typeof window !== "undefined" ? window.devicePixelRatio.toFixed(1) : "—";
  const mem = typeof performance !== "undefined" && (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory
    ? `${Math.round((performance as unknown as { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize / 1048576)}MB`
    : "—";

  return (
    <>
      {/* Konami easter egg */}
      <AnimatePresence>
        {konami && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[10000] bg-brand-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl pointer-events-none"
          >
            🎮 +30 lives! Konami Code activated!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Prominent floating trigger button ── */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open developer panel"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "fixed bottom-8 left-4 z-[90] flex items-center gap-2 px-3.5 py-2 rounded-xl",
          "border transition-all duration-200 shadow-lg",
          open
            ? "bg-brand-500/15 border-brand-500/50 text-brand-300"
            : "bg-surface-2/90 border-white/12 text-neutral-400 hover:text-neutral-200 hover:border-white/20 hover:bg-surface-3"
        )}
      >
        <Code2 className="w-3.5 h-3.5 shrink-0" />
        <span className="text-xs font-medium">Dev Panel</span>
        <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-white/6 border border-white/10 text-neutral-600">
          `
        </kbd>
      </motion.button>

      {/* ── Slide-in panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[95] bg-black/20 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[96] w-72 bg-surface-1 border-l border-white/6 flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/6 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                    <Code2 className="w-3 h-3 text-brand-400" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-100">DevTools</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500/15 text-brand-400 font-mono">DEV</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close developer panel"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 hover:text-white hover:bg-white/6 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0">

                {/* Performance */}
                <Section title="Performance" icon={Activity}>
                  <div className="space-y-0.5">
                    <Row label="FPS" value={
                      <span className={cn("font-bold",
                        fps >= 55 ? "text-emerald-400" : fps >= 30 ? "text-amber-400" : "text-rose-400"
                      )}>{fps}</span>
                    } />
                    <Row label="Page load" value={loadTime} />
                    <Row label="Memory" value={mem} />
                  </div>
                </Section>

                {/* Environment */}
                <Section title="Environment" icon={Monitor}>
                  <div className="space-y-0.5">
                    <Row label="Route"      value={<span className="truncate max-w-[120px] block">{pathname}</span>} />
                    <Row label="Viewport"   value={`${vp.w} × ${vp.h}`} />
                    <Row label="Breakpoint" value={
                      <span className="px-1.5 py-0.5 rounded bg-brand-500/15 text-brand-400 text-[10px]">{vp.bp}</span>
                    } />
                    <Row label="DPI"        value={`${dpi}×`} />
                    <Row label="Mode"       value={theme} />
                  </div>
                </Section>

                {/* Theme */}
                <Section title="Theme" icon={Palette}>
                  <div className="mb-2">
                    <Toggle
                      label={`Mode: ${theme === "dark" ? "🌙 Dark" : "☀️ Light"}`}
                      checked={theme === "light"}
                      onChange={() => toggleTheme()}
                    />
                  </div>
                  <p className="text-[10px] text-neutral-600 mb-2">Accent color</p>
                  <div className="flex gap-2 mb-1">
                    {ACCENT_OPTIONS.map((a) => (
                      <button
                        key={a.value}
                        type="button"
                        aria-label={`${a.label} accent`}
                        data-accent-value={a.value}
                        data-active={accent === a.value ? "true" : "false"}
                        onClick={() => setAccent(a.value)}
                        className="accent-dot w-6 h-6 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                      >
                        {accent === a.value && <div className="w-2 h-2 rounded-full bg-white/80" />}
                      </button>
                    ))}
                  </div>
                </Section>

                {/* Customization */}
                <Section title="Customization" icon={Sliders}>

                  {/* Border radius */}
                  <p className="text-[10px] text-neutral-600 mb-1.5">Border radius</p>
                  <div className="grid grid-cols-4 gap-1 mb-3">
                    {RADIUS_PRESETS.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRadius(r.value)}
                        className={cn(
                          "py-1.5 text-[10px] font-medium rounded-lg border transition-all",
                          radius === r.value
                            ? "bg-brand-500/15 border-brand-500/40 text-brand-300"
                            : "bg-white/3 border-white/6 text-neutral-500 hover:border-white/12"
                        )}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>

                  {/* Card style */}
                  <p className="text-[10px] text-neutral-600 mb-1.5">Card style</p>
                  <div className="grid grid-cols-4 gap-1 mb-3">
                    {CARD_STYLES.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setCard(c.value)}
                        className={cn(
                          "py-1.5 text-[10px] font-medium rounded-lg border transition-all",
                          cardStyle === c.value
                            ? "bg-brand-500/15 border-brand-500/40 text-brand-300"
                            : "bg-white/3 border-white/6 text-neutral-500 hover:border-white/12"
                        )}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>

                  {/* Animation speed */}
                  <p className="text-[10px] text-neutral-600 mb-1.5">Animation speed</p>
                  <div className="grid grid-cols-3 gap-1 mb-3">
                    {(["fast", "normal", "slow"] as SpeedPreset[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSpeed(s)}
                        className={cn(
                          "py-1.5 capitalize text-[10px] font-medium rounded-lg border transition-all",
                          speed === s
                            ? "bg-brand-500/15 border-brand-500/40 text-brand-300"
                            : "bg-white/3 border-white/6 text-neutral-500 hover:border-white/12"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Toggles */}
                  <Toggle label="Noise texture" checked={noise}     onChange={setNoise} />
                  <Toggle label="Spotlight mode" checked={spotlight} onChange={toggleSpotlight} />
                </Section>

                {/* Debug */}
                <Section title="Debug" icon={Layers}>
                  <Toggle label="Layout grid"        checked={debug.grid}           onChange={(v) => setDbg("grid", v)} />
                  <Toggle label="Element outlines"   checked={debug.outlines}       onChange={(v) => setDbg("outlines", v)} />
                  <Toggle label="Disable animations" checked={debug.reducedMotion}  onChange={(v) => setDbg("reducedMotion", v)} />
                </Section>

                {/* Features */}
                <Section title="Features" icon={Sparkles}>
                  <button
                    type="button"
                    onClick={openTerminal}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-white/3 border border-white/6 hover:border-green-500/30 hover:bg-green-500/5 transition-all group mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-[11px] text-neutral-300">Open Terminal</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-neutral-600 group-hover:text-green-500 transition-colors" />
                  </button>

                  <button
                    type="button"
                    onClick={exportTheme}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-white/3 border border-white/6 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-3.5 h-3.5 text-brand-400" />
                      <span className="text-[11px] text-neutral-300">
                        {copied ? "✅ Copied!" : "Export theme URL"}
                      </span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-neutral-600 group-hover:text-brand-400 transition-colors" />
                  </button>
                </Section>

                {/* Shortcuts */}
                <Section title="Shortcuts" icon={Keyboard}>
                  <div className="space-y-1.5">
                    {SHORTCUTS.map((s) => (
                      <div key={s.key} className="flex items-start justify-between gap-2">
                        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/6 border border-white/10 text-neutral-400 shrink-0 whitespace-nowrap">
                          {s.key}
                        </kbd>
                        <span className="text-[11px] text-neutral-600 text-right">{s.desc}</span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Navigation */}
                <Section title="Navigation" icon={Route}>
                  <div className="font-mono text-[11px] text-neutral-500 bg-white/4 rounded-lg px-3 py-2 break-all">
                    {typeof window !== "undefined" ? window.location.href : pathname}
                  </div>
                </Section>

                {/* Bottom padding so last item isn't behind the footer */}
                <div className="h-2" />
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/6 shrink-0">
                <p className="text-[10px] text-neutral-700 text-center">
                  Press <kbd className="font-mono bg-white/6 px-1 rounded border border-white/8">` </kbd> to toggle · Built with Next.js
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
