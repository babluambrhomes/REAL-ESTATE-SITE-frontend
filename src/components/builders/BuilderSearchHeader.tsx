"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Mic, Heart, Bell, User, ChevronDown, MapPin } from "lucide-react";
import { HeaderSidebar } from "@/components/layout/HeaderSidebar";

interface BuilderSearchHeaderProps {
  activeLocation?: string;
  onLocationChange?: (loc: string) => void;
  onSearch?: (query: string) => void;
  mode?: "agents" | "builders";
}

export const BuilderSearchHeader = ({
  activeLocation = "Delhi NCR",
  onLocationChange,
  onSearch,
  mode = "builders",
}: BuilderSearchHeaderProps) => {
  const [location, setLocation] = useState(activeLocation);
  const [builderName, setBuilderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const locations = [
    "Delhi NCR",
    "Noida",
    "Gurgaon",
    "Greater Noida",
    "Ghaziabad",
    "Faridabad",
    "Mumbai",
    "Bangalore",
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] font-jakarta">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] sm:h-[72px] flex items-center justify-between gap-3 sm:gap-6">
          
          {/* 1. Official Roofin' Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/layout/logo.png"
                alt="Roofin"
                width={100}
                height={30}
                className="h-6 sm:h-7 w-auto object-contain"
                priority
              />
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          </div>

          {/* 2. Central Search Pill with Location Dropdown + Inputs + Blue Button */}
          <div className="hidden md:flex items-center flex-1 max-w-[680px] bg-[#FBFDFF] border border-slate-200/90 rounded-full p-1 shadow-2xs hover:border-slate-300 transition-all">
            
            {/* Location Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#1865F2] hover:text-[#1250C4] transition-colors border-r border-slate-200 shrink-0 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#1865F2]/10 flex items-center justify-center text-[#1865F2] shrink-0">
                  <MapPin className="w-3 h-3 fill-[#1865F2]" />
                </div>
                <span className="text-slate-800 font-bold">{location}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showLocationDropdown && (
                <div className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 min-w-[150px] z-50 text-xs font-semibold text-slate-700">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setLocation(loc);
                        onLocationChange?.(loc);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 transition-colors cursor-pointer ${
                        location === loc ? "text-[#1865F2] font-bold bg-blue-50/60" : ""
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Name Input (Agents Name or Builder Name) */}
            <input
              type="text"
              value={builderName}
              onChange={(e) => setBuilderName(e.target.value)}
              placeholder={mode === "agents" ? "Agents Name" : "Builder Name"}
              className="w-1/3 bg-transparent px-3 text-xs text-slate-800 placeholder:text-slate-400 font-medium focus:outline-hidden"
            />

            <div className="w-px h-5 bg-slate-200" />

            {/* Company Name Input */}
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="w-1/3 bg-transparent px-3 text-xs text-slate-800 placeholder:text-slate-400 font-medium focus:outline-hidden"
            />

            {/* Search Button + Voice Mic */}
            <div className="flex items-center gap-1.5 ml-auto pl-1">
              <button
                type="button"
                onClick={() => onSearch?.(`${builderName} ${companyName}`.trim())}
                className="px-4 py-1.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs font-bold rounded-full flex items-center gap-2 transition-all shadow-[0_2px_8px_rgba(24,101,242,0.3)] cursor-pointer shrink-0"
              >
                <span>Search ...</span>
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                aria-label="Voice Search"
                className="w-7 h-7 rounded-full bg-[#1865F2] hover:bg-[#1250C4] text-white flex items-center justify-center transition-colors shadow-[0_2px_8px_rgba(24,101,242,0.3)] shrink-0 cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* 3. Right Action Icons & Post Property Free Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Hamburger Menu button -> opens sidebar */}
            <button
              type="button"
              aria-label="Open Navigation Menu"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1865F2] hover:bg-blue-50/70 transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>

            {/* Wishlist Heart */}
            <Link
              href="/login"
              aria-label="Wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1865F2] hover:bg-blue-50/70 transition-colors shrink-0"
            >
              <Heart className="h-[22px] w-[22px] stroke-[2.2]" />
            </Link>

            {/* Notifications Bell */}
            <Link
              href="/login"
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#1865F2] hover:bg-blue-50/70 transition-colors shrink-0"
            >
              <Bell className="h-[22px] w-[22px] stroke-[2.2]" />
              <span className="absolute top-0.5 right-1 h-2.5 w-2.5 rounded-full bg-[#f95738]" />
            </Link>

            {/* User Profile */}
            <button
              type="button"
              aria-label="User Profile"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf5ff] text-[#1865F2] hover:bg-[#e2eeff] transition-colors cursor-pointer shrink-0"
            >
              <User className="h-4.5 w-4.5 stroke-[2.0]" />
            </button>

            {/* Post Property Free Button matching site layout */}
            <Link
              href="/post-property"
              className="group relative flex h-[40px] sm:h-[42px] items-center gap-2 rounded-full bg-gradient-to-r from-[#1865F2] via-[#1456DB] to-[#0A38A8] pl-3.5 pr-1.5 py-1 text-white shadow-[0_4px_14px_rgba(24,101,242,0.35)] transition-all duration-200 hover:scale-[1.02] shrink-0"
            >
              {/* Sparkle icon */}
              <svg 
                className="h-[18px] w-[18px] shrink-0" 
                viewBox="0 0 30 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 9 C12 15 7 19 1 19 C7 19 12 23 12 29 C12 23 17 19 23 19 C17 19 12 15 12 9 Z" 
                  fill="#00D084" 
                />
                <path 
                  d="M6 1 C6 4 3 5.5 0.5 5.5 C3 5.5 6 7 6 10 C6 7 9 5.5 11.5 5.5 C9 5.5 6 4 6 1 Z" 
                  fill="#00D084" 
                />
                <path 
                  d="M21 2 C21 5.5 17.5 7 15 7 C17.5 7 21 8.5 21 12 C21 8.5 24.5 7 27 7 C24.5 7 21 5.5 21 2 Z" 
                  fill="none" 
                  stroke="#00D084" 
                  strokeWidth="1.6" 
                  strokeLinejoin="round" 
                />
              </svg>

              <span className="text-[13px] font-bold text-white tracking-normal whitespace-nowrap">
                Post Property
              </span>

              <span className="rounded-full bg-white px-2.5 py-1 text-[12px] font-extrabold text-[#1865F2] shadow-xs leading-none">
                Free
              </span>
            </Link>
          </div>

        </div>
      </header>

      {/* Unified Global Navigation Sidebar Drawer */}
      <HeaderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};
