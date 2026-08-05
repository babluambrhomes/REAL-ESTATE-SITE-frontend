"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Heading } from "./Heading";
import { PropertyCard } from "./PropertyCard";

import "swiper/css";

const properties = [
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["3, 2 BHK", "2 Bath"],
    title: "Luxury 3BHK in Sector 150",
    phone: "+91 98765 43210",
    location: "Sector 150, Noida",
    price: "₹1.25* Cr",
    originalPrice: "₹1.35 Cr",
    discount: "20%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["2 BHK", "2 Bath"],
    title: "Modern 2BHK Apartment",
    phone: "+91 98765 43210",
    location: "Golf Course Extension, Gurgaon",
    price: "₹85 L",
    originalPrice: "₹95 L",
    discount: "10%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["4 BHK", "3 Bath"],
    title: "Premium Villa with Garden",
    phone: "+91 98765 43210",
    location: "Greater Noida West",
    price: "₹2.4 Cr",
    originalPrice: "₹2.8 Cr",
    discount: "14%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["3 BHK", "2 Bath"],
    title: "Skyline 3BHK High-Rise",
    phone: "+91 98765 43210",
    location: "Indirapuram, Ghaziabad",
    price: "₹1.1 Cr",
    originalPrice: "₹1.3 Cr",
    discount: "15%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["2 BHK", "1 Bath"],
    title: "Cozy 2BHK Near Metro",
    phone: "+91 98765 43210",
    location: "Vaishali, Ghaziabad",
    price: "₹65 L",
    originalPrice: "₹72 L",
    discount: "10%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600584524347-0d93d2dc85c9?auto=format&fit=crop&w=800&q=80",
    verifiedText: "Verified Deal",
    chips: ["5 BHK", "4 Bath"],
    title: "Grand Villa with Pool",
    phone: "+91 98765 43210",
    location: "DLF Phase 5, Gurgaon",
    price: "₹3.2 Cr",
    originalPrice: "₹3.8 Cr",
    discount: "16%",
  },
];

export const FeaturedProperties = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mx-auto w-full px-6 pb-12 sm:px-10">
      <div className="relative mt-6">
        <Swiper
          modules={[Autoplay]}
          loop
          speed={600}
          spaceBetween={20}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-2"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.title} className="!h-auto">
              <PropertyCard {...property} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full   bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white sm:-left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full   bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white sm:-right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};
