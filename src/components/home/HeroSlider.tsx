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
    image: "/banner/commercial_skyscrapers_banner.png",
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
                    className="object-cover object-left"
                    unoptimized
                  />
                  {/* Natural seamless soft fade into map on right edge */}
                  <div className="absolute inset-y-0 right-0 hidden lg:block w-24 xl:w-32 bg-gradient-to-r from-transparent via-[#d8eafb]/40 to-[#d8eafb] pointer-events-none z-10" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left Overlay Text Content */}
          <div className="absolute inset-0 z-10 flex items-center pointer-events-none font-rounded-mplus">
            <div className="w-full px-6 sm:px-12 lg:px-16 pointer-events-auto">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white px-3.5 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100">
                <Image
                  src="/icon/hero/trusted_buyers_shield_hd.png"
                  alt="Trusted by 50k+ Buyers"
                  width={28}
                  height={32}
                  unoptimized
                  priority
                  className="w-[18px] sm:w-[20px] h-auto object-contain shrink-0"
                />
                <span className="text-[14px] sm:text-[15px] font-medium text-black tracking-normal">
                  Trusted by 50k+ Buyers
                </span>
              </div>

              {/* Headline */}
              <h1 className="mt-3.5 text-2xl sm:text-3xl lg:text-[38px] xl:text-[40px] font-bold tracking-tight text-black leading-[1.16] lg:leading-[46px] max-w-[420px]">
                BUY PROPERTY <br />
                <span className="text-[#1865F2]">LOWER THAN</span> <br />
                MARKET PRICE
              </h1>

              {/* Subtitle */}
              <p className="mt-3.5 text-base sm:text-lg lg:text-[22px] font-normal text-black tracking-normal">
                India’s Most Trusted Buying platform
              </p>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-7 pt-1">
                {/* Badge 1: Verified Properties */}
                <Link href="/properties?verified=true" className="flex items-center gap-2.5 sm:gap-3 shrink-0 hover:opacity-90 transition-opacity">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-blue-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] shrink-0 p-2">
                    <Image
                      src="/icon/hero/verified_properties_shield_hd.png"
                      alt="Verified Properties"
                      width={56}
                      height={56}
                      unoptimized
                      priority
                      className="object-contain w-6 h-6 sm:w-7 sm:h-7"
                    />
                  </div>
                  <div className="leading-[1.25] text-left">
                    <span className="block text-[13px] sm:text-[13.5px] font-medium text-black whitespace-nowrap">Verified</span>
                    <span className="block text-[13px] sm:text-[13.5px] font-medium text-black whitespace-nowrap">Properties</span>
                  </div>
                </Link>

                {/* Badge 2: Trusted Agents */}
                <Link href="/properties?agent=true" className="flex items-center gap-2.5 sm:gap-3 shrink-0 hover:opacity-90 transition-opacity">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-blue-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] shrink-0 p-2">
                    <Image
                      src="/icon/hero/trusted_agents_user_hd.png"
                      alt="Trusted Agents"
                      width={56}
                      height={56}
                      unoptimized
                      priority
                      className="object-contain w-6 h-6 sm:w-7 sm:h-7"
                    />
                  </div>
                  <div className="leading-[1.25] text-left">
                    <span className="block text-[13px] sm:text-[13.5px] font-medium text-black whitespace-nowrap">Trusted</span>
                    <span className="block text-[13px] sm:text-[13.5px] font-medium text-black whitespace-nowrap">Agents</span>
                  </div>
                </Link>

                {/* Badge 3: Best Deals */}
                <Link href="/properties?deal=true" className="flex items-center gap-2.5 sm:gap-3 shrink-0 hover:opacity-90 transition-opacity">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-blue-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] shrink-0 p-2">
                    <Image
                      src="/icon/hero/best_deals_percent_hd.png"
                      alt="Best Deals"
                      width={56}
                      height={56}
                      unoptimized
                      priority
                      className="object-contain w-6 h-6 sm:w-7 sm:h-7"
                    />
                  </div>
                  <div className="leading-[1.25] text-left">
                    <span className="block text-[13px] sm:text-[13.5px] font-medium text-black whitespace-nowrap">Best</span>
                    <span className="block text-[13px] sm:text-[13.5px] font-medium text-black whitespace-nowrap">Deals</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Right Side: Interactive Map */}
        <div className="relative hidden lg:block lg:w-[27%] h-full bg-[#f1f6fc] overflow-hidden">
          <div className="relative h-full w-full">
            <ViewMap height="100%" properties={properties} />

            {/* Seamless edge fade from banner sky into map */}
            <div className="absolute inset-y-0 left-0 w-8 xl:w-14 bg-gradient-to-r from-[#d8eafb]/70 to-transparent pointer-events-none z-10" />

            {/* Top Floating Badge: Premium Living (Exact match with zoomed screenshot) */}
            <div className="absolute top-24 left-4 z-20 w-[190px] rounded-xl border border-slate-100 bg-white p-3.5 shadow-xl backdrop-blur-md">
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
                  href="/properties?location=Greater+Noida"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1865F2] text-white shadow-md transition-transform hover:scale-105"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Bottom Floating Area: Explore on Map Button + 3 Vertical Circular Dots (Exact Match) */}
            <div className="absolute bottom-12 right-6 z-20 flex items-center gap-4 pointer-events-auto">
              {/* Explore on Map Button */}
              <Link
                href="/properties?map=true"
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

              {/* 3 Vertical Circular Dots */}
              <div className="flex flex-col items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === index
                        ? "h-3.5 w-3.5 bg-[#1865F2] shadow-[0_2px_8px_rgba(24,101,242,0.5)] scale-110"
                        : "h-3 w-3 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] hover:bg-slate-50"
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
