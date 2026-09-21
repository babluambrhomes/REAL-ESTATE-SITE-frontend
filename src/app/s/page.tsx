"use client";

import { Heading } from "@/components/home/Heading";
import { SearchHeader } from "@/components/layout/SearchHeader";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, MapPin, SlidersHorizontal, X, ChevronLeft, ChevronRight, BadgeCheck, Heart, MoveRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

const agents = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b",
    name: "Jitender Singh",
    designation: "Senior Sales Partner",
    listings: 120,
    years: 8,
    rating: 4.9,
  },
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    name: "Rahul Sharma",
    designation: "Residential Expert",
    listings: 142,
    years: 6,
    rating: 4.8,
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    name: "Priya Verma",
    designation: "Luxury Home Specialist",
    listings: 98,
    years: 5,
    rating: 4.9,
  },
  {
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    name: "Amit Gupta",
    designation: "Commercial Advisor",
    listings: 156,
    years: 10,
    rating: 4.7,
  },
  {
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    name: "Sneha Kapoor",
    designation: "NRI Specialist",
    listings: 110,
    years: 7,
    rating: 5.0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    name: "Vikram Singh",
    designation: "Investment Advisor",
    listings: 88,
    years: 4,
    rating: 4.6,
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    name: "Neha Malhotra",
    designation: "Property Consultant",
    listings: 134,
    years: 9,
    rating: 4.8,
  },
];



const specialistAgents = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b",
    name: "Jitender Singh",
    specialization: "Luxury Homes",
    location: ["Golf Course Road, Gurgaon"],
    years: 8,
    listings: 120,
    bio: "Specializes in premium luxury villas and high-end penthouses across NCR.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    name: "Rahul Sharma",
    specialization: "Commercial",
    location: ["Sector 62", "Noida"],
    years: 6,
    listings: 142,
    bio: "Office spaces, retail plazas and warehouse solutions with ROI-focused advice.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    name: "Priya Verma",
    specialization: "Builder Floor",
    location: ["Dwarka", "Delhi"],
    years: 5,
    listings: 98,
    bio: "Budget to premium builder floors with complete legal documentation support.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    name: "Amit Gupta",
    specialization: "Farmhouse",
    location: ["Chhatarpur", "South Delhi"],
    years: 10,
    listings: 156,
    bio: "Certified farmhouse expert dealing in managed farm properties and plots.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    name: "Sneha Kapoor",
    specialization: "NRI Properties",
    location: ["Noida Extension"],
    years: 7,
    listings: 110,
    bio: "End-to-end NRI buying support with remote site visits and easy payment plans.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    name: "Vikram Singh",
    specialization: "Penthouse",
    location: ["Central Gurgaon"],
    years: 4,
    listings: 88,
    bio: "Sky residences and duplex penthouses with premium clubhouse amenities.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    name: "Neha Malhotra",
    specialization: "Resale & Turnkey",
    location: ["Ghaziabad", "Indirapuram"],
    years: 9,
    listings: 134,
    bio: "Instant possession resale units and fully furnished turnkey homes.",
  },
];


