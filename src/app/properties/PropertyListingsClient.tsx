"use client";

import { useState } from "react";
import Select, {
  type GroupBase,
  type StylesConfig,
} from "react-select";
import { Blocks, Logs, MapPinned } from "lucide-react";
import { PropertyCard } from "@/components/card/PropertyCard";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/common/Pagination";

type OptionType = { value: string; label: string };

const sortOptions: OptionType[] = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const selectStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
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

type Property = {
  image: string;
  verifiedText: string;
  chips: string[];
  title: string;
  phone: string;
  location: string;
  price: string;
  originalPrice: string;
  priceValue: number;
  city: string;
  type: string;
  beds: string;
};

const properties: Property[] = [
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["3, 2 BHK", "2 Bath"],
    title: "Luxury 3BHK in Sector 150",
    phone: "+91 98765 43210",
    location: "Sector 150, Noida",
    price: "₹1.25 Cr",
    originalPrice: "₹1.35 Cr",
    priceValue: 125,
    city: "Noida",
    type: "Apartment",
    beds: "3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["2 BHK", "2 Bath"],
    title: "Modern 2BHK Apartment",
    phone: "+91 98765 43210",
    location: "Golf Course Extension, Gurgaon",
    price: "₹85 L",
    originalPrice: "₹95 L",
    priceValue: 85,
    city: "Gurgaon",
    type: "Apartment",
    beds: "2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["4 BHK", "3 Bath"],
    title: "Premium Villa with Garden",
    phone: "+91 98765 43210",
    location: "Greater Noida West",
    price: "₹2.4 Cr",
    originalPrice: "₹2.8 Cr",
    priceValue: 240,
    city: "Greater Noida",
    type: "Villa",
    beds: "4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["3 BHK", "2 Bath"],
    title: "Skyline 3BHK High-Rise",
    phone: "+91 98765 43210",
    location: "Indirapuram, Ghaziabad",
    price: "₹1.1 Cr",
    originalPrice: "₹1.3 Cr",
    priceValue: 110,
    city: "Ghaziabad",
    type: "Apartment",
    beds: "3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["2 BHK", "1 Bath"],
    title: "Cozy 2BHK Near Metro",
    phone: "+91 98765 43210",
    location: "Vaishali, Ghaziabad",
    price: "₹65 L",
    originalPrice: "₹72 L",
    priceValue: 65,
    city: "Ghaziabad",
    type: "Apartment",
    beds: "2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600584524347-0d93d2dc85c9?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["5 BHK", "4 Bath"],
    title: "Grand Villa with Pool",
    phone: "+91 98765 43210",
    location: "DLF Phase 5, Gurgaon",
    price: "₹3.2 Cr",
    originalPrice: "₹3.8 Cr",
    priceValue: 320,
    city: "Gurgaon",
    type: "Villa",
    beds: "5+",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600047509352-9439a4b8d9d0?auto=format&fit=crop&w=800&q=80",
    verifiedText: "New Launch",
    chips: ["1 BHK", "1 Bath"],
    title: "Affordable 1BHK in Sector 62",
    phone: "+91 98765 43210",
    location: "Sector 62, Noida",
    price: "₹45 L",
    originalPrice: "₹50 L",
    priceValue: 45,
    city: "Noida",
    type: "Apartment",
    beds: "1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["3 BHK", "2 Bath"],
    title: "Builder Floor in Safdarjung",
    phone: "+91 98765 43210",
    location: "Safdarjung, Delhi",
    price: "₹1.75 Cr",
    originalPrice: "₹1.9 Cr",
    priceValue: 175,
    city: "Delhi",
    type: "Builder Floor",
    beds: "3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585144340-9f7a7c0b8c2a?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["Plot", "200 Sq.Yd"],
    title: "Residential Plot in Sector 150",
    phone: "+91 98765 43210",
    location: "Sector 150, Noida",
    price: "₹90 L",
    originalPrice: "₹1 Cr",
    priceValue: 90,
    city: "Noida",
    type: "Plot",
    beds: "-",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    verifiedText: "New Launch",
    chips: ["5 BHK", "4 Bath"],
    title: "Farm Villa with Lawn",
    phone: "+91 98765 43210",
    location: "Greater Noida",
    price: "₹2.8 Cr",
    originalPrice: "₹3.2 Cr",
    priceValue: 280,
    city: "Greater Noida",
    type: "Villa",
    beds: "5+",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["4 BHK", "4 Bath"],
    title: "Skyline Penthouse",
    phone: "+91 98765 43210",
    location: "Golf Course Road, Gurgaon",
    price: "₹3.6 Cr",
    originalPrice: "₹4 Cr",
    priceValue: 360,
    city: "Gurgaon",
    type: "Apartment",
    beds: "4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    verifiedText: "New Launch",
    chips: ["1 BHK", "1 Bath"],
    title: "Studio Apartment in DLF",
    phone: "+91 98765 43210",
    location: "DLF Phase 1, Gurgaon",
    price: "₹58 L",
    originalPrice: "₹64 L",
    priceValue: 58,
    city: "Gurgaon",
    type: "Apartment",
    beds: "1",
  },
];

const PER_PAGE = 9;

export const PropertyListingsClient = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const handleViewChange = (next: "grid" | "list") => {
    setView(next);
  };

  const totalPages = Math.max(1, Math.ceil(properties.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = properties.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  return (
    <section className="mx-auto w-full  px-6 pt-5 pb-10 sm:px-10">
    <Breadcrumb  items={[{ label: "Home", href: "/" }, { label: "Properties" }]} />
    <div className="my-4 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Property Listings</h3>
        <p className="mt-0.5 text-xs text-gray-500">2399 + Properties available</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-44 sm:w-48">
          <Select<OptionType, false>
            options={sortOptions}
            styles={selectStyles}
            placeholder="Sort by"
            isSearchable={false}
            defaultValue={sortOptions[0]}
          />
        </div>

        <div className="flex items-center gap-1 px-2 ">
          <button
            type="button"
            aria-label="List view"
            onClick={() => handleViewChange("list")}
            className={cn(
              "flex h-8 w-8 border border-gray-200 bg-white p-1 shadow-sm items-center justify-center rounded-lg transition-colors",
              view === "list"
                ? "bg-primary text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-primary"
            )}
          >
            <Logs className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Grid view"
            onClick={() => handleViewChange("grid")}
            className={cn(
              "flex h-8 w-8  border border-gray-200 bg-white p-1 shadow-sm items-center justify-center rounded-lg transition-colors",
              view === "grid"
                ? "bg-primary text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-primary"
            )}
          >
            <Blocks className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/30 transition-transform hover:scale-105"
        >
          <MapPinned className="h-4 w-4" />
        </button>
      </div>
    </div>
       <div className="grid gap-6 grid-cols-5 pt-8">
        <div className="col-span-5 lg:col-span-4">
  {properties.length > 0 && (
            <div className="mb-4">
              <div
                className={cn(
                  "grid gap-6",
                  view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {visible.map((property) => (
                  <PropertyCard
                    key={property.title}
                    {...property}
                    layout={view === "grid" ? "vertical" : "horizontal"}
                  />
                ))}
              </div>

             
            </div>
          ) }
        </div>
        <div>

        </div>
        </div>
         <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={properties.length}
                perPage={PER_PAGE}
                onChange={setPage}
                text="properties"
              />
    </section>
  );
};
