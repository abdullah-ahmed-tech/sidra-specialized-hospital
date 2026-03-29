import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        <section className="flex items-center px-6 py-16 lg:px-12">
          <div className="w-full max-w-xl space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
                Secure Access
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Sidra Hospital Admin Control Panel
              </h1>
              <p className="text-base leading-8 text-slate-400">
                Premium operations dashboard for departments, doctors, services,
                patient appointments, and core hospital administration.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm text-slate-300">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@sidra.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-300">Password</label>
                  <input
                    type="password"
                    defaultValue="123456"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                  />
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Enter Dashboard
                </Link>
              </form>
            </div>

            <p className="text-sm text-slate-500">
              Demo credentials are prefilled for this stage. Real auth guard and
              token persistence will be hardened in the next integration stage.
            </p>
          </div>
        </section>

        <section className="hidden border-l border-white/10 lg:flex lg:items-center lg:justify-center lg:px-12">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Operations View</p>
                <p className="mt-3 text-3xl font-bold text-white">360°</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Modules</p>
                <p className="mt-3 text-3xl font-bold text-white">4+</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Medical Readiness</p>
                <p className="mt-3 text-3xl font-bold text-white">High</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Commercial Quality</p>
                <p className="mt-3 text-3xl font-bold text-white">Ready</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Phase 3 Output
              </p>
              <p className="mt-3 text-base leading-8 text-slate-200">
                This sprint delivers a premium admin shell connected to live API
                data, preparing the platform for full operational management.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}