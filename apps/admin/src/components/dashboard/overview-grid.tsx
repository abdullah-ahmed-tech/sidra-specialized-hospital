import {
  BriefcaseMedical,
  Building2,
  CalendarDays,
  Stethoscope,
} from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";

interface OverviewGridProps {
  departmentsCount: number;
  doctorsCount: number;
  servicesCount: number;
  appointmentsCount: number;
}

export function OverviewGrid({
  departmentsCount,
  doctorsCount,
  servicesCount,
  appointmentsCount,
}: OverviewGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
      <StatCard
        label="Departments"
        value={departmentsCount}
        hint="Operational medical departments"
        icon={<Building2 className="h-5 w-5" />}
      />
      <StatCard
        label="Doctors"
        value={doctorsCount}
        hint="Active listed doctor profiles"
        icon={<Stethoscope className="h-5 w-5" />}
      />
      <StatCard
        label="Services"
        value={servicesCount}
        hint="Clinical services ready for publishing"
        icon={<BriefcaseMedical className="h-5 w-5" />}
      />
      <StatCard
        label="Appointments"
        value={appointmentsCount}
        hint="Booked appointments in system"
        icon={<CalendarDays className="h-5 w-5" />}
      />
    </div>
  );
}