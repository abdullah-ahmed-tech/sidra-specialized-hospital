import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  hint?: string;
}

export function StatCard({ label, value, icon, hint }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
        </div>
        {icon ? (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}