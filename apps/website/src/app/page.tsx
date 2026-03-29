import { SiteShell } from "@/components/layout/site-shell";
import { DepartmentsPreview } from "@/components/home/departments-preview";
import { DoctorsPreview } from "@/components/home/doctors-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { PremiumHeroSection } from "@/components/home/premium-hero-section";
import { TrustMetricsStrip } from "@/components/home/trust-metrics-strip";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { StickyBookCta } from "@/components/shared/sticky-book-cta";
import { getDepartments, getDoctors, getServices } from "@/lib/api";

export default async function HomePage() {
  const [departments, doctors, services] = await Promise.all([
    getDepartments(),
    getDoctors(),
    getServices(),
  ]);

  return (
    <SiteShell>
      <PremiumHeroSection
        departments={departments}
        doctors={doctors}
        services={services}
      />

      <TrustMetricsStrip />

      <DepartmentsPreview departments={departments} />
      <DoctorsPreview doctors={doctors} />
      <ServicesPreview services={services} />

      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
      <StickyBookCta />
    </SiteShell>
  );
}