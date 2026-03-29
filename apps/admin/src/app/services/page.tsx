'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { AnimatedContainer } from '@/components/shared/animated-container';
import { getAccessToken } from '@/lib/auth';
import { getServices, getDepartments } from '@/lib/api';
import { Service, Department } from '@/lib/types';
import { ServicesManagementView } from '@/components/services/services-management-view';

export default function ServicesPage() {
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
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

        const [servicesData, departmentsData] = await Promise.all([
          getServices(),
          getDepartments(),
        ]);

        setServices(servicesData);
        setDepartments(departmentsData);
      } catch (err) {
        console.error(err);
        setError('Failed to load services.');
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
            Loading services...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-8 text-sm text-rose-300">
            {error}
          </div>
        ) : (
          <AnimatedContainer delay={0}>
            <ServicesManagementView
              services={services}
              departments={departments}
            />
          </AnimatedContainer>
        )}
      </div>
    </DashboardShell>
  );
}