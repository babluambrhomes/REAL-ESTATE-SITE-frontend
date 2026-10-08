"use client";

import { ShieldCheck, Clock, Users, Award, Mail, Globe } from "lucide-react";

export const BuilderAboutDetails = () => {
  const highlights = [
    {
      title: "RERA Verified",
      sub: "All Listed Projects Are Legally Verified",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Timely Delivery",
      sub: "All Listed Projects Are Legally Verified",
      icon: Clock,
      color: "text-cyan-600 bg-cyan-50",
    },
    {
      title: "Customer First",
      sub: "All Listed Projects Are Legally Verified",
      icon: Users,
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "Quality Construction",
      sub: "All Listed Projects Are Legally Verified",
      icon: Award,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <div className="w-full bg-white rounded-[22px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] font-jakarta">
      <h3 className="text-base sm:text-lg font-black text-[#0B132B] mb-3">
        About
      </h3>

      <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
        ReverseEXP Pvt. Ltd. is A RERA-certified Real Estate Developer Known For Quality Construction, Transparent Dealings, And Timely Project Delivery. The Company Has Delivered Multiple Residential And Commercial Projects Across Prime Locations And Continues To Build Modern Communities With A Strong Focus On Customer Satisfaction And Long-Term Value.
      </p>

      {/* 4 Feature Grid Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
        {highlights.map((h) => {
          const IconComp = h.icon;
          return (
            <div
              key={h.title}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start gap-3"
            >
              <div className={`w-8 h-8 rounded-lg ${h.color} flex items-center justify-center shrink-0`}>
                <IconComp className="w-4 h-4" />
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
          href="mailto:Sales@Reverseexp.com"
          className="flex items-center gap-2 hover:underline"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Sales@Reverseexp.com</span>
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
