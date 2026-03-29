import {
  Building2,
  CalendarDays,
  LayoutDashboard,
  Stethoscope,
  BriefcaseMedical,
} from "lucide-react";

export const dashboardNav = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Departments",
    href: "/departments",
    icon: Building2,
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Services",
    href: "/services",
    icon: BriefcaseMedical,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: CalendarDays,
  },
];