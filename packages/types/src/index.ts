export type AppRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department extends BaseEntity {
  name: string;
  slug: string;
  description?: string | null;
  isActive: boolean;
}

export interface Doctor extends BaseEntity {
  fullName: string;
  slug: string;
  specialty: string;
  departmentId: string;
  bio?: string | null;
  isActive: boolean;
}

export interface Appointment extends BaseEntity {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}