"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Bot, Loader2, RotateCcw, ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Local FAQ fallback (used when ANTHROPIC_API_KEY is not set) ──────

interface FaqEntry { patterns: string[]; answer: string }

const LOCAL_FAQ: FaqEntry[] = [
  {
    patterns: ["hello", "hi", "hey", "greet", "start"],
    answer: "Hi! I'm Umapathi's portfolio assistant. Ask me about his experience, skills, projects, publications, or availability — I'm happy to help! 👋",
  },
  {
    patterns: ["tech stack", "skills", "technologies", "programming", "tools", "know", "language"],
    answer: "Umapathi's core stack: **Python** (expert), **JavaScript/TypeScript**, **Vue.js**, **FastAPI**, **PostgreSQL**, **MySQL**, **AWS**, **Jenkins**, **Pandas**, **Scikit-learn**, and **Streamlit**. He's also proficient in React, Next.js, and Power BI.",
  },
  {
    patterns: ["project", "built", "created", "developed", "work", "portfolio"],
    answer: "Two flagship projects:\n\n1. **Transit Analytics & Recommendation System** — ML platform for bus optimization using Python, Scikit-learn, and Streamlit. Published in IJIRT (2025).\n\n2. **Hiring Platform** — Full-stack job marketplace with Vue.js, PostgreSQL, JWT auth.",
  },
  {
    patterns: ["publication", "research", "paper", "journal", "published", "ijirt", "ijamema"],
    answer: "He has 2 published international research papers:\n\n1. *ML Driven Predictive Analytics for Bus Transportation System* — IJIRT, 2025\n2. *Website Traffic Analysis* — IJAMEMA, 2024",
  },
  {
    patterns: ["experience", "job", "company", "vaken", "role", "position"],
    answer: "Umapathi is a **Full Stack Developer at Vaken Technologies**, Trichy (Aug 2025–Present). He builds scalable REST APIs, manages PostgreSQL/MySQL databases, deploys on AWS, and runs CI/CD with Jenkins in Agile sprints.",
  },
  {
    patterns: ["available", "hire", "open", "looking", "opportunity", "recruit", "candidate", "remote"],
    answer: "Yes! Umapathi is **actively open** to full-time roles in:\n- Full Stack Development\n- Backend Engineering (Python/FastAPI)\n- AI/ML Engineering\n- Data Engineering\n\nBased in Tamil Nadu, open to remote globally. Email: umapathiu0911@gmail.com",
  },
  {
    patterns: ["contact", "email", "phone", "reach", "message", "linkedin", "github"],
    answer: "Contact Umapathi:\n📧 umapathiu0911@gmail.com\n📱 +91 9042180833\n💼 linkedin.com/in/umapathi-ramesh-279289226\n💻 github.com/Codingwizard0911",
  },
  {
    patterns: ["education", "degree", "college", "university", "cgpa", "gpa", "b.tech", "btech"],
    answer: "**B.Tech in Information Technology**, R P Sarathy Institute of Technology, Salem — **CGPA 8.8/10** (2021–2025).",
  },
  {
    patterns: ["ml", "machine learning", "ai", "deep learning", "scikit", "model", "data science"],
    answer: "Umapathi has hands-on ML experience in predictive modeling, feature engineering, and data analytics. He built an ML recommendation system for transit optimization — published in an international journal — using Scikit-learn, Pandas, and NumPy.",
  },
  {
    patterns: ["location", "based", "india", "remote", "where", "city"],
    answer: "Based in **Tamil Nadu, India** — currently in Trichy for work. Open to remote roles globally and relocation opportunities.",
  },
  {
    patterns: ["salary", "compensation", "ctc", "pay"],
    answer: "For compensation discussions, please reach out directly at umapathiu0911@gmail.com — Umapathi is open to competitive offers based on role and scope.",
  },
  {
    patterns: ["certification", "course", "training", "learn"],
    answer: "Certifications include **Data Science and Machine Learning** from Coding Ninjas. Continuous learner — built production ML systems while actively publishing research.",
  },
];

function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const entry = LOCAL_FAQ.find((e) => e.patterns.some((p) => q.includes(p)));
  return entry?.answer ?? "I don't have specific information on that. For detailed questions, email Umapathi directly at **umapathiu0911@gmail.com** — he's very responsive! 😊";
}

