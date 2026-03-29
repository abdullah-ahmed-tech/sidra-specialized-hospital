"use client";

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-500">
          Website Error
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-950">
          Failed to load website data
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Check that the backend API is running and that NEXT_PUBLIC_API_URL is
          configured correctly.
        </p>
      </div>
    </main>
  );
}