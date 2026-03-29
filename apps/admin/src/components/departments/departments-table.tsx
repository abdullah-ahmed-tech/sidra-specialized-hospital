import { Department } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";

export function DepartmentsTable({ departments }: { departments: Department[] }) {
  if (!departments.length) {
    return (
      <EmptyState
        title="No departments found"
        description="Departments will appear here once they are created from the backend."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-white/[0.03]">
            <tr className="text-sm text-slate-400">
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Slug</th>
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr
                key={department.id}
                className="border-t border-white/5 text-sm text-slate-300"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-white">{department.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {department.description || "No description"}
                  </p>
                </td>
                <td className="px-6 py-4 text-slate-400">{department.slug}</td>
                <td className="px-6 py-4">{department.sortOrder}</td>
                <td className="px-6 py-4">
                  <StatusBadge
                    label={department.isActive ? "Active" : "Inactive"}
                    variant={department.isActive ? "success" : "danger"}
                  />
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {formatDate(department.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}