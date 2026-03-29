export default function AdminHomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-300 ring-1 ring-cyan-400/30">
            Sidra Admin Dashboard
          </span>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Hospital Operations Control Center
          </h1>

          <p className="text-lg leading-8 text-slate-300">
            Administrative dashboard foundation for doctors, departments,
            appointments, content, and hospital operations management.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Doctors</p>
              <p className="mt-2 text-3xl font-bold">--</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Departments</p>
              <p className="mt-2 text-3xl font-bold">--</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Appointments</p>
              <p className="mt-2 text-3xl font-bold">--</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}