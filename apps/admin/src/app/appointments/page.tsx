'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { AppointmentsTable } from '@/components/appointments/appointments-table';
import { SectionHeading } from '@/components/shared/section-heading';
import { getAccessToken } from '@/lib/auth';
import { getAppointments } from '@/lib/api';
import { Appointment } from '@/lib/types';

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadAppointments() {
    try {
      setLoading(true);
      setError('');
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push('/login');
      return;
    }

    loadAppointments();
  }, [router]);

  return (
    <DashboardShell>
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Management"
          title="Appointments"
          description="Operational booking list connected to the live appointment data from the API."
        />

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-sm text-slate-400">
            Loading appointments...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-8 text-sm text-rose-300">
            {error}
          </div>
        ) : (
          <AppointmentsTable
            appointments={appointments}
            onRefresh={loadAppointments}
          />
        )}
      </div>
    </DashboardShell>
  );
}