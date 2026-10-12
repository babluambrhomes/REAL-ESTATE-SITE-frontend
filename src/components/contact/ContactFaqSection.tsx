"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

export const ContactFaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const faqs = [
    {
      q: "Is registration on Roofin free?",
      a: "Yes, It's free. Anyone can browse, create an account, or list their first property without any upfront charges.",
    },
    {
      q: "What are your customer support hours?",
      a: "Our customer success and technical support team is available Monday through Saturday from 9:00 AM to 8:00 PM IST.",
    },
    {
      q: "How can I advertise my project or brand on Roofin?",
      a: "Builders and verified brokers can promote their projects via featured listings, hero banners, and dedicated showcase profiles. Simply reach out through this contact form.",
    },
    {
      q: "How long does it take to receive a response?",
      a: "We strive to reply to all queries within 2 to 4 business hours. Urgent requests are prioritized.",
    },
    {
      q: "How will I receive buyer enquiries?",
      a: "Whenever a potential buyer or tenant expresses interest in your listing, you receive instant SMS, WhatsApp, and email notifications alongside your dashboard feed.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 font-jakarta">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Accordion FAQs */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#1865F2] tracking-tight uppercase">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3.5 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all hover:border-slate-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-[13px] text-[#0B132B] hover:text-[#1865F2] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-50">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Question Mark People Vector Illustration */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full max-w-[420px] h-[320px] sm:h-[380px]">
            <Image
              src="/images/contact/faq_question_people.png"
              alt="Frequently Asked Questions Illustration"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
