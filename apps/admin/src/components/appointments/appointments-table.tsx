'use client';

import { Appointment } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import { updateAppointmentStatus } from '@/lib/api';

function getVariant(status: Appointment['status']) {
  if (status === 'COMPLETED') return 'success';
  if (status === 'PENDING') return 'warning';
  if (status === 'CANCELLED' || status === 'NO_SHOW') return 'danger';
  return 'default';
}

interface AppointmentsTableProps {
  appointments: Appointment[];
  onRefresh: () => Promise<void> | void;
}

export function AppointmentsTable({
  appointments,
  onRefresh,
}: AppointmentsTableProps) {
  if (!appointments.length) {
    return (
      <EmptyState
        title="No appointments found"
        description="Appointment bookings from the backend will be listed here."
      />
    );
  }

  async function handleStatusChange(
    id: string,
    status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED',
  ) {
    try {
      await updateAppointmentStatus(id, status);
      await onRefresh();
    } catch (error) {
      console.error(error);
      alert('Failed to update appointment status.');
    }
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
              <th className="px-6 py-4 font-medium">Actions</th>
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

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, 'CONFIRMED')
                      }
                      className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/20"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, 'COMPLETED')
                      }
                      className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, 'CANCELLED')
                      }
                      className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-400/20"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}