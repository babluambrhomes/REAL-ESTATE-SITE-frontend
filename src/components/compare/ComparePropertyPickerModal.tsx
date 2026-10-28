"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  X,
  Search,
  MapPin,
  ChevronDown,
  ChevronRight,
  Check,
  Plus,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";
import { Property } from "@/types";

interface ComparePropertyPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties?: Property[];
  onSelectProperty?: (property: Property) => void;
  selectedIds?: string[];
  selectedProperties?: Property[];
  onRemoveProperty?: (index: number) => void;
  onReset?: () => void;
}

interface ProjectUnit {
  id: string;
  bhk: string;
  area: string;
  price: string;
  selected: boolean;
}

interface ProjectSelection {
  id: string;
  title: string;
  location: string;
  status: string;
  image: string;
  units: ProjectUnit[];
}

const CATEGORIES = [
  { name: "Villa", icon: "/categories/villa.png" },
  { name: "Office Space", icon: "/categories/office_space.png" },
  { name: "Floor", icon: "/categories/floor.png" },
  { name: "Farm House", icon: "/categories/farm_house.png" },
  { name: "Rented Apt...", icon: "/categories/rented_apt.png" },
  { name: "Land", icon: "/categories/land.png" },
  { name: "PG/Co-Live", icon: "/categories/pg_coliving.png" },
];

const POPULAR_PROJECTS = [
  {
    id: "ats-1",
    title: "ATS Knightsbridge",
    location: "Noida",
    fullLocation: "Sector 124, Noida",
    status: "Ready To Move",
    image: "/images/properties/tower-popular-figma.jpg",
    units: [
      { id: "u-1", bhk: "2 BHK", area: "1,621 sq.ft", price: "₹1.25 Cr", selected: true },
      { id: "u-2", bhk: "3 BHK", area: "1,621 sq.ft", price: "₹1.25 Cr", selected: false },
      { id: "u-3", bhk: "3 BHK", area: "1,621 sq.ft", price: "₹1.25 Cr", selected: false },
    ],
  },
  {
    id: "ats-2",
    title: "ATS Knightsbridge",
    location: "Noida",
    fullLocation: "Sector 124, Noida",
    status: "Ready To Move",
    image: "/images/properties/max-estate-tower-figma.jpg",
    units: [
      { id: "u-4", bhk: "3 BHK", area: "2,150 sq.ft", price: "₹1.58 Cr", selected: true },
      { id: "u-5", bhk: "4 BHK", area: "2,850 sq.ft", price: "₹2.10 Cr", selected: false },
    ],
  },
  {
    id: "ats-3",
    title: "ATS Knightsbridge",
    location: "Noida",
    fullLocation: "Sector 124, Noida",
    status: "Ready To Move",
    image: "/images/properties/villa-popular-figma.jpg",
    units: [
      { id: "u-6", bhk: "2 BHK", area: "1,450 sq.ft", price: "₹1.15 Cr", selected: true },
      { id: "u-7", bhk: "3 BHK", area: "1,920 sq.ft", price: "₹1.45 Cr", selected: false },
    ],
  },
];

