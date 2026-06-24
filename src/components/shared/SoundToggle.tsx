"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const start = useCallback(() => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Brown noise — warmer, softer than white noise
    const bufSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(2, bufSize, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let last = 0;
      for (let i = 0; i < bufSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 160;
    lp.Q.value = 0.4;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    src.connect(lp);
    lp.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    gain.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 2);

    sourceRef.current = src;
    gainRef.current = gain;
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    setTimeout(() => {
      try { sourceRef.current?.stop(); } catch {}
      ctx.close();
      ctxRef.current = null;
      gainRef.current = null;
      sourceRef.current = null;
    }, 1600);
  }, []);

  function toggle() {
    if (on) { stop(); setOn(false); }
    else { start(); setOn(true); }
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={on ? "Disable ambient sound" : "Enable ambient sound"}
      title={on ? "Rain sound: ON" : "Enable ambient rain sound"}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center border border-white/8 bg-white/3 hover:bg-white/6 transition-colors"
    >
      {on ? (
        <Volume2 className="w-4 h-4 text-brand-400" />
      ) : (
        <VolumeX className="w-4 h-4 text-neutral-500" />
      )}
      <AnimatePresence>
        {on && (
          <motion.span
            key="dot"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.4, 1] }}
            exit={{ scale: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-400"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
