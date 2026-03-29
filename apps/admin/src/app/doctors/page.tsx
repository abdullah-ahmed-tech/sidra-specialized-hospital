import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DoctorsTable } from "@/components/doctors/doctors-table";
import { SectionHeading } from "@/components/shared/section-heading";
import { getDoctors } from "@/lib/api";

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <DashboardShell>
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Management"
          title="Doctors"
          description="Doctor records are fetched from live backend data including department and consultation details."
        />
        <DoctorsTable doctors={doctors} />
      </div>
    </DashboardShell>
  );
}