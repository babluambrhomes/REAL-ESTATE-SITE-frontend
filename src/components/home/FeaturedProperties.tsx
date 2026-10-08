"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { PropertyCard } from "@/components/card/PropertyCard";
import type { Property } from "@/types";

import "swiper/css";

const API_BASE_URL = "/api/v1";

const FALLBACK_FAST_SELLING: Property[] = [
  {
    id: "nbcc-aspire-1",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    city: "Noida",
    type: "Apartment",
    beds: "3 BHK",
    price: "₹1.25* Cr",
    originalPrice: "₹1.58 Cr",
    verifiedText: "VERIFIED DEAL",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80",
    ],
    chips: ["2, 3 & 4 BHK Apartments"],
    infoChips: [
      { value: "3,200-4,500", label: "Sq. Ft", Icon: "/icon/notes.png" },
      { value: "60%", label: "Amenites", Icon: "/icon/location.png" },
      { value: "Ready", label: "To Move", Icon: "/icon/home.png" },
    ],
    phone: "+91 9876543210",
  },
  {
    id: "nbcc-aspire-2",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    city: "Noida",
    type: "Apartment",
    beds: "3 BHK",
    price: "₹1.25* Cr",
    originalPrice: "₹1.58 Cr",
    verifiedText: "VERIFIED DEAL",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    ],
    chips: ["2, 3 & 4 BHK Apartments"],
    infoChips: [
      { value: "3,200-4,500", label: "Sq. Ft", Icon: "/icon/notes.png" },
      { value: "60%", label: "Amenites", Icon: "/icon/location.png" },
      { value: "Ready", label: "To Move", Icon: "/icon/home.png" },
    ],
    phone: "+91 9876543210",
  },
  {
    id: "nbcc-aspire-3",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    city: "Noida",
    type: "Apartment",
    beds: "3 BHK",
    price: "₹1.25* Cr",
    originalPrice: "₹1.58 Cr",
    verifiedText: "VERIFIED DEAL",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    ],
    chips: ["2, 3 & 4 BHK Apartments"],
    infoChips: [
      { value: "3,200-4,500", label: "Sq. Ft", Icon: "/icon/notes.png" },
      { value: "60%", label: "Amenites", Icon: "/icon/location.png" },
      { value: "Ready", label: "To Move", Icon: "/icon/home.png" },
    ],
    phone: "+91 9876543210",
  },
  {
    id: "nbcc-aspire-4",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    city: "Noida",
    type: "Apartment",
    beds: "3 BHK",
    price: "₹1.25* Cr",
    originalPrice: "₹1.58 Cr",
    verifiedText: "VERIFIED DEAL",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    ],
    chips: ["2, 3 & 4 BHK Apartments"],
    infoChips: [
      { value: "3,200-4,500", label: "Sq. Ft", Icon: "/icon/notes.png" },
      { value: "60%", label: "Amenites", Icon: "/icon/location.png" },
      { value: "Ready", label: "To Move", Icon: "/icon/home.png" },
    ],
    phone: "+91 9876543210",
  },
  {
    id: "nbcc-aspire-5",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    city: "Noida",
    type: "Apartment",
    beds: "3 BHK",
    price: "₹1.25* Cr",
    originalPrice: "₹1.58 Cr",
    verifiedText: "VERIFIED DEAL",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80",
    ],
    chips: ["2, 3 & 4 BHK Apartments"],
    infoChips: [
      { value: "3,200-4,500", label: "Sq. Ft", Icon: "/icon/notes.png" },
      { value: "60%", label: "Amenites", Icon: "/icon/location.png" },
      { value: "Ready", label: "To Move", Icon: "/icon/home.png" },
    ],
    phone: "+91 9876543210",
  },
  {
    id: "nbcc-aspire-6",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    city: "Noida",
    type: "Apartment",
    beds: "3 BHK",
    price: "₹1.25* Cr",
    originalPrice: "₹1.58 Cr",
    verifiedText: "VERIFIED DEAL",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    ],
    chips: ["2, 3 & 4 BHK Apartments"],
    infoChips: [
      { value: "3,200-4,500", label: "Sq. Ft", Icon: "/icon/notes.png" },
      { value: "60%", label: "Amenites", Icon: "/icon/location.png" },
      { value: "Ready", label: "To Move", Icon: "/icon/home.png" },
    ],
    phone: "+91 9876543210",
  },
];

