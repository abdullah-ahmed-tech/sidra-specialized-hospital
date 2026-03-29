'use client';

import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { clearAccessToken } from '@/lib/auth';

export function Topbar() {
  const router = useRouter();

  function handleLogout() {
    clearAccessToken();
    router.push('/login');
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">
            Operations Center
          </p>
          <h1 className="mt-1 text-xl font-semibold text-white">
            Sidra Specialized Hospital
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:bg-white/[0.08]">
            <Bell className="h-5 w-5" />
          </button>

          <button
            onClick={handleLogout}
            className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}