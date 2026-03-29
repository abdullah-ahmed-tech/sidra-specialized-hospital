'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { DashboardPanels } from '@/components/dashboard/dashboard-panels';
import { OverviewGrid } from '@/components/dashboard/overview-grid';
import { SectionHeading } from '@/components/shared/section-heading';
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

        const [metricsData, departmentsData, doctorsData, servicesData, appointmentsData] =
          await Promise.all([
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
        <SectionHeading
          eyebrow="Dashboard"
          title="Hospital Operations Overview"
          description="Live operational snapshot connected to the backend foundation."
        />

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
            <OverviewGrid
              departmentsCount={metrics.departments}
              doctorsCount={metrics.doctors}
              servicesCount={metrics.services}
              appointmentsCount={metrics.appointments}
            />

            <DashboardPanels
              departments={departments}
              doctors={doctors}
              services={services}
              appointments={appointments}
            />
          </>
        )}
      </div>
    </DashboardShell>
  );
}