"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPathname = useRef(pathname);

  // Detect when pathname changes (navigation complete)
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      // Navigation complete — jump to 100
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 400);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [pathname]);

  // Listen for link clicks to start the loader
  useEffect(() => {
    function onLinkClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#")) return;
      if (href === pathname) return;

      setLoading(true);
      setProgress(8);

      // Creep toward 80
      let p = 8;
      timerRef.current = setInterval(() => {
        p += Math.random() * 8 + 2;
        if (p >= 80) { p = 80; if (timerRef.current) clearInterval(timerRef.current); }
        setProgress(p);
      }, 200);
    }

    document.addEventListener("click", onLinkClick);
    return () => {
      document.removeEventListener("click", onLinkClick);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed top-0 left-0 right-0 z-[200] h-[2px] pointer-events-none"
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--loader-color, var(--color-brand-500))" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
          {/* Glow tip */}
          <div
            className="absolute top-0 right-0 w-16 h-full rounded-full blur-sm"
            style={{
              left: `${progress}%`,
              width: "80px",
              transform: "translateX(-100%)",
              background: "var(--loader-color, var(--color-brand-500))",
              opacity: 0.6,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
