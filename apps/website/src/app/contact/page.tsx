import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/shared/section-heading";

export default function ContactPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch with Sidra Specialized Hospital"
          description="Clear contact channels improve trust and reduce friction for patients and families."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-bold text-slate-950">Hotline</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">16676</p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-bold text-slate-950">Email</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              info@sidra-hospital.com
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-bold text-slate-950">Location</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Cairo, Egypt
            </p>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}