import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AppointmentsTable } from "@/components/appointments/appointments-table";
import { SectionHeading } from "@/components/shared/section-heading";
import { getAppointments } from "@/lib/api";

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <DashboardShell>
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Management"
          title="Appointments"
          description="Operational booking list connected to the live appointment data from the API."
        />
        <AppointmentsTable appointments={appointments} />
      </div>
    </DashboardShell>
  );
}