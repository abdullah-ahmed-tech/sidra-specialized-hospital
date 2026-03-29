import { SiteShell } from "@/components/layout/site-shell";
import { ServicesGrid } from "@/components/sections/services-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getServices } from "@/lib/api";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Services"
          title="Clinical services designed for clarity and action"
          description="Each service supports patient understanding and creates a direct path toward booking."
        />
        <div className="mt-12">
          <ServicesGrid services={services} />
        </div>
      </main>
      <CtaBanner />
    </SiteShell>
  );
}