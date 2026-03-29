export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700">
            Sidra Specialized Hospital
          </span>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Modern Specialized Healthcare Platform
          </h1>

          <p className="text-lg leading-8 text-slate-600">
            Official website foundation for Sidra Specialized Hospital. This
            application will power the hospital digital presence, service
            pages, doctor directory, patient trust journey, and appointment
            acquisition funnel.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700">
              Book Appointment
            </button>
            <button className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
              Explore Departments
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}