"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { SearchHeader } from "@/components/layout/SearchHeader";

interface TopBarProps {
  propertyTitle?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "overview", label: "Overview", icon: true },
  { id: "property-details", label: "Property Details" },
  { id: "dealer-details", label: "Dealer Details" },
  { id: "price-trends", label: "Price Trends" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQS" },
  { id: "recommendations", label: "Recomendations", customIcon: true },
];

// Custom Recommendation Icon Matching Attachment 3 Exactly
const RecommendationIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block shrink-0 -mt-1 ml-0.5"
  >
    <defs>
      <linearGradient id="recGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D2A0" />
        <stop offset="100%" stopColor="#1865F2" />
      </linearGradient>
    </defs>
    {/* Question / Bulb Loop with inner clock/tick */}
    <path
      d="M7 9C7 5.5 9.5 3 13 3C16.5 3 19 5.5 19 9C19 11.8 17 14 14.5 14.8V15.5"
      stroke="url(#recGrad)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M10.5 9.5H13.5V6.5"
      stroke="url(#recGrad)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bottom Spark Rays */}
    <path
      d="M11 18H16"
      stroke="url(#recGrad)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M10 21L15 20"
      stroke="url(#recGrad)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

// Custom Report Property Document with Magnifying Glass Icon Matching Attachment 4 Exactly
const ReportDocumentIcon = ({ className = "h-4 w-4 text-slate-500" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Page tab & body */}
    <path d="M4 3h4v3H4z" strokeWidth="1.8" />
    <path d="M8 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6" strokeWidth="1.8" />
    {/* Document Text Lines */}
    <path d="M8 7h7" strokeWidth="1.5" />
    <path d="M8 10h4" strokeWidth="1.5" />
    <path d="M8 13h3" strokeWidth="1.5" />
    {/* Magnifying Glass Over Document */}
    <circle cx="15.5" cy="13.5" r="3.5" strokeWidth="1.8" stroke="currentColor" fill="white" />
    <path d="M18 16L21.5 19.5" strokeWidth="2.2" stroke="currentColor" />
  </svg>
);

// Compare Icon (Two crossed arrows)
const CompareShuffleIcon = ({ className = "h-4 w-4 text-[#334155]" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);

export const PropertyDetailTopBar = ({
  propertyTitle = "The terraces at Estate 361",
  activeTab,
  onTabChange,
}: TopBarProps) => {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="w-full bg-white flex flex-col">
      {/* 1. Top Notice Bar */}
      {showNotice && (
        <div className="w-full bg-[#1865F2] text-white py-2 px-4 sm:px-8 text-[12px] font-medium flex items-center justify-between tracking-wide z-50 relative">
          <div className="flex-1 text-center truncate">
            <span>Find Your Dream Home</span>
            <span className="mx-2 opacity-70">•</span>
            <span>Trusted Real Estate Experts</span>
            <span className="mx-2 opacity-70">•</span>
            <span>Verified Listings</span>
            <span className="mx-2 opacity-70 hidden md:inline">•</span>
            <span className="hidden md:inline">Exclusive Offers</span>
            <span className="mx-2 opacity-70 hidden md:inline">•</span>
            <span className="hidden md:inline">Book Your Site Visit Today</span>
          </div>
          <button
            onClick={() => setShowNotice(false)}
            aria-label="Close Announcement"
            className="text-white/80 hover:text-white p-0.5 rounded transition-colors ml-2 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 2. Main Search Header */}
      <div className="w-full">
        <SearchHeader />
        {/* Spacer for fixed SearchHeader */}
        <div className="h-20 sm:h-24 w-full" />
      </div>

      {/* LINE 1: Full-width Divider Line Under Nav Bar */}
      <div className="w-full h-[1px] bg-slate-200" />

      {/* 3. Sub-Navigation Tabs & URN Matching Figma 1:1 */}
      <div className="w-full bg-white py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-4 sm:gap-7 overflow-x-auto scrollbar-none py-0.5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`text-[13.5px] transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "px-3.5 py-1 rounded-full border-[1.5px] border-[#00B4D8] text-[#0B132B] font-semibold bg-white shadow-2xs"
                      : "text-[#475569] font-medium hover:text-[#0B132B]"
                  }`}
                >
                  {tab.icon && (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1865F2] text-white">
                      <Zap size={9} className="fill-white text-white" />
                    </div>
                  )}
                  <span>{tab.label}</span>
                  {tab.customIcon && <RecommendationIcon />}
                </button>
              );
            })}
          </div>

          {/* URN Identifier on Right */}
          <div className="text-[13px] font-bold text-[#1865F2] tracking-wide shrink-0">
            URN : P35
          </div>
        </div>
      </div>

      {/* LINE 2: Full-width Divider Line Under Overview / Tab Bar */}
      <div className="w-full h-[1px] bg-slate-200" />

      {/* 4. Breadcrumb & Action Toolbar Matching Figma 1:1 */}
      <div className="w-full bg-white py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb + Compare & Report Inline */}
          <div className="flex items-center gap-3 flex-wrap text-[13px] text-[#475569]">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-[#1865F2] transition-colors font-medium">
                Home
              </Link>
              <span className="text-slate-400 font-bold">&gt;</span>
              <Link href="/properties" className="hover:text-[#1865F2] transition-colors font-medium">
                Property in Noida
              </Link>
              <span className="text-slate-400 font-bold">&gt;</span>
              <span className="font-semibold text-[#0B132B] truncate max-w-[200px] sm:max-w-none">
                {propertyTitle}
              </span>
            </nav>

            <div className="h-4 w-[1px] bg-slate-300 mx-1.5 hidden sm:block" />

            {/* Compare & Report buttons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-[#334155] hover:text-[#1865F2] font-semibold transition-colors cursor-pointer">
                <CompareShuffleIcon className="h-4 w-4 text-[#334155]" />
                <span>Compare</span>
              </button>

              <button className="flex items-center gap-1.5 text-[#334155] hover:text-[#1865F2] font-semibold transition-colors cursor-pointer">
                <ReportDocumentIcon className="h-4 w-4 text-slate-500" />
                <span>Report Property</span>
              </button>
            </div>
          </div>

          {/* Right Action: Combined Dual Prev/Next Capsule Button matching Figma 1:1 */}
          <div className="flex items-center rounded-full bg-gradient-to-r from-[#1865F2] via-[#0092CC] to-[#00A86B] text-white shadow-xs overflow-hidden px-4 py-1.5 text-[13px] font-bold">
            <button className="flex items-center gap-1 hover:opacity-90 transition-opacity cursor-pointer">
              <ChevronLeft size={16} className="stroke-[3]" />
              <span>Previous</span>
            </button>
            <span className="mx-2 opacity-30 text-white font-normal">|</span>
            <button className="flex items-center gap-1 hover:opacity-90 transition-opacity cursor-pointer">
              <span>Next</span>
              <ChevronRight size={16} className="stroke-[3]" />
            </button>
          </div>
        </div>
      </div>

      {/* LINE 3: Full-width Divider Line Under Home / Breadcrumb Bar */}
      <div className="w-full h-[1px] bg-slate-200" />
    </div>
  );
};
