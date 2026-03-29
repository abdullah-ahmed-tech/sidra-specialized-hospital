import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

export function TestimonialsSection() {
  const items = [
    {
      name: "Patient Experience",
      quote:
        "The hospital presentation feels trustworthy, premium, and very easy to navigate for appointments.",
    },
    {
      name: "Family Member Journey",
      quote:
        "Doctor and service discovery is much clearer, which makes the decision process faster and more confident.",
    },
    {
      name: "Healthcare Brand Perception",
      quote:
        "A stronger digital presence immediately raises the perceived quality of the institution.",
    },
  ];

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Trust Signals"
        title="A digital experience designed to increase confidence"
        description="Presentation, clarity, and structured service discovery all influence how patients perceive healthcare quality."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="mb-4 text-3xl text-cyan-600">“</div>
            <p className="text-sm leading-8 text-slate-600">{item.quote}</p>
            <p className="mt-5 text-sm font-semibold text-slate-950">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}