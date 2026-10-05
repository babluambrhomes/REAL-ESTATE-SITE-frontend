"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Minus,
  MessageSquare,
  MapPin,
  ArrowRight,
  PhoneCall,
  Mail,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: "What documents should I check before buying a 3 BHK property?",
    answer:
      "Verify the RERA registration, title deed, approvals, occupancy certificate (if ready), and builder documents.",
  },
  {
    question: "Can I get a home loan for a 3 BHK property?",
    answer:
      "Yes, home loans are readily available from 40+ leading partner banks up to 80-90% of the total property value depending on your eligibility.",
  },
  {
    question: "How do I choose the right 3 BHK apartment?",
    answer:
      "Consider carpet area efficiency, floor layout, natural ventilation, directional facing (Vastu), floor level, and society amenities.",
  },
  {
    question: "Is a 3 BHK suitable for rental income?",
    answer:
      "Yes, 3 BHK properties in prime sectors enjoy strong rental demand from families and IT professionals with consistent 3-4% rental yield.",
  },
  {
    question: "What should I look for during a site visit?",
    answer:
      "Inspect construction finish quality, open green area percentage, allocated parking, dedicated water/power backup, and 24x7 security infrastructure.",
  },
];

const SUGGESTIONS = [
  {
    id: 1,
    title: "The Terraces at Max Estate 361",
    location: "Sector 103 , Noida Ext",
    mrp: "MRP ₹1.58 Cr",
    price: "₹1.25*Cr",
    image: "/images/properties/max-estate-tower.png",
    postedDate: "Posted on 10 jul, 2026",
    badge: "New Arrival",
    tag1: "3 BHK Apartments",
    tag2: "4 BHK Apartments",
  },
  {
    id: 2,
    title: "The Terraces at Max Estate 361",
    location: "Sector 103 , Noida Ext",
    mrp: "MRP ₹1.58 Cr",
    price: "₹1.25*Cr",
    image: "/images/properties/tower-popular-figma.jpg",
    postedDate: "Posted on 10 jul, 2026",
    badge: "Popular",
    tag1: "3 BHK Apartments",
    tag2: "4 BHK Apartments",
  },
  {
    id: 3,
    title: "The Terraces at Max Estate 361",
    location: "Sector 103 , Noida Ext",
    mrp: "MRP ₹1.58 Cr",
    price: "₹1.25*Cr",
    image: "/images/properties/villa-popular-figma.jpg",
    postedDate: "Posted on 10 jul, 2026",
    badge: "New Arrival",
    tag1: "3 BHK Apartments",
    tag2: "4 BHK Apartments",
  },
];

export const PropertyDetailFAQAndSuggestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full my-6 flex flex-col gap-10">
      {/* ----------------- 1. FAQS SECTION ----------------- */}
      <div id="faqs" className="space-y-4 scroll-mt-28">
        <div className="pl-2.5 border-l-[3px] border-[#00B4D8]">
          <h3 className="text-[17px] font-bold text-[#1865F2] tracking-tight uppercase">
            FAQS
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Accordion Column (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/90 bg-white p-4 sm:px-5 shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <span className="text-[13.5px] font-semibold text-[#0B132B]">
                      {faq.question}
                    </span>
                    <div className="shrink-0 text-slate-500">
                      {isOpen ? (
                        <Minus size={18} className="stroke-[2] text-[#1865F2]" />
                      ) : (
                        <Plus size={18} className="stroke-[2] text-[#64748B]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <p className="pt-2 text-[12.5px] text-[#475569] leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Help Card: Do you have more questions? (Span 4) */}
          <div className="lg:col-span-4 rounded-xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col items-center text-center justify-between min-h-[280px]">
            <div className="space-y-3 flex flex-col items-center pt-3">
              {/* Yellow Chat Bubble Icon */}
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 5C6 3.89543 6.89543 3 8 3H24C25.1046 3 26 3.89543 26 5V19C26 20.1046 25.1046 21 24 21H12L6 26V5Z"
                    fill="#F5A623"
                  />
                </svg>
              </div>

              <h4 className="text-[15px] font-bold text-[#0B132B]">
                Do you have more questions?
              </h4>

              <p className="text-[11.5px] text-[#64748B] leading-relaxed max-w-[230px]">
                Find answers to the most common questions about this 3 BHK property,
                including pricing, amenities, location, home loans, and more.
              </p>
            </div>

            <button className="w-full mt-6 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#1865F2] to-[#00B4D8] hover:opacity-95 text-white text-[12.5px] font-semibold shadow-xs transition-opacity cursor-pointer flex items-center justify-center">
              Send a Direct Mail
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- 2. SUGGESTION SECTION ----------------- */}
      <div id="suggestions" className="space-y-4 scroll-mt-28">
        <div className="pl-2.5 border-l-[3px] border-[#00B4D8]">
          <h3 className="text-[17px] font-bold text-[#1865F2] tracking-tight">
            Suggestion
          </h3>
        </div>

        {/* 3 Suggestion Cards Grid matching Figma 1:1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUGGESTIONS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Tags & Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-semibold bg-[#1865F2] text-white">
                    {item.tag1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-medium bg-[#EFF6FF] text-[#1865F2] border border-[#BFDBFE]">
                    {item.tag2}
                  </span>
                </div>

                <span className="px-2 py-0.5 rounded text-[9.5px] font-medium shrink-0 bg-[#FEF3C7] text-[#B45309]">
                  {item.badge}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-[14.5px] font-bold text-[#0B132B] truncate leading-tight mt-2.5 mb-2">
                {item.title}
              </h4>

              {/* Middle Image & Info */}
              <div className="flex items-center gap-3">
                <div className="relative h-[72px] w-[96px] rounded-lg overflow-hidden shrink-0 border border-slate-100 bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1 text-[11.5px] text-[#475569]">
                    <MapPin size={13} className="text-[#1865F2] shrink-0 fill-[#1865F2]" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-[11px] text-slate-400 font-normal line-through">
                      {item.mrp}
                    </span>
                    <span className="text-[15px] font-bold text-[#0B132B]">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dashed Separator with Cutout Notches matching Figma 1:1 */}
              <div className="relative my-3 -mx-4">
                <div className="border-t border-dashed border-slate-200" />
                <div className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-[#FAFBFD] border-r border-slate-200/90" />
                <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-[#FAFBFD] border-l border-slate-200/90" />
              </div>

              {/* Bottom Date & Action Button */}
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-[10px] text-slate-400 font-normal">
                  {item.postedDate}
                </span>
                <button className="px-4 py-1.5 rounded-lg text-[11.5px] font-semibold text-white bg-gradient-to-r from-[#1865F2] to-[#00B4D8] hover:opacity-95 transition-opacity shadow-2xs cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- 3. BOTTOM QUESTIONS HELP BANNER (MATCHING FIGMA 1:1) ----------------- */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-sm p-6 sm:p-8 text-white min-h-[200px] flex items-center">
        {/* Full Banner Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src="/banner/have_q.png"
            alt="Have Questions Banner"
            fill
            className="object-cover object-right"
            priority
          />
        </div>

        <div className="relative z-10 max-w-lg space-y-2 text-left">
          <span className="text-[14px] font-medium text-white block">
            Have Questions?
          </span>
          <h3 className="text-[22px] sm:text-[25px] font-bold tracking-tight text-white leading-tight">
            We&apos;re here to help you!
          </h3>
          <p className="text-[13px] text-white/90 font-normal">
            Our property expects are just a call away.
          </p>

          <div className="pt-2">
            <button className="px-6 py-2.5 rounded-full bg-white text-[#1865F2] hover:bg-slate-50 text-[13px] font-semibold inline-flex items-center gap-2 shadow-md transition-all cursor-pointer">
              <PhoneCall size={15} className="fill-[#1865F2] text-[#1865F2]" />
              <span>Call Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
