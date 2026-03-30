export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'DOCTOR' | 'PATIENT';

export interface SessionUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: SessionUser;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  isActive: boolean;
}

export interface DoctorDepartment {
  id: string;
  name: string;
  slug: string;
}

export interface Doctor {
  id: string;
  slug: string;
  specialty: string;
  title?: string | null;
  bio?: string | null;
  consultationFee?: string | number | null;
  experienceYears?: number | null;
  languages: string[];
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: DoctorUser;
  department: DoctorDepartment;
}

export interface Service {
  id: string;
  departmentId: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  price?: string | number | null;
  durationMinutes?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  department: Department;
}

export interface AppointmentPayload {
  doctorId: string;
  fullName: string;
  phone: string;
  email?: string;
  notes?: string;
  appointmentDate: string;
}