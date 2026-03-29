import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">
            Operations Center
          </p>
          <h1 className="mt-1 text-xl font-semibold text-white">
            Sidra Specialized Hospital
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-400 md:flex">
            <Search className="h-4 w-4" />
            <span className="text-sm">Search later phase</span>
          </div>
          <button className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:bg-white/[0.08]">
            <Bell className="h-5 w-5" />
          </button>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
            <p className="text-sm font-semibold text-white">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}