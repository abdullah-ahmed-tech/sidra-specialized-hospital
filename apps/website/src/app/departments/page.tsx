import { SiteShell } from "@/components/layout/site-shell";
import { DepartmentsGrid } from "@/components/sections/departments-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getDepartments } from "@/lib/api";

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Departments"
          title="Specialized departments for focused patient care"
          description="Each department is presented as part of a structured medical discovery journey."
        />
        <div className="mt-12">
          <DepartmentsGrid departments={departments} />
        </div>
      </main>
      <CtaBanner />
    </SiteShell>
  );
}