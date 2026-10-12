"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

export const ContactFaqSection = () => {
  // Default to first FAQ open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is registration on Roofin free?",
      a: "Yes, It's free",
    },
    {
      q: "What are your customer support hours?",
      a: "Our customer support team is available Monday to Saturday, from 9:00 AM to 8:00 PM.",
    },
    {
      q: "How can I advertise my project or brand on Roofin?",
      a: "Builders and verified agents can promote projects via featured placements and custom campaigns. Contact our partnership team to get started.",
    },
    {
      q: "How long does it take to receive a response?",
      a: "We typically respond to all questions and requests within 2 to 4 business hours.",
    },
    {
      q: "How will I receive buyer enquiries?",
      a: "Buyer enquiries are forwarded instantly to your registered phone number, WhatsApp, and account dashboard in real-time.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 font-jakarta">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* FAQs */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-black text-[#1865F2] tracking-tight mb-5">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all hover:border-slate-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-[13.5px] text-[#0B132B] hover:text-[#1865F2] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-500 font-light text-base leading-none shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-0 text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
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
          <div className="relative w-full max-w-[400px] sm:max-w-[440px] h-[300px] sm:h-[360px]">
            <Image
              src="/images/contact/faq_question_people.png"
              alt="Frequently Asked Questions Illustration"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 440px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