interface FeaturedPropertiesProps {
  title1?: string;
  title2?: string;
  viewAllHref?: string;
}

export const FeaturedProperties = ({
  title1 = "Fast Selling",
  title2 = "Properties",
  viewAllHref = "/properties",
}: FeaturedPropertiesProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [apiProperties, setApiProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/properties?limit=10`, {
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
                title: p.title || "NBCC Aspire Silicon City",
                location: p.location || "Sector 76, Noida",
                city: p.city || "Noida",
                type: p.type || "Apartment",
                beds: p.beds ? `${p.beds} BHK` : "2, 3 & 4 BHK",
                price: p.price ? (typeof p.price === "number" ? `₹${p.price.toLocaleString("en-IN")}` : p.price) : "₹1.25* Cr",
                originalPrice: p.originalPrice || "₹1.58 Cr",
                verifiedText: "VERIFIED DEAL",
                images: p.images?.length
                  ? p.images
                  : p.featuredImage
                  ? [p.featuredImage]
                  : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"],
                chips: p.chips || ["2, 3 & 4 BHK Apartments"],
                infoChips: [
                  { value: p.area || "3,200-4,500", label: "Sq. Ft", Icon: "/icon/location.png" },
                  { value: "60%", label: "Amenites", Icon: "/icon/Frame.svg" },
                  { value: "Ready", label: "To Move", Icon: "/icon/Group.svg" },
                ],
                phone: p.phone || "+91 9876543210",
              }));
            if (mapped.length > 0) {
              setApiProperties(mapped);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      }
    };
    fetchProperties();
  }, []);

  const safeProperties = useMemo(() => {
    // Priority: clean dummy properties matching Figma design
    return FALLBACK_FAST_SELLING;
  }, []);

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8 sm:py-10">
      {/* Section Header matching Figma: | Fast Selling Properties ... view all < > */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-6 sm:h-7 w-1.5 rounded-full bg-[#05A579]" />
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1865F2]">
            {title1} <span>{title2}</span>
          </h2>
        </div>

        {/* Top Right: Exact [ view all < ] ( > ) matching zoomed screenshot */}
        <div className="flex items-center gap-2">
          {/* Left Pill containing "view all" text + circular "<" button */}
          <div className="inline-flex items-center rounded-full border border-[#D3E3FD] bg-white p-0.5 shadow-xs transition-all hover:border-[#B5D4FC]">
            <Link
              href={viewAllHref}
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

      {/* Property Cards Carousel (Exact 408px x 527px Figma cards) */}
      <div className="relative group/carousel">
        <Swiper
          modules={[Autoplay]}
          loop={safeProperties.length > 4}
          speed={600}
          spaceBetween={24}
          slidesPerView="auto"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-9 !pt-3 !px-2.5 -mx-2.5"
        >
          {safeProperties.map((property, idx) => (
            <SwiperSlide
              key={`${property.id || property.title}-${idx}`}
              className="!w-[330px] sm:!w-[380px] lg:!w-[408px] !h-auto shrink-0"
            >
              <PropertyCard {...property} layout="vertical" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* FLOATING LEFT NAV ARROW ON CAROUSEL EDGE */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous"
          className="absolute -left-2.5 sm:-left-3.5 top-1/2 z-20 flex h-8 w-8 sm:h-9 sm:w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-md transition-all hover:bg-[#1865F2] hover:text-white hover:border-[#1865F2] cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* FLOATING RIGHT NAV ARROW ON CAROUSEL EDGE */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next"
          className="absolute -right-2.5 sm:-right-3.5 top-1/2 z-20 flex h-8 w-8 sm:h-9 sm:w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-md transition-all hover:bg-[#1865F2] hover:text-white hover:border-[#1865F2] cursor-pointer"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </section>
  );
};
