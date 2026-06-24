"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="absolute top-[-20%] left-[5%] w-[65vw] h-[65vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)", filter: "blur(70px)" }}
        animate={{ x: [0, 40, -25, 0], y: [0, -50, 25, 0], scale: [1, 1.12, 0.94, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[15%] right-[-15%] w-[55vw] h-[55vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 70%)", filter: "blur(90px)" }}
        animate={{ x: [0, -30, 20, 0], y: [0, 35, -20, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[25%] w-[45vw] h-[45vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
        animate={{ x: [0, 25, -35, 0], y: [0, -25, 15, 0], scale: [1, 1.06, 0.97, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />
    </div>
  );
}
