import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

export function FaqSection() {
  const items = [
    {
      title: "How do I book an appointment?",
      description:
        "You can visit the appointment page, choose the doctor, enter your details, and submit the request directly.",
    },
    {
      title: "Can I browse doctors before booking?",
      description:
        "Yes. The website presents doctors, their specialties, and department relationships before starting the booking flow.",
    },
    {
      title: "Are services grouped by department?",
      description:
        "Yes. Services are organized in a clear structure to help patients understand the right care path faster.",
    },
    {
      title: "Is this platform ready for future expansion?",
      description:
        "Yes. The website is part of a broader hospital platform with admin dashboard, backend API, and mobile app foundations.",
    },
  ];

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions from patients and families"
        description="Clear answers reduce hesitation and improve trust during the decision and booking journey."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
          >
            <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}