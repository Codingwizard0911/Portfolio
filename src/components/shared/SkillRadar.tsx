"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SKILLS = [
  { label: "Python",      value: 90, color: "#3776ab" },
  { label: "Full Stack",  value: 82, color: "#3b82f6" },
  { label: "ML / AI",     value: 85, color: "#a855f7" },
  { label: "Data Eng.",   value: 80, color: "#22c55e" },
  { label: "SQL / DB",    value: 88, color: "#f97316" },
  { label: "DevOps",      value: 65, color: "#ec4899" },
];

function polar(angle: number, r: number, cx: number, cy: number) {
  return { x: cx + r * Math.cos(angle - Math.PI / 2), y: cy + r * Math.sin(angle - Math.PI / 2) };
}

export default function SkillRadar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-60px" });

  const W = 260, H = 260, cx = W / 2, cy = H / 2, maxR = 90;
  const n = SKILLS.length;
  const angles = SKILLS.map((_, i) => (2 * Math.PI * i) / n);
  const rings = [0.25, 0.5, 0.75, 1.0];

  const dataPoints = SKILLS.map((s, i) => polar(angles[i], (s.value / 100) * maxR, cx, cy));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") + " Z";

  return (
    <div ref={wrapRef} className="card p-6 flex flex-col items-center select-none">
      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Skill Profile</p>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="overflow-visible">
        {/* Grid rings */}
        {rings.map((r) => {
          const pts = angles.map((a) => polar(a, r * maxR, cx, cy));
          const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") + " Z";
          return <path key={r} d={path} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
        })}

        {/* Axes */}
        {angles.map((a, i) => {
          const outer = polar(a, maxR, cx, cy);
          return <line key={i} x1={cx} y1={cy} x2={outer.x.toFixed(2)} y2={outer.y.toFixed(2)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
        })}

        {/* Fill polygon */}
        <motion.path
          d={dataPath}
          fill="rgba(59,130,246,0.10)"
          stroke="rgba(59,130,246,0.55)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Skill dots + value tooltips */}
        {SKILLS.map((s, i) => {
          const pt = dataPoints[i];
          return (
            <motion.g key={s.label}>
              <motion.circle
                cx={pt.x} cy={pt.y} r={4}
                fill={s.color}
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                style={{ originX: `${pt.x}px`, originY: `${pt.y}px` }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.07, ease: "backOut" }}
              />
            </motion.g>
          );
        })}

        {/* Labels */}
        {SKILLS.map((s, i) => {
          const lp = polar(angles[i], maxR + 22, cx, cy);
          const anchor = lp.x < cx - 6 ? "end" : lp.x > cx + 6 ? "start" : "middle";
          return (
            <text key={s.label} x={lp.x.toFixed(2)} y={(lp.y + 4).toFixed(2)} textAnchor={anchor}
              fontSize="10" fill="rgba(163,163,163,0.85)" fontFamily="var(--font-sans, sans-serif)">
              {s.label}
              <tspan fill={s.color} fontWeight="600" dx="3"> {s.value}%</tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
}
