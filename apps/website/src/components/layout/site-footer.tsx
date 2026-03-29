import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
            Sidra Specialized Hospital
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            Premium digital presence for hospital services, departments, doctor
            discovery, and appointment conversion.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/about">About</Link>
            <Link href="/departments">Departments</Link>
            <Link href="/doctors">Doctors</Link>
            <Link href="/services">Services</Link>
            <Link href="/appointments">Book Appointment</Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>Main Hotline: 16676</p>
            <p>Email: info@sidra-hospital.com</p>
            <p>Cairo, Egypt</p>
          </div>
        </div>
      </div>
    </footer>
  );
}