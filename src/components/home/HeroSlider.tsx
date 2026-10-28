"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Check, UserCheck, BadgePercent, Map as MapIcon, ArrowRight, ShieldCheck } from "lucide-react";
import { properties } from "@/data/properties";

import "swiper/css";
import "swiper/css/effect-fade";

// Map component dynamically loaded for client
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
    image: "/banner/bannerr.png",
    title: "Find Your Dream Home",
    subtitle: "Explore luxury properties in the most desirable locations.",
  },
  {
    image: "/banner/bannerrr.png",
    title: "Your Next Home. Our Priority.",
    subtitle: "Modern designs crafted for comfort and elegance.",
  },
  {
    image: "/banner/bannerr.png",
    title: "Invest In Your Future",
    subtitle: "High-growth opportunities with guaranteed returns.",
  },
];

export const HeroSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-[#eaf2fb]">
      <div className="relative flex flex-col lg:flex-row h-[490px] sm:h-[535px] lg:h-[580px] w-full">
        {/* 1. Left Side: Banner Slider with Overlay Content & Seamless Atmospheric Shade */}
        <div className="relative w-full lg:w-[73%] h-[365px] sm:h-[420px] lg:h-full overflow-hidden">
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
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 73vw"
                    className="object-cover object-left origin-left"
                  />

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 3 Vertical Circular Dots shifted to Banner Left */}
          {/* Previous centered position with shadows:
          <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-auto">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${activeIndex === index
                  ? "h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#1865F2] shadow-[0_2px_8px_rgba(24,101,242,0.5)] scale-110"
                  : "h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] hover:bg-slate-50"
                  }`}
              />
            ))}
          </div>
          */}
          <div className="absolute left-3 sm:left-5 top-[57%] sm:top-[60%] -translate-y-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`rounded-full transition-colors duration-200 cursor-pointer ${
                  activeIndex === index
                    ? "h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#1865F2]"
                    : "h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white border border-slate-300 hover:bg-[#1865F2] hover:border-[#1865F2]"
                }`}
              />
            ))}
          </div>

          {/* Right-side shade fade — banner blends into map */}

          {/* Left Overlay Text Content */}
          {/* <div className="absolute inset-0 z-10 flex items-center pointer-events-none font-poppins">
            <div className="w-full px-6 sm:px-12 lg:px-16 pointer-events-auto">
             
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white px-3.5 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100">
                <Image
                  src="/icon/hero/trusted_buyers_shield_v2.png"
                  alt="Trusted by 50k+ Buyers"
                  width={24}
                  height={28}
                  unoptimized
                  priority
                  className="w-[18px] sm:w-[20px] h-auto object-contain shrink-0"
                />
                <span className="text-[14px] sm:text-[15px] font-medium text-black tracking-normal">
                  Trusted by 50k+ Buyers
                </span>
              </div>

              <h1 className="mt-3.5 text-2xl sm:text-3xl lg:text-[38px] xl:text-[40px] font-bold tracking-tight text-black leading-[1.16] lg:leading-[46px] max-w-[420px]">
                BUY PROPERTY <br />
                <span className="text-[#1865F2]">LOWER THAN</span> <br />
                MARKET PRICE
              </h1>

             
              <p className="mt-3 font-poppins text-lg sm:text-2xl lg:text-[24px] font-normal text-[#000000] leading-none tracking-normal">
                India’s Most Trusted Buying platform
              </p>

            
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-7">
               
                <Link href="/properties?verified=true" className="flex items-center gap-2.5 sm:gap-3 shrink-0 hover:opacity-90 transition-opacity">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] shrink-0 p-2">
                    <Image
                      src="/icon/hero/verified_properties_shield_v2.png"
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

 
                <Link href="/properties?agent=true" className="flex items-center gap-2.5 sm:gap-3 shrink-0 hover:opacity-90 transition-opacity">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] shrink-0 p-2">
                    <Image
                      src="/icon/hero/trusted_agents_user_v2.png"
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

              
                <Link href="/properties?deal=true" className="flex items-center gap-2.5 sm:gap-3 shrink-0 hover:opacity-90 transition-opacity">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] shrink-0 p-2">
                    <Image
                      src="/icon/hero/best_deals_percent_v2.png"
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
          </div> */}
        </div>
        {/* <div className="relative">
          <div
            className="absolute top-0 w-8 h-[480px] sm:h-[530px] lg:h-[580px] z-12 pointer-events-none  "
            style={{
              backgroundImage: "url('/banner/shadow.png')"

            }}
          />
        </div> */}

        {/* 2. Right Side: Interactive Map */}
        <div className="relative hidden lg:block lg:w-[27%] h-full bg-[#f1f6fc] overflow-hidden">
          {/* Left-side shade on map panel for seamless blend */}
          <div
            className="absolute inset-y-0 left-0 w-[60px] pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, #eaf2fb 0%, rgba(234,242,251,0.6) 50%, transparent 100%)",
            }}
          />
          <div className="relative h-full w-full">
            <ViewMap height="100%" properties={properties.slice(0, 8)} zoomPosition="bottom-right-hero" />

            {/* Top Floating Badge: Premium Living */}
            <div className="absolute top-20 sm:top-24 left-4 z-30 w-[164px] rounded-2xl border border-slate-100/90 bg-white/95 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="relative h-[36px] w-[36px] shrink-0">
                  <Image
                    src="/layout/nav/side.svg"
                    alt="Premium Living"
                    width={58}
                    height={58}
                    unoptimized
                    priority
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-slate-800 leading-tight truncate">Premium Living</p>
                  <p className="text-[10px] text-slate-500 font-normal leading-tight mt-0.5 truncate">In Greater Noida</p>
                </div>
              </div>

              {/* Bottom Row: Price & Arrow Button */}
              <div className="mt-2.5 pt-0.5 flex items-center justify-between">
                <p className="text-[20px] font-bold text-slate-900 tracking-tight leading-none">
                  1.25 cr
                </p>
                <Link
                  href="/properties?location=Greater+Noida"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1865F2] hover:bg-blue-600 text-white shadow-sm transition-all hover:scale-105 shrink-0"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Bottom Floating Area: Explore on Map Button + 3 Vertical Circular Dots (Exact Match) */}
            <div className="absolute bottom-[76px] lg:bottom-[80px] right-4 sm:right-6 z-30 flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
              {/* Explore on Map Button - Temporarily commented out as requested */}
              {/* <Link
                href="/properties?map=true"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1865F2] to-[#029BE5] px-3.5 py-2 text-[12px] sm:text-[12.5px] font-medium text-white shadow-[0_4px_16px_rgba(24,101,242,0.35)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(24,101,242,0.45)] shrink-0"
              >
                <svg
                  className="h-4 w-4 shrink-0 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" y1="3" x2="9" y2="18" />
                  <line x1="15" y1="6" x2="15" y2="21" />
                  <path d="M12 8.5C10.9 8.5 10 9.4 10 10.5C10 12 12 14 12 14C12 14 14 12 14 10.5C14 9.4 13.1 8.5 12 8.5Z" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="10.5" r="0.8" fill="#1865F2" />
                </svg>
                <span className="tracking-tight whitespace-nowrap">Explore on Map</span>
              </Link> */}

              {/* 3 Vertical Circular Dots - (Previous position on map, now moved to banner left) */}
              {/* <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${activeIndex === index
                      ? "h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#1865F2] shadow-[0_2px_8px_rgba(24,101,242,0.5)] scale-110"
                      : "h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] hover:bg-slate-50"
                      }`}
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>

        {/* Shade is now built into the banner image itself — no separate divider needed */}
      </div>
    </section>
  );
};
