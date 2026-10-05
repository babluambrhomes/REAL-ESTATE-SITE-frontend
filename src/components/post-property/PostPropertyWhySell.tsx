"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  UserCheck,
  Eye,
  Headphones,
  Image as ImageIcon,
  Filter,
  Phone,
  MessageCircle,
  Clock,
  MessagesSquare,
  Mail,
  Timer,
  ShieldCheck,
  Users,
} from "lucide-react";

export const PostPropertyWhySell = () => {
  const features = [
    {
      title: "Faster Lead",
      desc: "Get genuine & active leads from verified buyers & tenants .",
      icon: (
        <svg className="w-11 h-11 text-[#2563EB]" viewBox="0 0 32 32" fill="currentColor">
          <circle cx="10" cy="11" r="2.5" />
          <circle cx="16" cy="9.5" r="2.5" />
          <circle cx="22" cy="11" r="2.5" />
          <path d="M7 20c0-2 1.8-3.5 4-3.5h.5c1.2 1 2.8 1.5 4.5 1.5s3.3-.5 4.5-1.5h.5c2.2 0 4 1.5 4 3.5v1H7v-1z" />
          <path d="M6 24l6.5-5 5 3.5 7.5-7" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 15.5h4v4" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Verified Buyers",
      desc: "Only verified buyers and tenants to solve your time.",
      icon: (
        <svg className="w-11 h-11 text-[#2563EB]" viewBox="0 0 32 32" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 7l1 1.8 2 .8-2 .8-1 1.8-1-1.8-2-.8 2-.8z" fill="#2563EB" stroke="none" />
          <circle cx="16" cy="16" r="11" />
          <circle cx="16" cy="12.5" r="3.5" fill="currentColor" stroke="none" />
          <path d="M10.5 22c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5" />
          <circle cx="23" cy="23" r="4" fill="#2563EB" stroke="white" strokeWidth="1.5" />
          <path d="M21.5 23l1 1 2-2" stroke="white" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: "More Visibility",
      desc: "Get genuine & active leads from verified buyers & tenants .",
      icon: (
        <svg className="w-12 h-12 text-[#2563EB]" viewBox="0 0 32 32" fill="none">
          <path d="M4 16C7.5 9.5 11.5 6 16 6s8.5 3.5 12 10c-3.5 6.5-7.5 10-12 10S7.5 22.5 4 16z" fill="currentColor" />
          <circle cx="16" cy="16" r="5" fill="white" />
          <circle cx="16" cy="16" r="2.5" fill="#2563EB" />
        </svg>
      ),
    },
    {
      title: "Dedicated support",
      desc: "Our support team is always here to help you 24/7.",
      isTwoLines: true,
      icon: (
        <svg className="w-11 h-11 text-[#2563EB]" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 5a8 8 0 0 0-8 8v2.5a2.5 2.5 0 0 0 2.5 2.5h1v-6H9v-.5a7 7 0 1 1 14 0v.5h-2.5v6h1a2.5 2.5 0 0 0 2.5-2.5V13a8 8 0 0 0-8-8z" />
          <circle cx="16" cy="13" r="2.5" />
          <circle cx="9.5" cy="14.5" r="2" />
          <circle cx="22.5" cy="14.5" r="2" />
          <path d="M11.5 23c0-1.8 1.8-3 4.5-3s4.5 1.2 4.5 3v1.5h-9V23z" />
          <path d="M5.5 23.5c0-1.5 1.5-2.2 3-2.2 1 .5 1.8.8 3 .8v1.5H5.5v-.1z" />
          <path d="M26.5 23.5c0-1.5-1.5-2.2-3-2.2-1 .5-1.8.8-3 .8v1.5h6v-.1z" />
        </svg>
      ),
    },
    {
      title: "Rich Listing",
      desc: "Add photos, videos, floor plans & attract serious buyers .",
      icon: (
        <svg className="w-11 h-11 text-[#2563EB]" viewBox="0 0 32 32" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 9c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5l1.5 1.5h-9L13 9z" fill="#2563EB" />
          <path d="M11 10.5C7.5 13 6.5 17 6.5 21.5c0 4.2 3.5 7 9.5 7s9.5-2.8 9.5-7c0-4.5-1-8.5-4.5-11H11z" />
          <circle cx="16" cy="19" r="2.5" />
          <ellipse cx="23" cy="19.5" rx="3" ry="1.2" />
          <ellipse cx="23" cy="22" rx="3" ry="1.2" />
          <ellipse cx="23" cy="24.5" rx="3" ry="1.2" />
        </svg>
      ),
    },
    {
      title: "Lead Analytics",
      desc: "Track every inquiry and improve your conversion.",
      icon: (
        <svg className="w-11 h-11 text-[#2563EB]" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="6.5" r="1.3" fill="#2563EB" />
          <circle cx="12.5" cy="9.5" r="1.1" fill="#2563EB" />
          <circle cx="19.5" cy="9.5" r="1.1" fill="#2563EB" />
          <circle cx="16" cy="11.5" r="1.1" fill="#2563EB" />
          <path d="M7 13.5h18l-6.5 8.5v5.5l-5-2.5v-3L7 13.5z" fill="#2563EB" />
        </svg>
      ),
    },
  ];

  const donutStats = [
    { percentage: "35%", label: "Verified leads", color: "#FBBF24" },
    { percentage: "25%", label: "More Visibility", color: "#4ADE80" },
    { percentage: "20%", label: "Easy Listing Process", color: "#F43F5E" },
    { percentage: "12%", label: "Lead Dashboard", color: "#EF4444" },
    { percentage: "8%", label: "Dedicated Support", color: "#2563EB" },
  ];

  const helpOptions = [
    {
      title: "Call Expert",
      desc: "Talk to our property expert",
      icon: Phone,
      action: "tel:1800123456",
    },
    {
      title: "WhatsApp",
      desc: "Chat on whatsapp",
      icon: MessageCircle,
      action: "https://wa.me/919999999999",
    },
    {
      title: "Working Hours",
      desc: "10-7 PM",
      icon: Clock,
      action: null,
    },
    {
      title: "Live Chat",
      desc: "Chat with our support",
      icon: Headphones,
      action: "#",
    },
    {
      title: "Email Support",
      desc: "support@roofin.com",
      icon: Mail,
      action: "mailto:support@roofin.com",
    },
    {
      title: "Average Response Time",
      desc: "< 5 Minutes",
      icon: Timer,
      action: null,
    },
  ];

  return (
    <section className="relative py-14 sm:py-20 bg-white font-jakarta select-none">
      
      {/* Background Subtle Blueprint Grid Lines (Top) */}
      <div 
        className="absolute top-0 left-0 right-0 h-36 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(to right, #CBD5E1 1px, transparent 1px), linear-gradient(to bottom, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[44px] font-bold text-[#1E293B] tracking-tight flex items-center justify-center gap-2.5">
            <span>Why Sell with</span>
            <span className="text-[#2563EB] font-extrabold text-[38px] sm:text-[48px] lg:text-[52px]">Roofin</span>
            <span>?</span>
          </h2>
        </div>

        {/* Top 6 Benefit Cards in 1 Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="rounded-[20px] bg-white border border-[#3B82F6]/60 p-5 sm:p-6 text-center flex flex-col items-center justify-start min-h-[250px] sm:min-h-[270px] hover:border-[#2563EB] hover:shadow-md transition-all duration-300"
            >
              {/* Circular Soft Blue Icon Badge */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F1FD] mb-5 mt-1 shrink-0">
                {item.icon}
              </div>

              {/* Title & Description */}
              <div className="w-full flex-1 flex flex-col justify-start">
                <h3 className={`text-[19px] sm:text-[20px] font-bold text-[#111827] mb-2 leading-snug ${item.isTwoLines ? 'max-w-[140px] mx-auto' : ''}`}>
                  {item.title}
                </h3>
                <p className="text-[12px] sm:text-[12.5px] text-[#4B5563] font-normal leading-[1.45] text-center">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Two Lower Cards: Donut Chart Breakdown vs Need Help Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Card: Why Sellers Choose Roofin (Exact Donut Chart) */}
          <div className="lg:col-span-6 rounded-[24px] bg-white border-[1.5px] border-[#3B82F6]/50 p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(37,99,235,0.03)]">
            <h3 className="text-[26px] sm:text-[28px] font-bold text-[#1E293B] font-jakarta mb-6">
              Why Sellers Choose Roofin
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-12 my-auto py-2">
              
              {/* Exact Stepped Multi-Radius SVG Donut Chart */}
              <div className="relative w-[240px] h-[240px] shrink-0">
                <svg className="w-full h-full" viewBox="0 0 300 300">
                  {/* Yellow Arc (35% Verified Leads - Largest / Thickest Slice) */}
                  <path
                    d="M 52.88 221.73 A 118 118 0 0 1 138.48 32.57 L 143.37 82.17 A 68 68 0 0 0 94.04 191.24 Z"
                    fill="#FBC740"
                  />

                  {/* Blue Arc (8% Dedicated Support / Top-Right Slice) */}
                  <path
                    d="M 168.08 46.57 A 104 104 0 0 1 253.99 146.36 L 217.99 147.62 A 68 68 0 0 0 161.82 82.37 Z"
                    fill="#216CEB"
                  />

                  {/* Red Arc (12% Lead Dashboard / Mid-Right Slice) */}
                  <path
                    d="M 235.78 156.09 A 86 86 0 0 1 221.28 198.34 L 206.33 188.25 A 68 68 0 0 0 217.79 154.81 Z"
                    fill="#FA5255"
                  />

                  {/* Pink Arc (20% Easy Listing Process / Bottom-Right Outward Slice) */}
                  <path
                    d="M 230.43 217.49 A 105 105 0 0 1 125.42 252.10 L 134.08 217.27 A 68 68 0 0 0 202.09 193.71 Z"
                    fill="#FA57B6"
                  />

                  {/* Green Arc (25% More Visibility / Bottom-Left Slice) */}
                  <path
                    d="M 119.05 234.87 A 90 90 0 0 1 77.01 202.94 L 94.85 189.99 A 68 68 0 0 0 126.61 214.12 Z"
                    fill="#5CE57D"
                  />

                  {/* Inner White Circular Card with Subtle Ring */}
                  <circle
                    cx="150"
                    cy="150"
                    r="64"
                    fill="#FFFFFF"
                    stroke="#F1F5F9"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="150"
                    cy="150"
                    r="62"
                    fill="#FFFFFF"
                  />

                  {/* Center Text */}
                  <text
                    x="150"
                    y="144"
                    textAnchor="middle"
                    className="font-extrabold text-[36px] fill-[#252B3B]"
                    style={{ fontFamily: "inherit" }}
                  >
                    35%
                  </text>
                  <text
                    x="150"
                    y="170"
                    textAnchor="middle"
                    className="font-medium text-[15px] fill-[#64748B]"
                    style={{ fontFamily: "inherit" }}
                  >
                    Verified Leads
                  </text>
                </svg>
              </div>

              {/* Legend List */}
              <div className="space-y-4 w-full sm:w-auto">
                {donutStats.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 text-[15px]">
                    <span
                      className="h-4 w-4 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-bold text-[#1E293B] w-12 text-[15px]">
                      {item.percentage}
                    </span>
                    <span className="text-[#1E293B] font-semibold text-[14.5px]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Need Help? Grid */}
          <div className="lg:col-span-6 rounded-[24px] bg-white border-[1.5px] border-[#3B82F6]/50 p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-[0_4px_20px_rgba(37,99,235,0.03)]">
            <div>
              <h3 className="text-[30px] sm:text-[34px] font-extrabold text-[#1E293B] font-jakarta leading-tight">
                Need Help?
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#1E293B] font-medium mt-1 mb-8">
                Our expert team is here to assist you
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              
              {/* 1. Call Expert */}
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-[16px] border border-slate-200/90 bg-white hover:border-[#2563EB]/40 hover:shadow-xs transition-all duration-200">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF] shrink-0 text-[#2563EB]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[17px] sm:text-[18px] font-bold text-[#1E293B] leading-tight">
                    Call Expert
                  </div>
                  <div className="text-[13.5px] sm:text-[14px] font-normal text-[#475569] mt-0.5">
                    Talk to our property expert
                  </div>
                </div>
              </div>

              {/* 2. WhatsApp */}
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-[16px] border border-slate-200/90 bg-white hover:border-[#2563EB]/40 hover:shadow-xs transition-all duration-200">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF] shrink-0 text-[#2563EB]">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.42 10.37 21.84 12.04 21.84C17.5 21.84 21.95 17.39 21.95 11.93C21.95 6.47 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.62L5.07 16.31C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C16.58 3.68 20.27 7.37 20.27 11.91C20.27 16.45 16.58 20.15 12.04 20.15ZM16.56 14.41C16.31 14.29 15.09 13.69 14.86 13.6C14.64 13.52 14.47 13.48 14.31 13.73C14.14 13.97 13.66 14.54 13.51 14.71C13.36 14.87 13.22 14.9 12.97 14.77C12.72 14.65 11.93 14.39 10.99 13.55C10.26 12.9 9.77 12.09 9.62 11.84C9.48 11.6 9.6 11.46 9.73 11.34C9.84 11.23 9.98 11.05 10.1 10.91C10.23 10.76 10.27 10.66 10.35 10.49C10.43 10.33 10.39 10.18 10.33 10.06C10.27 9.94 9.77 8.72 9.57 8.22C9.37 7.74 9.17 7.8 9.02 7.8C8.88 7.79 8.72 7.79 8.55 7.79C8.39 7.79 8.12 7.85 7.89 8.1C7.67 8.35 7.03 8.94 7.03 10.15C7.03 11.37 7.92 12.54 8.04 12.7C8.17 12.87 9.78 15.34 12.24 16.4C12.83 16.65 13.28 16.8 13.64 16.92C14.23 17.1 14.76 17.08 15.19 17.01C15.67 16.94 16.66 16.41 16.87 15.83C17.07 15.26 17.07 14.77 17.01 14.67C16.95 14.56 16.81 14.52 16.56 14.41Z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[17px] sm:text-[18px] font-bold text-[#1E293B] leading-tight">
                    WhatsApp
                  </div>
                  <div className="text-[13.5px] sm:text-[14px] font-normal text-[#475569] mt-0.5">
                    Chat on whatsapp
                  </div>
                </div>
              </div>

              {/* 3. Working Hours */}
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-[16px] border border-slate-200/90 bg-white hover:border-[#2563EB]/40 hover:shadow-xs transition-all duration-200">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF] shrink-0 text-[#2563EB]">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 14" />
                    <path d="M12 3a9 9 0 0 1 9 9" strokeDasharray="2 3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[17px] sm:text-[18px] font-bold text-[#1E293B] leading-tight">
                    Working Hours
                  </div>
                  <div className="text-[13.5px] sm:text-[14px] font-normal text-[#475569] mt-0.5">
                    10-7 PM
                  </div>
                </div>
              </div>

              {/* 4. Live Chat */}
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-[16px] border border-slate-200/90 bg-white hover:border-[#2563EB]/40 hover:shadow-xs transition-all duration-200">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF] shrink-0 text-[#2563EB]">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11a9 9 0 0 1 18 0v3a3 3 0 0 1-3 3h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2a7 7 0 1 0-14 0h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a3 3 0 0 1-3-3v-3z" />
                    <circle cx="10" cy="12" r="0.8" fill="currentColor" />
                    <circle cx="12" cy="12" r="0.8" fill="currentColor" />
                    <circle cx="14" cy="12" r="0.8" fill="currentColor" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[17px] sm:text-[18px] font-bold text-[#1E293B] leading-tight">
                    Live Chat
                  </div>
                  <div className="text-[13.5px] sm:text-[14px] font-normal text-[#475569] mt-0.5">
                    Chat with our support
                  </div>
                </div>
              </div>

              {/* 5. Email Support */}
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-[16px] border border-slate-200/90 bg-white hover:border-[#2563EB]/40 hover:shadow-xs transition-all duration-200">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF] shrink-0 text-[#2563EB]">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    <path d="M12 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[17px] sm:text-[18px] font-bold text-[#1E293B] leading-tight">
                    Email Support
                  </div>
                  <div className="text-[13.5px] sm:text-[14px] font-normal text-[#475569] mt-0.5">
                    support@roofin.com
                  </div>
                </div>
              </div>

              {/* 6. Average Response Time */}
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-[16px] border border-slate-200/90 bg-white hover:border-[#2563EB]/40 hover:shadow-xs transition-all duration-200">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF] shrink-0 text-[#2563EB]">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <line x1="3" y1="8" x2="21" y2="8" />
                    <circle cx="16" cy="15" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
                    <polyline points="16 13.5 16 15 17.5 15" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="6" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[17px] sm:text-[18px] font-bold text-[#1E293B] leading-tight">
                    Average Response Time
                  </div>
                  <div className="text-[13.5px] sm:text-[14px] font-normal text-[#475569] mt-0.5">
                    &lt; 5 Minutes
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
