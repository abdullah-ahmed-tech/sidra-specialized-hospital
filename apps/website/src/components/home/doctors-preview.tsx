import Link from 'next/link';
import { SectionHeading } from '@/components/shared/section-heading';
import { Doctor } from '@/lib/types';

export function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Medical Team"
          title="Meet our doctors"
          description="Professionally presented doctor profiles increase trust and make the booking journey more persuasive."
        />
        <Link href="/doctors" className="text-sm font-semibold text-cyan-700">
          View all doctors
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {doctors.slice(0, 6).map((doctor) => (
          <Link
            key={doctor.id}
            href={`/doctors/${doctor.slug}`}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
          >
            <p className="text-xl font-bold text-slate-950">
              {doctor.user.fullName}
            </p>
            <p className="mt-2 text-sm font-medium text-cyan-700">
              {doctor.specialty}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              {doctor.department.name}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {doctor.bio ||
                'Experienced medical professional within Sidra Specialized Hospital.'}
            </p>

            <div className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              View Doctor Profile
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}