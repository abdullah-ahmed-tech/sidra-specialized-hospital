import { Appointment, Department, Doctor, Service } from "@/lib/types";
import { formatDate, formatMoney } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";

interface DashboardPanelsProps {
  departments: Department[];
  doctors: Doctor[];
  services: Service[];
  appointments: Appointment[];
}

export function DashboardPanels({
  departments,
  doctors,
  services,
  appointments,
}: DashboardPanelsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 2xl:col-span-1">
        <h3 className="text-lg font-semibold text-white">Recent Departments</h3>
        <div className="mt-5 space-y-4">
          {departments.slice(0, 4).map((department) => (
            <div
              key={department.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{department.name}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {department.description || "No description provided yet."}
                  </p>
                </div>
                <StatusBadge
                  label={department.isActive ? "Active" : "Inactive"}
                  variant={department.isActive ? "success" : "danger"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 2xl:col-span-1">
        <h3 className="text-lg font-semibold text-white">Doctor Snapshot</h3>
        <div className="mt-5 space-y-4">
          {doctors.slice(0, 4).map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
            >
              <p className="font-semibold text-white">{doctor.user.fullName}</p>
              <p className="mt-1 text-sm text-slate-400">
                {doctor.specialty} · {doctor.department.name}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Fee: {formatMoney(doctor.consultationFee)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 2xl:col-span-1">
        <h3 className="text-lg font-semibold text-white">Upcoming Activity</h3>
        <div className="mt-5 space-y-4">
          {appointments.slice(0, 4).map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">
                    {appointment.fullName}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {appointment.doctor.user.fullName} ·{" "}
                    {appointment.doctor.department.name}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {formatDate(appointment.appointmentDate)}
                  </p>
                </div>
                <StatusBadge
                  label={appointment.status}
                  variant={
                    appointment.status === "COMPLETED"
                      ? "success"
                      : appointment.status === "PENDING"
                      ? "warning"
                      : appointment.status === "CANCELLED"
                      ? "danger"
                      : "default"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 2xl:col-span-3">
        <h3 className="text-lg font-semibold text-white">Services Catalog</h3>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
            >
              <p className="font-semibold text-white">{service.name}</p>
              <p className="mt-1 text-sm text-slate-400">
                {service.department.name}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{service.durationMinutes || "--"} mins</span>
                <span>{formatMoney(service.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}