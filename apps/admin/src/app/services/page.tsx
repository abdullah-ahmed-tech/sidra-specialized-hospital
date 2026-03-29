import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ServicesTable } from "@/components/services/services-table";
import { SectionHeading } from "@/components/shared/section-heading";
import { getServices } from "@/lib/api";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <DashboardShell>
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Management"
          title="Services"
          description="Clinical services are listed here for commercial and operational review."
        />
        <ServicesTable services={services} />
      </div>
    </DashboardShell>
  );
}