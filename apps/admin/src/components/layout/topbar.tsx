"use client";

import { useMemo } from "react";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/dashboard")) return "Operations Overview";
  if (pathname.startsWith("/departments")) return "Departments Management";
  if (pathname.startsWith("/doctors")) return "Doctors Management";
  if (pathname.startsWith("/services")) return "Services Management";
  if (pathname.startsWith("/appointments")) return "Appointments Management";
  return "Sidra Admin Dashboard";
}

export function Topbar() {
  const pathname = usePathname();

  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">
            Operations Center
          </p>
          <h1 className="mt-1 text-xl font-semibold text-white">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-400 shadow-[0_10px_30px_rgba(0,0,0,0.18)] md:flex">
            <Search className="h-4 w-4" />
            <span className="text-sm">Search modules</span>
          </div>

          <button className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:scale-[1.03] hover:bg-white/[0.08] active:scale-[0.98]">
            <Bell className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 shadow-[0_10px_30px_rgba(6,182,212,0.12)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-slate-950">
              SA
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">Super Admin</p>
              <p className="text-xs text-cyan-100/80">Sidra Control Room</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}