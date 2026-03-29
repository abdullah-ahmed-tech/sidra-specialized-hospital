import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { InfoCard } from "@/components/shared/info-card";
import { ShieldCheck, HeartPulse, Building2 } from "lucide-react";

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="About Sidra"
          title="A modern specialized hospital built around trust and patient clarity"
          description="Sidra Specialized Hospital is presented as a premium healthcare institution focused on specialized care, structured patient journeys, and a credible digital presence."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <InfoCard
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Trust"
            description="The digital experience is built to support confidence, transparency, and ease of access."
          />
          <InfoCard
            icon={<HeartPulse className="h-6 w-6" />}
            title="Specialized Care"
            description="Departments, doctors, and services are organized to guide patients to the correct care path."
          />
          <InfoCard
            icon={<Building2 className="h-6 w-6" />}
            title="Operational Excellence"
            description="The platform aligns public presentation with internal hospital operations and administration."
          />
        </div>
      </main>
    </SiteShell>
  );
}