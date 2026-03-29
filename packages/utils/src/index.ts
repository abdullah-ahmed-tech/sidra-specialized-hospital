export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

export const formatDate = (value: string | Date): string => {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString();
};