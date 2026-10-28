"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Mic, Heart, Bell, User, ChevronDown, MapPin } from "lucide-react";
import { HeaderSidebar } from "@/components/layout/HeaderSidebar";
import { useAppSelector } from "@/store/hooks";

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
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isMounted, setIsMounted] = useState(false);
  const [location, setLocation] = useState(activeLocation);
  const [builderName, setBuilderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] font-poppins">
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
                <div className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 min-w-[150px] z-50 text-xs font-medium text-slate-700">
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
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#edf5ff] transition-colors shrink-0"
            >
              <Image
                src="/layout/nav/nav_heart.png"
                alt="Wishlist"
                width={34}
                height={30}
                className="w-[20px] sm:w-[22px] h-auto object-contain hover:scale-105 transition-transform"
                unoptimized
              />
            </Link>

            {/* Notifications Bell */}
            <Link
              href="/login"
              aria-label="Notifications"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#edf5ff] transition-colors shrink-0"
            >
              <Image
                src="/layout/nav/nav_bell.png"
                alt="Notifications"
                width={28}
                height={37}
                className="w-[18px] sm:w-[20px] h-auto object-contain hover:scale-105 transition-transform"
                unoptimized
              />
            </Link>

            {/* User Profile */}
            <button
              type="button"
              aria-label="User Profile"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#edf5ff] transition-colors shrink-0"
            >
              {isMounted && isAuthenticated && user ? (
                user?.person?.avatarUrl ? (
                  <Image
                    src={user.person.avatarUrl}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-[#1865F2] uppercase">
                    {(user?.person?.firstName || user?.email || user?.phone || "U").charAt(0)}
                  </span>
                )
              ) : (
                <Image
                  src="/layout/nav/nav_user.png"
                  alt="User Profile"
                  width={18}
                  height={18}
                  className="w-[16px] h-auto object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              )}
              {isMounted && isAuthenticated && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              )}
            </button>

            {/* Post Property Free Button matching site layout */}
            {/* Previous Post Property Button:
            <Link
              href="/post-property"
              className="group relative flex h-[38px] sm:h-[40px] right-[-10px] items-center gap-2 rounded-full bg-gradient-to-r from-[#1865F2] via-[#104ECC] to-[#073299] border-[1.5px] border-[#00D084] pl-2.5 sm:pl-3 pr-1 sm:pr-1 text-white shadow-[0_2px_10px_rgba(0,208,132,0.2)] transition-all duration-200 hover:scale-[1.02] shrink-0"
            >
              <svg 
                className="h-[18px] w-[18px] shrink-0" 
                viewBox="0 0 26 26" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 1C4.5 2.8 3.2 4 1.5 4C3.2 4 4.5 5.2 4.5 7C4.5 5.2 5.8 4 7.5 4C5.8 4 4.5 2.8 4.5 1Z" fill="#00D084" />
                <path d="M20 1C20 3.3 18 5 15.5 5C18 5 20 6.7 20 9C20 6.7 22 5 24.5 5C22 5 20 3.3 20 1Z" stroke="#00D084" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
                <path d="M11.5 6C11.5 12 7 16 1.5 16C7 16 11.5 20 11.5 26C11.5 20 16 16 21.5 16C16 16 11.5 12 11.5 6Z" fill="#00D084" />
              </svg>
              <span className="text-[13px] sm:text-[13.5px] font-medium text-white tracking-normal whitespace-nowrap">
                Post Property
              </span>
              <span className="h-[24px] w-[40px] rounded-full bg-white px-2.5 sm:px-3 py-1 text-[12px] sm:text-[11px] font-medium text-[#1865F2] shadow-xs leading-none">
                Free
              </span>
            </Link>
            */}
            <Link
              href="/post-property"
              className="group relative inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden bg-[#2563EB] shadow-[0_2px_12px_rgba(34,188,144,0.3),0_2px_8px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_18px_rgba(34,188,144,0.45),0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-200 hover:scale-[1.02] shrink-0 translate-x-1 sm:translate-x-2"
            >
              {/* Animated Slow Circular Gradient Border (Pure Green & Blue Shades) */}
              <span
                className="circular-rotating-gradient-disc"
                style={{
                  background:
                    "conic-gradient(from 0deg, #22BC90 0%, #10B981 22%, #2563EB 50%, #1D4ED8 72%, #22BC90 100%)",
                }}
              />

              {/* Inner Pill Body */}
              <span className="relative z-10 flex h-[36px] sm:h-[38px] items-center gap-2 sm:gap-2.5 rounded-full bg-gradient-to-r from-[#1865F2] via-[#104ECC] to-[#08389D] pl-3 sm:pl-3.5 pr-1 text-white">
                {/* Green Sparkle Icon */}
                <svg
                  className="h-[17px] w-[17px] shrink-0"
                  viewBox="0 0 27 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.06311 8.18182C4.0109 5.55932 2.7023 4.19871 0 4.12609C2.67734 4.02963 4.03019 2.69626 4.09715 0C4.15163 2.72916 5.53853 4.0285 8.18182 4.07729C5.29452 4.64696 4.61355 4.71618 4.06311 8.18182Z"
                    fill="#22BC90"
                  />
                  <path
                    d="M26.82 5.39448C26.6568 5.46253 26.5009 5.55842 26.3306 5.5945C25.5631 5.75535 24.7854 5.8698 24.0252 6.05745C23.0854 6.28944 22.4677 6.906 22.2348 7.85045C22.0512 8.59694 21.9506 9.36507 21.7834 10.1167C21.7424 10.3033 21.5854 10.4642 21.4807 10.6364C21.3812 10.458 21.2335 10.2899 21.1914 10.0992C21.0334 9.38054 20.9359 8.64849 20.7677 7.93191C20.5307 6.92353 19.8884 6.275 18.8871 6.03373C18.1586 5.85845 17.4137 5.75535 16.6812 5.59553C16.5047 5.55739 16.3488 5.42026 16.1836 5.32849C16.3344 5.22642 16.4729 5.06867 16.6381 5.03258C17.3204 4.88308 18.015 4.78925 18.6983 4.64078C19.8197 4.39642 20.5543 3.72726 20.7985 2.5797C20.9452 1.89405 21.0437 1.19808 21.1955 0.513463C21.2366 0.328905 21.3905 0.170124 21.492 0C21.5936 0.170124 21.7475 0.328907 21.7865 0.512434C21.9229 1.1486 22.006 1.7961 22.1343 2.43329C22.3805 3.652 23.1121 4.40673 24.3309 4.65418C25.0327 4.79647 25.7417 4.90679 26.4444 5.04495C26.5717 5.0697 26.6866 5.15734 26.8076 5.21611C26.8118 5.27488 26.8159 5.33468 26.82 5.39448ZM18.371 5.29859C20.148 5.62647 21.1771 6.64824 21.4161 8.3103C21.7742 7.64837 22.0143 6.86579 22.5252 6.35336C23.0382 5.83783 23.82 5.59244 24.4941 5.22333C22.8002 4.98309 21.8101 3.95719 21.492 2.19202C21.1545 3.96544 20.1665 5.01299 18.371 5.29859Z"
                    fill="#22BC90"
                  />
                  <path
                    d="M12.0737 28.6364C11.809 20.7254 7.72529 16.9153 0 16.6042C7.78894 16.3845 11.7588 12.5575 12.0369 4.63635C12.3886 12.4696 16.2312 16.3676 24 16.5941C16.4221 17.0167 12.2546 20.6375 12.0737 28.6364Z"
                    fill="#22BC90"
                  />
                </svg>

                <span className="text-[13px] sm:text-[13.5px] font-medium text-white tracking-normal whitespace-nowrap">
                  Post Property
                </span>

                {/* White Free Badge */}
                <span className="flex items-center justify-center h-[26px] sm:h-[28px] px-3 sm:px-3.5 rounded-full bg-white text-[12px] sm:text-[12.5px] font-medium text-[#1865F2] shadow-2xs leading-none shrink-0">
                  Free
                </span>
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
