"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";

const FACTS = [
  "I published two international research papers while finishing my B.Tech degree — simultaneously.",
  "My CGPA of 8.8 means I never pulled an all-nighter without a plan.",
  "The ML model I built for transit analytics became a real publication, not just a project.",
  "I speak English, Tamil, and Telugu — and debug code in all three.",
  "I can read a PostgreSQL execution plan faster than most people read a menu.",
  "I led the entire National Level Technical Symposium at my college as Head of Department Events.",
  "My first job offer came from building projects that solved real problems, not from a resume alone.",
  "I can explain machine learning to a grandparent and to a PhD — and use completely different words for both.",
  "Vue.js is my frontend home, but I learned React specifically to build this portfolio.",
  "I once optimized a SQL query from 40 seconds to 200ms by rethinking the join order.",
  "The hardest bug I ever fixed was not in the code — it was in my assumptions about the data.",
  "I genuinely find data pipelines relaxing to design. Yes, really.",
];

export default function FunFacts() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const next = useCallback(() => {
    setDir(1);
    setIdx((i) => (i + 1) % FACTS.length);
  }, []);

  const shuffle = useCallback(() => {
    setDir(1);
    setIdx((i) => {
      let n = i;
      while (n === i) n = Math.floor(Math.random() * FACTS.length);
      return n;
    });
  }, []);

  return (
    <div className="card p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Fun fact #{idx + 1}</span>
        <button
          type="button"
          onClick={shuffle}
          aria-label="Show another fun fact"
          className="flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-neutral-200 transition-colors group"
        >
          <Shuffle className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
          shuffle
        </button>
      </div>

      <div className="relative h-16 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.p
            key={idx}
            custom={dir}
            initial={{ opacity: 0, y: 18 * dir }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 * dir }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-neutral-300 leading-relaxed absolute inset-0"
          >
            {FACTS[idx]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-1.5 mt-4">
        {FACTS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Fact ${i + 1}`}
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            className={`h-0.5 rounded-full transition-all duration-200 ${i === idx ? "w-5 bg-brand-400" : "w-1.5 bg-white/15 hover:bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
