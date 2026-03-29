import Link from 'next/link';
import { Doctor } from '@/lib/types';
import { formatMoney } from '@/lib/utils';

interface PremiumDoctorsGridProps {
  doctors: Doctor[];
}

export function PremiumDoctorsGrid({ doctors }: PremiumDoctorsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <article
          key={doctor.id}
          className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.12)]"
        >
          <div
            className="h-56 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,23,42,0.16), rgba(15,23,42,0.28)), url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80')",
            }}
          />

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-slate-950">
                  {doctor.user.fullName}
                </p>
                <p className="mt-2 text-sm font-semibold text-cyan-700">
                  {doctor.specialty}
                </p>
              </div>

              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                {doctor.department.name}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {doctor.bio ||
                'Experienced medical professional within Sidra Specialized Hospital.'}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Experience
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950">
                  {doctor.experienceYears || '--'} yrs
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Fee
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950">
                  {formatMoney(doctor.consultationFee)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/doctors/${doctor.slug}`}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                View Profile
              </Link>

              <Link
                href={`/appointments?doctorId=${doctor.id}`}
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Book Now
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}