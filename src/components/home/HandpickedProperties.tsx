"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Share2, ShieldCheck, MapPin, PhoneCall, ArrowRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface HandpickedItem {
  id: string;
  image: string;
  tag: string;
  title: string;
  location: string;
  price: string;
  originalPrice: string;
  discountText: string;
  phone: string;
}

const HANDPICKED_DATA: HandpickedItem[] = [
  {
    id: "hp-1",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    tag: "2,3 & 4 BHK Apartments",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    price: "₹1.25*Cr",
    originalPrice: "₹1.58 Cr",
    discountText: "Get upto 33L Off on this property",
    phone: "+919876543210",
  },
  {
    id: "hp-2",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    tag: "2,3 & 4 BHK Apartments",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    price: "₹1.25*Cr",
    originalPrice: "₹1.58 Cr",
    discountText: "Get upto 33L Off on this property",
    phone: "+919876543210",
  },
  {
    id: "hp-3",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    tag: "2,3 & 4 BHK Apartments",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    price: "₹1.25*Cr",
    originalPrice: "₹1.58 Cr",
    discountText: "Get upto 33L Off on this property",
    phone: "+919876543210",
  },
];

export const HandpickedProperties = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8 sm:py-12">
      {/* Header matching exact Figma layout */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="border-l-[3.5px] border-[#00C48C] pl-3">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-[#0B132B]">
            Handpicked by Roofin
          </h2>
          <p className="mt-0.5 text-xs sm:text-[13px] text-[#64748B] font-normal">
            Explore the best new projects across Delhi NCR from top builders.
          </p>
        </div>

        {/* Top Right: Exact [ view all < ] ( > ) capsule controls */}
        <div className="flex items-center gap-2">
          {/* Left Pill containing "view all" text + circular "<" button */}
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 shadow-xs transition-all hover:border-[#1865F2]/40">
            <Link
              href="/properties"
              className="pl-3.5 pr-2.5 py-1 text-xs sm:text-sm font-medium text-[#1865F2] hover:underline cursor-pointer"
            >
              view all
            </Link>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors hover:border-[#1865F2] hover:text-[#1865F2] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 stroke-[1.5]" />
            </button>
          </div>

          {/* Right standalone circular ">" button */}
          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-xs transition-colors hover:border-[#1865F2] hover:text-[#1865F2] cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* 3 Luxury Handpicked Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HANDPICKED_DATA.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between overflow-hidden rounded-[20px] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(24,101,242,0.12)]"
          >
            {/* Top Image & 3 Round Floating Action Buttons */}
            <div className="relative h-[220px] sm:h-[235px] w-full overflow-hidden rounded-[18px] bg-slate-100 m-2 sm:m-2.5 mb-0" style={{ width: "calc(100% - 16px)" }}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />

              {/* 3 Floating Action Buttons on Top-Right */}
              <div className="absolute right-3 top-3 flex flex-col items-center gap-2 z-10">
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={() => toggleLike(item.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm transition-transform hover:scale-110 cursor-pointer"
                >
                  <Heart
                    className={`h-4 w-4 ${likedMap[item.id] ? "fill-red-500 text-red-500" : "text-[#1865F2]"}`}
                  />
                </button>
                <button
                  type="button"
                  aria-label="Share"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#1865F2] shadow-sm transition-transform hover:scale-110 cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Verified"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#1865F2] shadow-sm transition-transform hover:scale-110 cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
              <div>
                {/* BHK Pill Tag */}
                <span className="inline-block rounded-full bg-[#EEF5FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#1865F2]">
                  {item.tag}
                </span>

                {/* Title & Phone Button Row */}
                <div className="mt-2 flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-[17px] font-bold text-[#0B132B] tracking-tight truncate">
                    {item.title}
                  </h3>
                  <a
                    href={`tel:${item.phone}`}
                    aria-label="Call Agent"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1865F2] text-white shadow-xs transition-transform hover:scale-105 hover:bg-blue-700 cursor-pointer"
                  >
                    <PhoneCall className="h-4 w-4" />
                  </a>
                </div>

                {/* Location */}
                <p className="mt-1 flex items-center gap-1 text-xs text-[#64748B]">
                  <MapPin className="h-3.5 w-3.5 text-[#1865F2] shrink-0 fill-[#1865F2]" />
                  <span>{item.location}</span>
                </p>
              </div>

              {/* Price, Discount & View Details CTA */}
              <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg sm:text-xl font-bold text-[#0B132B] tracking-tight">
                      {item.price}
                    </span>
                    <span className="text-xs text-[#94A3B8] line-through font-normal">
                      {item.originalPrice}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[10.5px] text-[#64748B] mt-0.5">
                    {item.discountText}
                  </p>
                </div>

                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1865F2] hover:bg-[#1250C4] px-5 sm:px-6 py-2.5 text-[13px] sm:text-[14px] font-semibold text-white shadow-xs transition-all duration-200 hover:scale-105 cursor-pointer shrink-0"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
