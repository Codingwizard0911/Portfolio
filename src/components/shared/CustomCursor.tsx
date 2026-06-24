"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  const trailX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 1 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 1 });

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [role='button'], input, textarea, select, label, [tabindex]");
      setHovering(!!interactive);
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mousemove", checkHover, { passive: true });
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Trail blob */}
      <motion.div
        className="fixed z-[9998] pointer-events-none rounded-full"
        style={{
          left: trailX,
          top: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 40 : 28,
          height: hovering ? 40 : 28,
          background: "var(--color-brand-500)",
          opacity: visible ? (hovering ? 0.12 : 0.07) : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
          filter: "blur(8px)",
        }}
      />

      {/* Dot */}
      <motion.div
        className="fixed z-[9999] pointer-events-none rounded-full"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: clicking ? 6 : hovering ? 10 : 7,
          height: clicking ? 6 : hovering ? 10 : 7,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: hovering ? "transparent" : "var(--color-brand-400)",
            border: hovering ? "1.5px solid var(--color-brand-400)" : "none",
          }}
        />
      </motion.div>
    </>
  );
}
