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
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
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
                className="border-t border-white/5 text-sm text-slate-300 transition hover:bg-white/[0.03]"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-slate-950">
                      {doctor.user.fullName
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {doctor.user.fullName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {doctor.user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{doctor.department.name}</td>
                <td className="px-6 py-4">{doctor.specialty}</td>
                <td className="px-6 py-4">
                  {formatMoney(doctor.consultationFee)}
                </td>
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