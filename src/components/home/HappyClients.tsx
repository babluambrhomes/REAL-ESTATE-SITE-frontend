"use client";

import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { HappyClientCard } from "./HappyClientCard";

import "swiper/css";

const clients = [
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    name: "Rohit Mehta",
    role: "Home Buyer, Noida",
    rating: 5,
    review:
      "AmbrHomes helped me find the perfect 3BHK in Sector 150. Transparent pricing and zero hidden charges. Highly recommended!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    name: "Anjali Desai",
    role: "Investor, Gurgaon",
    rating: 5,
    review:
      "The team guided me on the best plots with high ROI potential. Their legal verification gave me complete peace of mind.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    name: "Karan Malhotra",
    role: "NRI Buyer",
    rating: 4,
    review:
      "As an NRI, I was worried about the process. They handled the entire documentation remotely and kept me updated at every step.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    name: "Pooja Agarwal",
    role: "Rentee, Ghaziabad",
    rating: 5,
    review:
      "Found a fully furnished 2BHK near my office within a week. Verified agents and quick support throughout the move.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    name: "Siddharth Rao",
    role: "Builder, Delhi",
    rating: 5,
    review:
      "Posting our new project reached thousands of serious buyers. The lead quality is excellent and easy to manage.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    name: "Meghna Singh",
    role: "First-time Homeowner",
    rating: 4,
    review:
      "From site visits to loan assistance, everything was arranged smoothly. Truly a one-stop solution for buying a home.",
  },
];

export const HappyClients = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mx-auto w-full px-6 pb-12 sm:px-10">

      <div className="relative mt-2">
        <Swiper
          // modules={[Autoplay]}
          loop
          speed={600}
          spaceBetween={20}
          // autoplay={{ delay: 4000, disableOnInteraction: false }}
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
          {clients.map((client) => (
            <SwiperSlide key={client.name} className="!h-auto">
              <HappyClientCard {...client} />
            </SwiperSlide>
          ))}
        </Swiper>
{/* 
        <button
          type="button"
          aria-label="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white sm:-left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white sm:-right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button> */}
      </div>
    </section>
  );
};
