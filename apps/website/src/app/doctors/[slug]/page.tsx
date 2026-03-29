import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/site-shell';
import { AppointmentForm } from '@/components/sections/appointment-form';
import { CtaBanner } from '@/components/shared/cta-banner';
import { SectionHeading } from '@/components/shared/section-heading';
import { getDoctors } from '@/lib/api';
import { formatMoney } from '@/lib/utils';

interface DoctorDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DoctorDetailsPage({
  params,
}: DoctorDetailsPageProps) {
  const { slug } = await params;
  const doctors = await getDoctors();
  const doctor = doctors.find((item) => item.slug === slug);

  if (!doctor) {
    notFound();
  }

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-8">
            <div
              className="h-80 rounded-[2rem] bg-cover bg-center shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,23,42,0.12), rgba(15,23,42,0.24)), url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80')",
              }}
            />

            <SectionHeading
              eyebrow="Doctor Profile"
              title={doctor.user.fullName}
              description="A dedicated doctor profile page that strengthens patient trust and supports direct appointment conversion."
            />

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                    {doctor.department.name}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                    {doctor.specialty}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">Experience</p>
                    <p className="mt-2 text-xl font-bold text-slate-950">
                      {doctor.experienceYears || '--'} years
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">Consultation Fee</p>
                    <p className="mt-2 text-xl font-bold text-slate-950">
                      {formatMoney(doctor.consultationFee)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">Languages</p>
                    <p className="mt-2 text-xl font-bold text-slate-950">
                      {doctor.languages?.length || 0}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                    Biography
                  </p>
                  <p className="mt-3 text-base leading-8 text-slate-600">
                    {doctor.bio ||
                      'Experienced medical professional within Sidra Specialized Hospital.'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                    Languages
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {doctor.languages?.length ? (
                      doctor.languages.map((language) => (
                        <span
                          key={language}
                          className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700"
                        >
                          {language}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/doctors"
                    className="inline-flex rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    Back to Doctors
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
                Book with this doctor
              </p>
              <h3 className="mt-3 text-3xl font-bold">
                Request an appointment with {doctor.user.fullName}
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Use the form below to submit your appointment request directly
                with the selected doctor.
              </p>
            </div>

            <AppointmentForm
              doctors={doctors}
              preselectedDoctorId={doctor.id}
            />
          </section>
        </div>
      </main>

      <CtaBanner />
    </SiteShell>
  );
}