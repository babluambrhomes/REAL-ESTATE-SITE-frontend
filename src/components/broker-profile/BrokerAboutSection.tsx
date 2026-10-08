"use client";

import Link from "next/link";

export const BrokerAboutSection = () => {
  return (
    <div className="w-full space-y-5 font-jakarta text-left text-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h2 className="text-base sm:text-[18px] font-black text-[#0B132B] tracking-tight">
          About
        </h2>
        <Link
          href="/broker"
          className="text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
        >
          View All
        </Link>
      </div>

      {/* Main About Details */}
      <div className="space-y-4">
        <h3 className="text-sm sm:text-[15px] font-black text-[#0B132B]">
          About Jitender Singh
        </h3>

        <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
          Jitender Singh is a trusted property consultant associated with Roofin,
          helping buyers, sellers, and investors find the right property with
          complete transparency and professional guidance.
        </p>

        <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
          With strong knowledge of residential plots, apartments, builder
          floors, and investment properties, he focuses on understanding each
          client&apos;s needs and providing suitable options that match their budget
          and location preferences. Jitender believes in honest communication,
          verified property listings, and smooth deal execution. From property
          search and site visits to price negotiation and documentation support,
          he assists clients at every step of the journey.
        </p>

        <div className="pt-1">
          <p className="text-xs sm:text-[13px] text-slate-800 font-bold">
            Specialization:{" "}
            <span className="font-semibold text-slate-600">
              Residential Properties • Plots/Land • Builder Floors • Investment
              Properties
            </span>
          </p>
        </div>

        {/* Services Offered */}
        <div className="space-y-2 pt-1">
          <p className="text-xs sm:text-[13px] text-slate-800 font-bold">
            Services Offered:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-[13px] text-slate-600 font-medium pl-1">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>Verified Property Assistance</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>Free Site Visit Support</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>Property Negotiation Guidance</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>Loan & Documentation Assistance</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>End-to-End Buying Support</span>
            </li>
          </ul>
        </div>

        {/* Languages & Experience */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs sm:text-[13px]">
          <p className="text-slate-800 font-bold">
            Languages:{" "}
            <span className="font-semibold text-slate-600">Hindi, English</span>
          </p>
          <p className="text-slate-800 font-bold">
            Experience:{" "}
            <span className="font-semibold text-slate-600">
              6+ Years in Real Estate Advisory
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
