'use client';

import { useMemo, useState } from 'react';
import { Building2, Layers3, ShieldCheck, Users } from 'lucide-react';
import { Department, Doctor, Service } from '@/lib/types';
import { ManagementToolbar } from '@/components/shared/management-toolbar';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import { StatCard } from '@/components/shared/stat-card';

interface DepartmentsManagementViewProps {
  departments: Department[];
  doctors: Doctor[];
  services: Service[];
}

export function DepartmentsManagementView({
  departments,
  doctors,
  services,
}: DepartmentsManagementViewProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const matchesSearch =
        department.name.toLowerCase().includes(search.toLowerCase()) ||
        department.slug.toLowerCase().includes(search.toLowerCase()) ||
        (department.description || '')
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL'
          ? true
          : statusFilter === 'ACTIVE'
          ? department.isActive
          : !department.isActive;

      return matchesSearch && matchesStatus;
    });
  }, [departments, search, statusFilter]);

  const activeDepartments = departments.filter((item) => item.isActive).length;
  const inactiveDepartments = departments.length - activeDepartments;

  return (
    <div className="space-y-8">
      <ManagementToolbar
        title="Departments Management"
        description="A richer operational view for hospital departments with better scanning, stronger hierarchy, and quick business context."
        total={filteredDepartments.length}
        searchValue={search}
        searchPlaceholder="Search by name, slug, or description..."
        onSearchChange={setSearch}
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
        <StatCard
          label="Total Departments"
          value={departments.length}
          hint="All listed departments"
          icon={<Building2 className="h-5 w-5" />}
        />
        <StatCard
          label="Active Departments"
          value={activeDepartments}
          hint="Operational and visible"
          icon={<ShieldCheck className="h-5 w-5" />}
        />
        <StatCard
          label="Inactive Departments"
          value={inactiveDepartments}
          hint="Need review or activation"
          icon={<Layers3 className="h-5 w-5" />}
        />
        <StatCard
          label="Assigned Doctors"
          value={doctors.length}
          hint="Doctors distributed across departments"
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      {!filteredDepartments.length ? (
        <EmptyState
          title="No departments match the current filters"
          description="Try a different search term or change the status filter to reveal more departments."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
          {filteredDepartments.map((department) => {
            const departmentDoctors = doctors.filter(
              (doctor) => doctor.department.id === department.id,
            );
            const departmentServices = services.filter(
              (service) => service.department.id === department.id,
            );

            return (
              <div
                key={department.id}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:bg-white/[0.05]"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />

                <div className="relative space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-[0_10px_30px_rgba(6,182,212,0.18)]">
                        <Building2 className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {department.name}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                          {department.slug}
                        </p>
                      </div>
                    </div>

                    <StatusBadge
                      label={department.isActive ? 'Active' : 'Inactive'}
                      variant={department.isActive ? 'success' : 'danger'}
                    />
                  </div>

                  <p className="text-sm leading-7 text-slate-400">
                    {department.description ||
                      'No description has been written for this department yet.'}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                        Doctors
                      </p>
                      <p className="mt-2 text-2xl font-bold text-white">
                        {departmentDoctors.length}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                        Services
                      </p>
                      <p className="mt-2 text-2xl font-bold text-white">
                        {departmentServices.length}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                      Department Snapshot
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Sort Order</span>
                        <span className="font-semibold text-white">
                          {department.sortOrder}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Created</span>
                        <span className="font-semibold text-white">
                          {new Date(department.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                      Structured Department
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300">
                      Commercial Ready
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}