export const ComparePropertyPickerModal = ({
  isOpen,
  onClose,
  properties = [],
  onSelectProperty,
  selectedProperties: externalSelected = [],
  onRemoveProperty: externalRemove,
  onReset: externalReset,
}: ComparePropertyPickerModalProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState("Delhi NCR");

  // Local state for interactive project selections matching Figma exactly
  const [activeProjects, setActiveProjects] = useState<ProjectSelection[]>([
    {
      id: "proj-1",
      title: "ATS Knightsbridge",
      location: "Sector 124, Noida",
      status: "Ready To Move",
      image: "/images/properties/tower-popular-figma.jpg",
      units: [
        { id: "u1", bhk: "2 BHK", area: "1,621 sq.ft", price: "₹1.25 Cr", selected: true },
        { id: "u2", bhk: "3 BHK", area: "1,621 sq.ft", price: "₹1.25 Cr", selected: false },
        { id: "u3", bhk: "3 BHK", area: "1,621 sq.ft", price: "₹1.25 Cr", selected: false },
      ],
    },
    {
      id: "proj-2",
      title: "ATS Knightsbridge",
      location: "Sector 124, Noida",
      status: "Ready To Move",
      image: "/images/properties/max-estate-tower-figma.jpg",
      units: [
        { id: "u4", bhk: "2 BHK", area: "1,621 sq.ft", price: "₹1.25 Cr", selected: true },
        { id: "u5", bhk: "3 BHK", area: "1,621 sq.ft", price: "₹1.25 Cr", selected: false },
        { id: "u6", bhk: "3 BHK", area: "1,621 sq.ft", price: "₹1.25 Cr", selected: false },
      ],
    },
  ]);

  if (!isOpen) return null;

  // Toggle unit checkbox selection
  const handleToggleUnit = (projectId: string, unitId: string) => {
    setActiveProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          units: proj.units.map((u) => ({
            ...u,
            selected: u.id === unitId ? !u.selected : u.selected,
          })),
        };
      })
    );
  };

  // Add popular project to active list
  const handleSelectPopularProject = (popProj: (typeof POPULAR_PROJECTS)[0]) => {
    setActiveProjects((prev) => {
      if (prev.length >= 3) {
        return prev;
      }
      return [
        ...prev,
        {
          id: `proj-${Date.now()}`,
          title: popProj.title,
          location: popProj.fullLocation,
          status: popProj.status,
          image: popProj.image,
          units: popProj.units,
        },
      ];
    });
  };

  // Remove project from selections
  const handleRemoveProject = (index: number) => {
    setActiveProjects((prev) => prev.filter((_, idx) => idx !== index));
    if (externalRemove) {
      externalRemove(index);
    }
  };

  // Reset selections
  const handleReset = () => {
    setActiveProjects([]);
    if (externalReset) {
      externalReset();
    }
  };

  // Proceed to compare
  const handleCompareNow = () => {
    onClose();
    router.push("/compare/side-by-side");
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto animate-fade-in font-jakarta"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[690px] max-h-[92vh] bg-white rounded-[26px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Modal Top Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between shrink-0">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0B132B] tracking-tight">
            Your Selections
          </h2>

          <div className="flex items-center gap-3">
            {/* City Selector Pill matching Figma */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#1865F2] text-xs font-medium text-slate-700 transition-colors shadow-2xs cursor-pointer">
              <span className="text-[12px]">{selectedCity}</span>
              <MapPin className="w-3.5 h-3.5 text-black fill-current shrink-0" />
            </div>

            {/* Circular Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* 2. Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">
          {/* Search Box Input matching Figma 1:1 */}
          <div className="relative flex items-center border border-slate-200 rounded-xl px-4 py-3 bg-white shadow-2xs focus-within:border-[#1865F2] transition-colors">
            <input
              type="text"
              placeholder="Select House"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-[#1865F2] flex items-center justify-center shrink-0 transition-colors border border-slate-200/60"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Pills / Categories Row matching Figma */}
          {activeProjects.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {/* Filter button */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#1865F2] text-xs font-medium text-slate-700 shadow-2xs transition-colors shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
                <span>Filter</span>
              </button>

              {/* Price Range */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#1865F2] text-xs font-medium text-slate-700 shadow-2xs transition-colors shrink-0"
              >
                <span>Price Range</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* BHK */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#1865F2] text-xs font-medium text-slate-700 shadow-2xs transition-colors shrink-0"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-slate-800 text-[9px] text-white flex items-center justify-center font-bold">
                  🏠
                </span>
                <span>BHK</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          )}

          {/* Category Chips Bar (from Right Modal in Figma) */}
          <div className="flex items-center gap-3 overflow-x-auto py-1 no-scrollbar">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  setActiveCategory(activeCategory === cat.name ? null : cat.name)
                }
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border min-w-[70px] transition-all cursor-pointer ${
                  activeCategory === cat.name
                    ? "border-[#1865F2] bg-blue-50/50 shadow-2xs"
                    : "border-slate-100 hover:border-slate-300 bg-slate-50/50"
                }`}
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src={cat.icon}
                    alt={cat.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-medium text-slate-700 whitespace-nowrap truncate max-w-[65px]">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Popular Projects Section matching Figma Right Modal */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-[14px] font-bold text-[#0B132B]">
                Popular Projects
              </h3>
              <button
                type="button"
                className="text-xs font-semibold text-[#1865F2] hover:underline flex items-center gap-1"
              >
                <span>View All Project</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {POPULAR_PROJECTS.map((pop, idx) => (
                <div
                  key={pop.id || idx}
                  onClick={() => handleSelectPopularProject(pop)}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white hover:border-[#1865F2] hover:shadow-xs transition-all cursor-pointer"
                >
                  <div className="relative h-20 w-full overflow-hidden">
                    <Image
                      src={pop.image}
                      alt={pop.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white text-[10px]">
                      +
                    </span>
                  </div>

                  <div className="p-2">
                    <h4 className="text-[12px] font-bold text-[#0B132B] truncate">
                      {pop.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {pop.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Projects List with Expandable Unit Rows (1:1 Figma Design) */}
          <div className="space-y-3 pt-1">
            {activeProjects.map((project, pIdx) => (
              <div
                key={project.id || pIdx}
                className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs hover:border-slate-300 transition-all"
              >
                {/* Project Header Row */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-[14px] font-bold text-[#0B132B] truncate">
                        {project.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#1865F2] shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </p>
                      <div className="mt-1">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#E6F9F0] text-[#00A859] text-[10px] font-semibold">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Change Project Link */}
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(pIdx)}
                    className="text-xs font-semibold text-[#1865F2] hover:underline shrink-0"
                  >
                    Change Project
                  </button>
                </div>

                {/* BHK Configuration Unit Rows matching Figma 1:1 */}
                <div className="pt-2 space-y-1.5">
                  {project.units.map((unit) => (
                    <div
                      key={unit.id}
                      onClick={() => handleToggleUnit(project.id, unit.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                        unit.selected
                          ? "bg-[#F1F6FE] text-[#0B132B]"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      {/* Left: Checkbox & BHK label */}
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors shrink-0 ${
                            unit.selected
                              ? "bg-[#1865F2] text-white"
                              : "border border-slate-300 bg-white"
                          }`}
                        >
                          {unit.selected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-bold text-[13px]">{unit.bhk}</span>
                      </div>

                      {/* Middle: Carpet Area */}
                      <span className="text-slate-500 text-[12px]">{unit.area}</span>

                      {/* Right: Price & Chevron */}
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px] text-[#0B132B]">
                          {unit.price}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Bottom Tray: "Your Selections" + Action Buttons (Figma 1:1) */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white shrink-0 space-y-3">
          <h4 className="text-[13px] font-bold text-[#0B132B]">Your Selections</h4>

          {/* 3 Slots Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Slot 1 */}
            {activeProjects[0] ? (
              <div className="relative rounded-xl border border-slate-200 p-2 flex items-center gap-2 bg-slate-50/50">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                  <Image
                    src={activeProjects[0].image}
                    alt={activeProjects[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-[11px] font-bold text-[#0B132B] truncate">
                    {activeProjects[0].title}
                  </h5>
                  <p className="text-[10px] text-slate-500 flex items-center gap-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5 text-[#1865F2] shrink-0" />
                    <span>Noida</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(0)}
                  className="w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px]"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 p-2 flex flex-col items-center justify-center text-center h-[52px]">
                <span className="text-[10px] text-slate-400">Empty Slot</span>
              </div>
            )}

            {/* Slot 2 */}
            {activeProjects[1] ? (
              <div className="relative rounded-xl border border-slate-200 p-2 flex items-center gap-2 bg-slate-50/50">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                  <Image
                    src={activeProjects[1].image}
                    alt={activeProjects[1].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-[11px] font-bold text-[#0B132B] truncate">
                    {activeProjects[1].title}
                  </h5>
                  <p className="text-[10px] text-slate-500 flex items-center gap-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5 text-[#1865F2] shrink-0" />
                    <span>Noida</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(1)}
                  className="w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px]"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 p-2 flex flex-col items-center justify-center text-center h-[52px]">
                <span className="text-[10px] text-slate-400">Empty Slot</span>
              </div>
            )}

            {/* Slot 3: "+ Add 3rd Property To Compare" */}
            {activeProjects[2] ? (
              <div className="relative rounded-xl border border-slate-200 p-2 flex items-center gap-2 bg-slate-50/50">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                  <Image
                    src={activeProjects[2].image}
                    alt={activeProjects[2].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-[11px] font-bold text-[#0B132B] truncate">
                    {activeProjects[2].title}
                  </h5>
                  <p className="text-[10px] text-slate-500 flex items-center gap-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5 text-[#1865F2] shrink-0" />
                    <span>Noida</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(2)}
                  className="w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px]"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (POPULAR_PROJECTS[2]) {
                    handleSelectPopularProject(POPULAR_PROJECTS[2]);
                  }
                }}
                className="rounded-xl border border-slate-200 hover:border-[#1865F2] p-2 flex flex-col items-center justify-center text-center h-[52px] bg-white transition-all cursor-pointer group shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1865F2] mb-0.5" />
                <span className="text-[9.5px] font-bold text-slate-700 group-hover:text-[#1865F2] leading-tight">
                  Add 3rd Property To Compare
                </span>
              </button>
            )}
          </div>

          {/* Action Buttons: Reset & Compare Button */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleReset}
              className="w-1/2 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[13.5px] font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleCompareNow}
              className="w-1/2 py-2.5 rounded-xl border border-[#1865F2] bg-white hover:bg-blue-50 text-[13.5px] font-bold text-[#1865F2] transition-colors shadow-2xs cursor-pointer"
            >
              Compare {activeProjects.length} Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
