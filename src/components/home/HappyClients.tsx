"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

// Local high-resolution customer photo assets matching Figma 1:1
const IMG_MAN_PHONE = "/customers/customer_man_phone.jpg";
const IMG_HANDOVER_KEYS = "/customers/customer_handover.jpg";
const IMG_WOMAN_SUIT = "/customers/customer_woman_suit.jpg";
const IMG_WOMAN_HANDSHAKE = "/customers/customer_handshake.jpg";

// Testimonial profiles matching each customer photo in the collage
const TESTIMONIALS = [
  {
    id: 1,
    image: IMG_WOMAN_SUIT,
    locationPrefix: "Property at ",
    locationHighlight: "sector 33 in Noida",
    review:
      "Exceptional service! They guided us to the perfect luxury flat, offering personalized options and exclusive developer discounts.",
    rating: 5,
    name: "Arun Chaudhary",
  },
  {
    id: 2,
    image: IMG_MAN_PHONE,
    locationPrefix: "Property at ",
    locationHighlight: "Sector 150 in Noida",
    review:
      "Smooth and transparent process from booking to final handover. Highly professional team with verified listings and quick loan approval.",
    rating: 5,
    name: "Rohan Mehra",
  },
  {
    id: 3,
    image: IMG_WOMAN_HANDSHAKE,
    locationPrefix: "Property at ",
    locationHighlight: "Golf Course Road in Gurgaon",
    review:
      "Found our dream home within a week. Roofin helped negotiate the best price directly with the developer without any broker hassle.",
    rating: 5,
    name: "Priya & Sameer Kapoor",
  },
  {
    id: 4,
    image: IMG_HANDOVER_KEYS,
    locationPrefix: "Property at ",
    locationHighlight: "Sector 128 in Noida",
    review:
      "Key handover was delivered right on promised time. Genuine verification, personalized site visits, and complete peace of mind.",
    rating: 5,
    name: "Neha & Amit Verma",
  },
];

