import { Service } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";

export function ServicesTable({ services }: { services: Service[] }) {
  if (!services.length) {
    return (
      <EmptyState
        title="No services found"
        description="Services exposed by the backend will appear in this panel."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-white/[0.03]">
            <tr className="text-sm text-slate-400">
              <th className="px-6 py-4 font-medium">Service</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Duration</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-t border-white/5 text-sm text-slate-300 transition hover:bg-white/[0.03]"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-white">{service.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {service.shortDescription || "No short description"}
                  </p>
                </td>
                <td className="px-6 py-4">{service.department.name}</td>
                <td className="px-6 py-4">
                  {service.durationMinutes || "--"} mins
                </td>
                <td className="px-6 py-4">{formatMoney(service.price)}</td>
                <td className="px-6 py-4">
                  <StatusBadge
                    label={service.isActive ? "Active" : "Inactive"}
                    variant={service.isActive ? "success" : "danger"}
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