"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import type { Property } from "@/types";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface LocalityTab {
  id: string;
  name: string;
  image: string;
}

// 1. Strict Sequence of Localities matching Figma
const ALL_LOCALITIES: LocalityTab[] = [
  {
    id: "sec-150",
    name: "Noida Sec 150",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "expressway",
    name: "Noida Express...",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "central-noida",
    name: "Central Noida",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "knowledge-park",
    name: "Knowledge Park",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "yamuna-exp",
    name: "Yamuna Expre...",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "greater-noida",
    name: "Greater Noida",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dwarka-exp",
    name: "Dwarka Exp...",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "golf-course",
    name: "Golf Course Ext",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80",
  },
];

// 2. High-Quality Fallback Properties per Locality (Exact Figma Architecture)
const LOCALITY_PROPERTIES: Record<string, Property[]> = {
  "sec-150": [
    {
      id: "ats-pristine-150",
      title: "ATS Pristine Sector 150",
      location: "Sector 150, Noida",
      city: "Noida",
      type: "Apartment",
      beds: "3 BHK",
      price: "₹ 1.65 Cr",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["3 BHK Luxury", "4 BHK Grand"],
      phone: "+91 9876543210",
      category: "New Launch",
    },
  ],
  "expressway": [
    {
      id: "ats-knightsbridge-exp",
      title: "ATS Knightsbridge",
      location: "Sector 124, Noida Expressway",
      city: "Noida",
      type: "Apartment",
      beds: "4 BHK",
      price: "₹ 2.45 Cr",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["3 BHK", "4 BHK Luxury"],
      phone: "+91 9876543210",
      category: "New Launch",
    },
  ],
  "central-noida": [
    {
      id: "nbcc-aspire-silicon",
      title: "NBCC Aspire Silicon City",
      location: "Sector 76, Noida",
      city: "Noida",
      type: "Apartment",
      beds: "3 BHK",
      price: "₹ 4.17 Lakh",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["3 BHK Apartment", "4 BHK Apartment"],
      phone: "+91 9876543210",
      category: "New Launch",
    },
    {
      id: "amrapali-silicon-city",
      title: "Amrapali Silicon City",
      location: "Sector 76, Noida",
      city: "Noida",
      type: "Apartment",
      beds: "2 BHK",
      price: "₹93.23 Lakh",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["2 BHK", "3 BHK", "4 BHK"],
      phone: "+91 9876543210",
      category: "New Launch",
    },
  ],
  "knowledge-park": [
    {
      id: "stellar-one-kp",
      title: "Stellar One Luxury",
      location: "Knowledge Park, Greater Noida",
      city: "Greater Noida",
      type: "Apartment",
      beds: "3 BHK",
      price: "₹ 82.50 Lakh",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["2 BHK", "3 BHK"],
      phone: "+91 9876543210",
      category: "New Launch",
    },
  ],
  "yamuna-exp": [
    {
      id: "gaur-yamuna-city",
      title: "Gaur Yamuna City",
      location: "Yamuna Expressway, Greater Noida",
      city: "Greater Noida",
      type: "Apartment",
      beds: "2 BHK",
      price: "₹ 65.40 Lakh",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["2 BHK Lakeview", "3 BHK"],
      phone: "+91 9876543210",
      category: "New Launch",
    },
  ],
  "greater-noida": [
    {
      id: "purvanchal-royal-city",
      title: "Purvanchal Royal City",
      location: "Chi V, Greater Noida",
      city: "Greater Noida",
      type: "Apartment",
      beds: "3 BHK",
      price: "₹ 1.35 Cr",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["3 BHK Royal", "4 BHK"],
      phone: "+91 9876543210",
      category: "New Launch",
    },
  ],
  "dwarka-exp": [
    {
      id: "m3m-capital-dwarka",
      title: "M3M Capital Golf Residential",
      location: "Sector 113, Dwarka Expressway",
      city: "Gurgaon",
      type: "Apartment",
      beds: "3 BHK",
      price: "₹ 2.85 Cr",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["3 BHK Luxury", "4 BHK"],
      phone: "+91 9876543210",
      category: "New Launch",
    },
  ],
  "golf-course": [
    {
      id: "dlf-camellias-golf",
      title: "DLF The Camellias",
      location: "Sector 42, Golf Course Road",
      city: "Gurgaon",
      type: "Apartment",
      beds: "4 BHK",
      price: "₹ 25.00 Cr",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["4 BHK Ultra Luxury", "6 BHK"],
      phone: "+91 9876543210",
      category: "New Launch",
    },
  ],
};

