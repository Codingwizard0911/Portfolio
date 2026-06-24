"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";

// ── Command registry ────────────────────────────────────────────────────
const BANNER = [
  "  ██╗   ██╗███╗   ███╗ █████╗ ██████╗  █████╗ ████████╗██╗  ██╗██╗",
  "  ██║   ██║████╗ ████║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██║",
  "  ██║   ██║██╔████╔██║███████║██████╔╝███████║   ██║   ███████║██║",
  "  ██║   ██║██║╚██╔╝██║██╔══██║██╔═══╝ ██╔══██║   ██║   ██╔══██║██║",
  "  ╚██████╔╝██║ ╚═╝ ██║██║  ██║██║     ██║  ██║   ██║   ██║  ██║██║",
  "   ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝",
  "",
  "  Portfolio Terminal v1.0.0  |  Type 'help' for available commands",
  "  ─────────────────────────────────────────────────────────────────",
];

type OutputLine = { text: string; type: "output" | "input" | "error" | "success" | "info" | "matrix" };

function buildHelp(): OutputLine[] {
  return [
    { type: "info",    text: "Available commands:" },
    { type: "output",  text: "  whoami       — About Umapathi R" },
    { type: "output",  text: "  skills       — Technical skills & stack" },
    { type: "output",  text: "  projects     — Featured projects" },
    { type: "output",  text: "  contact      — Contact information" },
    { type: "output",  text: "  experience   — Work experience" },
    { type: "output",  text: "  education    — Academic background" },
    { type: "output",  text: "  matrix       — 🟢 You know what this does" },
    { type: "output",  text: "  clear        — Clear terminal" },
    { type: "output",  text: "  exit         — Close terminal" },
    { type: "output",  text: "" },
    { type: "output",  text: "  Tip: press Tab to autocomplete" },
  ];
}

function buildWhoami(): OutputLine[] {
  return [
    { type: "success", text: "Umapathi R" },
    { type: "output",  text: "─────────────────────────────────────" },
    { type: "output",  text: "  Role     : Full Stack Developer & ML Researcher" },
    { type: "output",  text: "  Company  : Vaken Technologies" },
    { type: "output",  text: "  Location : Tamil Nadu, India (remote-friendly)" },
    { type: "output",  text: "  Degree   : B.Tech Information Technology — CGPA 8.8" },
    { type: "output",  text: "  Status   : ✅ Open to opportunities" },
    { type: "output",  text: "" },
    { type: "info",    text: "  Passionate about the intersection of data and software." },
    { type: "info",    text: "  Published ML researcher. Builder of production systems." },
  ];
}

function buildSkills(): OutputLine[] {
  return [
    { type: "success", text: "Technical Skills" },
    { type: "output",  text: "─────────────────────────────────────" },
    { type: "info",    text: "  Languages  :" },
    { type: "output",  text: "    Python · JavaScript · TypeScript · SQL" },
    { type: "info",    text: "  Frontend   :" },
    { type: "output",  text: "    Vue.js · React · Next.js · Tailwind CSS" },
    { type: "info",    text: "  Backend    :" },
    { type: "output",  text: "    FastAPI · REST APIs · Node.js" },
    { type: "info",    text: "  Data / ML  :" },
    { type: "output",  text: "    Scikit-learn · Pandas · NumPy · Streamlit" },
    { type: "info",    text: "  Database   :" },
    { type: "output",  text: "    PostgreSQL · MySQL · SQLite" },
    { type: "info",    text: "  DevOps     :" },
    { type: "output",  text: "    AWS · Jenkins · CI/CD · Docker (basics)" },
  ];
}

function buildProjects(): OutputLine[] {
  return [
    { type: "success", text: "Featured Projects" },
    { type: "output",  text: "─────────────────────────────────────" },
    { type: "info",    text: "  [01] Transit Analytics & Recommendation System" },
    { type: "output",  text: "       ML-powered transport intelligence — Published in IJIRT (2025)" },
    { type: "output",  text: "       Stack: Python · ML · PostgreSQL · Streamlit" },
    { type: "output",  text: "" },
    { type: "info",    text: "  [02] Hiring Platform" },
    { type: "output",  text: "       Full-stack job marketplace with auth & application tracking" },
    { type: "output",  text: "       Stack: Vue.js · FastAPI · PostgreSQL · JWT" },
    { type: "output",  text: "" },
    { type: "output",  text: "  → Visit /projects for full details" },
  ];
}

function buildContact(): OutputLine[] {
  return [
    { type: "success", text: "Contact Information" },
    { type: "output",  text: "─────────────────────────────────────" },
    { type: "output",  text: "  Email     : umapathiu0911@gmail.com" },
    { type: "output",  text: "  GitHub    : github.com/Codingwizard0911" },
    { type: "output",  text: "  LinkedIn  : linkedin.com/in/umapathi-ramesh-279289226" },
    { type: "output",  text: "" },
    { type: "info",    text: "  → Visit /contact to send a direct message" },
  ];
}

