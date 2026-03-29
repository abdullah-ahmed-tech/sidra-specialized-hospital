'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginAdmin } from '@/lib/api';
import { setAccessToken } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('admin@sidra.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const result = await loginAdmin(email, password);
      setAccessToken(result.accessToken);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid login credentials or API connection issue.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_28%),linear-gradient(180deg,#020617_0%,#020617_100%)]" />

          <div className="relative flex w-full flex-col justify-between p-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 p-3 text-cyan-300 shadow-[0_12px_30px_rgba(6,182,212,0.18)]">
                <Activity className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-400">
                  Sidra
                </p>
                <h1 className="text-lg font-semibold text-white">
                  Admin Control Center
                </h1>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="max-w-2xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
                Secure Access
              </p>
              <h2 className="mt-4 text-5xl font-bold leading-[1.1] text-white">
                Premium hospital operations dashboard for daily control and
                decision making
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                Unified identity, stronger visual depth, smoother interactions,
                and a more persuasive admin experience aligned with the Sidra
                hospital platform.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-5">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                  <p className="text-sm text-slate-400">Operational View</p>
                  <p className="mt-3 text-3xl font-bold text-white">360°</p>
                  <p className="mt-2 text-xs text-slate-500">
                    Monitor departments, doctors, services, and appointments
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                  <p className="text-sm text-slate-400">Control Quality</p>
                  <p className="mt-3 text-3xl font-bold text-white">High</p>
                  <p className="mt-2 text-xs text-slate-500">
                    Built for a stronger sales-ready product presentation
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/10 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Demo Credentials
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Email: <span className="font-semibold">admin@sidra.com</span>
                <br />
                Password: <span className="font-semibold">123456</span>
              </p>
            </motion.div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="w-full max-w-xl"
          >
            <div className="mb-8 lg:hidden">
              <div className="mb-4 inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
                <Activity className="h-6 w-6" />
              </div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-400">
                Sidra
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Admin Control Center
              </h1>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
                  Sign In
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Welcome back
                </h2>
                <p className="text-sm leading-7 text-slate-400">
                  Access the Sidra administrative dashboard and continue managing
                  hospital operations with the upgraded interface.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition focus-within:border-cyan-400/40">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      placeholder="admin@sidra.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition focus-within:border-cyan-400/40">
                    <LockKeyhole className="h-4 w-4 text-slate-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span>{loading ? 'Signing in...' : 'Enter Dashboard'}</span>
                  {!loading ? <ArrowRight className="h-4 w-4" /> : null}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Quick Note
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  This login is fully aligned with the current admin auth flow
                  and stores the returned access token before redirecting to the
                  dashboard.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}