import { Appointment } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";

function getVariant(status: Appointment["status"]) {
  if (status === "COMPLETED") return "success";
  if (status === "PENDING") return "warning";
  if (status === "CANCELLED" || status === "NO_SHOW") return "danger";
  return "default";
}

export function AppointmentsTable({
  appointments,
}: {
  appointments: Appointment[];
}) {
  if (!appointments.length) {
    return (
      <EmptyState
        title="No appointments found"
        description="Appointment bookings from the backend will be listed here."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-white/[0.03]">
            <tr className="text-sm text-slate-400">
              <th className="px-6 py-4 font-medium">Patient</th>
              <th className="px-6 py-4 font-medium">Doctor</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-t border-white/5 text-sm text-slate-300"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-white">{appointment.fullName}</p>
                  <p className="mt-1 text-xs text-slate-500">{appointment.phone}</p>
                </td>
                <td className="px-6 py-4">{appointment.doctor.user.fullName}</td>
                <td className="px-6 py-4">{appointment.doctor.department.name}</td>
                <td className="px-6 py-4 text-slate-400">
                  {formatDate(appointment.appointmentDate)}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge
                    label={appointment.status}
                    variant={getVariant(appointment.status)}
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