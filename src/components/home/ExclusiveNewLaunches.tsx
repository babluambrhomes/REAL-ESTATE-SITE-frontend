"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";

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
      price: "₹ 1.65 Cr*",
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
      price: "₹ 2.45 Cr*",
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
      price: "₹ 4.17 Lakh*",
      verifiedText: "NEW LAUNCH",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      ],
      chips: ["3 BHK Apartment", "4 BHK Apartment"],
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
      price: "₹ 82.50 Lakh*",
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
      price: "₹ 65.40 Lakh*",
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
      price: "₹ 1.35 Cr*",
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
      price: "₹ 2.85 Cr*",
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
      price: "₹ 25.00 Cr*",
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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/auth\/?$/, "") ?? "";

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
        list.push(propList[0]);
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
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Exclusive <span className="text-[#1865F2]">New Launches</span>
          </h2>
          <div className="mt-2.5 border-l-[3px] border-[#1865F2] pl-3 py-0.5">
            <p className="text-xs sm:text-sm font-medium text-slate-600 leading-tight">
              Explore handpicked premium properties across Delhi NCR
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 leading-tight mt-0.5">
              Luxury living redefined for you
            </p>
          </div>
        </div>

        {/* DYNAMIC LOCALITY THUMBNAILS + STACKED MORE CARDS DECK */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pt-4 pb-2 scrollbar-hide no-scrollbar [&::-webkit-scrollbar]:hidden pr-6">
          {visibleLocalities.map((loc) => {
            const isActive = activeLocality === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => handleSelectLocality(loc.id)}
                className={`group flex flex-col items-center w-[104px] sm:w-[114px] md:w-[120px] h-[110px] sm:h-[118px] md:h-[124px] shrink-0 rounded-[22px] sm:rounded-[24px] bg-white p-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-[2.5px] border-[#1865F2] shadow-lg ring-2 ring-blue-100/90"
                    : "border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-sm"
                }`}
              >
                <div className="relative h-[68px] sm:h-[74px] md:h-[80px] w-full overflow-hidden rounded-[15px] bg-slate-100">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <p
                  className={`mt-2 w-full truncate text-center text-[11.5px] sm:text-[12.5px] font-semibold ${
                    isActive ? "text-[#1865F2]" : "text-slate-700"
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
            className="relative h-[110px] sm:h-[118px] md:h-[124px] w-[104px] sm:w-[114px] md:w-[120px] shrink-0 cursor-pointer group select-none ml-1 mr-4"
            title="Click to view more localities"
          >
            {/* Card Layer 1 (Deep Back: Rotated +9deg & Translated Top-Right) */}
            <div className="absolute inset-0 rounded-[22px] sm:rounded-[24px] border border-slate-200/90 bg-white p-1.5 shadow-sm transition-transform duration-300 translate-x-4 -translate-y-2.5 rotate-[9deg] group-hover:translate-x-5 group-hover:-translate-y-3">
              <div className="relative h-[68px] sm:h-[74px] md:h-[80px] w-full overflow-hidden rounded-[15px] bg-slate-100 opacity-80">
                <Image
                  src={stackedLocalities[2]?.image || ALL_LOCALITIES[0].image}
                  alt="More Locality"
                  fill
                  sizes="120px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Card Layer 2 (Middle: Rotated +4.5deg & Translated Top-Right) */}
            <div className="absolute inset-0 rounded-[22px] sm:rounded-[24px] border border-slate-200/90 bg-white p-1.5 shadow-sm transition-transform duration-300 translate-x-2 -translate-y-1.5 rotate-[4.5deg] group-hover:translate-x-2.5 group-hover:-translate-y-2">
              <div className="relative h-[68px] sm:h-[74px] md:h-[80px] w-full overflow-hidden rounded-[15px] bg-slate-100 opacity-90">
                <Image
                  src={stackedLocalities[1]?.image || ALL_LOCALITIES[1].image}
                  alt="More Locality"
                  fill
                  sizes="120px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Card Layer 3 (Front Top Card: Crisp & Clickable) */}
            <div className="relative z-10 flex flex-col items-center h-full w-full rounded-[22px] sm:rounded-[24px] border border-slate-200/95 bg-white p-2 shadow-md transition-all duration-200 group-hover:border-blue-300">
              <div className="relative h-[68px] sm:h-[74px] md:h-[80px] w-full overflow-hidden rounded-[15px] bg-slate-100">
                <Image
                  src={stackedLocalities[0]?.image || ALL_LOCALITIES[2].image}
                  alt={stackedLocalities[0]?.name || "More"}
                  fill
                  sizes="120px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <p className="mt-2 w-full truncate text-center text-[11.5px] sm:text-[12.5px] font-semibold text-slate-700">
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
          className="!pt-2 !pb-4 overflow-hidden rounded-[28px]"
        >
          {currentProperties.map((project, index) => {
            const image = project.images?.[0];
            const imageUrl = getImageUrl(image, index);

            return (
              <SwiperSlide key={`${project.id || project.title}-${index}`}>
                <div className="relative h-[420px] sm:h-[480px] w-full pl-2.5">
                  {/* 3D RIBBON NEW LAUNCH BADGE (1:1 EXACT FIGMA MATCH) */}
                  <div className="absolute left-0 top-7 z-20 select-none">
                    <div className="relative flex items-center bg-[#E60049] px-3.5 py-1.5 shadow-md">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                        NEW LAUNCH
                      </span>
                      {/* 3D Fold Corner Triangle underneath overhang */}
                      <div className="absolute -bottom-2 left-0 h-0 w-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-[#9F1239]" />
                    </div>
                  </div>

                  {/* CARD CONTAINER WITH IMAGE & ROUNDED EDGES */}
                  <div className="relative h-full w-full overflow-hidden rounded-[26px] shadow-lg border border-slate-100 bg-slate-900 group">
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

                    {/* FLOATING BOTTOM RIGHT DETAIL CARD (1:1 FIGMA EXACT MATCH) */}
                    <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:bottom-5 sm:w-[380px] max-w-[calc(100%-2rem)] rounded-[28px] bg-white p-5 sm:p-6 shadow-[0_16px_44px_rgba(24,101,242,0.22),0_2px_12px_rgba(0,0,0,0.06)] border border-[#DCE8FE]">
                      {/* TITLE */}
                      <h3 className="text-xl sm:text-[22px] font-black text-[#000000] tracking-tight truncate">
                        {project.title}
                      </h3>

                      {/* LOCATION WITH BLUE PIN & WHITE INNER CIRCLE */}
                      <div className="mt-1.5 flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-[#0F172A]">
                        <svg
                          className="h-5 w-5 shrink-0 text-[#1865F2]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="truncate">{project.location}</span>
                      </div>

                      {/* STARTING FROM HEADING */}
                      <p className="mt-3.5 text-[11.5px] font-black tracking-wide text-[#000000] uppercase">
                        STARTING FROM
                      </p>

                      {/* PRICE & BHK PILLS ROW */}
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <div className="flex items-start">
                          <span className="text-xl sm:text-[24px] font-black text-[#1865F2] leading-none">
                            {project.price?.replace(/\*$/, "") || "₹ 4.17 Lakh"}
                          </span>
                          <span className="text-sm font-black text-[#1865F2] -mt-0.5 ml-0.5 select-none">
                            ★
                          </span>
                        </div>

                        {/* BHK PILL TAGS (MATCHES FIGMA LIGHT BLUE BACKGROUND & BLUE TEXT) */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {(project.chips || ["3 BHK Apartment", "4 BHK Apartment"]).map((chip) => (
                            <span
                              key={chip}
                              className="rounded-[8px] bg-[#9DBEFF] border border-[#7AA5FF] px-2.5 py-1 text-[11px] sm:text-[11.5px] font-bold text-[#1865F2] shadow-2xs"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* KNOW MORE BUTTON (EXACT DEEP NAVY TO ROYAL BLUE GRADIENT & ROUNDED SHAPE) */}
                      <div className="mt-3.5">
                        <Link
                          href={project.id ? `/property/${project.id}` : `/properties/${encodeURIComponent(project.title)}`}
                          className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-[#0C3896] via-[#124DBE] to-[#1E62EC] px-5 py-2.5 text-[13px] font-bold text-white shadow-md shadow-blue-900/25 hover:from-[#092B74] hover:to-[#1752CA] hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                          <span>Know More</span>
                          <ArrowRight className="h-4 w-4 stroke-[2.5]" />
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