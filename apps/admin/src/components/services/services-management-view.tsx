'use client';

import { useMemo, useState } from 'react';
import {
  BriefcaseMedical,
  Clock3,
  FolderKanban,
  ShieldCheck,
} from 'lucide-react';
import { Department, Service } from '@/lib/types';
import { formatMoney } from '@/lib/utils';
import { ManagementToolbar } from '@/components/shared/management-toolbar';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import { StatCard } from '@/components/shared/stat-card';

interface ServicesManagementViewProps {
  services: Service[];
  departments: Department[];
}

export function ServicesManagementView({
  services,
  departments,
}: ServicesManagementViewProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.slug.toLowerCase().includes(search.toLowerCase()) ||
        service.department.name.toLowerCase().includes(search.toLowerCase()) ||
        (service.shortDescription || '')
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (service.description || '').toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL'
          ? true
          : statusFilter === 'ACTIVE'
          ? service.isActive
          : !service.isActive;

      const matchesDepartment =
        departmentFilter === 'ALL'
          ? true
          : service.department.id === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [services, search, statusFilter, departmentFilter]);

  const activeServices = services.filter((item) => item.isActive).length;
  const pricedServices = services.filter(
    (item) => item.price !== null && item.price !== undefined,
  ).length;

  return (
    <div className="space-y-8">
      <ManagementToolbar
        title="Services Management"
        description="A stronger operational layer for service presentation, department grouping, pricing visibility, and faster review."
        total={filteredServices.length}
        searchValue={search}
        searchPlaceholder="Search by service, slug, department, or description..."
        onSearchChange={setSearch}
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        extraFilter={
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
          >
            <option value="ALL">All Departments</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
        <StatCard
          label="Total Services"
          value={services.length}
          hint="All listed service records"
          icon={<BriefcaseMedical className="h-5 w-5" />}
        />
        <StatCard
          label="Active Services"
          value={activeServices}
          hint="Visible and operational services"
          icon={<ShieldCheck className="h-5 w-5" />}
        />
        <StatCard
          label="Priced Services"
          value={pricedServices}
          hint="Services with clear pricing"
          icon={<FolderKanban className="h-5 w-5" />}
        />
        <StatCard
          label="Avg. Duration"
          value={
            Math.round(
              services.reduce(
                (acc, item) => acc + (item.durationMinutes || 0),
                0,
              ) / Math.max(services.length, 1),
            ) || 0
          }
          hint="Average service duration in minutes"
          icon={<Clock3 className="h-5 w-5" />}
        />
      </div>

      {!filteredServices.length ? (
        <EmptyState
          title="No services match the selected filters"
          description="Try changing the department or status filter, or use a broader search query."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:bg-white/[0.05]"
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />

              <div className="relative space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-[0_10px_30px_rgba(6,182,212,0.18)]">
                      <BriefcaseMedical className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {service.name}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                        {service.slug}
                      </p>
                    </div>
                  </div>

                  <StatusBadge
                    label={service.isActive ? 'Active' : 'Inactive'}
                    variant={service.isActive ? 'success' : 'danger'}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    {service.department.name}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300">
                    {service.durationMinutes || '--'} mins
                  </span>
                </div>

                <p className="text-sm leading-7 text-slate-400">
                  {service.shortDescription ||
                    service.description ||
                    'No description has been added for this service yet.'}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      Price
                    </p>
                    <p className="mt-2 text-xl font-bold text-white">
                      {formatMoney(service.price)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      Duration
                    </p>
                    <p className="mt-2 text-xl font-bold text-white">
                      {service.durationMinutes || '--'} min
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    Service Summary
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Department</span>
                      <span className="font-semibold text-white">
                        {service.department.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Created</span>
                      <span className="font-semibold text-white">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    Structured Pricing
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300">
                    Conversion Ready
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}