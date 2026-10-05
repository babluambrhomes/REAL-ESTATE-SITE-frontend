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
        image: "/images/properties/tower-popular-figma.jpg",
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
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      prop2: {
        id: "p4",
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
      id: "pair-3",
      prop1: {
        id: "p5",
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.25 Cr",
        bhk: "3 BHK",
        area: "3,200 Sq.Ft",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
      prop2: {
        id: "p6",
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.58 Cr",
        bhk: "4 BHK",
        area: "4,500 Sq.Ft",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      },
      prop2: {
        id: "p8",
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        price: "₹1.58 Cr",
        bhk: "4 BHK",
        area: "4,500 Sq.Ft",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      },
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 font-jakarta">
      {/* Title with blue vertical line indicator */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-[3.5px] h-6 bg-[#1865F2] rounded-full" />
        <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1865F2] tracking-wider uppercase">
          COMPARE WHAT YOU HAVE LIKED
        </h2>
      </div>

      {/* 2x2 Grid of Dual Property Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pairs.map((pair) => (
          <div
            key={pair.id}
            className="rounded-[24px] bg-white border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-4 sm:p-5 flex flex-col justify-between hover:shadow-[0_12px_35px_rgba(24,101,242,0.1)] transition-all duration-300"
          >
            {/* Side by Side 2 Properties */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
              
              {/* Left Property */}
              <div className="space-y-2">
                <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-slate-100 shadow-2xs">
                  <Image
                    src={pair.prop1.image}
                    alt={pair.prop1.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0B132B] truncate leading-tight">
                    {pair.prop1.title}
                  </h4>
                  <p className="text-[11.5px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{pair.prop1.location}</span>
                  </p>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#D1FAE5] text-[#065F46] font-semibold text-[10.5px]">
                      {pair.prop1.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Property */}
              <div className="space-y-2">
                <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-slate-100 shadow-2xs">
                  <Image
                    src={pair.prop2.image}
                    alt={pair.prop2.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0B132B] truncate leading-tight">
                    {pair.prop2.title}
                  </h4>
                  <p className="text-[11.5px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{pair.prop2.location}</span>
                  </p>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#D1FAE5] text-[#065F46] font-semibold text-[10.5px]">
                      {pair.prop2.status}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Compare ↗ Button */}
            <button
              type="button"
              onClick={() => onComparePair(pair)}
              className="w-full py-2.5 sm:py-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] active:scale-[0.99] text-[#1865F2] font-semibold text-[13.5px] sm:text-[14px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
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
