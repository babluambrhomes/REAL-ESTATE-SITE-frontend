"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export const BuilderFaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What documents should I check before buying a 3 BHK property?",
      a: "Verify the RERA registration, title deed, approvals, occupancy certificate (if ready), and builder documents.",
    },
    {
      q: "Can I get a home loan for a 3 BHK property?",
      a: "Yes, leading banks like SBI, HDFC, ICICI and Axis Bank offer home loans up to 80-90% of the property value subject to eligibility and verification.",
    },
    {
      q: "How do I choose the right 3 BHK apartment?",
      a: "Evaluate factors such as carpet area vs super area, floor layout, ventilation, construction status, builder track record, and social infrastructure nearby.",
    },
    {
      q: "Is a 3 BHK suitable for rental income?",
      a: "Yes, 3 BHK units in prime IT and residential hubs generate strong rental yields and attract high-profile families and corporate tenants.",
    },
    {
      q: "What should I look for during a site visit?",
      a: "Check construction quality, room dimensions, natural light, distance from key transit hubs, maintenance standards, and clubhouse amenities.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full bg-white rounded-[22px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-black text-[#0B132B]">
          FAQS
        </h3>
        <button
          type="button"
          className="text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Accordion List */}
      <div className="space-y-2.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className="rounded-xl border border-slate-100 bg-slate-50/50 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs sm:text-[13px] font-bold text-[#0B132B]">
                  {faq.q}
                </span>
                <span className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                  {isOpen ? (
                    <Minus className="w-3.5 h-3.5 text-[#1865F2]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-100/80 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
