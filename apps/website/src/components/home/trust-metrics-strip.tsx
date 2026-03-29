import { ShieldCheck, Stethoscope, Clock3, HeartPulse } from "lucide-react";

export function TrustMetricsStrip() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Trusted Care",
      description: "Clear, confident presentation of specialist care.",
    },
    {
      icon: Stethoscope,
      title: "Specialist Access",
      description: "Discover doctors, departments, and services quickly.",
    },
    {
      icon: Clock3,
      title: "Fast Booking Path",
      description: "Smooth appointment flow with reduced patient friction.",
    },
    {
      icon: HeartPulse,
      title: "Modern Experience",
      description: "Premium digital presence aligned with hospital quality.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
            >
              <div className="inline-flex rounded-2xl bg-cyan-50 p-3 text-cyan-700">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}