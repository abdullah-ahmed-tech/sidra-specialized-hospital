"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldPlus } from "lucide-react";
import { dashboardNav } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-slate-950 xl:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 p-3 text-cyan-300 shadow-[0_12px_30px_rgba(6,182,212,0.18)]">
              <ShieldPlus className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-400">
                Sidra
              </p>
              <h2 className="text-lg font-semibold text-white">
                Admin Dashboard
              </h2>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {dashboardNav.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    active
                      ? "bg-cyan-400/10 text-white ring-1 ring-cyan-400/20 shadow-[0_10px_30px_rgba(6,182,212,0.12)]"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition",
                      active ? "text-cyan-300" : "text-slate-500 group-hover:text-cyan-300"
                    )}
                  />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-cyan-500/10 blur-2xl" />
            <p className="relative text-xs uppercase tracking-[0.18em] text-slate-500">
              Commercial Build
            </p>
            <p className="relative mt-2 text-sm leading-6 text-slate-300">
              Hospital-grade operations panel with stronger visual depth,
              consistent identity, and premium presentation.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}