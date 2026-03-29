import { getAccessToken } from './auth';
import type {
  Appointment,
  Department,
  Doctor,
  LoginResponse,
  Service,
} from './types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:4000/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token =
    typeof window !== 'undefined' ? getAccessToken() : null;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

export async function loginAdmin(email: string, password: string) {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
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

export async function getAppointments() {
  return apiFetch<Appointment[]>('/appointments');
}

export async function getDashboardMetrics() {
  return apiFetch<{
    departments: number;
    doctors: number;
    services: number;
    appointments: number;
  }>('/dashboard/metrics');
}

export async function updateAppointmentStatus(
  id: string,
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW',
) {
  return apiFetch<Appointment>(`/appointments/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}