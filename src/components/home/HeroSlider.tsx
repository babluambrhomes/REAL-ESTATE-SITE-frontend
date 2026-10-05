"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Check, UserCheck, BadgePercent, Map as MapIcon, Building2, ArrowRight, ShieldCheck } from "lucide-react";
import { properties } from "@/data/properties";

import "swiper/css";
import "swiper/css/effect-fade";

// 🗺️ Map component dynamically loaded for client
const ViewMap = dynamic(() => import("@/components/common/ViewMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs text-slate-400">
      Loading Map...
    </div>
  ),
});

const slides = [
  {
    image: "/layout/banner.png",
    title: "Find Your Dream Home",
    subtitle: "Explore luxury properties in the most desirable locations.",
  },
  {
    image: "/banner/banner.png",
    title: "Luxury Living Redefined",
    subtitle: "Modern designs crafted for comfort and elegance.",
  },
  {
    image: "/banner/hero-banner.png",
    title: "Invest In Your Future",
    subtitle: "High-growth opportunities with guaranteed returns.",
  },
];

export const HeroSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-[#eaf2fb]">
      <div className="relative flex flex-col lg:flex-row h-[480px] sm:h-[530px] lg:h-[580px] w-full">
        {/* 1. Left Side: Banner Slider with Overlay Content & Seamless Atmospheric Shade */}
        <div className="relative w-full lg:w-[73%] h-[350px] sm:h-[420px] lg:h-full overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            loop
            speed={900}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            className="h-full w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 73vw"
                    className="object-cover object-center"
                    unoptimized
                  />
                  {/* Soft atmospheric blue shade between building and map */}
                  <div className="absolute inset-y-0 right-0 hidden lg:block w-40 sm:w-56 bg-gradient-to-r from-transparent via-[#bfdcfa]/40 via-[#d6e8fb]/75 to-[#eaf2fb] pointer-events-none z-10" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left Overlay Text Content */}
          <div className="absolute inset-0 z-10 flex items-center pointer-events-none font-rounded-mplus">
            <div className="w-full px-6 sm:px-12 lg:px-16 pointer-events-auto">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-[0_2px_14px_rgba(0,0,0,0.06)] border border-slate-100">
                <svg 
                  className="h-[28px] w-[26px] shrink-0" 
                  viewBox="0 0 24 26" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M12 1L3.5 4.5V12C3.5 18.5 7.8 23.5 12 25C16.2 23.5 20.5 18.5 20.5 12V4.5L12 1Z" 
                    fill="#34C759" 
                  />
                  <path 
                    d="M7.5 12.5L10.5 15.5L16.5 9.5" 
                    stroke="white" 
                    strokeWidth="2.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
                <span className="text-[17.5px] font-medium text-black tracking-normal">
                  Trusted by 50k+ Buyers
                </span>
              </div>

              {/* Headline */}
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-normal text-black leading-[1.14] lg:leading-[56px] max-w-[470px]">
                BUY PROPERTY <br />
                <span className="text-[#1d7bf8]">LOWER THAN</span> <br />
                MARKET PRICE
              </h1>

              {/* Subtitle */}
              <p className="mt-3.5 text-base sm:text-lg lg:text-[25px] font-normal text-black tracking-normal">
                India’s Most Trusted Buying platform
              </p>

              {/* 3 Circular Badges Row */}
              <div className="mt-6 flex flex-wrap items-center gap-6 sm:gap-8 pt-1">
                {/* Badge 1: Verified Properties */}
                <div className="flex items-center gap-3">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-blue-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] shrink-0">
                    <svg className="h-[30px] w-[30px] shrink-0" viewBox="0 0 24 26" fill="none">
                      <path d="M12 1L3.5 4.5V12C3.5 18.5 7.8 23.5 12 25C16.2 23.5 20.5 18.5 20.5 12V4.5L12 1Z" fill="#1d7bf8" />
                      <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="leading-[1.25] text-left">
                    <span className="block text-[14.5px] font-normal text-black">Verified</span>
                    <span className="block text-[14.5px] font-normal text-black">Properties</span>
                  </div>
                </div>

                {/* Badge 2: Trusted Agents */}
                <div className="flex items-center gap-3">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-blue-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] shrink-0">
                    <svg className="h-[30px] w-[30px] shrink-0" viewBox="0 0 24 24" fill="none">
                      <circle cx="10" cy="7" r="4.5" fill="#1d7bf8" />
                      <path d="M1.5 19.5c0-4 3.8-6 8.5-6s8.5 2 8.5 6" fill="#1d7bf8" />
                      <path d="M16 10.5L18.5 13L23 8" stroke="#00A3FF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="leading-[1.25] text-left">
                    <span className="block text-[14.5px] font-normal text-black">Trusted</span>
                    <span className="block text-[14.5px] font-normal text-black">Agents</span>
                  </div>
                </div>

                {/* Badge 3: Best Daal */}
                <div className="flex items-center gap-3">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-blue-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] shrink-0">
                    <svg className="h-[32px] w-[32px] shrink-0" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l2.3 2 3-.4 1.3 2.8 2.8.8.2 3 2 2.3-1.1 2.9 1.1 2.9-2 2.3-.2 3-2.8.8-1.3 2.8-3-.4L12 22l-2.3-2-3 .4-1.3-2.8-2.8-.8-.2-3-2-2.3 1.1-2.9-1.1-2.9 2-2.3.2-3 2.8-.8 1.3-2.8 3 .4L12 2z" fill="#1d7bf8" />
                      <path d="M8.5 15.5L15.5 8.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                      <circle cx="9" cy="9" r="1.2" fill="white" />
                      <circle cx="15" cy="15" r="1.2" fill="white" />
                    </svg>
                  </div>
                  <div className="leading-[1.25] text-left">
                    <span className="block text-[14.5px] font-normal text-black">Best</span>
                    <span className="block text-[14.5px] font-normal text-black">Deal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




        {/* 2. Right Side: Interactive Map */}
        <div className="relative hidden lg:block lg:w-[27%] h-full bg-slate-100 overflow-hidden">
          <div className="relative h-full w-full">
            <ViewMap height="100%" properties={properties} />

            {/* Left Edge Soft Atmospheric Shade from Banner to Map */}
            <div className="absolute inset-y-0 left-0 w-28 sm:w-36 bg-gradient-to-r from-[#eaf2fb] via-[#eaf2fb]/60 to-transparent pointer-events-none z-10" />

            {/* Top Floating Badge: Premium Living (Exact match with zoomed screenshot) */}
            <div className="absolute top-24 left-4 z-20 w-[190px] rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#a3e8c8] bg-[#e6f8f0] text-[#10b981] shrink-0">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900 leading-tight">Premium Living</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">In Greater Noida</p>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between pt-1">
                <p className="text-[17px] font-extrabold text-slate-900 tracking-tight">1.25 cr</p>
                <Link
                  href="/properties"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d7bf8] text-white shadow-md transition-transform hover:scale-105"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Bottom Floating Area: Explore on Map Button + 3 Vertical Circular Dots (Exact Match) */}
            <div className="absolute bottom-12 right-6 z-20 flex items-center gap-4 pointer-events-auto">
              {/* Explore on Map Button */}
              <Link
                href="/properties"
                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#1865F2] to-[#029BE5] px-5 py-3.5 text-[15.5px] font-medium text-white shadow-[0_8px_24px_rgba(24,101,242,0.4)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_10px_28px_rgba(24,101,242,0.5)] shrink-0"
              >
                {/* Folded Map with Pin icon */}
                <svg 
                  className="h-6 w-6 shrink-0 text-white" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.9" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" y1="3" x2="9" y2="18" />
                  <line x1="15" y1="6" x2="15" y2="21" />
                  {/* Pin in the middle panel */}
                  <path d="M12 8.5C10.9 8.5 10 9.4 10 10.5C10 12 12 14 12 14C12 14 14 12 14 10.5C14 9.4 13.1 8.5 12 8.5Z" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="10.5" r="0.8" fill="#1865F2" />
                </svg>
                <span className="tracking-tight whitespace-nowrap">Explore on Map</span>
              </Link>

              {/* 3 Vertical Circular Dots with Exact Shadows & Size */}
              <div className="flex flex-col items-center gap-2.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`h-6 w-6 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === index
                        ? "bg-[#1865F2] shadow-[0_4px_14px_rgba(24,101,242,0.5)] scale-105"
                        : "bg-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:bg-slate-50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
