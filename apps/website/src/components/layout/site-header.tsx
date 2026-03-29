import Link from "next/link";
import { Activity, PhoneCall } from "lucide-react";
import { siteNav } from "@/data/nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-600 p-3 text-white shadow-lg shadow-cyan-600/20">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
              Sidra
            </p>
            <p className="text-base font-bold text-slate-900">
              Specialized Hospital
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-2xl border border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-700">
              <PhoneCall className="h-4 w-4 text-cyan-600" />
              <span className="text-sm font-medium">16676</span>
            </div>
          </div>
          <Link
            href="/appointments"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}