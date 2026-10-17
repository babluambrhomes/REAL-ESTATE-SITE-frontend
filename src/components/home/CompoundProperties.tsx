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
  Heart,
} from "lucide-react";
import toast from "react-hot-toast";
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
      image: "/images/properties/night-tower-figma.jpg",
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
      image: "/images/properties/night-tower-figma.jpg",
    },
    minis: [
      {
        id: "mini-3",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mini-4",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
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
      image: "/images/properties/night-tower-figma.jpg",
    },
    minis: [
      {
        id: "mini-5",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mini-6",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
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
      image: "/images/properties/night-tower-figma.jpg",
    },
    minis: [
      {
        id: "mini-7",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mini-8",
        title: "Green Villa 2",
        price: "₹1.25*Cr",
        beds: "3BHK",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

export const CompoundProperties = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string, title: string) => {
    setSavedIds((prev) => {
      const isSaved = !prev[id];
      toast.success(
        isSaved ? `Saved "${title}" to your favorites!` : `Removed from favorites`
      );
      return { ...prev, [id]: isSaved };
    });
  };

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8 sm:py-10">
      {/* Section Header: | Properties ... < > */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-6 sm:h-7 w-1.5 rounded-full bg-[#05A579] shrink-0" />
          <h2 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-bold tracking-normal text-[#2563EB] leading-tight">
            Properties
          </h2>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-slate-200/90 text-[#155DFC] shadow-xs transition-colors hover:bg-[#155DFC] hover:text-white cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2]" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-slate-200/90 text-[#155DFC] shadow-xs transition-colors hover:bg-[#155DFC] hover:text-white cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 50-50 Split Carousel: Exactly 2 Compound Units (6 Boxes total) visible on screen */}
      <div className="relative group/carousel">
        <Swiper
          speed={600}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-8 !pt-1 !px-2 -mx-2"
        >
          {COMPOUND_UNITS.map((unit) => (
            <SwiperSlide key={unit.id} className="!h-auto">
              {/* One 50% Compound Unit: 1 Big Card (~65% width) + 2 Stacked Small Cards (~35% width) */}
              <div className="flex w-full flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
                {/* 1. Big Card (Box 1) - Left Blue Accent, No bg color */}
                <div className="group relative flex h-[202px] sm:h-[210px] flex-1 w-full flex-row items-center gap-2.5 sm:gap-3 overflow-hidden rounded-[20px] p-2 sm:p-2.5 shadow-[-3.5px_0px_0px_0px_#2563EB] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[-3.5px_0px_0px_0px_#2563EB]">
                  {/* Left Image (Wide ~65%) */}
                  <div className="relative h-full w-[62%] sm:w-[65%] shrink-0 overflow-hidden rounded-[14px] sm:rounded-[16px] bg-slate-100">
                    <Image
                      src={unit.big.image}
                      alt={unit.big.title}
                      fill
                      sizes="(max-width: 768px) 65vw, 360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />

                    {/* Top Left Verified Badge */}
                    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-normal tracking-wide text-white shadow-sm">
                      <ShieldCheck className="h-3 w-3 text-[#05A579] stroke-[2]" />
                      <span>Verified</span>
                    </div>

                    {/* Top Right Heart Outline */}
                    <button
                      type="button"
                      aria-label="Save Property"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(unit.big.id, unit.big.title);
                      }}
                      className="absolute top-2 right-2 z-20 flex h-6 w-6 items-center justify-center text-white/90 drop-shadow-sm cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          savedIds[unit.big.id]
                            ? "fill-rose-500 text-rose-500"
                            : "text-white"
                        }`}
                      />
                    </button>

                    {/* Bottom Right 3BHK Badge */}
                    <div className="absolute bottom-2 right-2 z-10 rounded-md bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[8.5px] font-normal text-white">
                      {unit.big.beds}
                    </div>
                  </div>

                  {/* Right Info (~35%) */}
                  <div className="flex h-full flex-1 flex-col justify-between py-1 min-w-0 pr-0.5">
                    <div>
                      <h3 className="text-[14px] sm:text-[15.5px] font-bold text-[#155DFC] leading-tight tracking-tight line-clamp-2">
                        {unit.big.title}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1 text-[10px] sm:text-[11px] text-[#64748B] font-normal whitespace-nowrap">
                        <Image
                          src="/icon/location_pin_blue.png"
                          alt="Location"
                          width={34}
                          height={43}
                          className="h-3.5 w-3 shrink-0 object-contain"
                          unoptimized
                        />
                        <span className="truncate">{unit.big.location}</span>
                      </p>
                    </div>

                    <div className="pt-0.5">
                      <div>
                        <p className="text-[15.5px] sm:text-[16.5px] font-bold text-[#0B132B] tracking-tight leading-none">
                          {unit.big.price}
                        </p>
                        <span className="block text-[9.5px] text-[#64748B] font-normal mt-0.5 leading-tight">
                          Starting From
                        </span>
                      </div>

                      <Link
                        href={`/properties/${encodeURIComponent(unit.big.title)}`}
                        className="mt-1.5 inline-flex items-center justify-center gap-1 rounded-[8px] bg-[#155DFC] hover:bg-[#1250c4] px-3.5 py-1.5 text-[10.5px] font-bold text-white shadow-xs transition-all hover:gap-1.5 cursor-pointer w-fit uppercase tracking-wider leading-none"
                      >
                        <span>CONTACT</span>
                        <ArrowRight className="h-3 w-3 stroke-[2.5]" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 2. Stacked 2 Small Cards (Box 2 & Box 3) - Right Blue Accent, No bg color */}
                <div className="flex h-[202px] sm:h-[210px] w-full sm:w-[175px] lg:w-[190px] shrink-0 flex-col justify-between gap-2 sm:gap-2.5">
                  {unit.minis.map((mini, miniIdx) => (
                    <div
                      key={`${mini.id}-${miniIdx}`}
                      className="group flex h-[97px] sm:h-[100px] w-full flex-row items-center justify-between gap-2 rounded-[16px] p-2 shadow-[3.5px_0px_0px_0px_#2563EB] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[3.5px_0px_0px_0px_#2563EB]"
                    >
                      {/* Left Info */}
                      <div className="flex h-full flex-1 flex-col justify-between py-0.5 min-w-0">
                        <div>
                          <h4 className="text-[11.5px] sm:text-[12px] font-bold text-[#155DFC] truncate tracking-tight leading-tight">
                            {mini.title}
                          </h4>
                          <p className="text-[12.5px] sm:text-[13px] font-bold text-[#0B132B] mt-0.5 leading-none">
                            {mini.price}
                          </p>
                        </div>

                        <Link
                          href={`/properties/${encodeURIComponent(mini.title)}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#155DFC] text-white shadow-xs hover:scale-110 hover:bg-[#1250c4] transition-all cursor-pointer"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                        </Link>
                      </div>

                      {/* Right Image */}
                      <div className="relative h-full w-[80px] sm:w-[88px] shrink-0 overflow-hidden rounded-[12px] sm:rounded-[14px] bg-slate-100">
                        <Image
                          src={mini.image}
                          alt={mini.title}
                          fill
                          sizes="100px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                        {/* Top Right Heart Outline */}
                        <button
                          type="button"
                          aria-label="Save Property"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(mini.id, mini.title);
                          }}
                          className="absolute top-1 right-1 z-20 flex h-4.5 w-4.5 items-center justify-center text-white/90 drop-shadow-sm cursor-pointer hover:scale-110 transition-transform"
                        >
                          <Heart
                            className={`h-3 w-3 transition-colors ${
                              savedIds[mini.id]
                                ? "fill-rose-500 text-rose-500"
                                : "text-white"
                            }`}
                          />
                        </button>
                        {/* Bottom Left 3BHK Badge */}
                        <div className="absolute bottom-1 left-1 z-10 rounded-sm bg-black/60 backdrop-blur-md px-1 py-0.5 text-[7.5px] font-normal text-white leading-none">
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
