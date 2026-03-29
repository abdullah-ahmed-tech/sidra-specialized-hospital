import { AppointmentPayload, Department, Doctor } from "./types";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/api";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.json();
}

export async function getDepartments() {
  return apiFetch<Department[]>("/departments");
}

export async function getDoctors() {
  return apiFetch<Doctor[]>("/doctors");
}

export async function createAppointment(payload: AppointmentPayload) {
  return apiFetch("/appointments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}