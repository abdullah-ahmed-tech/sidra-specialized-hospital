import { ShieldCheck, Stethoscope, Building2 } from "lucide-react";
import { InfoCard } from "@/components/shared/info-card";

export function HighlightsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <InfoCard
          icon={<ShieldCheck className="h-6 w-6" />}
          title="Trusted Clinical Standards"
          description="Patient confidence starts with clear service presentation, trusted specialists, and operational clarity."
        />
        <InfoCard
          icon={<Stethoscope className="h-6 w-6" />}
          title="Specialized Medical Teams"
          description="Doctor profiles, specialties, consultation focus, and structured care pathways are presented with credibility."
        />
        <InfoCard
          icon={<Building2 className="h-6 w-6" />}
          title="Hospital-Grade Structure"
          description="Departments, services, appointments, and communication pathways are organized for commercial and operational readiness."
        />
      </div>
    </section>
  );
}