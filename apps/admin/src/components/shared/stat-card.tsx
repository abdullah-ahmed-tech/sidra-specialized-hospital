"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  hint?: string;
}

export function StatCard({ label, value, icon, hint }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />
      <div className="absolute -bottom-12 left-0 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
          {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
        </div>

        {icon ? (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300 shadow-[0_10px_30px_rgba(6,182,212,0.18)]">
            {icon}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}