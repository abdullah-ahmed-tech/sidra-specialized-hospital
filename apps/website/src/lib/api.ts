import type { Department, Doctor, Service } from './types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.json();
}

export async function getDepartments() {
  return apiFetch<Department[]>('/departments');
}

export async function getDoctors() {
  return apiFetch<Doctor[]>('/doctors');
}

export async function getServices() {
  return apiFetch<Service[]>('/services');
}

export async function createAppointment(payload: {
  doctorId: string;
  fullName: string;
  phone: string;
  email?: string;
  notes?: string;
  appointmentDate: string;
}) {
  return apiFetch('/appointments', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}