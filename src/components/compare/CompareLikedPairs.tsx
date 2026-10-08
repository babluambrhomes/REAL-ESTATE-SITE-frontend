"use client";

import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";

export interface ComparePair {
  id: string;
  prop1: {
    id: string;
    title: string;
    location: string;
    status: string;
    price: string;
    bhk: string;
    area: string;
    image: string;
  };
  prop2: {
    id: string;
    title: string;
    location: string;
    status: string;
    price: string;
    bhk: string;
    area: string;
    image: string;
  };
}

interface CompareLikedPairsProps {
  onComparePair: (pair: ComparePair) => void;
}

export const CompareLikedPairs = ({ onComparePair }: CompareLikedPairsProps) => {
  const pairs: ComparePair[] = [
    {
      id: "pair-1",
      prop1: {
        id: "p1",
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.25 Cr",
        bhk: "3 BHK",
        area: "3,200 Sq.Ft",
        image: "/images/properties/villa-popular-figma.jpg",
      },
      prop2: {
        id: "p2",
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.58 Cr",
        bhk: "4 BHK",
        area: "4,500 Sq.Ft",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: "pair-2",
      prop1: {
        id: "p3",
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.25 Cr",
        bhk: "3 BHK",
        area: "3,200 Sq.Ft",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
      prop2: {
        id: "p4",
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.58 Cr",
        bhk: "4 BHK",
        area: "4,500 Sq.Ft",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: "pair-3",
      prop1: {
        id: "p5",
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.25 Cr",
        bhk: "3 BHK",
        area: "3,200 Sq.Ft",
        image: "/images/properties/villa-popular-figma.jpg",
      },
      prop2: {
        id: "p6",
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.58 Cr",
        bhk: "4 BHK",
        area: "4,500 Sq.Ft",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: "pair-4",
      prop1: {
        id: "p7",
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.25 Cr",
        bhk: "3 BHK",
        area: "3,200 Sq.Ft",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
      prop2: {
        id: "p8",
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.58 Cr",
        bhk: "4 BHK",
        area: "4,500 Sq.Ft",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      },
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 font-jakarta">
      {/* Title with cyan vertical line indicator */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-[3.5px] h-6 bg-[#00D084] rounded-full" />
        <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1865F2] tracking-wider uppercase">
          COMPARE WHAT YOU HAVE LIKED
        </h2>
      </div>

      {/* 2x2 Grid of Dual Property Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pairs.map((pair) => (
          <div key={pair.id} className="flex flex-col gap-3.5">
            {/* Outer Box with Half-Height Sky Blue Background */}
            <div className="relative rounded-[28px] border border-slate-200/90 p-4 pt-3.5 pb-5 overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              
              {/* Soft Sky Blue Backdrop starting at lower 20% of images (top-[50%]) down to bottom */}
              <div className="absolute inset-x-2.5 bottom-2.5 top-[50%] bg-[#F0F6FE] rounded-[22px] -z-0 pointer-events-none" />

              {/* 2 Side-by-Side Properties */}
              <div className="relative z-10 grid grid-cols-2 gap-3.5 sm:gap-4">
                
                {/* Left Property */}
                <div className="space-y-2.5">
                  <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-white shadow-xs">
                    <Image
                      src={pair.prop1.image}
                      alt={pair.prop1.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 140px, 260px"
                    />
                  </div>
                  <div className="space-y-1 px-1">
                    <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0B132B] truncate leading-tight">
                      {pair.prop1.title}
                    </h4>
                    <p className="text-[11.5px] text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-700 fill-slate-700 shrink-0" />
                      <span className="truncate">{pair.prop1.location}</span>
                    </p>
                    <div className="pt-0.5">
                      <span className="inline-block px-3 py-0.5 rounded-md bg-[#A7F3D0] text-[#065F46] font-semibold text-[10.5px]">
                        {pair.prop1.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Property */}
                <div className="space-y-2.5">
                  <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-white shadow-xs">
                    <Image
                      src={pair.prop2.image}
                      alt={pair.prop2.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 140px, 260px"
                    />
                  </div>
                  <div className="space-y-1 px-1">
                    <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0B132B] truncate leading-tight">
                      {pair.prop2.title}
                    </h4>
                    <p className="text-[11.5px] text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-700 fill-slate-700 shrink-0" />
                      <span className="truncate">{pair.prop2.location}</span>
                    </p>
                    <div className="pt-0.5">
                      <span className="inline-block px-3 py-0.5 rounded-md bg-[#A7F3D0] text-[#065F46] font-semibold text-[10.5px]">
                        {pair.prop2.status}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Compare ↗ Button outside container */}
            <button
              type="button"
              onClick={() => onComparePair(pair)}
              className="w-full py-3.5 rounded-[12px] bg-[#EAF2FE] hover:bg-[#D9E8FD] active:scale-[0.99] text-[#1865F2] font-semibold text-[14.5px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <span>Compare</span>
              <ArrowUpRight className="w-4 h-4 text-[#1865F2] stroke-[2.5]" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

