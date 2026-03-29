import Link from "next/link";
import { Doctor } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

interface DoctorProfileHeroProps {
  doctor: Doctor;
}

export function DoctorProfileHero({ doctor }: DoctorProfileHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_22%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div
          className="h-[420px] rounded-[2rem] bg-cover bg-center shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.12), rgba(15,23,42,0.24)), url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80')",
          }}
        />

        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
            {doctor.department.name}
          </div>

          <div>
            <h1 className="text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
              {doctor.user.fullName}
            </h1>
            <p className="mt-4 text-lg font-semibold text-cyan-700">
              {doctor.specialty}
            </p>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600">
            {doctor.bio ||
              "Experienced specialist supporting a modern, patient-centered healthcare journey."}
          </p>

          <div className="grid max-w-xl grid-cols-2 gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                Experience
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-950">
                {doctor.experienceYears || "--"}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                Fee
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-950">
                {formatMoney(doctor.consultationFee)}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                Languages
              </p>
              <p className="mt-2 text-lg font-bold text-slate-950">
                {doctor.languages?.length || 0}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {doctor.languages?.map((language) => (
              <span
                key={language}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                {language}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/appointments?doctor=${doctor.slug}`}
              className="rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800"
            >
              Book Appointment
            </Link>

            <Link
              href="/doctors"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Back to Doctors
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}