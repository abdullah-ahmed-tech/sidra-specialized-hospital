'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { DepartmentsTable } from '@/components/departments/departments-table';
import { SectionHeading } from '@/components/shared/section-heading';
import { getAccessToken } from '@/lib/auth';
import { getDepartments } from '@/lib/api';
import { Department } from '@/lib/types';

export default function DepartmentsPage() {
  const router = useRouter();
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
        const data = await getDepartments();
        setDepartments(data);
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
        <SectionHeading
          eyebrow="Management"
          title="Departments"
          description="View medical departments already stored in the API and prepared for administration."
        />

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-sm text-slate-400">
            Loading departments...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-8 text-sm text-rose-300">
            {error}
          </div>
        ) : (
          <DepartmentsTable departments={departments} />
        )}
      </div>
    </DashboardShell>
  );
}