"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Department, Doctor, Service } from "@/lib/types";

interface PremiumHeroSectionProps {
  departments: Department[];
  doctors: Doctor[];
  services: Service[];
}

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=80",
    title: "Modern Clinical Environment",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
    title: "Patient-Centered Care",
  },
  {
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
    title: "Advanced Medical Support",
  },
];

export function PremiumHeroSection({
  departments,
  doctors,
  services,
}: PremiumHeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]" />

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 gap-14 px-6 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
            Advanced Specialized Healthcare
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.09] tracking-tight text-slate-950 md:text-6xl xl:text-[4.25rem]">
              A premium digital hospital experience built to create trust and
              drive appointment conversion
            </h1>

            <p className="max-w-2xl text-lg leading-9 text-slate-600">
              Sidra Specialized Hospital combines specialist care, modern
              presentation, structured service discovery, and a smooth booking
              experience for patients and families.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/appointments"
              className="rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98]"
            >
              Book Appointment
            </Link>

            <Link
              href="/doctors"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Explore Doctors
            </Link>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <p className="text-sm text-slate-500">Departments</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {departments.length}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <p className="text-sm text-slate-500">Doctors</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {doctors.length}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <p className="text-sm text-slate-500">Services</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {services.length}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 lg:self-center">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
            <div className="relative h-[420px] w-full">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
                    index === activeSlide
                      ? "opacity-100 scale-100"
                      : "pointer-events-none opacity-0 scale-[1.03]"
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(15,23,42,0.14), rgba(15,23,42,0.26)), url('${slide.image}')`,
                  }}
                />
              ))}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-6">
                <p className="text-sm font-medium text-white/90">
                  {heroSlides[activeSlide].title}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeSlide
                          ? "w-8 bg-white"
                          : "w-2.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)]">
              <p className="text-sm text-slate-500">Patient Experience</p>
              <p className="mt-3 text-3xl font-bold text-slate-950">Premium</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Stronger clarity, trust, and speed in the digital care journey.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_16px_50px_rgba(15,23,42,0.16)]">
              <p className="text-sm text-slate-400">Booking Journey</p>
              <p className="mt-3 text-3xl font-bold">Live</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Appointment requests connect directly to the existing backend
                flow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}