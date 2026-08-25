"use client";

import { useState } from "react";
import Select from "react-select";
import { Blocks, Logs, MapPinned } from "lucide-react";
import { PropertyCard } from "@/components/card/PropertyCard";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/common/Pagination";
import ViewMap from "@/components/common/ViewMap";
import type { OptionType } from "@/types";
import { properties } from "@/data/properties";
import { listingSelectStyles } from "@/lib/selectStyles";

const sortOptions: OptionType[] = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
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
            styles={listingSelectStyles}
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
                  "grid gap-3",
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
                  //  <PropertyCard
                  //   key={property.title}
                  //   {...property}
                  //   layout='mapcard'
                  // />
                ))}
              </div>

             
            </div>
          ) }
        </div>
        <div>
        <ViewMap height="500px" properties={properties} />
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
