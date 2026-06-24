"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Canvas particle trail ─────────────────────────────────────────────
function useParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; hue: number }[]>([]);
  const rafRef = useRef<number>(0);
  const lastEmit = useRef(0);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9995;width:100%;height:100%";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;
    const ctx = canvas.getContext("2d")!;

    function onResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize, { passive: true });

    function onMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastEmit.current < 28) return;
      lastEmit.current = now;
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 0.8;
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          life: 1,
          maxLife: 0.55 + Math.random() * 0.4,
          size: 1.5 + Math.random() * 2.5,
          hue: 210 + Math.random() * 80,
        });
      }
    }
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) { canvas.remove(); return; }
    window.addEventListener("mousemove", onMove, { passive: true });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const p = particlesRef.current;
      for (let i = p.length - 1; i >= 0; i--) {
        const pt = p[i];
        pt.life -= 0.016 / pt.maxLife;
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.04;
        if (pt.life <= 0) { p.splice(i, 1); continue; }
        const alpha = pt.life * 0.7;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${pt.hue}, 85%, 65%, ${alpha})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    }
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      canvas.remove();
    };
  }, []);
}

type CursorState = "default" | "hover" | "text" | "click";

interface Ripple { id: number; x: number; y: number; }

export default function CursorEffect() {
  useParticleTrail();
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [hoverLabel, setHoverLabel] = useState("");
  const idRef = useRef(0);
  const isTouch = useRef(false);

  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  // Dot: snappy
  const dotX = useSpring(mx, { stiffness: 900, damping: 40 });
  const dotY = useSpring(my, { stiffness: 900, damping: 40 });

  // Ring: medium lag
  const ringX = useSpring(mx, { stiffness: 200, damping: 22 });
  const ringY = useSpring(my, { stiffness: 200, damping: 22 });

  // Glow: very slow
  const glowX = useSpring(mx, { stiffness: 60, damping: 15 });
  const glowY = useSpring(my, { stiffness: 60, damping: 15 });

  useEffect(() => {
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch.current) return;

    // Hide native cursor globally
    document.documentElement.classList.add("cursor-custom");

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement;
      const inputEl = el.closest("input, textarea, select, [contenteditable]");
      const interactive = el.closest("a, button, [role='button'], [tabindex='0']");

      if (inputEl) {
        setState("text");
        setHoverLabel("");
      } else if (interactive) {
        setState("hover");
        const labelEl = interactive as HTMLElement;
        const label = (
          labelEl.getAttribute("aria-label") ||
          labelEl.getAttribute("title") ||
          (labelEl.innerText?.trim().slice(0, 22)) ||
          ""
        ).trim();
        setHoverLabel(label.length > 2 ? label : "");
      } else {
        setState("default");
        setHoverLabel("");
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onClick = (e: MouseEvent) => {
      const r: Ripple = { id: ++idRef.current, x: e.clientX, y: e.clientY };
      setRipples((p) => [...p, r]);
      setTimeout(() => setRipples((p) => p.filter((x) => x.id !== r.id)), 700);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("click", onClick);

    return () => {
      document.documentElement.classList.remove("cursor-custom");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("click", onClick);
    };
  }, [mx, my]);

  // SSR guard + touch guard
  if (typeof window !== "undefined" && isTouch.current) return null;

  const ringSize =
    state === "hover" ? 56 :
    state === "text"  ? 3  : 28;

  const dotSize =
    state === "hover" ? 5  :
    state === "text"  ? 22 : 6;

  return (
    <>
      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="cursor-ripple"
            style={{ left: r.x, top: r.y }}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>

      {/* Glow blob — slowest, atmospheric */}
      <motion.div
        className={cn("cursor-glow", !visible && "opacity-0")}
        style={{ left: glowX, top: glowY }}
        animate={{ opacity: visible ? (state === "hover" ? 0.18 : 0.07) : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Outer ring — medium lag */}
      <motion.div
        className="cursor-ring-wrap"
        style={{ left: ringX, top: ringY }}
        animate={{ opacity: visible ? (state === "text" ? 0 : 1) : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={cn(
            "cursor-ring",
            state === "hover" ? "cursor-ring-hover" : "cursor-ring-default"
          )}
          animate={{ width: ringSize, height: ringSize }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Hover label tooltip */}
        <AnimatePresence>
          {hoverLabel && state === "hover" && (
            <motion.span
              className="cursor-label"
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              {hoverLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner dot — snappiest */}
      <motion.div
        className="cursor-dot-wrap"
        style={{ left: dotX, top: dotY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          className={cn(
            "cursor-dot",
            state === "hover" ? "cursor-dot-hover" :
            state === "text"  ? "cursor-dot-text"  : "cursor-dot-default"
          )}
          animate={{
            width: dotSize,
            height: dotSize,
            borderRadius: state === "text" ? "1px" : "50%",
            scaleY: state === "text" ? 2.2 : 1,
          }}
          transition={{ duration: 0.12 }}
        />
      </motion.div>
    </>
  );
}
