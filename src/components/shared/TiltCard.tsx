"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  disabled?: boolean;
}

export default function TiltCard({ children, className, intensity = 10, disabled = false }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const targetRef = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const currentRef = useRef({ rx: 0, ry: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    targetRef.current = {
      rx: ((y - cy) / cy) * -intensity,
      ry: ((x - cx) / cx) * intensity,
      gx: (x / rect.width) * 100,
      gy: (y / rect.height) * 100,
    };

    const glare = glareRef.current;
    if (glare) {
      glare.style.setProperty("--gx", `${targetRef.current.gx}%`);
      glare.style.setProperty("--gy", `${targetRef.current.gy}%`);
    }

    // Smooth lerp via rAF
    cancelAnimationFrame(animRef.current);
    function lerp() {
      const c = currentRef.current;
      const t = targetRef.current;
      c.rx += (t.rx - c.rx) * 0.14;
      c.ry += (t.ry - c.ry) * 0.14;

      if (card) {
        card.style.transform = `perspective(800px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(1.02,1.02,1.02)`;
      }

      if (Math.abs(t.rx - c.rx) > 0.01 || Math.abs(t.ry - c.ry) > 0.01) {
        animRef.current = requestAnimationFrame(lerp);
      }
    }
    animRef.current = requestAnimationFrame(lerp);
  }, [disabled, intensity]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    targetRef.current = { rx: 0, ry: 0, gx: 50, gy: 50 };

    cancelAnimationFrame(animRef.current);
    function restoreLerp() {
      const c = currentRef.current;
      c.rx += (0 - c.rx) * 0.12;
      c.ry += (0 - c.ry) * 0.12;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(800px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(1,1,1)`;
      }

      if (Math.abs(c.rx) > 0.01 || Math.abs(c.ry) > 0.01) {
        animRef.current = requestAnimationFrame(restoreLerp);
      } else {
        if (cardRef.current) cardRef.current.style.transform = "";
      }
    }
    animRef.current = requestAnimationFrame(restoreLerp);
  }, [disabled]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("tilt-card", className)}
      style={{ willChange: "transform" }}
    >
      <div ref={glareRef} className="tilt-glare" aria-hidden />
      {children}
    </div>
  );
}
