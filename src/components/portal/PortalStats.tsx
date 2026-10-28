"use client";

import { Home, MessageSquare, Sparkles, Eye, MapPin } from "lucide-react";

interface PortalStatsProps {
  activeProperties?: number;
  followers?: number;
  newLeads?: number;
  propertyViews?: string;
  siteVisits?: string;
}

export const PortalStats = ({
  activeProperties = 24,
  followers = 8,
  newLeads = 500,
  propertyViews = "12.4K",
  siteVisits = "12.4K",
}: PortalStatsProps) => {
  const stats = [
    {
      label: "Active Properties",
      value: activeProperties,
      icon: Home,
      iconColor: "text-[#00BA63]",
      circleBg: "bg-[#E8F8F0]",
      circleBorder: "border-[#D1F2E2]",
    },
    {
      label: "Followers",
      value: followers,
      icon: MessageSquare,
      iconColor: "text-[#1865F2]",
      circleBg: "bg-[#EAF2FF]",
      circleBorder: "border-[#D4E4FF]",
    },
    {
      label: "New Leads",
      value: newLeads,
      icon: Sparkles,
      iconColor: "text-[#D946EF]",
      circleBg: "bg-[#FDF2F8]",
      circleBorder: "border-[#FCE7F3]",
    },
    {
      label: "Property View",
      value: propertyViews,
      icon: Eye,
      iconColor: "text-[#F97316]",
      circleBg: "bg-[#FFF7ED]",
      circleBorder: "border-[#FFEDD5]",
    },
    {
      label: "Site Visits",
      value: siteVisits,
      icon: MapPin,
      iconColor: "text-[#0284C7]",
      circleBg: "bg-[#F0F9FF]",
      circleBorder: "border-[#E0F2FE]",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 font-poppins">
      {stats.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-3.5"
          >
            {/* Circular Icon with border matching Figma */}
            <div
              className={`w-12 h-12 rounded-full ${item.circleBg} ${item.iconColor} flex items-center justify-center shrink-0 border ${item.circleBorder}`}
            >
              <IconComponent size={21} strokeWidth={2.2} />
            </div>

            <div className="min-w-0">
              <h3 className="text-[22px] sm:text-[24px] font-bold text-[#0B132B] leading-none tracking-tight">
                {item.value}
              </h3>
              <p className="text-[12px] sm:text-[13px] font-medium text-slate-500 mt-1.5 truncate">
                {item.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

