"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CITIES = [
  {
    name: "Noida",
    count: "12,300+ Properties",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    href: "/properties?city=noida",
  },
  {
    name: "Gurgaon",
    count: "18,450+ properties",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    href: "/properties?city=gurgaon",
  },
  {
    name: "Delhi",
    count: "9,200+ properties",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
    href: "/properties?city=delhi",
  },
  {
    name: "Greater Noida",
    count: "9,200+ properties",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80",
    href: "/properties?city=greater-noida",
  },
  {
    name: "Ghaziabad",
    count: "9,200+ properties",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80",
    href: "/properties?city=ghaziabad",
  },
  {
    name: "Faridabad",
    count: "9,200+ properties",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
    href: "/properties?city=faridabad",
  },
];

export const TopCities = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-6 sm:py-8">
      {/* Header: | Top Cities in Delhi NCR ... view all < > */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-6 sm:h-7 w-1.5 rounded-full bg-[#05A579]" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
              Top <span className="text-[#1865F2]">Cities</span> in Delhi NCR
            </h2>
          </div>
          <p className="mt-1 pl-3.5 text-xs sm:text-[13px] text-[#64748B] font-normal">
            Explore properties in india&apos;s most sought- after cities.
          </p>
        </div>

        {/* Top Right: Exact [ view all < ] ( > ) matching zoomed screenshot */}
        <div className="flex items-center gap-2">
          {/* Left Pill containing "view all" text + circular "<" button */}
          <div className="inline-flex items-center rounded-full border border-[#D3E3FD] bg-white p-0.5 shadow-xs transition-all hover:border-[#B5D4FC]">
            <Link
              href="/properties"
              className="pl-4 pr-3 py-1 text-sm sm:text-[15px] font-medium text-[#1865F2] hover:underline cursor-pointer tracking-normal"
            >
              view all
            </Link>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-slate-300/80 bg-white text-slate-500 transition-colors hover:border-[#1865F2] hover:text-[#1865F2] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 stroke-[1.5]" />
            </button>
          </div>

          {/* Right standalone circular ">" button */}
          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-slate-300/80 bg-white text-slate-500 shadow-xs transition-colors hover:border-[#1865F2] hover:text-[#1865F2] cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* 6 City Cards Carousel */}
      <div className="relative">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.8}
          breakpoints={{
            480: { slidesPerView: 2.5, spaceBetween: 14 },
            640: { slidesPerView: 3.5, spaceBetween: 16 },
            768: { slidesPerView: 4.5, spaceBetween: 16 },
            1024: { slidesPerView: 5.5, spaceBetween: 18 },
            1280: { slidesPerView: 6, spaceBetween: 20 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-7 !pt-2 !px-2 -mx-2"
        >
          {CITIES.map((city) => (
            <SwiperSlide key={city.name} className="!h-auto">
              <Link
                href={city.href}
                className="group flex h-[195px] sm:h-[205px] flex-col justify-between overflow-hidden rounded-[22px] border border-slate-100/90 bg-white shadow-[0_8px_20px_-4px_rgba(24,101,242,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_-4px_rgba(24,101,242,0.20)]"
              >
                {/* 50% Top Image */}
                <div className="relative h-[50%] w-full overflow-hidden rounded-t-[20px] bg-slate-100">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 220px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                {/* 50% Bottom Text Area */}
                <div className="flex h-[50%] w-full flex-col justify-center p-3.5 sm:p-4">
                  <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#0F172A] group-hover:text-[#1865F2] transition-colors leading-snug">
                    {city.name}
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-[#64748B] font-normal mt-0.5">
                    {city.count}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};


