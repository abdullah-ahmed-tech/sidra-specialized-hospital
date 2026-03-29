'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { DashboardPanels } from '@/components/dashboard/dashboard-panels';
import { OverviewGrid } from '@/components/dashboard/overview-grid';
import { SectionHeading } from '@/components/shared/section-heading';
import { AnimatedContainer } from '@/components/shared/animated-container';
import { getAccessToken } from '@/lib/auth';
import {
  getAppointments,
  getDashboardMetrics,
  getDepartments,
  getDoctors,
  getServices,
} from '@/lib/api';
import { Appointment, Department, Doctor, Service } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [metrics, setMetrics] = useState({
    departments: 0,
    doctors: 0,
    services: 0,
    appointments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push('/login');
      return;
    }

    async function loadData() {
      try {
        setLoading(true);
        setError('');

        const [
          metricsData,
          departmentsData,
          doctorsData,
          servicesData,
          appointmentsData,
        ] = await Promise.all([
          getDashboardMetrics(),
          getDepartments(),
          getDoctors(),
          getServices(),
          getAppointments(),
        ]);

        setMetrics(metricsData);
        setDepartments(departmentsData);
        setDoctors(doctorsData);
        setServices(servicesData);
        setAppointments(appointmentsData);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  return (
    <DashboardShell>
      <div className="space-y-8">
        <AnimatedContainer delay={0}>
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_0.9fr]">
              <div>
                <SectionHeading
                  eyebrow="Dashboard"
                  title="Hospital Operations Overview"
                  description="Live operational snapshot connected to the backend foundation with a stronger premium visual presentation."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">Today Focus</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metrics.appointments}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Total appointment records
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">Clinical Reach</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metrics.departments + metrics.doctors}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Departments + doctors
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedContainer>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-sm text-slate-400">
            Loading dashboard...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-8 text-sm text-rose-300">
            {error}
          </div>
        ) : (
          <>
            <AnimatedContainer delay={0.08}>
              <OverviewGrid
                departmentsCount={metrics.departments}
                doctorsCount={metrics.doctors}
                servicesCount={metrics.services}
                appointmentsCount={metrics.appointments}
              />
            </AnimatedContainer>

            <AnimatedContainer delay={0.14}>
              <DashboardPanels
                departments={departments}
                doctors={doctors}
                services={services}
                appointments={appointments}
              />
            </AnimatedContainer>
          </>
        )}
      </div>
    </DashboardShell>
  );
}