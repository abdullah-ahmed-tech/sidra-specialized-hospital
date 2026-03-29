export function formatMoney(value?: string | number | null) {
  if (value === null || value === undefined || value === "") return "--";
  const numeric = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(numeric)) return "--";

  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
  }).format(numeric);
}