"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface CompoundUnit {
  id: string;
  big: {
    id: string;
    title: string;
    location: string;
    price: string;
    beds: string;
    verified: boolean;
    image: string;
  };
  minis: [
    {
      id: string;
      title: string;
      price: string;
      beds: string;
      image: string;
    },
    {
      id: string;
      title: string;
      price: string;
      beds: string;
      image: string;
    }
  ];
}

const COMPOUND_UNITS: CompoundUnit[] = [
  {
    id: "unit-1",
    big: {
      id: "big-1",
      title: "NBCC Aspire Silicon City",
      location: "Sector 16B, Greater Noida",
      price: "₹1.25*Cr",
      beds: "3BHK",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
    },
    minis: [
      {
        id: "mini-1",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mini-2",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "unit-2",
    big: {
      id: "big-2",
      title: "NBCC Aspire Silicon City",
      location: "Sector 16B, Greater Noida",
      price: "₹1.25*Cr",
      beds: "3BHK",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    },
    minis: [
      {
        id: "mini-3",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mini-4",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "unit-3",
    big: {
      id: "big-3",
      title: "NBCC Aspire Silicon City",
      location: "Sector 16B, Greater Noida",
      price: "₹1.25*Cr",
      beds: "3BHK",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    },
    minis: [
      {
        id: "mini-5",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mini-6",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "unit-4",
    big: {
      id: "big-4",
      title: "NBCC Aspire Silicon City",
      location: "Sector 16B, Greater Noida",
      price: "₹1.25*Cr",
      beds: "3BHK",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
    },
    minis: [
      {
        id: "mini-7",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mini-8",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

export const CompoundProperties = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8 sm:py-10">
      {/* Section Header: | Properties ... < > */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-6 sm:h-7 w-1.5 rounded-full bg-[#05A579]" />
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1865F2]">
            Properties
          </h2>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-300/80 bg-white text-slate-500 shadow-xs transition-colors hover:border-[#1865F2] hover:text-[#1865F2] cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2]" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-300/80 bg-white text-slate-500 shadow-xs transition-colors hover:border-[#1865F2] hover:text-[#1865F2] cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 50-50 Split Carousel: Exactly 2 Compound Units (6 Boxes total) visible on screen */}
      <div className="relative group/carousel">
        <Swiper
          speed={600}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-8 !pt-2 !px-2 -mx-2"
        >
          {COMPOUND_UNITS.map((unit) => (
            <SwiperSlide key={unit.id} className="!h-auto">
              {/* One 50% Compound Unit: 1 Big Card + 2 Stacked Small Cards (3 distinct divs) */}
              <div className="flex w-full flex-col sm:flex-row items-center gap-3.5 sm:gap-4">
                {/* 1. Big Card (Box 1) - Light Blue BG #F2F7FF, Left Blue Accent, Soft Bottom Blue Shadow */}
                <div className="group relative flex h-[255px] flex-1 w-full flex-row items-center gap-3 sm:gap-3.5 overflow-hidden rounded-[26px] bg-[#F2F7FF] p-2.5 sm:p-3 shadow-[-4px_0px_0px_0px_#155DFC,0_14px_28px_-6px_rgba(21,93,252,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[-4px_0px_0px_0px_#155DFC,0_20px_36px_-6px_rgba(21,93,252,0.26)]">
                  {/* Left Image (Wide ~60%) */}
                  <div className="relative h-full w-[58%] sm:w-[60%] shrink-0 overflow-hidden rounded-[18px] sm:rounded-[20px] bg-slate-100">
                    <Image
                      src={unit.big.image}
                      alt={unit.big.title}
                      fill
                      sizes="(max-width: 768px) 60vw, 320px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />

                    {/* Top Left Verified Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-md px-3.5 py-1 text-[10px] font-normal tracking-wide text-white shadow-sm">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#05A579] stroke-[2]" />
                      <span>Verified</span>
                    </div>

                    {/* Top Right Heart Outline */}
                    <div className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center text-white/90 drop-shadow-sm">
                      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </div>

                    {/* Bottom Right 3BHK Badge */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[9.5px] font-normal text-white">
                      {unit.big.beds}
                    </div>
                  </div>

                  {/* Right Info (~40%) */}
                  <div className="flex h-full flex-1 flex-col justify-between py-1 min-w-0 pr-1">
                    <div>
                      <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#155DFC] leading-tight tracking-tight line-clamp-2">
                        {unit.big.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#64748B] font-normal whitespace-nowrap">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#64748B]" />
                        <span className="truncate">{unit.big.location}</span>
                      </p>
                    </div>

                    <div className="pt-1">
                      <div>
                        <p className="text-[18px] sm:text-[20px] font-bold text-[#0B132B] tracking-tight leading-none">
                          {unit.big.price}
                        </p>
                        <span className="block text-[11px] text-[#64748B] font-normal mt-0.5">
                          Starting From
                        </span>
                      </div>

                      <Link
                        href={`/properties/${encodeURIComponent(unit.big.title)}`}
                        className="mt-2.5 inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#155DFC] hover:bg-[#1250c4] px-4.5 py-2 text-[12px] sm:text-[12.5px] font-semibold text-white shadow-sm transition-all hover:gap-2.5 cursor-pointer w-fit uppercase tracking-wider"
                      >
                        <span>CONTACT</span>
                        <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 2. Stacked 2 Small Cards (Box 2 & Box 3) - Light Blue BG #F2F7FF, Right Blue Accent, Soft Bottom Blue Shadow */}
                <div className="flex h-[255px] w-full sm:w-[225px] lg:w-[245px] shrink-0 flex-col justify-between gap-2.5">
                  {unit.minis.map((mini, miniIdx) => (
                    <div
                      key={`${mini.id}-${miniIdx}`}
                      className="group flex h-[121px] w-full flex-row items-center justify-between gap-2.5 rounded-[22px] bg-[#F2F7FF] p-2.5 shadow-[4px_0px_0px_0px_#155DFC,0_12px_24px_-6px_rgba(21,93,252,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_0px_0px_0px_#155DFC,0_16px_30px_-6px_rgba(21,93,252,0.24)]"
                    >
                      {/* Left Info */}
                      <div className="flex h-full flex-1 flex-col justify-between py-0.5 min-w-0">
                        <div>
                          <h4 className="text-[13.5px] font-semibold text-[#155DFC] truncate tracking-tight">
                            {mini.title}
                          </h4>
                          <p className="text-[14.5px] font-bold text-[#0B132B] mt-0.5 leading-none">
                            {mini.price}
                          </p>
                        </div>

                        <Link
                          href={`/properties/${encodeURIComponent(mini.title)}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#155DFC] text-white shadow-xs hover:scale-110 hover:bg-[#1250c4] transition-all cursor-pointer"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                        </Link>
                      </div>

                      {/* Right Image (Wide ~52%) */}
                      <div className="relative h-full w-[105px] sm:w-[115px] shrink-0 overflow-hidden rounded-[16px] bg-slate-100">
                        <Image
                          src={mini.image}
                          alt={mini.title}
                          fill
                          sizes="120px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                        {/* Top Right Heart Outline */}
                        <div className="absolute top-1.5 right-1.5 z-10 flex h-5 w-5 items-center justify-center text-white/90 drop-shadow-sm">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                          </svg>
                        </div>
                        {/* Bottom Left 3BHK Badge */}
                        <div className="absolute bottom-1.5 left-1.5 z-10 rounded-md bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[8.5px] font-normal text-white">
                          {mini.beds}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
