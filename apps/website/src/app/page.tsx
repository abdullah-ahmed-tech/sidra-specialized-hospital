import { SiteShell } from "@/components/layout/site-shell";
import { CtaBanner } from "@/components/shared/cta-banner";
import { DepartmentsPreview } from "@/components/home/departments-preview";
import { DoctorsPreview } from "@/components/home/doctors-preview";
import { HeroSection } from "@/components/home/hero-section";
import { HighlightsSection } from "@/components/home/highlights-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { getDepartments, getDoctors, getServices } from "@/lib/api";

export default async function HomePage() {
  const [departments, doctors, services] = await Promise.all([
    getDepartments(),
    getDoctors(),
    getServices(),
  ]);

  return (
    <SiteShell>
      <HeroSection />
      <HighlightsSection />
      <DepartmentsPreview departments={departments} />
      <DoctorsPreview doctors={doctors} />
      <ServicesPreview services={services} />
      <CtaBanner />
    </SiteShell>
  );
}