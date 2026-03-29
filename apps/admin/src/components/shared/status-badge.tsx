import { cn } from "@/lib/utils";

export function StatusBadge({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
        variant === "default" && "border-white/10 bg-white/5 text-slate-300",
        variant === "success" && "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
        variant === "warning" && "border-amber-400/20 bg-amber-400/10 text-amber-300",
        variant === "danger" && "border-rose-400/20 bg-rose-400/10 text-rose-300"
      )}
    >
      {label}
    </span>
  );
}