"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

const sizes = {
  sm: { outer: "w-20 h-20", px: 80,  initialsSize: "text-2xl" },
  md: { outer: "w-32 h-32", px: 128, initialsSize: "text-4xl" },
  lg: { outer: "w-44 h-44", px: 176, initialsSize: "text-5xl" },
};

export default function ProfileImage({ size = "md", className, animate = true }: ProfileImageProps) {
  const { outer, px, initialsSize } = sizes[size];
  const [imgError, setImgError] = useState(false);

  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as object)}
      className={cn("relative shrink-0", outer, className)}
    >
      {/* Rotating gradient ring */}
      {animate && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-1 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, var(--color-brand-500), var(--color-accent-500), #8b5cf6, var(--color-brand-500))",
            opacity: 0.45,
          }}
        />
      )}

      {/* Inner fill ring */}
      <div className="absolute inset-0 rounded-full bg-surface-2" />

      {/* Image / initials */}
      <div className={cn("relative rounded-full overflow-hidden border-2 border-white/10", outer)}>
        {!imgError ? (
          <Image
            src="/profile.png"
            alt="Umapathi R — Full Stack Developer & ML Researcher"
            width={px}
            height={px}
            className="object-cover object-top w-full h-full"
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={cn(
            "w-full h-full flex items-center justify-center bg-linear-to-br from-brand-600 to-accent-600 text-white font-bold select-none",
            initialsSize
          )}>
            UR
          </div>
        )}
      </div>

      {/* Online indicator */}
      <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-surface-2" />
    </Wrapper>
  );
}
