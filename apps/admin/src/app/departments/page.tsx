'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { AnimatedContainer } from '@/components/shared/animated-container';
import { getAccessToken } from '@/lib/auth';
import { getDepartments, getDoctors, getServices } from '@/lib/api';
import { Department, Doctor, Service } from '@/lib/types';
import { DepartmentsManagementView } from '@/components/departments/departments-management-view';

export default function DepartmentsPage() {
  const router = useRouter();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
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

        const [departmentsData, doctorsData, servicesData] = await Promise.all([
          getDepartments(),
          getDoctors(),
          getServices(),
        ]);

        setDepartments(departmentsData);
        setDoctors(doctorsData);
        setServices(servicesData);
      } catch (err) {
        console.error(err);
        setError('Failed to load departments.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  return (
    <DashboardShell>
      <div className="space-y-8">
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-sm text-slate-400">
            Loading departments...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-8 text-sm text-rose-300">
            {error}
          </div>
        ) : (
          <AnimatedContainer delay={0}>
            <DepartmentsManagementView
              departments={departments}
              doctors={doctors}
              services={services}
            />
          </AnimatedContainer>
        )}
      </div>
    </DashboardShell>
  );
}