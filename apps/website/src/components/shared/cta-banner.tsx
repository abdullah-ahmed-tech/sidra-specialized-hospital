import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
              Patient Conversion
            </p>
            <h3 className="mt-3 text-3xl font-bold md:text-4xl">
              Book your consultation with Sidra Specialized Hospital
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Explore departments, review doctor profiles, and submit your
              appointment request through a premium digital experience.
            </p>
          </div>

          <Link
            href="/appointments"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}