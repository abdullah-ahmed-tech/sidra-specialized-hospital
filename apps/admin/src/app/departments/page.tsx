import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DepartmentsTable } from "@/components/departments/departments-table";
import { SectionHeading } from "@/components/shared/section-heading";
import { getDepartments } from "@/lib/api";

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <DashboardShell>
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Management"
          title="Departments"
          description="View medical departments already stored in the API and prepared for administration."
        />
        <DepartmentsTable departments={departments} />
      </div>
    </DashboardShell>
  );
}