interface ExclusiveNewLaunchesProps {
  projects?: Property[];
}

const API_BASE_URL = "/api/v1";

export const ExclusiveNewLaunches = ({
  projects: initialProjects,
}: ExclusiveNewLaunchesProps) => {
  const [apiProjects, setApiProjects] = useState<Property[]>([]);
  const [activeLocality, setActiveLocality] = useState<string>("sec-150");
  const [localityOffset, setLocalityOffset] = useState<number>(0);

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      return;
    }
    const fetchNewLaunches = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/properties?category=New%20Launch&limit=10`, {
          cache: "no-store",
        });
        if (response.ok) {
          const json = await response.json();
          const items = json.data?.data || json.data || [];
          if (Array.isArray(items) && items.length > 0) {
            const mapped: Property[] = items
              .filter((p: any) => p.images?.length > 0 || p.featuredImage)
              .map((p: any) => ({
                id: p.id || p._id,
                title: p.title || "Luxury Residential Project",
                location: p.location || `${p.city || "Noida"}, ${p.state || "UP"}`,
                city: p.city || "Noida",
                type: p.type || "Apartment",
                beds: p.beds ? `${p.beds} BHK` : "3 BHK",
                price: p.price ? (typeof p.price === "number" ? `₹ ${p.price.toLocaleString("en-IN")}*` : p.price) : "₹ 1.25 Cr*",
                verifiedText: "NEW LAUNCH",
                images: p.images?.length
                  ? p.images
                  : p.featuredImage
                  ? [p.featuredImage]
                  : ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"],
                chips: p.chips || ["3 BHK Apartment", "4 BHK Apartment"],
                phone: p.phone || "+91 9876543210",
                category: "New Launch",
              }));
            if (mapped.length > 0) {
              setApiProjects(mapped);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching new launches:", err);
      }
    };
    fetchNewLaunches();
  }, [initialProjects]);

  // Sequence of Properties starting with active locality on the LEFT and next locality on the RIGHT
  const currentProperties = useMemo(() => {
    const activeIdx = ALL_LOCALITIES.findIndex((loc) => loc.id === activeLocality);
    const startIdx = activeIdx >= 0 ? activeIdx : 0;

    const list: Property[] = [];
    for (let i = 0; i < ALL_LOCALITIES.length; i++) {
      const loc = ALL_LOCALITIES[(startIdx + i) % ALL_LOCALITIES.length];
      const propList = LOCALITY_PROPERTIES[loc.id];
      if (propList && propList.length > 0) {
        list.push(...propList);
      }
    }
    return list;
  }, [activeLocality]);

  const getImageUrl = (imagePath?: string | null, fallbackIndex: number = 0) => {
    const backupList = [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    ];
    if (!imagePath) return backupList[fallbackIndex % backupList.length];
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const cleanBase = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
    return `${cleanBase}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  // 5 Visible Primary Localities in strict order + 3 Stacked Localities behind the "More" deck
  const visibleCount = 5;
  const visibleLocalities = useMemo(() => {
    const list: LocalityTab[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (localityOffset + i) % ALL_LOCALITIES.length;
      list.push(ALL_LOCALITIES[idx]);
    }
    return list;
  }, [localityOffset]);

  const stackedLocalities = useMemo(() => {
    const list: LocalityTab[] = [];
    for (let i = 0; i < 3; i++) {
      const idx = (localityOffset + visibleCount + i) % ALL_LOCALITIES.length;
      list.push(ALL_LOCALITIES[idx]);
    }
    return list;
  }, [localityOffset]);

  const handleCycleLocalities = () => {
    const nextOffset = (localityOffset + 1) % ALL_LOCALITIES.length;
    setLocalityOffset(nextOffset);
    setActiveLocality(ALL_LOCALITIES[nextOffset].id);
    swiperRef.current?.slideTo(0);
  };

  const handleSelectLocality = (id: string) => {
    setActiveLocality(id);
    swiperRef.current?.slideTo(0);
  };

  const handleNext = () => {
    const currentIdx = ALL_LOCALITIES.findIndex((loc) => loc.id === activeLocality);
    const nextIdx = (currentIdx + 1) % ALL_LOCALITIES.length;
    setActiveLocality(ALL_LOCALITIES[nextIdx].id);
    swiperRef.current?.slideTo(0);
  };

  const handlePrev = () => {
    const currentIdx = ALL_LOCALITIES.findIndex((loc) => loc.id === activeLocality);
    const prevIdx = (currentIdx - 1 + ALL_LOCALITIES.length) % ALL_LOCALITIES.length;
    setActiveLocality(ALL_LOCALITIES[prevIdx].id);
    swiperRef.current?.slideTo(0);
  };

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8 sm:py-10">
      {/* =========================================================
          TOP HEADER WITH LOCALITY TABS (MATCHES FIGMA EXACTLY)
      ========================================================== */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/* HEADING & SUBTITLE */}
        <div className="shrink-0">
          <h2 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-bold tracking-normal text-[#000000] leading-snug whitespace-nowrap">
            Exclusive <span className="text-[#2563EB]">New Launches</span>
          </h2>
          <div className="mt-2 border-l-[3px] border-[#2563EB] pl-3 py-0.5">
            <p className="text-[12px] sm:text-[13px] font-normal text-slate-800 leading-snug">
              Explore handpicked premium properties across Delhi NCR
            </p>
            <p className="text-[12px] sm:text-[13px] font-normal text-slate-800 leading-snug mt-0.5">
              Luxury living redefined for you
            </p>
          </div>
        </div>

        {/* DYNAMIC LOCALITY THUMBNAILS + STACKED MORE CARDS DECK */}
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 overflow-x-auto pt-2.5 pb-1.5 pr-2 scrollbar-hide no-scrollbar [&::-webkit-scrollbar]:hidden shrink-0">
          {visibleLocalities.map((loc) => {
            const isActive = activeLocality === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => handleSelectLocality(loc.id)}
                className={`group flex flex-col items-center w-[88px] sm:w-[94px] md:w-[98px] h-[92px] sm:h-[96px] md:h-[100px] shrink-0 rounded-[8px] sm:rounded-[10px] bg-white p-1.5 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-[2px] border-[#2563EB] shadow-md ring-2 ring-blue-100/80"
                    : "border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-sm"
                }`}
              >
                <div className="relative h-[54px] sm:h-[58px] md:h-[62px] w-full overflow-hidden rounded-[6px] sm:rounded-[7px] bg-slate-100">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    sizes="100px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <p
                  className={`mt-1.5 w-full truncate text-center text-[10.5px] sm:text-[11px] font-semibold ${
                    isActive ? "text-[#2563EB]" : "text-slate-700"
                  }`}
                >
                  {loc.name}
                </p>
              </button>
            );
          })}

          {/* 3D STACKED "MORE" CARDS DECK (FIGMA 1:1) */}
          <div
            onClick={handleCycleLocalities}
            className="relative h-[92px] sm:h-[96px] md:h-[100px] w-[88px] sm:w-[94px] md:w-[98px] shrink-0 cursor-pointer group select-none ml-0.5 mr-2"
            title="Click to view more localities"
          >
            {/* Card Layer 1 (Deep Back: Rotated +6deg & Translated Top-Right) */}
            <div className="absolute inset-0 rounded-[8px] sm:rounded-[10px] border border-slate-200/90 bg-white p-1 shadow-xs transition-transform duration-200 translate-x-2 -translate-y-1.5 rotate-[6deg] group-hover:translate-x-2.5 group-hover:-translate-y-2">
              <div className="relative h-[54px] sm:h-[58px] md:h-[62px] w-full overflow-hidden rounded-[6px] sm:rounded-[7px] bg-slate-100 opacity-75">
                <Image
                  src={stackedLocalities[2]?.image || ALL_LOCALITIES[0].image}
                  alt="More Locality"
                  fill
                  sizes="100px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Card Layer 2 (Middle: Rotated +3deg & Translated Top-Right) */}
            <div className="absolute inset-0 rounded-[8px] sm:rounded-[10px] border border-slate-200/90 bg-white p-1 shadow-xs transition-transform duration-200 translate-x-1 -translate-y-0.5 rotate-[3deg] group-hover:translate-x-1.5 group-hover:-translate-y-1">
              <div className="relative h-[54px] sm:h-[58px] md:h-[62px] w-full overflow-hidden rounded-[6px] sm:rounded-[7px] bg-slate-100 opacity-85">
                <Image
                  src={stackedLocalities[1]?.image || ALL_LOCALITIES[1].image}
                  alt="More Locality"
                  fill
                  sizes="100px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Card Layer 3 (Front Top Card: Crisp & Clickable) */}
            <div className="relative z-10 flex flex-col items-center h-full w-full rounded-[8px] sm:rounded-[10px] border border-slate-200/95 bg-white p-1.5 shadow-sm transition-all duration-200 group-hover:border-blue-300">
              <div className="relative h-[54px] sm:h-[58px] md:h-[62px] w-full overflow-hidden rounded-[6px] sm:rounded-[7px] bg-slate-100">
                <Image
                  src={stackedLocalities[0]?.image || ALL_LOCALITIES[2].image}
                  alt={stackedLocalities[0]?.name || "More"}
                  fill
                  sizes="100px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <p className="mt-1.5 w-full truncate text-center text-[10.5px] sm:text-[11px] font-semibold text-slate-700">
                {stackedLocalities[0]?.name || "Noida Sec 150"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          LARGE 2-CARD SHOWCASE CAROUSEL (1:1 FIGMA DESIGN)
      ========================================================== */}
      <div className="relative group/carousel">
        <Swiper
          key={activeLocality}
          loop={currentProperties.length > 2}
          speed={600}
          spaceBetween={22}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pt-2 !pb-4 overflow-hidden rounded-[14px] sm:rounded-[16px]"
        >
          {currentProperties.map((project, index) => {
            const image = project.images?.[0];
            const imageUrl = getImageUrl(image, index);

            return (
              <SwiperSlide key={`${project.id || project.title}-${index}`}>
                <div className="relative h-[375px] sm:h-[415px] w-full pl-2">
                  {/* 3D RIBBON NEW LAUNCH BADGE (1:1 EXACT FIGMA MATCH) */}
                  <div className="absolute left-0 top-6 z-20 select-none">
                    <div className="relative flex items-center bg-[#E60049] px-3.5 py-1.5 shadow-md">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                        NEW LAUNCH
                      </span>
                      {/* 3D Fold Corner Triangle underneath overhang - precisely flush with card image */}
                      <svg
                        className="absolute -bottom-2 left-0 h-2 w-[8.5px]"
                        viewBox="0 0 8.5 8"
                        fill="none"
                      >
                        <path d="M0 0 L8.5 0 L8.5 8 Z" fill="#9F1239" />
                      </svg>
                    </div>
                  </div>

                  {/* CARD CONTAINER WITH IMAGE & ROUNDED EDGES */}
                  <div className="relative h-full w-full overflow-hidden rounded-[14px] sm:rounded-[16px] shadow-lg bg-slate-900 group">
                    {/* MAIN HIGH-RES IMAGE */}
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />

                    {/* SUBTLE GRADIENT SHADE OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                    {/* FLOATING BOTTOM RIGHT DETAIL CARD (1:1 FIGMA PROPORTIONS) */}
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-[285px] sm:w-[315px] max-w-[calc(100%-1.5rem)] h-[146px] sm:h-[154px] flex flex-col justify-between rounded-[16px] sm:rounded-[18px] bg-white p-3 sm:p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.14)] border border-[#E2E8F0]">
                      {/* TOP SECTION: TITLE & LOCATION */}
                      <div className="min-w-0">
                        {/* TITLE */}
                        <h3
                          title={project.title}
                          className="text-[15px] sm:text-[16px] font-bold text-[#000000] leading-snug tracking-tight truncate"
                        >
                          {project.title}
                        </h3>

                        {/* LOCATION */}
                        <div className="mt-1 flex items-center gap-1.5 text-[11.5px] sm:text-[12px] font-medium text-slate-700 leading-tight min-w-0">
                          <Image
                            src="/icon/launch_card_pin.png"
                            alt="Location"
                            width={14}
                            height={18}
                            className="h-3.5 w-3 shrink-0 object-contain"
                            unoptimized
                          />
                          <span className="truncate" title={project.location}>
                            {project.location}
                          </span>
                        </div>
                      </div>

                      {/* MIDDLE SECTION: STARTING FROM, PRICE & BHK PILLS */}
                      <div className="min-w-0">
                        {/* STARTING FROM HEADING */}
                        <p className="text-[9px] sm:text-[9.5px] font-semibold text-slate-500 uppercase leading-none tracking-wider">
                          STARTING FROM
                        </p>

                        {/* PRICE & BHK PILLS ROW */}
                        <div className="mt-1 flex items-center gap-1.5 min-w-0 overflow-visible">
                          {/* PRICE WITH SUPERSCRIPT BLUE STAR */}
                          <div className="flex items-center shrink-0 leading-none">
                            <span className="text-[15.5px] sm:text-[16.5px] font-bold text-[#2563EB] leading-none shrink-0 whitespace-nowrap">
                              {(project.price || "₹ 4.17 Lakh").replace(/\*/g, "").trim()}
                            </span>
                            <span className="inline-flex self-start -mt-0.5 ml-0.5 shrink-0 overflow-visible">
                              <Image
                                src="/icon/launch_card_star.png"
                                alt="*"
                                width={12}
                                height={12}
                                className="h-3 w-3 shrink-0 object-contain overflow-visible"
                                style={{ width: "11px", height: "11px" }}
                                unoptimized
                              />
                            </span>
                          </div>

                          {/* BHK PILL TAGS */}
                          <div className="flex items-center gap-1.5 overflow-hidden flex-nowrap min-w-0 flex-1">
                            {(project.chips || ["3 BHK Apartment", "4 BHK Apartment"]).slice(0, 2).map((chip) => (
                              <span
                                key={chip}
                                title={chip}
                                className="inline-flex items-center rounded-[4px] bg-[#E8F1FF] px-2 py-0.5 text-[10px] sm:text-[10.5px] font-semibold text-[#2563EB] leading-none whitespace-nowrap truncate min-w-0 max-w-[85px] sm:max-w-[95px]"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM SECTION: KNOW MORE BUTTON WITH BLUE GRADIENT */}
                      <div>
                        <Link
                          href={project.id ? `/properties/${project.id}` : `/properties/${encodeURIComponent(project.title)}`}
                          className="inline-flex items-center gap-1.5 rounded-[7px] bg-gradient-to-r from-[#163C8F] via-[#1D4EB8] to-[#235EE0] hover:brightness-110 active:scale-[0.98] px-3.5 py-1.5 text-[11.5px] sm:text-[12px] font-semibold text-white shadow-sm transition-all cursor-pointer leading-none"
                        >
                          <span>Know More</span>
                          <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* LEFT NAV ARROW */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous property"
          className="absolute -left-3.5 sm:-left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-all hover:bg-[#1865F2] hover:text-white hover:border-[#1865F2] cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* RIGHT NAV ARROW */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next property"
          className="absolute -right-3.5 sm:-right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-all hover:bg-[#1865F2] hover:text-white hover:border-[#1865F2] cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};