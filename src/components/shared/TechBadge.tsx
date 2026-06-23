import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  variant?: "brand" | "neutral" | "green" | "purple";
  size?: "sm" | "md";
}

const variants = {
  brand: "bg-brand-500/10 text-brand-300 border border-brand-500/20",
  neutral: "bg-white/5 text-neutral-400 border border-white/8",
  green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

const sizes = {
  sm: "px-2.5 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export default function TechBadge({ name, variant = "neutral", size = "md" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium tracking-wide leading-none",
        variants[variant],
        sizes[size]
      )}
    >
      {name}
    </span>
  );
}
