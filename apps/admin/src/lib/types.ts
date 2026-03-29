export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

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

export interface AppointmentPatient {
  id: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
}

export interface AppointmentDoctor {
  id: string;
  user: DoctorUser;
  department: DoctorDepartment;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  fullName: string;
  phone: string;
  email?: string | null;
  notes?: string | null;
  appointmentDate: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  patient: AppointmentPatient;
  doctor: AppointmentDoctor;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
  };
}