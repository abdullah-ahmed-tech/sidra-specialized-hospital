import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DashboardPanels } from "@/components/dashboard/dashboard-panels";
import { OverviewGrid } from "@/components/dashboard/overview-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  getAppointments,
  getDepartments,
  getDoctors,
  getServices,
} from "@/lib/api";

export default async function DashboardPage() {
  const [departments, doctors, services, appointments] = await Promise.all([
    getDepartments(),
    getDoctors(),
    getServices(),
    getAppointments(),
  ]);

  return (
    <DashboardShell>
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Dashboard"
          title="Hospital Operations Overview"
          description="Live operational snapshot connected to the backend foundation built in phase two."
        />

        <OverviewGrid
          departmentsCount={departments.length}
          doctorsCount={doctors.length}
          servicesCount={services.length}
          appointmentsCount={appointments.length}
        />

        <DashboardPanels
          departments={departments}
          doctors={doctors}
          services={services}
          appointments={appointments}
        />
      </div>
    </DashboardShell>
  );
}