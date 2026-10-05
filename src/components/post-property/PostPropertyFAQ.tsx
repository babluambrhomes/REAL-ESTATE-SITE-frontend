"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

export const PostPropertyFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is registration on Roofin free?",
      a: "Yes, It's free",
    },
    {
      q: "How do I post my property on Roofin?",
      a: "Simply enter your mobile number, select property type and location, add pricing, upload photos and submit. Your listing goes live after quick verification.",
    },
    {
      q: "What documents are required to post a property?",
      a: "No physical documents are required for posting initial listings. Basic property information, address and authentic photos are all you need.",
    },
    {
      q: "Can I edit my property after publishing?",
      a: "Yes, you can edit property price, photos, amenities, contact preference, and availability status anytime through your seller dashboard.",
    },
    {
      q: "How will I receive buyer enquiries?",
      a: "You will receive instant SMS alerts, WhatsApp notifications, and direct phone calls from verified buyers and interested tenants.",
    },
  ];

  return (
    <section 
      className="relative pt-16 pb-24 sm:pb-32 overflow-hidden font-jakarta"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F5F8FF 45%, #E8F1FF 100%)",
      }}
    >
      {/* Soft ambient background glow */}
      <div className="absolute right-0 bottom-0 w-[550px] h-[550px] rounded-full bg-blue-200/30 blur-[130px] pointer-events-none -z-0" />
      <div className="absolute left-[-10%] top-[30%] w-[400px] h-[400px] rounded-full bg-indigo-100/25 blur-[120px] pointer-events-none -z-0" />
      
      {/* Top Right Decorative Blue Swirl Doodle Line from Figma */}
      <div className="absolute top-4 right-0 w-[280px] sm:w-[380px] pointer-events-none opacity-90 select-none z-0">
        <Image
          src="/post-property/faq_blue_loop_doodle.png"
          alt=""
          width={416}
          height={165}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#2563EB] uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Accordion Items */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[14px] border border-slate-200 bg-white transition-all duration-200 overflow-hidden shadow-2xs hover:border-slate-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <span className="text-[14.5px] sm:text-[15.5px] font-bold text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                    <span className="flex items-center justify-center text-slate-500 shrink-0">
                      {isOpen ? (
                        <Minus className="h-4 w-4 stroke-[2]" />
                      ) : (
                        <Plus className="h-4 w-4 stroke-[2]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-4.5 pt-0 text-[13.5px] text-slate-600 leading-relaxed font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Exact Figma 3D FAQ Artwork with Characters */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[480px]">
              <Image
                src="/post-property/faq_illustration.png"
                alt="Frequently Asked Questions with F-A-Q character speech bubbles"
                width={653}
                height={501}
                className="w-full h-auto object-contain drop-shadow-sm transform hover:scale-[1.01] transition-transform duration-300"
                priority
              />
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Swirl Connecting Loop Doodle (Connecting to Footer) */}
      <div className="absolute -bottom-6 left-1/3 w-[320px] sm:w-[420px] pointer-events-none opacity-70 select-none transform rotate-180">
        <Image
          src="/post-property/faq_blue_loop_doodle.png"
          alt=""
          width={416}
          height={165}
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};
