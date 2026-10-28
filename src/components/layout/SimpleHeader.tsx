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
        <div className="mx-auto flex h-[58px] sm:h-[62px] w-full max-w-[1380px] items-center justify-between rounded-full bg-white px-3 sm:px-5 lg:px-7 shadow-[0_8px_30px_rgba(0,0,0,0.07)] border border-slate-100/90 pointer-events-auto">
        
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

          {/* Post Property Free Button with Circular Running Gradient Border (#22BC90 & #2563EB) */}
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

              {/* Text */}
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

    {/* Global Navigation Sidebar Drawer */}
    <HeaderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  </>
);
};
