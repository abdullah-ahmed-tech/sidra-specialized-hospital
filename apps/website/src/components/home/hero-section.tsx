import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.14),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]" />
      <div className="relative mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
            Trusted Specialized Care
          </div>

          <div className="space-y-5">
            <h1 className="text-5xl font-bold leading-tight text-slate-950 md:text-7xl">
              Advanced hospital care with a premium patient experience
            </h1>
            <p className="max-w-2xl text-lg leading-9 text-slate-600">
              Sidra Specialized Hospital combines high-quality clinical care,
              trusted specialists, and a modern digital experience for
              appointments, doctor discovery, and patient access.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/appointments"
              className="rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800"
            >
              Book Appointment
            </Link>
            <Link
              href="/departments"
              className="rounded-2xl border border-slate-300 px-6 py-4 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Explore Departments
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <p className="text-sm text-slate-500">Specialized Departments</p>
            <p className="mt-3 text-4xl font-bold text-slate-950">Multi</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
            <p className="text-sm text-slate-400">Appointments</p>
            <p className="mt-3 text-4xl font-bold">Live</p>
          </div>
          <div className="col-span-2 rounded-[2rem] border border-cyan-100 bg-cyan-50 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
              Digital Trust Layer
            </p>
            <p className="mt-4 text-xl font-bold text-slate-950">
              Built to convert visitors into patients with clarity, speed, and
              confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}