export const HappyClients = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Automatic continuous rotation every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14 overflow-hidden">
      {/* Centered Heading matching Figma */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#0B132B]">
          Story of <span className="text-[#1865F2]">Happy Customers</span>
        </h2>
      </div>

      {/* 9-Column Stepped Arch Collage (2, 2, 1, 1, 1, 1, 1, 2, 2) matching exact UI arrangement */}
      <div className="relative mx-auto w-full max-w-[1180px] overflow-x-auto lg:overflow-visible pb-4 no-scrollbar">
        <div className="relative min-w-[1080px] lg:min-w-0 h-[430px] lg:h-[450px] flex justify-center">
          
          {/* THE 9-COLUMN PHOTO GRID */}
          <div className="flex items-start justify-center gap-2.5 sm:gap-3 lg:gap-3.5 w-full">
            
            {/* COLUMN 1 (Far Left - 2 Cards: Man on Phone + Handover Keys, pt-[82px]) */}
            <div className="flex flex-col shrink-0 w-[102px] lg:w-[110px] gap-3.5 pt-[82px]">
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_MAN_PHONE}
                  alt="Customer on Phone"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_HANDOVER_KEYS}
                  alt="Customer Key Handover"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* COLUMN 2 (2 Cards: Handshake Peak at pt-0 + 3D Perspective Woman Card) */}
            <div className="flex flex-col shrink-0 w-[102px] lg:w-[110px] pt-0">
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_WOMAN_HANDSHAKE}
                  alt="Customer Handshake"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
              <div 
                className="relative h-[146px] lg:h-[156px] w-full mt-4 overflow-hidden rounded-[10px] bg-slate-100 shadow-xs"
                style={{
                  transform: "perspective(500px) rotateY(22deg)",
                  transformOrigin: "left center",
                }}
              >
                <Image
                  src={IMG_WOMAN_SUIT}
                  alt="Happy Customer"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* COLUMN 3 (1 Card: Man on Phone with Laptop, Deep Trough at pt-[102px]) */}
            <div className="flex flex-col shrink-0 w-[102px] lg:w-[110px] pt-[102px]">
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_MAN_PHONE}
                  alt="Happy Customer"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* COLUMN 4 (1 Card: Handshake, High at pt-[12px]) */}
            <div className="flex flex-col shrink-0 w-[102px] lg:w-[110px] pt-[12px]">
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_WOMAN_HANDSHAKE}
                  alt="Customer Handshake"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* COLUMN 5 (CENTER - 1 Card: Featured Customer at pt-[64px] with Circular Quote Badge) */}
            <div className="relative flex flex-col items-center shrink-0 w-[124px] lg:w-[134px] pt-[64px]">
              <div className="relative h-[168px] lg:h-[180px] w-full overflow-hidden rounded-[12px] bg-slate-100 shadow-md border-2 border-white">
                {TESTIMONIALS.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === activeIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="160px"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Circular Quote Mark Badge Overlapping Bottom */}
              <div className="absolute bottom-[-14px] z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-slate-100 text-[#0B132B]">
                <span className="text-lg font-serif font-black leading-none mt-0.5">“</span>
              </div>
            </div>

            {/* COLUMN 6 (1 Card: Man on Phone, High at pt-[12px] - Symmetric to Col 4) */}
            <div className="flex flex-col shrink-0 w-[102px] lg:w-[110px] pt-[12px]">
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_MAN_PHONE}
                  alt="Customer on Phone"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* COLUMN 7 (1 Card: Handover Keys, Deep Trough at pt-[102px] - Symmetric to Col 3) */}
            <div className="flex flex-col shrink-0 w-[102px] lg:w-[110px] pt-[102px]">
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_HANDOVER_KEYS}
                  alt="Customer Key Handover"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* COLUMN 8 (2 Cards: Handshake Peak at pt-0 + 3D Perspective Woman Card - Symmetric to Col 2) */}
            <div className="flex flex-col shrink-0 w-[102px] lg:w-[110px] pt-0">
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_WOMAN_HANDSHAKE}
                  alt="Customer Handshake"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
              <div 
                className="relative h-[146px] lg:h-[156px] w-full mt-4 overflow-hidden rounded-[10px] bg-slate-100 shadow-xs"
                style={{
                  transform: "perspective(500px) rotateY(-22deg)",
                  transformOrigin: "right center",
                }}
              >
                <Image
                  src={IMG_WOMAN_SUIT}
                  alt="Happy Customer"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* COLUMN 9 (Far Right - 2 Cards: Man on Phone + Woman in Suit, pt-[82px]) */}
            <div className="flex flex-col shrink-0 w-[102px] lg:w-[110px] gap-3.5 pt-[82px]">
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_MAN_PHONE}
                  alt="Customer on Phone"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[136px] lg:h-[148px] w-full overflow-hidden rounded-[10px] bg-slate-100 shadow-xs">
                <Image
                  src={IMG_WOMAN_SUIT}
                  alt="Happy Customer"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
            </div>

          </div>

          {/* CENTER TESTIMONIAL DETAILS (Directly Below the Center Card Quote Icon) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[276px] lg:top-[286px] z-30 text-center w-full max-w-[480px] h-[140px] px-4 pointer-events-none">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={item.id}
                className={`absolute inset-x-4 top-0 transition-all duration-700 ease-in-out ${
                  idx === activeIdx
                    ? "opacity-100 translate-y-0 z-10"
                    : "opacity-0 translate-y-2 z-0"
                }`}
              >
                {/* Location Title */}
                <h3 className="text-lg sm:text-[21px] font-bold text-[#0B132B] tracking-tight">
                  {item.locationPrefix}
                  <span className="text-[#1865F2]">{item.locationHighlight}</span>
                </h3>

                {/* Review Text */}
                <p className="mt-2 text-xs sm:text-[13.5px] lg:text-[14px] text-[#475569] font-normal leading-relaxed max-w-[430px] mx-auto min-h-[40px]">
                  {item.review}
                </p>

                {/* 5 Solid Blue Stars */}
                <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-1.5 text-[#1865F2]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current stroke-none" />
                  ))}
                </div>

                {/* Reviewer Name */}
                <p className="mt-1.5 text-xs sm:text-[13.5px] font-bold text-[#0B132B]">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
