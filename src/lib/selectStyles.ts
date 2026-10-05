import type { GroupBase, StylesConfig } from "react-select";
import type { OptionType } from "@/types";

/* ────────────────  HeaderSelect  (transparent + MapPin container)  ──────────────── */

export const headerSelectStyles: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (base) => ({
    ...base,
    minHeight: '2.1rem',
    height: '2.1rem',
    width: 'auto',
    minWidth: '130px',
    maxWidth: '160px',
    backgroundColor: 'transparent',
    borderRadius: '12px',
    boxShadow: 'none',
    border: 'none',
    cursor: 'pointer',
    '&:hover': { borderColor: 'transparent' },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#000000',
    fontWeight: 500,
    fontSize: '16px',
    letterSpacing: '-0.019em',
    whiteSpace: 'nowrap',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#000000',
    fontWeight: 500,
    fontSize: '16px',
    letterSpacing: '-0.019em',
    whiteSpace: 'nowrap',
    margin: 0,
  }),

  menu: (base) => ({
    ...base,
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow:
      '0 12px 36px rgba(24, 101, 242, 0.16), 0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '1px solid #DCE8FE',
    marginTop: '0.5rem',
  }),
  menuList: (base) => ({
    ...base,
    padding: '0.25rem',
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: '0.5rem',
    padding: '0.4rem 0.75rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    backgroundColor: state.isSelected ? '#1d64ec' : 'transparent',
    color: state.isSelected ? '#ffffff' : '#111827',
    '&:hover': { backgroundColor: state.isSelected ? '#1d64ec' : 'rgba(37, 99, 235, 0.1)' },
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '0 6px 0 0',
    color: '#0f172a',
    cursor: 'pointer',
  }),
};



/* ────────────────  SearchBox  (white bg, rounded-2xl, 48px height, focus ring)  ──────────────── */

export const searchBoxSelectStyles: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (base, state) => ({
    ...base,
    minHeight: "48px",
    height: "48px",
    width: "100%",
    border: state.isFocused ? "1.5px solid #1865F2" : "1px solid #E2E8F0",
    backgroundColor: "#FFFFFF",
    borderRadius: "1rem",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(24, 101, 242, 0.12)" : "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": { borderColor: "#1865F2" },
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: "0.85rem",
    paddingRight: "0.5rem",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#64748B",
    fontWeight: 400,
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#0F172A",
    fontWeight: 500,
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "1rem",
    overflow: "hidden",
    width: "auto",
    minWidth: "180px",
    maxWidth: "240px",
    boxShadow:
      "0 12px 36px rgba(24, 101, 242, 0.16), 0 4px 12px rgba(0, 0, 0, 0.05)",
    border: "1px solid #DCE8FE",
    marginTop: "0.5rem",
    zIndex: 50,
  }),
  menuList: (base) => ({
    ...base,
    padding: "0.35rem",
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: "0.6rem",
    padding: "0.5rem 0.85rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 500,
    backgroundColor: state.isSelected
      ? "#1865F2"
      : state.isFocused
        ? "rgba(24, 101, 242, 0.08)"
        : "transparent",
    color: state.isSelected ? "#FFFFFF" : "#0F172A",
    "&:active": { backgroundColor: "rgba(24, 101, 242, 0.15)" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    paddingRight: "0.75rem",
    color: state.isFocused ? "#1865F2" : "#94A3B8",
    cursor: "pointer",
    "&:hover": { color: "#1865F2" },
  }),
};

/* ────────────────  PropertyListings  (pill shape, fixed height)  ──────────────── */

export const listingSelectStyles: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (base, state) => ({
    ...base,
    minHeight: "2rem",
    height: "2rem",
    width: "100%",
    border: state.isFocused ? "1.5px solid #2563EB" : "1px solid #E5E7EB",
    backgroundColor: "#FFFFFF",
    borderRadius: "5rem",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(37, 99, 235, 0.15)" : "none",
    cursor: "pointer",
    "&:hover": { borderColor: "#2563EB" },
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: "0.75rem",
    paddingTop: "0.1rem",
    paddingBottom: "0.1rem",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#6B7280",
    fontWeight: 500,
    fontSize: "0.8rem",
    whiteSpace: "nowrap",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827",
    fontWeight: 500,
    fontSize: "0.8rem",
    whiteSpace: "nowrap",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "0 0.5rem",
    color: state.isFocused ? "#2563EB" : "#6B7280",
    cursor: "pointer",
    "&:hover": { color: "#2563EB" },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow:
      "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
    marginTop: "0.5rem",
    zIndex: 40,
  }),
  menuList: (base) => ({
    ...base,
    padding: "0.25rem",
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: "0.5rem",
    padding: "0.4rem 0.6rem",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: 500,
    backgroundColor: state.isSelected
      ? "#2563EB"
      : state.isFocused
        ? "rgba(37, 99, 235, 0.1)"
        : "transparent",
    color: state.isSelected ? "#FFFFFF" : "#111827",
    "&:active": { backgroundColor: "rgba(37, 99, 235, 0.2)" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

/* ────────────────  Property Details — chart year selector  ──────────────── */

export const chartYearSelectStyles = {
  control: (base: Record<string, unknown>) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    background: "transparent",
  }),
  dropdownIndicator: (base: Record<string, unknown>) => ({
    ...base,
    padding: 0,
  }),
  option: (base: Record<string, unknown>) => ({
    ...base,
    fontSize: "12px",
  }),
  menu: (base: Record<string, unknown>) => ({
    ...base,
    fontSize: "12px",
  }),
};

/* ────────────────  Property Details — country code selector  ──────────────── */

export const countryCodeSelectStyles = {
  control: (base: Record<string, unknown>) => ({
    ...base,
    minHeight: "36px",
    height: "36px",
    border: "none",
    boxShadow: "none",
    background: "#f3f4f6",
    borderRadius: "4px 0 0 4px",
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base: Record<string, unknown>) => ({
    ...base,
    padding: "0 6px",
    color: "#4b5563",
  }),
  singleValue: (base: Record<string, unknown>) => ({
    ...base,
    fontSize: "11px",
    fontWeight: 500,
    color: "#4b5563",
  }),
  menu: (base: Record<string, unknown>) => ({
    ...base,
    fontSize: "11px",
    zIndex: 50,
    marginTop: "4px",
    width: "max-content",
    minWidth: "120px",
  }),
  option: (base: Record<string, unknown>) => ({
    ...base,
    cursor: "pointer",
    padding: "6px 10px",
  }),
};
