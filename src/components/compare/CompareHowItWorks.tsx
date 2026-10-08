"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, ArrowRight, ShieldCheck, Heart, Share2 } from "lucide-react";

interface CompareHowItWorksProps {
  onStartComparing: () => void;
}

interface StepPropertyCard {
  title: string;
  image: string;
  location: string;
  bhk: string;
  price: string;
  originalPrice: string;
  discount: string;
  area: string;
  amenities: string;
  status: string;
}

export const CompareHowItWorks = ({ onStartComparing }: CompareHowItWorksProps) => {
  const [activeCard, setActiveCard] = useState<number>(1); // 0, 1, or 2

  const steps = [
    {
      num: 1,
      title: "Add Properties",
      desc: "Click To Add Property Which You Like",
    },
    {
      num: 2,
      title: "Select Properties",
      desc: "Click On Compare From My Any Property Card.",
    },
    {
      num: 3,
      title: "View Side By Side",
      desc: "See Key Differences Across Important Factors",
    },
    {
      num: 4,
      title: "Make Your Decision",
      desc: "Save, Share Or Contact The Builder/ Agent Directly",
    },
  ];

  const cardsData: StepPropertyCard[] = [
    {
      title: "The Terraces Max Estate",
      image: "/compare/card1_ambr_aspire_pure.png",
      location: "Sector 124, Noida",
      bhk: "3 & 4 BHK Apartments",
      price: "₹1.58* Cr",
      originalPrice: "₹1.95 Cr",
      discount: "Up to 37L off",
      area: "3,200-4,500",
      amenities: "65%",
      status: "Ready",
    },
    {
      title: "NBCC Aspire Silicon City",
      image: "/images/properties/villa-popular-figma.jpg",
      location: "Sector 76, Noida",
      bhk: "2, 3 & 4 BHK Apartments",
      price: "₹1.25* Cr",
      originalPrice: "₹1.58 Cr",
      discount: "Up to 33L off",
      area: "3,200-4,500",
      amenities: "60%",
      status: "Ready",
    },
    {
      title: "ATS Knightsbridge",
      image: "/compare/card2_night_tower_pure.png",
      location: "Sector 124, Noida",
      bhk: "4 & 5 BHK Apartments",
      price: "₹1.85* Cr",
      originalPrice: "₹2.20 Cr",
      discount: "Up to 40L off",
      area: "4,500-6,000",
      amenities: "75%",
      status: "Ready",
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-jakarta">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left: Heading, 4 Steps, Button */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-md bg-[#EFF6FF] text-[#1865F2] font-bold text-[12px] tracking-wide">
              How It Work
            </span>

            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#0B132B] tracking-tight leading-tight">
              From Shortlisted To The <br className="hidden sm:inline" />
              Right Choice.
            </h2>

            <p className="text-[14px] sm:text-[15.5px] text-slate-500 font-normal">
              Compare Properties In Just A Few Simple Steps.
            </p>
          </div>

          {/* 4 Steps Grid (2x2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#1865F2] text-white font-bold text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                  {step.num}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[15px] font-bold text-[#0B132B]">
                    {step.title}
                  </h4>
                  <p className="text-[12.5px] text-slate-500 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Start Comparing Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onStartComparing}
              className="px-8 py-3.5 rounded-xl bg-[#1865F2] hover:bg-[#1254D0] active:scale-95 text-white font-bold text-[14.5px] shadow-[0_6px_20px_rgba(24,101,242,0.35)] transition-all cursor-pointer"
            >
              Start Comparing
            </button>
          </div>

        </div>

        {/* Right: 3D Interactive 3-Card Fanned Stack (Hover to bring card forward) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-[500px] h-[400px] sm:h-[440px] flex items-center justify-center">
            {cardsData.map((card, index) => {
              // Determine position slot relative to activeCard:
              // 0 = center (front), 1 = right (wing behind), 2 = left (wing behind)
              const offset = (index - activeCard + 3) % 3;
              const isCenter = offset === 0;
              const isRight = offset === 1;
              const isLeft = offset === 2;

              let zIndex = "z-10";
              let opacity = "opacity-65 hover:opacity-90";
              let transformStyle = "";
              let borderShadowStyle = "";

              if (isCenter) {
                zIndex = "z-30";
                opacity = "opacity-100";
                transformStyle = "translate-x-[-50%] translate-y-[-50%] scale-100 rotate-0";
                borderShadowStyle = "border-2 border-[#93C5FD] shadow-[0_24px_55px_-12px_rgba(24,101,242,0.28),0_4px_16px_rgba(0,0,0,0.06)]";
              } else if (isLeft) {
                zIndex = "z-10";
                transformStyle = "translate-x-[-86%] translate-y-[-48%] scale-[0.88] -rotate-[13deg] hover:-rotate-[9deg] hover:scale-[0.91]";
                borderShadowStyle = "border border-slate-200/90 shadow-[0_16px_36px_-10px_rgba(15,23,42,0.18)]";
              } else if (isRight) {
                zIndex = "z-10";
                transformStyle = "translate-x-[-14%] translate-y-[-48%] scale-[0.88] rotate-[13deg] hover:rotate-[9deg] hover:scale-[0.91]";
                borderShadowStyle = "border border-slate-200/90 shadow-[0_16px_36px_-10px_rgba(15,23,42,0.18)]";
              }

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveCard(index)}
                  className={`absolute top-1/2 left-1/2 w-[295px] sm:w-[325px] bg-white rounded-[22px] p-3.5 cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${zIndex} ${opacity} ${transformStyle} ${borderShadowStyle}`}
                >
                  {/* Property Image with Verified Badge */}
                  <div className="relative w-full h-[142px] rounded-[16px] overflow-hidden mb-2.5 bg-slate-900">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 295px, 325px"
                    />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-[#00D084] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>VERIFIED DEAL</span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
                      <span className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-2xs">
                        <Heart className="w-3.5 h-3.5" />
                      </span>
                      <span className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-2xs">
                        <Share2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Card Meta */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10.5px] text-[#1865F2] font-semibold bg-[#EFF6FF] px-2 py-0.5 rounded">
                        {card.bhk}
                      </span>
                      <h4 className="text-[15px] font-bold text-[#0B132B] mt-1 leading-tight flex items-center justify-between">
                        <span className="truncate pr-1">{card.title}</span>
                        <span className="w-6 h-6 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-xs shrink-0">
                          <Phone className="w-3 h-3" />
                        </span>
                      </h4>
                      <p className="text-[11.5px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="text-[#FF5A5F]">📍</span> {card.location}
                      </p>
                    </div>

                    {/* Info Chips */}
                    <div className="grid grid-cols-3 gap-1.5 pt-0.5 text-center">
                      <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-1.5">
                        <div className="text-[10.5px] font-bold text-slate-800">{card.area}</div>
                        <div className="text-[8.5px] text-slate-400">Sq. Ft</div>
                      </div>
                      <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-1.5">
                        <div className="text-[10.5px] font-bold text-slate-800">{card.amenities}</div>
                        <div className="text-[8.5px] text-slate-400">Amenities</div>
                      </div>
                      <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-1.5">
                        <div className="text-[10.5px] font-bold text-emerald-600">{card.status}</div>
                        <div className="text-[8.5px] text-slate-400">To Move</div>
                      </div>
                    </div>

                    {/* Price & CTA Button */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[15px] font-extrabold text-[#0B132B]">{card.price}</span>
                          <span className="text-[10px] text-slate-400 line-through">{card.originalPrice}</span>
                        </div>
                        <span className="text-[9.5px] text-[#00D084] font-semibold">
                          🏷️ {card.discount}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={onStartComparing}
                        className="px-3.5 py-1.5 rounded-lg bg-[#1865F2] hover:bg-blue-600 text-white text-[11.5px] font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

