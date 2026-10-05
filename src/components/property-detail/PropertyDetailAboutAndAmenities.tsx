"use client";

import { useState } from "react";
import Image from "next/image";

const SECTION_TABS = [
  { id: "about", label: "About Property" },
  { id: "amenities", label: "Amenities" },
  { id: "society", label: "Society" },
  { id: "floor-plan", label: "Floor Plan" },
  { id: "key-highlights", label: "Key Highlights" },
  { id: "why-roofin", label: "Why Roofin" },
];

const SEMIFURNISHED_ITEMS = [
  { label: "Rent", value: "₹ 30k/M", icon: "/semifurnished_icon/rent.png" },
  { label: "AC", value: "2", icon: "/semifurnished_icon/ac.png" },
  { label: "Bed", value: "4", icon: "/semifurnished_icon/bed.png" },
  { label: "Lift", value: "1", icon: "/semifurnished_icon/lift.png" },
  { label: "TV", value: "1", icon: "/semifurnished_icon/tv.png" },
  { label: "Sofa", value: "1", icon: "/semifurnished_icon/sofa.png" },
  { label: "Refrigerator", value: "2", icon: "/semifurnished_icon/refrigerator.png" },
  { label: "Power Backup", value: "Full", icon: "/semifurnished_icon/power_backup.png" },
  { label: "Bathroom", value: "2", icon: "/semifurnished_icon/bathroom.png" },
  { label: "Cabinet", value: "2", icon: "/semifurnished_icon/cabinet.png" },
  { label: "Stove", value: "Full", icon: "/semifurnished_icon/stove.png" },
  { label: "Washing Machine", value: "0", icon: "/semifurnished_icon/washing_machine.png" },
  { label: "Dining Table", value: "1", icon: "/semifurnished_icon/dining_table.png" },
  { label: "Microwave", value: "1", icon: "/semifurnished_icon/microwave.png" },
];

const AMENITIES_ITEMS = [
  { label: "GYM", icon: "/amenities/gym.png" },
  { label: "Swimming pool", icon: "/amenities/swimming_pool.png" },
  { label: "Gas pipeline", icon: "/amenities/gas_pipeline.png" },
  { label: "Parking", icon: "/amenities/parking.png" },
  { label: "Children Park", icon: "/amenities/children_park.png" },
  { label: "Club House", icon: "/amenities/club_house.png" },
  { label: "7x24 Security", icon: "/amenities/security.png" },
  { label: "Cctv surveillia..", icon: "/amenities/cctv_surveilliance.png" },
  { label: "Cctv surveillia..", icon: "/amenities/water_supply.png" },
];

const SOCIETY_STATS = [
  { value: "3", label: "Towers" },
  { value: "420", label: "Total Units" },
  { value: "4.5", sub: "Acers", label: "Total Units" },
  { value: "70%", label: "Open Space" },
  { value: "8+", label: "Years Of Trust" },
];

const SOCIETY_FEATURES = [
  {
    title: "Well Maintained",
    sub: "Professional Management",
    icon: "/society/well_maintained.png",
  },
  {
    title: "Active Community",
    sub: "Regular Events & Activities",
    icon: "/society/active_community.png",
  },
  {
    title: "Clean & Green",
    sub: "Hygienic & Eco-Friendly",
    icon: "/society/clean_green.png",
  },
  {
    title: "Pet Friendly",
    sub: "Pets Are Welcome",
    icon: "/society/pet_friendly.png",
  },
];

