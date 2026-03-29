import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Service } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

export function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Services"
          title="Clinical services built around patient clarity"
          description="Service presentation supports trust, pricing visibility, and better conversion into appointment requests."
        />
        <Link href="/services" className="text-sm font-semibold text-cyan-700">
          View all services
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.slice(0, 6).map((service) => (
          <div
            key={service.id}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
          >
            <p className="text-xl font-bold text-slate-950">{service.name}</p>
            <p className="mt-2 text-sm font-medium text-cyan-700">{service.department.name}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {service.shortDescription || service.description || "Structured clinical service ready for publishing."}
            </p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-slate-500">{service.durationMinutes || "--"} mins</span>
              <span className="font-semibold text-slate-950">{formatMoney(service.price)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}