"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  const initial = {
    up: { opacity: 0, y: 32 },
    down: { opacity: 0, y: -32 },
    left: { opacity: 0, x: -32 },
    right: { opacity: 0, x: 32 },
    none: { opacity: 0 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, x: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={initial[direction]}
      animate={controls}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
