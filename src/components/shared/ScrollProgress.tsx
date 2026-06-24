"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
      setProgress(pct);
      setShowTop(pct > 30);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* Scroll progress bar — very top of page */}
      <div className="fixed top-0 left-0 right-0 z-[199] h-[2px] bg-white/0 pointer-events-none">
        <motion.div
          className="scroll-progress-bar h-full origin-left"
          style={{ scaleX: progress / 100 }}
          transition={{ duration: 0.05 }}
        />
      </div>

      {/* Back-to-top button with circular progress */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="fixed bottom-24 right-6 z-[90] w-11 h-11 flex items-center justify-center"
          >
            {/* SVG circular progress ring */}
            <svg className="absolute inset-0 w-11 h-11 -rotate-90" viewBox="0 0 44 44">
              {/* Track */}
              <circle
                cx="22" cy="22" r="18"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />
              {/* Progress */}
              <motion.circle
                cx="22" cy="22" r="18"
                fill="none"
                className="progress-circle-stroke"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={113.1}
                initial={{ strokeDashoffset: 113.1 }}
                animate={{ strokeDashoffset: 113.1 - (113.1 * progress) / 100 }}
                transition={{ duration: 0.05 }}
              />
            </svg>

            {/* Inner button */}
            <div className="relative w-8 h-8 rounded-full bg-surface-3 border border-white/10 flex items-center justify-center hover:bg-surface-4 transition-colors">
              <ArrowUp className="w-3.5 h-3.5 text-neutral-300" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