// ── Types ─────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What's his tech stack?",
  "Tell me about his ML projects",
  "Is he open to new roles?",
  "How to contact him?",
];

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content: "Hi! I'm Umapathi's AI assistant. Ask me about his experience, projects, skills, or how to get in touch. 👋",
  timestamp: new Date(),
};

// ── Markdown-lite renderer ────────────────────────────────────────────

function renderContent(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold
    const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic
    const italic = bold.replace(/\*(.*?)\*/g, "<em>$1</em>");
    const isBullet = line.trimStart().startsWith("-") || line.trimStart().startsWith("•");
    if (isBullet) {
      const content = italic.replace(/^[\s\-•]+/, "");
      return (
        <div key={i} className="flex gap-1.5 mt-0.5">
          <span className="text-brand-400 mt-0.5 shrink-0">·</span>
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    }
    return (
      <p key={i} className={i > 0 && lines[i - 1] !== "" ? "mt-1.5" : ""}>
        <span dangerouslySetInnerHTML={{ __html: italic }} />
      </p>
    );
  });
}

// ── Message bubble ────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex gap-2.5", isUser && "flex-row-reverse")}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-brand-500/15 border border-brand-500/25 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5 text-brand-400" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-brand-500 text-white rounded-tr-sm"
            : "bg-white/6 border border-white/8 text-neutral-200 rounded-tl-sm"
        )}
      >
        {isUser ? message.content : renderContent(message.content)}
      </div>
    </motion.div>
  );
}

// ── Main chatbot ──────────────────────────────────────────────────────

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom(false);
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, scrollToBottom]);

  useEffect(() => {
    if (open) scrollToBottom();
    else if (messages.length > 1) setUnread((n) => n + 1);
  }, [messages, open, scrollToBottom]);

  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
  };

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // If already in fallback mode, answer locally without a network call
    if (useFallback) {
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: localAnswer(text), timestamp: new Date() },
      ]);
      setLoading(false);
      return;
    }

    try {
      const history = [...messages, userMsg]
        .filter((m) => m.id !== "greeting")
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      // 503 = API key not configured → switch to local FAQ mode
      if (res.status === 503) {
        setUseFallback(true);
        await new Promise((r) => setTimeout(r, 200));
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content: localAnswer(text), timestamp: new Date() },
        ]);
        setLoading(false);
        return;
      }

      const data = await res.json() as { reply?: string; error?: string };
      const reply = data.reply ?? data.error ?? "I couldn't get a response. Please try again.";
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply, timestamp: new Date() },
      ]);
    } catch {
      // Network error → use local FAQ
      setUseFallback(true);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: localAnswer(text), timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setMessages([GREETING]);
    setInput("");
    setUseFallback(false);
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => { setOpen(true); setUnread(0); }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-[0_4px_24px_rgba(59,130,246,0.4)] flex items-center justify-center transition-all duration-300",
          "bg-linear-to-br from-brand-500 to-accent-600",
          open && "opacity-0 pointer-events-none scale-90"
        )}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {unread > 0 && !open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center"
          >
            {unread}
          </motion.span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="chat-panel fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl overflow-hidden shadow-[0_8px_64px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]"
          >
            {/* Header */}
            <div className="chat-header flex items-center justify-between px-4 py-3.5 border-b border-white/6 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-500/15 border border-brand-500/25 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-100">Portfolio Assistant</p>
                  <p className="text-xs text-neutral-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    {useFallback ? "FAQ mode" : "Powered by Claude"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset chat"
                  aria-label="Reset chat"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-white/6 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-white/6 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth"
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 items-center"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-500/15 border border-brand-500/25 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-brand-400" />
                  </div>
                  <div className="bg-white/6 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-brand-400"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll-to-bottom */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  type="button"
                  aria-label="Scroll to bottom"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scrollToBottom()}
                  className="absolute bottom-[80px] right-4 w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center shadow-lg"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Suggested questions — when only greeting shown */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 shrink-0">
                <p className="text-[10px] text-neutral-600 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Suggested
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      type="button"
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 hover:bg-brand-500/20 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-brand-500/40 transition-colors"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, projects, skills…"
                  className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-600 outline-none"
                  maxLength={500}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-white" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
