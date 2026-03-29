import { Service } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <div
          key={service.id}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
        >
          <p className="text-2xl font-bold text-slate-950">{service.name}</p>
          <p className="mt-2 text-sm font-semibold text-cyan-700">{service.department.name}</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {service.description || service.shortDescription || "Structured healthcare service presented for clarity and trust."}
          </p>
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-slate-500">{service.durationMinutes || "--"} mins</span>
            <span className="font-semibold text-slate-950">{formatMoney(service.price)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}