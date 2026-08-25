"use client";

import { forwardRef, useState } from "react";
import {
  LandPlot,
  Search,
} from "lucide-react";
import Select from "react-select";
import { cn } from "@/lib/utils";
import type { OptionType } from "@/types";
import { LocationList } from "@/data/headerData";
import { SEARCH_BOX } from "@/data/headerData";
import { searchBoxSelectStyles } from "@/lib/selectStyles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCity } from "@/store/slice/locationSlice";

const {
  tabs,
  popularSearches,
  budgetOptions,
  propertyTypeOptions,
} = SEARCH_BOX;

export const SearchBox = forwardRef<HTMLDivElement>((_props, ref) => {
  const [activeTab, setActiveTab] = useState("buy");
  const dispatch = useAppDispatch();
      const selectedCity = useAppSelector((state) => state.location.selectedCity);
  

  return (
    <section ref={ref} className="relative z-10 mx-auto -mt-28 w-full max-w-5xl px-6 sm:px-10">
      <div className="rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "flex items-center gap-1 cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                activeTab === tab.value
                  ? "bg-primary text-white shadow-md"
                  : " text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <tab.Icon className="h-3 w-3" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="h-[0.5px] mt-4 w-full bg-gray-400"></div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
              City
            </label>
            <Select<OptionType, false>
              options={LocationList}
              styles={searchBoxSelectStyles}
              value={selectedCity ?? LocationList[0]}
                          onChange={(option) => {
                              if (option) dispatch(setCity(option));
                          }}
              placeholder="Select city"
              isSearchable
              className="min-w-0"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
              Locality
            </label>
            <input
            value=''
            onChange={() => {}}
            placeholder='Select locality'
            className="h-9.5 w-full min-w-0 max-w-[200px] rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 outline-none transition-colors placeholder:text-gray-500 hover:border-primary focus:border-[1.5px] focus:border-primary focus:ring-[3px] focus:ring-blue-600/15"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
              Budget
            </label>
            <Select<OptionType, false>
              options={budgetOptions}
              styles={searchBoxSelectStyles}

              placeholder="Select budget"
              isSearchable
              className="min-w-0"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
            <div>
              <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
                Property Type
              </label>
              <Select<OptionType, false>
                options={propertyTypeOptions}
                styles={searchBoxSelectStyles}

                placeholder="Select type"
                isSearchable
                className="min-w-0"
              />
            </div>

          </div>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 self-end rounded-xl bg-gradient-to-r from-primary to-secondary px-6 font-semibold text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-[1.02] lg:w-auto"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
            <LandPlot className="h-3.5 w-3.5 text-primary" />
            Popular:
          </span>
          {popularSearches.map((search) => (
            <button
              key={search}
              type="button"
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});
