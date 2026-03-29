import Link from "next/link";
import { Activity, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-white">
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 p-3 text-slate-950 shadow-[0_12px_30px_rgba(6,182,212,0.18)]">
              <Activity className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
                Sidra
              </p>
              <h3 className="text-lg font-semibold text-white">
                Specialized Hospital
              </h3>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-8 text-slate-400">
            Premium digital presence for hospital services, specialist discovery,
            appointment conversion, and stronger patient trust.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Explore</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/departments">Departments</Link>
            <Link href="/doctors">Doctors</Link>
            <Link href="/services">Services</Link>
            <Link href="/appointments">Book Appointment</Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="mt-5 space-y-4 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-cyan-400" />
              <span>16676</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-cyan-400" />
              <span>info@sidra-hospital.com</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span>Cairo, Egypt</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 text-xs text-slate-500">
          <span>© 2026 Sidra Specialized Hospital. All rights reserved.</span>
          <span>Commercial-grade healthcare platform presentation layer.</span>
        </div>
      </div>
    </footer>
  );
}