export const PropertyDetailAboutAndAmenities = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full my-6 flex flex-col gap-6">
      {/* ----------------- SUB-NAVIGATION TABS (FIGMA 1:1) ----------------- */}
      <div className="w-full border-b border-slate-200/90 pb-3">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none py-1">
          {SECTION_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#1865F2] text-white shadow-2xs"
                    : "text-[#475569] hover:text-[#0B132B] hover:bg-slate-100/80"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ----------------- 1. ABOUT PROPERTY SECTION ----------------- */}
      <div id="about" className="space-y-2.5 scroll-mt-28">
        <p className="text-[13.5px] font-semibold text-[#0B132B]">
          Address : <span className="font-semibold text-[#0284C7]">Sector 103 , Noida Ext</span>
        </p>

        <p className="text-[13px] text-[#475569] leading-relaxed">
          This property faces the east direction. The floor plan additionally contains 3 bedroom(s), 2 bathrooms and 3 balconies. All in all, the flat is spread over a super built up area of 1270 sq.Ft. The property is located on the 3rd floor of a 18 floors tall building. Being a ready to move project, you c...
          {isExpanded && (
            <span className="block mt-2">
              The project is situated in a prominent location with direct connectivity to Noida-Greater Noida Expressway, metro stations, multi-speciality hospitals, top-tier schools, and bustling shopping centers. Enjoy high rental demand and solid capital appreciation.
            </span>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#1865F2] font-semibold ml-1.5 hover:underline cursor-pointer inline-flex items-center"
          >
            {isExpanded ? "Less <<<" : "More >>>"}
          </button>
        </p>
      </div>

      {/* Dotted horizontal divider matching Figma */}
      <div className="w-full border-t border-dashed border-slate-300" />

      {/* ----------------- 2. SEMIFURNISHED / FURNISHING DETAILS ----------------- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="pl-2.5 border-l-4 border-[#00B4D8] flex flex-col justify-center">
            <h3 className="text-[16px] font-bold text-[#1865F2] tracking-tight uppercase leading-tight">
              SEMIFURNISHED
            </h3>
            <p className="text-[12px] text-[#64748B] font-normal leading-tight mt-0.5">
              Furnishing Details
            </p>
          </div>

          <button className="px-5 py-2 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white text-[12.5px] font-semibold transition-all shadow-2xs cursor-pointer">
            View All Amenities
          </button>
        </div>

        {/* 14-Item Furnishing Grid (5 columns on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {SEMIFURNISHED_ITEMS.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl border border-slate-200 bg-white hover:border-[#1865F2]/40 hover:shadow-2xs transition-all"
            >
              {/* Left 40% Soft rounded icon squircle matching zoom screenshot */}
              <div className="w-[40%] flex items-center justify-center shrink-0">
                <div className="relative h-13 w-13 sm:h-14 sm:w-14 rounded-2xl bg-[#F0F6FE] flex items-center justify-center p-2.5">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Vertical subtle divider line matching screenshot */}
              <div className="h-9 w-[1px] bg-slate-200 shrink-0" />

              {/* Right 60% Content Area */}
              <div className="w-[60%] min-w-0 flex flex-col justify-center pl-1">
                <p className="text-[12.5px] sm:text-[13px] text-[#475569] font-normal leading-tight truncate">
                  {item.label}
                </p>
                <p className="text-[16px] sm:text-[18px] font-semibold text-[#0B132B] mt-1 leading-tight truncate">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Divider Line above Amenities */}
      <div className="w-full border-t border-slate-200/80 my-2" />

      {/* ----------------- 3. AMENITIES SECTION ----------------- */}
      <div id="amenities" className="space-y-4 scroll-mt-28">
        <div className="flex items-center justify-between">
          <div className="pl-2.5 border-l-4 border-[#00B4D8]">
            <h3 className="text-[16px] font-bold text-[#1865F2] tracking-tight uppercase">
              AMENITIES
            </h3>
          </div>
          <p className="text-[12.5px] text-[#64748B] font-medium">
            Inside Paramount Floraville Society
          </p>
        </div>

        {/* 9 Amenities Grid Matching Zoom Screenshot Exactly */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-3">
          {AMENITIES_ITEMS.map((amenity, idx) => (
            <div
              key={`${amenity.label}-${idx}`}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* White Container Box with Inner Blue Circle */}
              <div className="w-full h-22 sm:h-24 rounded-2xl border border-slate-200 bg-white flex items-center justify-center p-2 shadow-2xs group-hover:border-[#1865F2]/40 transition-all">
                <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-[#F0F6FE] flex items-center justify-center p-2.5">
                  <Image
                    src={amenity.icon}
                    alt={amenity.label}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* White Pill Badge Label matching screenshot */}
              <div className="mt-2 px-3 py-0.5 rounded-full border border-slate-200 bg-white shadow-2xs max-w-full text-center">
                <span className="text-[11px] font-medium text-[#475569] leading-tight truncate block">
                  {amenity.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Divider Line below Amenities */}
      <div className="w-full border-t border-slate-200/80 my-2" />

      {/* ----------------- 4. SOCIETY SECTION ----------------- */}
      <div id="society" className="space-y-4 scroll-mt-28">
        <div className="pl-2.5 border-l-4 border-[#00B4D8]">
          <h3 className="text-[16px] font-bold text-[#1865F2] tracking-tight uppercase">
            SOCIETY
          </h3>
        </div>

        {/* 5 Society Stat Boxes matching Screenshot Exactly */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {SOCIETY_STATS.map((stat, idx) => (
            <div
              key={`${stat.label}-${idx}`}
              className="flex flex-col items-center justify-center py-4 px-3 sm:py-5 rounded-xl border border-[#D5E5FD] bg-[#F0F6FE] text-center shadow-2xs"
            >
              <div className="flex items-baseline justify-center">
                <span className="text-[28px] sm:text-[32px] font-bold text-[#1865F2] leading-none">
                  {stat.value}
                </span>
                {stat.sub && (
                  <span className="text-[11px] text-[#1865F2] font-semibold ml-1 leading-none">
                    {stat.sub}
                  </span>
                )}
              </div>
              <span className="text-[12.5px] sm:text-[13px] text-[#475569] font-normal mt-2 leading-none">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* 4 Society Features in 1 continuous container with vertical dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border border-[#D5E5FD] rounded-2xl p-3 sm:p-4 bg-white shadow-2xs">
          {SOCIETY_FEATURES.map((feature, idx) => (
            <div
              key={`${feature.title}-${idx}`}
              className="flex items-center gap-3.5 p-2 sm:px-4"
            >
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-[13.5px] font-semibold text-[#0B132B] leading-tight">
                  {feature.title}
                </h4>
                <p className="text-[11.5px] text-[#64748B] leading-tight mt-0.5 font-normal">
                  {feature.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Divider Line below Society / above Floor Plan */}
      <div className="w-full border-t border-slate-200/80 my-2" />
    </div>
  );
};
