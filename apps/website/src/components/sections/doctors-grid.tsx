import Link from 'next/link';
import { Doctor } from '@/lib/types';
import { formatMoney } from '@/lib/utils';

export function DoctorsGrid({ doctors }: { doctors: Doctor[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <Link
          key={doctor.id}
          href={`/doctors/${doctor.slug}`}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
        >
          <p className="text-2xl font-bold text-slate-950">
            {doctor.user.fullName}
          </p>
          <p className="mt-2 text-sm font-semibold text-cyan-700">
            {doctor.specialty}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {doctor.department.name}
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            {doctor.bio ||
              'Experienced medical professional serving within a specialized hospital environment.'}
          </p>

          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-slate-500">
              {doctor.experienceYears || '--'} years
            </span>
            <span className="font-semibold text-slate-950">
              {formatMoney(doctor.consultationFee)}
            </span>
          </div>

          <div className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            View Details
          </div>
        </Link>
      ))}
    </div>
  );
}