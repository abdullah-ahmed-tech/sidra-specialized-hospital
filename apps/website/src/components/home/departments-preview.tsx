import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Department } from "@/lib/types";

export function DepartmentsPreview({
  departments,
}: {
  departments: Department[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Departments"
          title="Explore our specialized departments"
          description="Organized medical specialties designed to help patients discover the right care path quickly."
        />
        <Link
          href="/departments"
          className="text-sm font-semibold text-cyan-700"
        >
          View all departments
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {departments.slice(0, 6).map((department) => (
          <div
            key={department.id}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
          >
            <p className="text-xl font-bold text-slate-950">{department.name}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {department.description || "Specialized medical department ready for patient discovery."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}