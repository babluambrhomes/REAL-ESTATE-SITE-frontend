"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Building,
  PlusCircle,
  Users,
  CalendarCheck,
  Megaphone,
  Eye,
  MapPin,
  X,
} from "lucide-react";

interface PortalWidgetsProps {
  onPostProperty: () => void;
  onSelectView?: (view: any) => void;
}

const BUYER_DEMANDS = [
  {
    title: "3 BHK In Noida Sector 150",
    budget: "₹ 1Cr",
    tag: "High Demand",
    tagColor: "bg-[#E8F8F0] text-[#00BA63]",
    buyers: "120 buyers",
    circleBg: "bg-[#EAF2FF]",
  },
  {
    title: "3 BHK In Noida Sector 150",
    budget: "₹ 1Cr",
    tag: "High Demand",
    tagColor: "bg-[#E8F8F0] text-[#00BA63]",
    buyers: "120 buyers",
    circleBg: "bg-[#F3E8FF]",
  },
  {
    title: "3 BHK In Noida Sector 150",
    budget: "₹ 1Cr",
    tag: "Med Demand",
    tagColor: "bg-[#FEF3C7] text-[#D97706]",
    buyers: "84 buyers",
    circleBg: "bg-[#DCFCE7]",
  },
  {
    title: "3 BHK In Noida Sector 150",
    budget: "₹ 1Cr",
    tag: "Low Demand",
    tagColor: "bg-[#FFE4E6] text-[#E11D48]",
    buyers: "80 buyers",
    circleBg: "bg-[#FFEDD5]",
  },
  {
    title: "3 BHK In Noida Sector 150",
    budget: "₹ 1Cr",
    tag: "Low Demand",
    tagColor: "bg-[#FFE4E6] text-[#E11D48]",
    buyers: "42 buyers",
    circleBg: "bg-[#EAF2FF]",
  },
];

import { useState } from "react";

