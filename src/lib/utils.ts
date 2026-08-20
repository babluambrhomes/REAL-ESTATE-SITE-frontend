import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPropertyChip(types: string[]): string {
  if (!types?.length) return "";

  const suffixMatch = types[0].match(/\s*(\S+)$/);
  const suffix = suffixMatch?.[1] || "";

  const values = types.map((item) =>
    item.replace(new RegExp(`\s*${suffix}$`), "").trim()
  );

  if (values.length === 1) {
    return `${values[0]} ${suffix}`.trim();
  }

  const formattedValues =
    values.length === 2
      ? `${values[0]} & ${values[1]}`
      : `${values.slice(0, -1).join(" , ")} & ${values[values.length - 1]}`;

  return `${formattedValues} ${suffix}`.trim();
}