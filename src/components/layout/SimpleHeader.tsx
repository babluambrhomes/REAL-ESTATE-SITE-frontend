"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, Heart, User } from "lucide-react";
import { HeaderSelect } from "./HeaderSelect";
import { HeaderSidebar } from "./HeaderSidebar";
import { SIMPLE_HEADER } from "@/data/headerData";
import { useWishlist } from "@/lib/wishlist";
import { useAppSelector } from "@/store/hooks";

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
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isMounted, setIsMounted] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <>
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
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </Link>

          {!isCompare && (
            <>
              {/* Thin vertical divider */}
              <Image
                src="/banner/Line 82.svg"
                alt="Divider"
                width={1}
                height={37}
                className="h-[37px] w-[1px] shrink-0 select-none self-center"
                unoptimized
              />

              {/* Location Selector Pill */}
              <div className="rounded-[8px] border border-[#2563EB] bg-white hover:border-[#2563EB] transition-colors shadow-2xs shrink-0">
                <HeaderSelect />
              </div>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 ml-auto shrink-0">
          {!isCompare && (
            <>
              {/* Explore, Contact Us, Roofin Pro Nav Group with refined spacing */}
              {/* Previous links group:
              <div ref={exploreRef} className="relative hidden md:block shrink-0">
                <button
                  type="button"
                  className="flex items-center gap-1 text-[#2563EB] hover:text-blue-700 select-none cursor-pointer text-[14px] sm:text-[15px] font-normal transition-colors whitespace-nowrap"
                  onClick={() => setExploreOpen((prev) => !prev)}
                >
                  <span>Explore</span>
                  <ChevronDown
                    className={`h-4 w-4 stroke-[2.2] text-[#2563EB] transition-transform duration-200 ${
                      exploreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <Link
                href="/contact"
                className="hidden sm:inline-block text-[14px] sm:text-[15px] font-normal text-[#2563EB] hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
              >
                Contact Us
              </Link>
              <Link
                href="/login"
                className="hidden sm:inline-block text-[14px] sm:text-[15px] font-normal text-[#2563EB] hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
              >
                Roofin Pro
              </Link>
              */}

              <div className="flex items-center gap-3.5 sm:gap-4.5 lg:gap-5 shrink-0">
                {/* Explore Dropdown */}
                <div ref={exploreRef} className="relative hidden md:block shrink-0">
                  <button
                    type="button"
                    className="flex items-center gap-0.5 text-[#2563EB] hover:text-blue-700 select-none cursor-pointer text-[14px] sm:text-[15px] font-normal transition-colors whitespace-nowrap"
                    onClick={() => setExploreOpen((prev) => !prev)}
                  >
                    <span>Explore</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 stroke-[2.2] text-[#2563EB] -translate-y-[0.5px] transition-transform duration-200 ${
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
                  className="hidden sm:inline-block text-[14px] sm:text-[15px] font-normal text-[#2563EB] hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
                >
                  Contact Us
                </Link>

                {/* Roofin Pro - Border removed, matching Explore & Contact Us size */}
                {/* Previous Bordered Button:
                <Link
                  href="/login"
                  className="hidden lg:inline-flex h-[38px] px-2.5 items-center justify-center rounded-[6px] border border-[#2563EB] bg-white text-[11.5px] font-medium text-[#2563EB] leading-none tracking-normal hover:bg-blue-50/60 transition-all whitespace-nowrap shrink-0"
                >
                  Roofin Pro
                </Link>
                */}
                <Link
                  href="/login"
                  className="hidden sm:inline-block text-[14px] sm:text-[15px] font-normal text-[#2563EB] hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
                >
                  Roofin Pro
                </Link>
              </div>

              {/* Vertical Separator */}
              <Image
                src="/banner/Line 82.svg"
                alt="Divider"
                width={1}
                height={37}
                className="hidden sm:block h-[37px] w-[1px] shrink-0 select-none self-center"
                unoptimized
              />
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

          {/* Icon Actions Group: Heart, Bell, Profile */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Wishlist Heart */}
            <Link
              href="/properties?saved=true"
              aria-label="Wishlist"
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#edf5ff] transition-colors shrink-0"
            >
              <Image
                src="/layout/nav/nav_heart.svg"
                alt="Wishlist"
                width={34}
                height={30}
                className="w-[20px] sm:w-[22px] h-auto object-contain hover:scale-105 transition-transform"
                unoptimized
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-[18px] px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Notifications Bell with Orange-Red dot */}
            <Link
              href="/login"
              aria-label="Notifications"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#edf5ff] transition-colors shrink-0"
            >
              <Image
                src="/layout/nav/nav_bell.svg"
                alt="Notifications"
                width={28}
                height={37}
                className="w-[18px] sm:w-[20px] h-auto object-contain hover:scale-105 transition-transform"
                unoptimized
              />
            </Link>

            {/* User Profile Avatar */}
            <button
              type="button"
              aria-label="User Profile"
              onClick={() => setSidebarOpen(true)}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#edf5ff] transition-colors cursor-pointer shrink-0"
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
                  src="/layout/nav/nav_user.svg"
                  alt="User Profile"
                  width={23}
                  height={24}
                  className="w-[18px] sm:w-[20px] h-auto object-contain hover:scale-105 transition-transform"
                  style={{ width: "auto", height: "auto" }}
                  unoptimized
                />
              )}
              {isMounted && isAuthenticated && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              )}
            </button>
          </div>

          {/* Post Property Free Button */}
          {/* Previous Post Property Button:
          <Link
            href="/post-property"
            className="group relative flex h-[38px] sm:h-[40px] items-center gap-2 rounded-full bg-gradient-to-r from-[#1865F2] via-[#104ECC] to-[#073299] border-[1.5px] border-[#00D084] pl-2.5 sm:pl-3 pr-1 sm:pr-1 text-white shadow-[0_2px_10px_rgba(0,208,132,0.2)] transition-all duration-200 hover:scale-[1.02] shrink-0"
          >
            <span className="text-[13px] sm:text-[13.5px] font-medium text-white tracking-normal whitespace-nowrap">
              Post Property
            </span>
            <span className="rounded-full bg-white px-2.5 sm:px-3 py-1 text-[12px] sm:text-[12.5px] font-semibold text-[#1865F2] shadow-xs leading-none">
              Free
            </span>
          </Link>
          */}
          <Link
            href="/post-property"
            className="group relative flex h-[38px] sm:h-[40px] translate-x-2 sm:translate-x-3.5 items-center gap-2 rounded-full bg-gradient-to-r from-[#1865F2] via-[#104ECC] to-[#073299] border-[1.5px] border-[#00D084] pl-3 sm:pl-3.5 pr-1 text-white shadow-[0_2px_10px_rgba(0,208,132,0.2)] transition-all duration-200 hover:scale-[1.02] shrink-0"
          >
            {/* Sparkle icon */}
            {/* <Image
              src="/layout/nav/nav_sparkle.svg"
              alt="Sparkle"
              width={27}
              height={29}
              className="h-[18px] w-auto shrink-0"
              unoptimized
            /> */}

            {/* Text with refined boldness */}
            <span className="text-[13px] sm:text-[13.5px] font-medium text-white tracking-normal whitespace-nowrap">
              Post Property
            </span>

            {/* White Free Badge with increased height and reduced width */}
            <span className="flex items-center justify-center h-[20px] sm:h-[25px] px-3 sm:px-4 rounded-full bg-white text-[15.5px] sm:text-[15px] font-bold text-[#1865F2] shadow-xs leading-none">
              Free
            </span>
          </Link>
        </div>
      </div>
    </header>

    {/* Global Navigation Sidebar Drawer */}
    <HeaderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  </>
);
};
