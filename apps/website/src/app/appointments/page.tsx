import { SiteShell } from "@/components/layout/site-shell";
import { AppointmentForm } from "@/components/sections/appointment-form";
import { SectionHeading } from "@/components/shared/section-heading";
import { getDoctors } from "@/lib/api";

export default async function AppointmentsPage() {
  const doctors = await getDoctors();

  return (
    <SiteShell>
      <main className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading
          eyebrow="Appointments"
          title="Book your appointment"
          description="A premium booking experience that connects directly to the hospital backend foundation."
          centered
        />

        <div className="mt-12">
          <AppointmentForm doctors={doctors} />
        </div>
      </main>
    </SiteShell>
  );
}