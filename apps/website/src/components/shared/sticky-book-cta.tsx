"use client";

import Link from "next/link";
import { CalendarPlus } from "lucide-react";

export function StickyBookCta() {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 px-4">
      <Link
        href="/appointments"
        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.22)] transition hover:scale-[1.03] hover:bg-slate-800 active:scale-[0.98]"
      >
        <CalendarPlus className="h-4 w-4" />
        <span>Book Appointment</span>
      </Link>
    </div>
  );
}