"use client";

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-400">
          Dashboard Error
        </p>
        <h1 className="mt-3 text-2xl font-bold">Failed to load admin data</h1>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          Check that the backend API is running and that
          NEXT_PUBLIC_ADMIN_API_URL points to the correct server.
        </p>
      </div>
    </main>
  );
}