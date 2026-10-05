"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, Heart, User } from "lucide-react";
import { HeaderSelect } from "./HeaderSelect";
import { HeaderSidebar } from "./HeaderSidebar";
import { SIMPLE_HEADER } from "@/data/headerData";

const { exploreItems: EXPLORE_ITEMS } = SIMPLE_HEADER;

interface SimpleHeaderProps {
  variant?: "default" | "compare";
  hasAnnouncement?: boolean;
  className?: string;
}

export const SimpleHeader = ({
  variant = "default",
  hasAnnouncement = false,
  className,
}: SimpleHeaderProps) => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!exploreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [exploreOpen]);

  const isCompare = variant === "compare";

  return (
    <header
      className={`fixed left-0 right-0 z-50 px-3 sm:px-8 pointer-events-none transition-all duration-300 ${
        hasAnnouncement ? "top-[44px] sm:top-[48px]" : "top-3 sm:top-4"
      } ${className || ""}`}
    >
      <div className="mx-auto flex h-[58px] sm:h-[62px] w-full max-w-[1380px] items-center justify-between rounded-full bg-white px-5 sm:px-7 shadow-[0_8px_30px_rgba(0,0,0,0.07)] border border-slate-100/90 pointer-events-auto">
        
        {/* Left Side: Brand Logo (+ optional divider & location if default) */}
        <div className="flex items-center gap-3.5 shrink-0">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/layout/logo.png"
              alt="Roofin"
              width={96}
              height={28}
              className="h-6 sm:h-7 w-auto object-contain"
              priority
            />
          </Link>

          {!isCompare && (
            <>
              {/* Thin vertical divider */}
              <div className="h-6 w-px bg-slate-200" />

              {/* Location Selector Pill */}
              <div className="rounded-xl border border-blue-200/90 bg-white hover:border-[#1d64ec] transition-colors shadow-2xs shrink-0">
                <HeaderSelect />
              </div>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto shrink-0">
          {!isCompare && (
            <>
              {/* Explore Dropdown */}
              <div ref={exploreRef} className="relative hidden md:block shrink-0">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-[#2563EB] hover:text-blue-700 select-none cursor-pointer text-base sm:text-[17px] font-normal transition-colors whitespace-nowrap"
                  onClick={() => setExploreOpen((prev) => !prev)}
                >
                  <span>Explore</span>
                  <ChevronDown
                    className={`h-4 w-4 stroke-[2.2] text-[#2563EB] transition-transform duration-200 ${
                      exploreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {exploreOpen && (
                  <div className="absolute top-full left-0 mt-3 w-48 rounded-2xl bg-white p-2 shadow-2xl border border-slate-100 z-50">
                    {EXPLORE_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setExploreOpen(false)}
                        className="block rounded-xl px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors whitespace-nowrap"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Us */}
              <Link
                href="/contact"
                className="hidden sm:inline-block text-base sm:text-[17px] font-normal text-[#2563EB] hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
              >
                Contact Us
              </Link>

              {/* Agent Pro/Builder Pro */}
              <Link
                href="/login"
                className="hidden lg:inline-flex items-center justify-center rounded-[12px] border border-[#2563EB] bg-white px-3.5 py-1.5 text-[14.5px] font-semibold text-[#2563EB] hover:bg-blue-50/60 transition-all whitespace-nowrap shrink-0"
              >
                Agent Pro/Builder Pro
              </Link>

              {/* Vertical Separator */}
              <div className="h-6 w-px bg-slate-200 mx-0.5 hidden sm:block shrink-0" />
            </>
          )}

          {/* If compare variant, show hamburger menu button */}
          {isCompare && (
            <button
              type="button"
              aria-label="Open Menu"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1865F2] hover:bg-blue-50/70 transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          )}

          {/* Wishlist Heart */}
          <Link
            href="/login"
            aria-label="Wishlist"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1865F2] hover:bg-blue-50/70 transition-colors shrink-0"
          >
            <Heart className="h-[22px] w-[22px] stroke-[2.2]" />
          </Link>

          {/* Notifications Bell with Orange-Red dot */}
          <Link
            href="/login"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#1865F2] hover:bg-blue-50/70 transition-colors shrink-0"
          >
            <Bell className="h-[22px] w-[22px] stroke-[2.2]" />
            <span className="absolute 1 top-0.5 right-1 h-2.5 w-2.5 rounded-full bg-[#f95738]" />
          </Link>

          {/* User Profile Avatar */}
          <button
            type="button"
            aria-label="User Profile"
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf5ff] text-[#1865F2] hover:bg-[#e2eeff] transition-colors cursor-pointer shrink-0"
          >
            <User className="h-4.5 w-4.5 stroke-[2.0]" />
          </button>

          {/* Post Property Free Button */}
          <Link
            href="/post-property"
            className="group relative flex h-[44px] items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1865F2] via-[#1456DB] to-[#0A38A8] pl-3.5 pr-1.5 py-1 text-white shadow-[0_4px_14px_rgba(24,101,242,0.35)] transition-all duration-200 hover:scale-[1.02] shrink-0"
          >
            {/* Sparkle icon */}
            <svg 
              className="h-[22px] w-[22px] shrink-0" 
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

            {/* Text */}
            <span className="text-[14px] font-bold text-white tracking-normal whitespace-nowrap">
              Post Property
            </span>

            {/* White Free Badge */}
            <span className="rounded-full bg-white px-3 py-1.5 text-[13px] font-extrabold text-[#1865F2] shadow-xs leading-none">
              Free
            </span>
          </Link>
        </div>
      </div>

      <HeaderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
};
