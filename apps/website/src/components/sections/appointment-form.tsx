'use client';

import { useMemo, useState } from 'react';
import { createAppointment } from '@/lib/api';
import { Doctor } from '@/lib/types';

interface AppointmentFormProps {
  doctors: Doctor[];
  preselectedDoctorId?: string;
}

export function AppointmentForm({
  doctors,
  preselectedDoctorId,
}: AppointmentFormProps) {
  const initialDoctorId = useMemo(() => {
    if (preselectedDoctorId && doctors.some((d) => d.id === preselectedDoctorId)) {
      return preselectedDoctorId;
    }
    return doctors[0]?.id || '';
  }, [doctors, preselectedDoctorId]);

  const [form, setForm] = useState({
    doctorId: initialDoctorId,
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    appointmentDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function validateForm() {
    if (!form.doctorId) {
      setErrorMessage('Please select a doctor.');
      return false;
    }

    if (!form.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }

    if (!form.phone.trim()) {
      setErrorMessage('Please enter your phone number.');
      return false;
    }

    if (!form.appointmentDate.trim()) {
      setErrorMessage('Please select the appointment date and time.');
      return false;
    }

    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      await createAppointment({
        doctorId: form.doctorId,
        fullName: form.fullName,
        phone: form.phone,
        email: form.email || undefined,
        notes: form.notes || undefined,
        appointmentDate: new Date(form.appointmentDate).toISOString(),
      });

      setSuccessMessage(
        'Your appointment request has been submitted successfully. Our team will contact you shortly.',
      );

      setForm({
        doctorId: initialDoctorId,
        fullName: '',
        phone: '',
        email: '',
        notes: '',
        appointmentDate: '',
      });
    } catch {
      setErrorMessage(
        'Failed to submit the appointment request. Please verify that the API is running and try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)]"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <input
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Phone</label>
          <input
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Doctor</label>
          <select
            value={form.doctorId}
            onChange={(e) =>
              setForm({ ...form, doctorId: e.target.value })
            }
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
          >
            {doctors.length === 0 ? (
              <option value="">No doctors available</option>
            ) : (
              doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.user.fullName} - {doctor.department.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Appointment Date & Time
          </label>
          <input
            type="datetime-local"
            value={form.appointmentDate}
            onChange={(e) =>
              setForm({ ...form, appointmentDate: e.target.value })
            }
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Notes</label>
          <textarea
            rows={5}
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
            placeholder="Add any medical notes or appointment context"
          />
        </div>
      </div>

      {successMessage ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm leading-7 text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading || doctors.length === 0}
        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Submitting Request...' : 'Submit Appointment'}
      </button>
    </form>
  );
}