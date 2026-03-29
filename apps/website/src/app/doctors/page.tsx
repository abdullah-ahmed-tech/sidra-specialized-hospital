import { SiteShell } from '@/components/layout/site-shell';
import { PremiumDoctorsGrid } from '@/components/sections/premium-doctors-grid';
import { SectionHeading } from '@/components/shared/section-heading';
import { CtaBanner } from '@/components/shared/cta-banner';
import { getDoctors } from '@/lib/api';

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Doctors"
          title="Our doctors and specialists"
          description="Professional presentation of medical staff supports trust and improves appointment conversion."
        />
        <div className="mt-12">
          <PremiumDoctorsGrid doctors={doctors} />
        </div>
      </main>

      <CtaBanner />
    </SiteShell>
  );
}