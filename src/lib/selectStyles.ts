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
    minHeight: '2.2rem',
    color: 'red',
    width: '100%',
    maxWidth: '200px',
    backgroundColor: 'transparent',
    borderRadius: '10px',
    boxShadow: 'transparent',
    cursor: 'pointer',
    borderColor: 'transparent',
    '&:hover': { borderColor: 'transparent' },
  }),
  valueContainer: () => ({}),
  placeholder: (base) => ({
    ...base,
    color: '#9CA3AF',
    fontWeight: 500,
    fontSize: '0.875rem',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#111827',
    fontWeight: 500,
    fontSize: '0.875rem',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow:
      '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
    marginTop: '0.5rem',
  }),
  menuList: (base) => ({
    ...base,
    padding: '0.25rem',
  }),
  option: (base) => ({
    ...base,
    borderRadius: '0.5rem',
    padding: '0.3rem 0.75rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    backgroundColor: 'transparent',
    color: '111827',
    '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.2)' },
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#6B7280',
    cursor: 'pointer',
    '&:hover': { color: '#2563EB' },
  }),
};

/* ────────────────  SearchBox  (white bg, rounded-xl, focus ring)  ──────────────── */

export const searchBoxSelectStyles: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (base, state) => ({
    ...base,
    minHeight: "2rem",
    width: "100%",
    maxWidth: '200px',
    border: state.isFocused ? "1.5px solid #2563EB" : "1px solid #E5E7EB",
    backgroundColor: "#FFFFFF",
    borderRadius: "0.75rem",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(37, 99, 235, 0.15)" : "none",
    cursor: "pointer",
    "&:hover": { borderColor: "#2563EB" },
  }),
  valueContainer: (base) => ({
    ...base,
    overflow: "hidden",
    paddingLeft: "0.75rem",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#6B7280",
    fontWeight: 500,
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827",
    fontWeight: 500,
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
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
    padding: "0.5rem 0.75rem",
    cursor: "pointer",
    fontSize: "0.875rem",
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
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "#2563EB" : "#6B7280",
    cursor: "pointer",
    "&:hover": { color: "#2563EB" },
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
