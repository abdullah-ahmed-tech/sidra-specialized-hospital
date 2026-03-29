'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { DoctorsTable } from '@/components/doctors/doctors-table';
import { SectionHeading } from '@/components/shared/section-heading';
import { getAccessToken } from '@/lib/auth';
import { getDoctors } from '@/lib/api';
import { Doctor } from '@/lib/types';

export default function DoctorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
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
        const data = await getDoctors();
        setDoctors(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load doctors.');
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
          title="Doctors"
          description="Doctor records are fetched from live backend data including department and consultation details."
        />

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-sm text-slate-400">
            Loading doctors...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-8 text-sm text-rose-300">
            {error}
          </div>
        ) : (
          <DoctorsTable doctors={doctors} />
        )}
      </div>
    </DashboardShell>
  );
}