import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      {label && (
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-4 h-px bg-brand-500" />
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">
            {label}
          </span>
        </div>
      )}
      <h2 className="text-3xl font-bold text-neutral-50 tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-neutral-400 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