export default function SellerPage() {
  const [activeTab, setActiveTab] = useState<"agents" | "builders">("agents");
  const [filterOpen, setFilterOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <SearchHeader />
      <div className="pt-20" />
      <section className=" w-full  px-6 sm:px-10">
        <div className="w-full overflow-hidden rounded-xl ">
          <Image src='/banner/seller_banner.png' alt='seller hero baaner' className="w-full object-cover" width={800} height={200} />
        </div>

        <div className="flex flex-col gap-3 pb-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 self-start rounded-full bg-gray-100 p-1 ring-1 ring-black/5">
            {(["agents", "builders"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "cursor-pointer rounded-full px-6 py-2 text-sm font-semibold capitalize transition-all duration-200",
                  activeTab === tab
                    ? "bg-white text-primary shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setFilterOpen((prev) => !prev)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold shadow-sm transition-all duration-200",
                filterOpen
                  ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                  : "border-primary/30 bg-white text-primary hover:bg-primary/5"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {filterOpen ? "Hide Filter" : "Search By Filter"}
            </button>

            {filterOpen && (
              <div className="absolute right-0 z-20 mt-3 w-80 origin-top-right animate-[fadeIn_.2s_ease-out] rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-bold text-gray-900">Filter</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFilterOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
                      Location
                    </label>
                    <div className="flex h-9.5 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <input
                        placeholder="Search by city or locality"
                        className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
                        Min Budget
                      </label>
                      <select className="h-9.5 w-full rounded-xl border border-gray-200 bg-white px-2.5 text-sm font-medium text-gray-900 outline-none focus:border-primary">
                        <option>Any</option>
                        <option>₹ 20 L</option>
                        <option>₹ 50 L</option>
                        <option>₹ 1 Cr</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
                        Max Budget
                      </label>
                      <select className="h-9.5 w-full rounded-xl border border-gray-200 bg-white px-2.5 text-sm font-medium text-gray-900 outline-none focus:border-primary">
                        <option>Any</option>
                        <option>₹ 1 Cr</option>
                        <option>₹ 3 Cr</option>
                        <option>₹ 5 Cr+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
                      Experience
                    </label>
                    <select className="h-9.5 w-full rounded-xl border border-gray-200 bg-white px-2.5 text-sm font-medium text-gray-900 outline-none focus:border-primary">
                      <option>Any</option>
                      <option>1 - 5 years</option>
                      <option>5 - 10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
                      Sort By
                    </label>
                    <select className="h-9.5 w-full rounded-xl border border-gray-200 bg-white px-2.5 text-sm font-medium text-gray-900 outline-none focus:border-primary">
                      <option>Most Listings</option>
                      <option>Highest Rated</option>
                      <option>Most Followers</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>

                <hr className="my-4 border-gray-100" />

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="cursor-pointer flex-1 rounded-xl border border-gray-200 bg-white py-2 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
                  >
                    <Check className="h-4 w-4" />
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </section>


      <section className="relative">
        <div className="relative flex items-center justify-between pr-10">
          <Heading title1="Top Rated" title2="Agents" />
          <div className=" flex items-center gap-2 sm:right-10">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative px-10">
          <Swiper
            // modules={[Autoplay]}
            loop
            speed={600}
            spaceBetween={20}
            // autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!px-2 !py-2"
          >
            {agents.map((agent) => (
              <SwiperSlide key={agent.name} className="!h-auto">
                <div className="group h-full overflow-hidden   transition-all duration-200 hover:-translate-y-1 ">
                  <div className="relative rounded-2xl h-40 w-full overflow-hidden">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />


                    <div className="absolute top-2 right-1 flex items-center gap-1.5 rounded-full  px-2 py-1 ">

                      <BadgeCheck className="h-6 w-6 text-secondary" />
                    </div>
                  </div>

                  <div className="p-2">
                    <h3 className="text-base text-center font-bold text-gray-900">{agent.name}</h3>


                    <div className="mt-1 mb-2 flex items-center justify-center gap-1">
                      <p className="text-sm font-medium text-gray-600">{agent.listings} Listings</p>
                      <span className="text-sm font-medium text-secondary">•</span>
                      <p className="text-sm font-medium text-gray-600">{agent.years} Years</p>

                    </div>

                    <button
                      type="button"
                      className="flex-1 cursor-pointer w-full  rounded-full bg-primary px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-secondary/90"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="relative">
        <div className="relative flex items-center justify-between pr-10">
          <Heading title1="Specialization" title2="Agents" />
          <div className=" flex items-center gap-2 sm:right-10">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative px-10">
          <Swiper
            // modules={[Autoplay]}
            loop
            speed={600}
            spaceBetween={20}
            // autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!px-2 !py-2"
          >
            {specialistAgents.map((agent) => (
              <SwiperSlide key={agent.name} className="!h-auto">
                <div className="group h-full overflow-hidden border rounded-xl border-gray-100 transition-all duration-200 hover:-translate-y-1">
                  <div className="relative h-40 w-full overflow-hidden ">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className=" object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0  bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />

                    <div className="absolute right-1 top-2 bg-white/50 flex items-center gap-1.5 rounded-full px-2 py-1">
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="p-2">
                    <div className="flex items-center gap-1">
                      <h3 className=" text-base font-bold text-gray-900">{agent.name}</h3>
                      <BadgeCheck className="h-4 w-4 text-secondary" />
                    </div>

                    <h5 className="text-sm font-medium text-gray-900">{agent.specialization}</h5>

                    <div className="mt-1 mb-2 flex items-center gap-1">
                      {agent.location.map((location, index) => (
                        <p key={index} className="text-sm font-medium text-gray-600">
                          {location}
                        </p>
                      ))}
                    </div>
                    <div className="mt-1 mb-2 flex items-center gap-1">
                      <p className="text-sm bg-gray-200 px-2 font-medium text-gray-600">{agent.years} Years</p>
                      <p className="text-sm bg-gray-200 px-2 font-medium text-gray-600">{agent.listings} Listings</p>
                    </div>

                    <p className="text-[12px] text-gray-600 mb-3 line-clamp-2">{agent.bio}</p>

                    <button
                      type="button"
                      className="flex-1 cursor-pointer w-full rounded-md bg-primary px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-secondary/90"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="relative">
        <div className="relative flex items-center justify-between pr-10">
          <Heading title1="Agent" title2="Near By" />
          <div className=" flex items-center gap-2 sm:right-10">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative px-10">
          <Swiper
            // modules={[Autoplay]}
            loop
            speed={600}
            spaceBetween={20}
            // autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!px-2 !py-2"
          >
            {specialistAgents.map((agent) => (
              <SwiperSlide key={agent.name} className="!h-auto">
                <div className="group h-full overflow-hidden border rounded-xl border-gray-100 transition-all duration-200 hover:-translate-y-1">
                  <div className="relative h-56 w-full overflow-hidden ">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className=" object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0  bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />


                  </div>

                  <div className="p-2 flex  flex-start items-center gap-2 divide-x divide-gray-200">
                    <div className="relative h-8 w-8 overflow-hidden">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover "
                      />
                    </div>
                    <div className="pl-2 border-l border-gray-200">
                      <h3 className=" text-base font-bold text-gray-900">{agent.name}</h3>
                      <h5 className="text-sm font-medium text-gray-500">{agent.specialization}</h5>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="relative">
        <div className="relative flex items-center justify-between pr-10">
          <Heading title1="Find An Expert" title2="By Area" />
          <div className=" flex items-center gap-2 sm:right-10">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative px-10">
          <Swiper
            // modules={[Autoplay]}
            loop
            speed={600}
            spaceBetween={20}
            // autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!px-2 !py-2"
          >
            {specialistAgents.map((agent) => (
              <SwiperSlide key={agent.name} className="!h-auto">
                <div className="group h-full overflow-hidden border rounded-xl border-gray-100 transition-all duration-200 hover:-translate-y-1">
                  <div className="relative h-40 w-full overflow-hidden ">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className=" object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0  bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-2 ">
                    <h3 className=" text-base font-bold text-gray-900">{agent.name}</h3>
                    <h5 className="text-sm font-medium text-gray-500">{agent.specialization}</h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

        <section className="relative">
        <div className="relative flex items-center justify-between pr-10">
          <Heading title1="Find An Expert" title2="By Property Type" />
          <div className=" flex items-center gap-2 sm:right-10">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative px-10">
          <Swiper
            // modules={[Autoplay]}
            loop
            speed={600}
            spaceBetween={20}
            // autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!px-2 !py-2"
          >
            {specialistAgents.map((agent) => (
              <SwiperSlide key={agent.name} className="!h-auto">
                <div className="group h-full overflow-hidden border rounded-xl border-gray-100 transition-all duration-200 hover:-translate-y-1">
                  <div className="relative h-40 w-full overflow-hidden ">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className=" object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0  bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-2 ">
                    <h3 className=" text-base font-bold text-gray-900">{agent.name}</h3>
                    <h5 className="text-sm font-medium text-gray-500">{agent.specialization}</h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

       <section className="relative">
        <div className="relative flex items-center justify-between pr-10">
          <Heading title1="Top" title2="Broker Companies" />
          <div className=" flex items-center gap-2 sm:right-10">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative px-10">
          <Swiper
            // modules={[Autoplay]}
            loop
            speed={600}
            spaceBetween={20}
            // autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!px-2 !py-2"
          >
            {specialistAgents.map((agent) => (
              <SwiperSlide key={agent.name} className="!h-auto">
                <div className="group h-full overflow-hidden border p-4 rounded-xl border-line transition-all duration-200 hover:-translate-y-1">
                 <div className="flex gap-4 pb-3">
                   <div className="relative rounded-xl h-12 w-12 overflow-hidden ">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className=" object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                   <div className="">
                    <h3 className=" text-base font-bold text-gray-900">{agent.name}</h3>
                    <h5 className="text-sm font-medium text-gray-700">{agent.specialization}</h5>
                    <p className="text-[12px] text-gray-500 line-clamp-1">{agent.location}</p>
                  </div>
                 </div>
                  <Link href='' className="text-[12px] text-primary font-normal flex gap-2"><span>View Company</span> <MoveRight className="text-primary w-5" /></Link>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

<section className="relative  px-10">
 <Heading title1="Top" title2="Broker Companies" />
 <div className="flex">
    {specialistAgents.map((agent) => (
               <div key={agent.name} className="group h-full overflow-hidden border rounded-xl border-gray-100 transition-all duration-200 hover:-translate-y-1">
                  <div className="relative h-56 w-full overflow-hidden ">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className=" object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0  bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />


                  </div>

                  <div className="p-2 flex  flex-start items-center gap-2 divide-x divide-gray-200">
                    <div className="relative h-8 w-8 overflow-hidden">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover "
                      />
                    </div>
                    <div className="pl-2 border-l border-gray-200">
                      <h3 className=" text-base font-bold text-gray-900">{agent.name}</h3>
                      <h5 className="text-sm font-medium text-gray-500">{agent.specialization}</h5>
                    </div>
                  </div>
                </div>
            ))}
 </div>
</section>




    </>
  );
}