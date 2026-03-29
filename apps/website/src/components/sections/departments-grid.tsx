import { Department } from "@/lib/types";

export function DepartmentsGrid({ departments }: { departments: Department[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {departments.map((department) => (
        <div
          key={department.id}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
        >
          <p className="text-2xl font-bold text-slate-950">{department.name}</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {department.description || "Specialized medical department supporting a focused patient care journey."}
          </p>
        </div>
      ))}
    </div>
  );
}