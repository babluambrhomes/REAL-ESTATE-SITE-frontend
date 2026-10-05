"use client";

import { useState } from "react";
import Select from "react-select";
import { Blocks, Logs, MapPinned } from "lucide-react";
import { PropertyCard } from "@/components/card/PropertyCard";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/common/Pagination";
import ViewMap from "@/components/common/ViewMap";
import { ListingsSidebarWidgets } from "@/components/properties/ListingsSidebarWidgets";
import { ListingsTopAgents } from "@/components/properties/ListingsTopAgents";
import { ListingsReadyToMove } from "@/components/properties/ListingsReadyToMove";
import { ListingsHandpicked } from "@/components/properties/ListingsHandpicked";
import { ListingsPriceDropped } from "@/components/properties/ListingsPriceDropped";
import { ListingsPropertyExperts } from "@/components/properties/ListingsPropertyExperts";
import { WhyChooseRoofinBanner } from "@/components/common/WhyChooseRoofinBanner";
import type { OptionType } from "@/types";
import { properties } from "@/data/properties";
import { listingSelectStyles } from "@/lib/selectStyles";

const sortOptions: OptionType[] = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const PER_PAGE = 13;

export const PropertyListingsClient = () => {
  const [view, setView] = useState<"grid" | "list">("list");
  const [showMap, setShowMap] = useState(false);
  const [page, setPage] = useState(1);

  const handleViewChange = (next: "grid" | "list") => {
    setView(next);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const totalPages = Math.max(1, Math.ceil(properties.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = properties.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pt-5 pb-12 sm:px-8">
      {/* Breadcrumb matching Figma */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Property in Noida" }]}
      />

      {/* Subheader Toolbar */}
      <div className="my-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0B132B]">
            Properties in Noida
          </h2>
          <p className="mt-0.5 text-xs text-[#64748B]">
            2,376 + properties available
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">
              Short by:
            </span>
            <div className="w-40 sm:w-44">
              <Select<OptionType, false>
                options={sortOptions}
                styles={listingSelectStyles}
                placeholder="Sort by"
                isSearchable={false}
                defaultValue={sortOptions[0]}
              />
            </div>
          </div>

          {/* Grid vs List View Toggle */}
          <div className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white p-1 shadow-2xs">
            <button
              type="button"
              aria-label="List view"
              onClick={() => handleViewChange("list")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer",
                view === "list"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "text-gray-500 hover:bg-gray-100 hover:text-[#1865F2]"
              )}
            >
              <Logs className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => handleViewChange("grid")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer",
                view === "grid"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "text-gray-500 hover:bg-gray-100 hover:text-[#1865F2]"
              )}
            >
              <Blocks className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle map view"
            onClick={() => setShowMap((prev) => !prev)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all cursor-pointer shadow-md",
              showMap
                ? "bg-[#0B132B] text-white ring-2 ring-blue-500"
                : "bg-[#1865F2] text-white shadow-blue-500/25 hover:scale-105 hover:bg-blue-700"
            )}
          >
            <MapPinned className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {view === "grid" ? (
        /* ------------------ PURE GRID VIEW (Classic 3-Column Grid) ------------------ */
        <div className="flex flex-col lg:flex-row gap-7 pt-2 items-start">
          <div className={cn(showMap ? "flex-1 min-w-0" : "w-full")}>
            <div
              className={cn(
                "grid gap-6",
                showMap
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {visible.map((property, idx) => (
                <PropertyCard
                  key={`${property.title}-${idx}`}
                  {...property}
                  index={idx}
                  layout="vertical"
                />
              ))}
            </div>
          </div>

          {/* Map in Grid View if toggled */}
          {showMap && (
            <div className="w-full lg:w-[360px] shrink-0 sticky top-24 self-start">
              <div className="rounded-[24px] overflow-hidden border border-slate-200/90 shadow-sm bg-white p-2">
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-gray-800">
                    Map View
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowMap(false)}
                    className="text-xs text-[#1865F2] font-semibold hover:underline"
                  >
                    Hide Map
                  </button>
                </div>
                <ViewMap height="620px" properties={properties} />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ------------------ FULL FIGMA LIST VIEW (Interspersed Sections + Sidebar) ------------------ */
        <div className="flex flex-col lg:flex-row gap-7 pt-2 items-start">
          {/* Left Column: Full Figma Property Sections Flow */}
          <div className="flex-1 min-w-0">
            {properties.length > 0 && (
              <div className="flex flex-col gap-6">
                {/* 1 & 2. Top 2 Properties (Matching Figma 1:1) */}
                <div className="flex flex-col gap-5">
                  {visible.slice(0, 2).map((property, idx) => (
                    <PropertyCard
                      key={`${property.title}-${idx}`}
                      {...property}
                      index={idx}
                      layout="horizontal"
                    />
                  ))}
                </div>

                {/* 3. Top Agents Section (Matching Figma 1:1) */}
                <ListingsTopAgents />

                {/* 4. Property 3 (Matching Figma 1:1) */}
                {visible.length > 2 && (
                  <div className="flex flex-col gap-5">
                    <PropertyCard
                      key={`${visible[2].title}-2`}
                      {...visible[2]}
                      index={2}
                      layout="horizontal"
                    />
                  </div>
                )}

                {/* 5. Ready To Move Section (Matching Figma 1:1) */}
                <ListingsReadyToMove />

                {/* 6. Exactly 2 Properties ABOVE Handpicked (Properties 4 & 5) */}
                {visible.length > 3 && (
                  <div className="flex flex-col gap-5">
                    {visible.slice(3, 5).map((property, idx) => (
                      <PropertyCard
                        key={`${property.title}-${idx + 3}`}
                        {...property}
                        index={idx + 3}
                        layout="horizontal"
                      />
                    ))}
                  </div>
                )}

                {/* 7. Handpicked For You Section (Matching Figma 1:1) */}
                <ListingsHandpicked />

                {/* 8. Exactly 3 Properties BELOW Handpicked (Properties 6, 7 & 8) */}
                {visible.length > 5 && (
                  <div className="flex flex-col gap-5">
                    {visible.slice(5, 8).map((property, idx) => (
                      <PropertyCard
                        key={`${property.title}-${idx + 5}`}
                        {...property}
                        index={idx + 5}
                        layout="horizontal"
                      />
                    ))}
                  </div>
                )}

                {/* 9. Price Dropped Section (Matching Figma 1:1) */}
                <ListingsPriceDropped />

                {/* 10. Exactly 2 Properties BELOW Price Dropped (Properties 9 & 10) */}
                {visible.length > 8 && (
                  <div className="flex flex-col gap-5">
                    {visible.slice(8, 10).map((property, idx) => (
                      <PropertyCard
                        key={`${property.title}-${idx + 8}`}
                        {...property}
                        index={idx + 8}
                        layout="horizontal"
                      />
                    ))}
                  </div>
                )}

                {/* 11. Property Experts Section (Matching Figma 1:1) */}
                <ListingsPropertyExperts />

                {/* 12. Exactly 3 Properties BELOW Property Experts (Properties 11, 12 & 13) */}
                {visible.length > 10 && (
                  <div className="flex flex-col gap-5">
                    {visible.slice(10, 13).map((property, idx) => (
                      <PropertyCard
                        key={`${property.title}-${idx + 10}`}
                        {...property}
                        index={idx + 10}
                        layout="horizontal"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar Widgets or Map */}
          <div className="w-full lg:w-[320px] xl:w-[335px] shrink-0 lg:sticky lg:top-24 self-start">
            {showMap ? (
              <div className="rounded-[24px] overflow-hidden border border-slate-200/90 shadow-sm bg-white p-2">
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-gray-800">
                    Map View
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowMap(false)}
                    className="text-xs text-[#1865F2] font-semibold hover:underline"
                  >
                    Hide Map
                  </button>
                </div>
                <ViewMap height="580px" properties={properties} />
              </div>
            ) : (
              <ListingsSidebarWidgets />
            )}
          </div>
        </div>
      )}

      {/* Full-Width Bottom Section: Pagination & Why Choose Roofin Banner */}
      <div className="w-full mt-8">
        {/* Pagination Matching Figma 1:1 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={properties.length}
          perPage={PER_PAGE}
          onChange={handlePageChange}
          text="Properties"
        />

        {/* Why choose Roofin Banner (Only in List View or full layout) */}
        {view === "list" && <WhyChooseRoofinBanner />}
      </div>
    </section>
  );
};
