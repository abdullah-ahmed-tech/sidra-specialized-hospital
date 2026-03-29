"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, CalendarPlus, PhoneCall } from "lucide-react";
import { siteNav } from "@/data/nav";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-500 to-blue-500 p-3 text-white shadow-[0_12px_30px_rgba(6,182,212,0.22)]">
            <Activity className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
              Sidra
            </p>
            <p className="text-base font-bold text-slate-950">
              Specialized Hospital
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 xl:flex">
          {siteNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-cyan-50 text-cyan-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-2 text-slate-700">
              <PhoneCall className="h-4 w-4 text-cyan-600" />
              <span className="text-sm font-medium">16676</span>
            </div>
          </div>

          <Link
            href="/appointments"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98]"
          >
            <CalendarPlus className="h-4 w-4" />
            <span>Book Now</span>
          </Link>
        </div>
      </div>
    </header>
  );
}