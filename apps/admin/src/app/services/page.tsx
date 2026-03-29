'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { ServicesTable } from '@/components/services/services-table';
import { SectionHeading } from '@/components/shared/section-heading';
import { getAccessToken } from '@/lib/auth';
import { getServices } from '@/lib/api';
import { Service } from '@/lib/types';

export default function ServicesPage() {
  const router = useRouter();
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
        const data = await getServices();
        setServices(data);
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
        <SectionHeading
          eyebrow="Management"
          title="Services"
          description="Clinical services are listed here for commercial and operational review."
        />

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-sm text-slate-400">
            Loading services...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-8 text-sm text-rose-300">
            {error}
          </div>
        ) : (
          <ServicesTable services={services} />
        )}
      </div>
    </DashboardShell>
  );
}