'use client';

interface ManagementToolbarProps {
  title: string;
  description: string;
  total: number;
  searchValue: string;
  searchPlaceholder: string;
  onSearchChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
  extraFilter?: React.ReactNode;
}

export function ManagementToolbar({
  title,
  description,
  total,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  statusValue,
  onStatusChange,
  extraFilter,
}: ManagementToolbarProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
            Management Layer
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {title}
          </h2>
          <p className="text-sm leading-7 text-slate-400 md:text-base">
            {description}
          </p>
        </div>

        <div className="grid min-w-full grid-cols-1 gap-3 md:grid-cols-2 xl:min-w-[720px] xl:grid-cols-[1.1fr_180px_180px]">
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
          />

          <select
            value={statusValue}
            onChange={(e) => onStatusChange(e.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="INACTIVE">Inactive Only</option>
          </select>

          {extraFilter ? (
            extraFilter
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-300">
              Total: {total}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}