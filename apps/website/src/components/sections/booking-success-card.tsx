export function BookingSuccessCard() {
  return (
    <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 shadow-[0_12px_40px_rgba(16,185,129,0.08)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl text-white">
        ✓
      </div>

      <h3 className="mt-5 text-2xl font-bold text-slate-950">
        Appointment request submitted successfully
      </h3>

      <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-700">
        Your request has been sent to the hospital system. The team can now
        review the booking details and continue the follow-up process.
      </p>
    </div>
  );
}