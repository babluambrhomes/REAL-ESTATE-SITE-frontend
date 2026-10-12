"use client";

import { ShieldCheck, Clock, Users, Award, Mail, Globe } from "lucide-react";

export const BuilderAboutDetails = () => {
  const highlights = [
    {
      title: "RERA Verified",
      sub: "All listed Projects Are Legally Verified",
      icon: ShieldCheck,
      color: "text-[#00D1FF] bg-[#E6FAFE]",
    },
    {
      title: "Timely Delivery",
      sub: "All listed Projects Are Legally Verified",
      icon: Clock,
      color: "text-[#00B368] bg-[#E6F9F0]",
    },
    {
      title: "Customer First",
      sub: "All listed Projects Are Legally Verified",
      icon: Users,
      color: "text-[#F59E0B] bg-[#FEF3C7]",
    },
    {
      title: "Quality Construction",
      sub: "All listed Projects Are Legally Verified",
      icon: Award,
      color: "text-[#8B5CF6] bg-[#F3E8FF]",
    },
  ];

  return (
    <div className="w-full bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)] font-jakarta">
      <h3 className="text-base sm:text-lg font-black text-[#1865F2] mb-3 tracking-tight">
        About
      </h3>

      <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
        ReverseEXP Pvt. Ltd. is A RERA-Verified Real Estate Developer Known For Quality Construction, Transparent Dealings, And Timely Project Delivery. The Company Has Delivered Multiple Residential And Commercial Projects Across Prime Locations And Continues To Build Modern Communities With A Strong Focus On Customer Satisfaction And Long-Term Value.
      </p>

      {/* 4 Feature Grid Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
        {highlights.map((h) => {
          const IconComp = h.icon;
          return (
            <div
              key={h.title}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-white flex items-center gap-3 shadow-2xs"
            >
              <div className={`w-9 h-9 rounded-xl ${h.color} flex items-center justify-center shrink-0`}>
                <IconComp className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black text-[#0B132B]">{h.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">
                  {h.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Links */}
      <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 text-xs font-bold text-[#1865F2]">
        <a
          href="mailto:Sales@reverseexp.com"
          className="flex items-center gap-2 hover:underline"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Sales@reverseexp.com</span>
        </a>
        <a
          href="https://www.Reverseexp.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>www.Reverseexp.com</span>
        </a>
      </div>
    </div>
  );
};