function buildExperience(): OutputLine[] {
  return [
    { type: "success", text: "Work Experience" },
    { type: "output",  text: "─────────────────────────────────────" },
    { type: "info",    text: "  Full Stack Developer @ Vaken Technologies" },
    { type: "output",  text: "  Jan 2025 – Present · Tamil Nadu, India" },
    { type: "output",  text: "" },
    { type: "output",  text: "  • Built and maintained full-stack web applications" },
    { type: "output",  text: "  • Designed REST APIs with FastAPI / Python" },
    { type: "output",  text: "  • Implemented CI/CD pipelines via Jenkins" },
    { type: "output",  text: "  • Worked with PostgreSQL, Vue.js, AWS" },
  ];
}

function buildEducation(): OutputLine[] {
  return [
    { type: "success", text: "Education" },
    { type: "output",  text: "─────────────────────────────────────" },
    { type: "info",    text: "  B.Tech — Information Technology" },
    { type: "output",  text: "  Graduated 2024 · CGPA: 8.8 / 10" },
    { type: "output",  text: "" },
    { type: "output",  text: "  Research Publications" },
    { type: "output",  text: "  • IJIRT (2025) — ML Predictive Analytics for Bus Transit" },
    { type: "output",  text: "  • IJAMEMA (2024) — Website Traffic Analysis" },
  ];
}

// ── Matrix rain (text columns) ───────────────────────────────────────────
function MatrixRain({ onStop }: { onStop: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = Math.floor(canvas.width / 14);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF01234789".split("");

    function draw() {
      ctx!.fillStyle = "rgba(0,0,0,0.05)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.fillStyle = "#22c55e";
      ctx!.font = "13px monospace";

      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx!.fillText(ch, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas!.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      rafRef.current = requestAnimationFrame(draw);
    }
    draw();

    const stop = setTimeout(onStop, 5000);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(stop);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-90"
      style={{ display: "block" }}
    />
  );
}

// ── Terminal component ──────────────────────────────────────────────────
export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [matrix, setMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const COMMANDS = ["help", "whoami", "skills", "projects", "contact", "experience", "education", "matrix", "clear", "exit"];

  // Listen for global open event (from DevPanel) + "terminal" typed
  useEffect(() => {
    function onOpen() { setOpen(true); }
    window.addEventListener("open-terminal", onOpen);
    return () => window.removeEventListener("open-terminal", onOpen);
  }, []);

  // Secret word trigger: typing "terminal" anywhere on the page
  useEffect(() => {
    let buf = "";
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      buf += e.key.toLowerCase();
      if (buf.length > 8) buf = buf.slice(-8);
      if (buf === "terminal") { setOpen(true); buf = ""; }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Initialize banner on open
  useEffect(() => {
    if (open) {
      setHistory(BANNER.map((text) => ({ text, type: "output" as const })));
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setInput("");
      setMatrix(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const close = useCallback(() => setOpen(false), []);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((h) => [cmd, ...h]);
    setHistoryIdx(-1);

    const inputLine: OutputLine = { text: `guest@umapathi:~$ ${raw}`, type: "input" };

    let output: OutputLine[] = [];

    switch (cmd) {
      case "help":        output = buildHelp(); break;
      case "whoami":      output = buildWhoami(); break;
      case "skills":      output = buildSkills(); break;
      case "projects":    output = buildProjects(); break;
      case "contact":     output = buildContact(); break;
      case "experience":  output = buildExperience(); break;
      case "education":   output = buildEducation(); break;
      case "matrix":
        setMatrix(true);
        output = [{ type: "success", text: "Initiating matrix rain... (auto-stops in 5s)" }];
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        close();
        return;
      default:
        output = [{ type: "error", text: `Command not found: '${cmd}'. Type 'help' for available commands.` }];
    }

    setHistory((h) => [...h, inputLine, ...output, { text: "", type: "output" }]);
    setInput("");
  }, [close]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    } else if (e.key === "Escape") {
      close();
    }
  }

  function lineColor(type: OutputLine["type"]) {
    if (type === "input")   return "text-green-400";
    if (type === "error")   return "text-red-400";
    if (type === "success") return "text-emerald-300 font-semibold";
    if (type === "info")    return "text-cyan-400";
    return "text-green-200/80";
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-4 md:inset-12 lg:inset-20 z-[10001] rounded-2xl overflow-hidden shadow-2xl terminal-overlay flex flex-col border border-green-900/40"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Matrix rain overlay */}
          {matrix && (
            <MatrixRain onStop={() => setMatrix(false)} />
          )}

          {/* Title bar */}
          <div className="relative z-10 flex items-center gap-3 px-4 py-3 bg-black/80 border-b border-green-900/30 shrink-0">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={close}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                aria-label="Close terminal"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex items-center gap-1.5 flex-1 justify-center">
              <TerminalIcon className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-mono text-green-500/70">umapathi — portfolio terminal</span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="text-green-800 hover:text-green-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Output area */}
          <div className="relative z-10 flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
            {history.map((line, i) => (
              <div key={i} className={lineColor(line.type)}>
                {line.text || " "}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input line */}
          <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-t border-green-900/30 bg-black/60 shrink-0">
            <span className="font-mono text-[13px] text-green-500 shrink-0">guest@umapathi:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent border-none outline-none font-mono text-[13px] text-green-300 caret-green-400"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
            <span className="terminal-cursor" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