export const PortalWidgets = ({ onPostProperty, onSelectView }: PortalWidgetsProps) => {
  const [selectedMarket, setSelectedMarket] = useState("Delhi NCR");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 font-poppins">
      {/* 1. Today's Buyer Demand (Span 4) */}
      <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-[16px] font-bold text-[#0B132B]">
            Today&apos;s Buyer Demand
          </h3>
          <button
            type="button"
            onClick={() => onSelectView?.("my-projects")}
            className="text-[12px] font-medium text-[#1865F2] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="divide-y divide-slate-100/70 pt-1">
          {BUYER_DEMANDS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 py-2.5 hover:bg-slate-50/60 px-1 rounded-xl transition-colors"
            >
              {/* Icon & Details */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-full ${item.circleBg} flex items-center justify-center shrink-0`}
                >
                  <Building size={16} className="text-[#1865F2]" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[12.5px] font-bold text-[#0B132B] truncate leading-tight">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5 font-normal">
                    Budget: {item.budget}
                  </p>
                </div>
              </div>

              {/* Demand Tag & Count */}
              <div className="flex items-center gap-2.5 shrink-0">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-medium ${item.tagColor}`}
                >
                  {item.tag}
                </span>
                <span className="text-[11px] text-slate-400 font-medium min-w-[55px] text-right">
                  {item.buyers}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Market Overview (Delhi NCR) Map (Span 4) */}
      <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-[16px] font-bold text-[#0B132B]">
            Market Overview (Delhi NCR)
          </h3>
          <div className="relative">
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="h-7 pl-2.5 pr-6 rounded-lg border border-slate-200 text-[11px] font-medium text-slate-700 bg-white appearance-none cursor-pointer shadow-2xs focus:outline-none"
            >
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Noida">Noida</option>
              <option value="Gurugram">Gurugram</option>
              <option value="Greater Noida">Greater Noida</option>
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Map Container with Centered Property Popup Card */}
        <div className="relative w-full h-[290px] rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 mt-2">
          {/* Background Map Simulation */}
          <div className="absolute inset-0 bg-[#E8ECEF] bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]">
            {/* Roads & Region Labels */}
            <div className="absolute inset-0 opacity-40">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M-20,100 Q150,160 300,120 T500,200"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                />
                <path
                  d="M100,-20 Q120,150 140,320"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="6"
                />
                <path
                  d="M250,-20 Q220,140 280,320"
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="5"
                />
              </svg>
            </div>

            <span className="absolute bottom-5 right-6 text-[15px] font-extrabold text-slate-400/80 tracking-wider">
              Gurugram
            </span>
            <span className="absolute top-6 left-6 text-[13px] font-extrabold text-slate-400/80 tracking-wider">
              Delhi
            </span>
            <span className="absolute top-8 right-8 text-[13px] font-extrabold text-slate-400/80 tracking-wider">
              Noida
            </span>

            {/* Map Pin Dots */}
            <div className="absolute top-12 left-16 w-3 h-3 rounded-full bg-[#1865F2] ring-4 ring-[#1865F2]/20" />
            <div className="absolute bottom-16 left-24 w-3 h-3 rounded-full bg-[#1865F2] ring-4 ring-[#1865F2]/20" />
            <div className="absolute bottom-10 right-20 w-3 h-3 rounded-full bg-[#1865F2] ring-4 ring-[#1865F2]/20" />
          </div>

          {/* Floating Property Card on Map (Figma 1:1) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-10 p-2.5">
            {/* Image Thumbnail with dots and close icon */}
            <div className="relative w-full h-22 rounded-xl overflow-hidden mb-2 bg-slate-100">
              <Image
                src="/images/properties/tower-popular-figma.jpg"
                alt="The Terraces"
                fill
                className="object-cover"
              />
              <button
                type="button"
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center cursor-pointer shadow-xs"
              >
                <X size={11} />
              </button>

              {/* 4 Pagination Dots */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              </div>
            </div>

            {/* BHK Tag */}
            <span className="inline-block px-2 py-0.5 rounded-full bg-[#EAF2FF] text-[#1865F2] text-[9.5px] font-medium mb-1">
              2, 3 & 4 BHK Apartments
            </span>

            {/* Title & Location */}
            <h5 className="text-[12px] font-bold text-[#0B132B] truncate leading-tight">
              The Terraces at Max Estate 361
            </h5>
            <p className="text-[10.5px] text-slate-500 flex items-center gap-1 truncate mt-0.5">
              <MapPin size={11} className="text-[#1865F2] shrink-0" />
              <span>Sector 76, Noida</span>
            </p>

            {/* View Details Button */}
            <Link
              href="/properties/1"
              className="mt-2.5 block w-full py-1.5 text-center bg-[#1865F2] hover:bg-blue-700 text-white font-medium text-[11px] rounded-lg transition-colors shadow-2xs"
            >
              View Details ➔
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions 6-Grid (Span 4) */}
      <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between">
        <h3 className="text-[16px] font-bold text-[#0B132B] pb-3 border-b border-slate-100">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* 1. Post Property */}
          <button
            type="button"
            onClick={onPostProperty}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 transition-all text-center cursor-pointer group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Building size={20} />
            </div>
            <span className="text-[12px] font-bold text-[#0B132B]">
              Post Property
            </span>
          </button>

          {/* 2. Add Project */}
          <button
            type="button"
            onClick={() => onSelectView?.("my-projects")}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 transition-all text-center cursor-pointer group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <PlusCircle size={20} />
            </div>
            <span className="text-[12px] font-bold text-[#0B132B]">
              Add Project
            </span>
          </button>

          {/* 3. Manage Leads */}
          <button
            type="button"
            onClick={() => onSelectView?.("crm-leads")}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 transition-all text-center cursor-pointer group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Users size={20} />
            </div>
            <span className="text-[12px] font-bold text-[#0B132B]">
              Manage Leads
            </span>
          </button>

          {/* 4. Schedule Visit */}
          <button
            type="button"
            onClick={() => onSelectView?.("crm-leads")}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 transition-all text-center cursor-pointer group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <CalendarCheck size={20} />
            </div>
            <span className="text-[12px] font-bold text-[#0B132B]">
              Schedule Visit
            </span>
          </button>

          {/* 5. Boost Listing */}
          <button
            type="button"
            onClick={() => onSelectView?.("boost-property")}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 transition-all text-center cursor-pointer group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Megaphone size={20} />
            </div>
            <span className="text-[12px] font-bold text-[#0B132B]">
              Boost Listing
            </span>
          </button>

          {/* 6. View Analytics */}
          <button
            type="button"
            onClick={() => onSelectView?.("analytics")}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 transition-all text-center cursor-pointer group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Eye size={20} />
            </div>
            <span className="text-[12px] font-bold text-[#0B132B]">
              View Analytics
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

