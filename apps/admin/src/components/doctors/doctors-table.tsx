import { Doctor } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";

export function DoctorsTable({ doctors }: { doctors: Doctor[] }) {
  if (!doctors.length) {
    return (
      <EmptyState
        title="No doctors found"
        description="Doctor records from the API will be listed here."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-white/[0.03]">
            <tr className="text-sm text-slate-400">
              <th className="px-6 py-4 font-medium">Doctor</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Specialty</th>
              <th className="px-6 py-4 font-medium">Fee</th>
              <th className="px-6 py-4 font-medium">Languages</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="border-t border-white/5 text-sm text-slate-300"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-white">{doctor.user.fullName}</p>
                  <p className="mt-1 text-xs text-slate-500">{doctor.user.email}</p>
                </td>
                <td className="px-6 py-4">{doctor.department.name}</td>
                <td className="px-6 py-4">{doctor.specialty}</td>
                <td className="px-6 py-4">{formatMoney(doctor.consultationFee)}</td>
                <td className="px-6 py-4 text-slate-400">
                  {doctor.languages?.length ? doctor.languages.join(", ") : "--"}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge
                    label={doctor.isActive ? "Active" : "Inactive"}
                    variant={doctor.isActive ? "success" : "danger"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}