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
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
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
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    active
                      ? "bg-cyan-400/10 text-white ring-1 ring-cyan-400/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-3xl bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Commercial Build
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Hospital-grade operations panel for departments, doctors, services,
              and patient appointments.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}