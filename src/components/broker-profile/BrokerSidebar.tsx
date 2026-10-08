"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  ChevronRight,
  Trophy,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";

export const BrokerSidebar = () => {
  return (
    <aside className="w-full space-y-4 font-jakarta">
      
      {/* 1. Need Help Finding The Right Property? Banner */}
      <div className="bg-[#1865F2] rounded-[10px] p-7 sm:p-8 text-white shadow-[0_6px_24px_rgba(24,101,242,0.25)] space-y-5 flex flex-col justify-between min-h-[190px]">
        <h3 className="text-base sm:text-[19px] font-black leading-snug">
          Need Help Finding <br /> The Right Property?
        </h3>
        <button
          type="button"
          className="w-full py-3.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs sm:text-[13.5px] font-black rounded-[6px] transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Chat with Jitender Singh</span>
        </button>
      </div>

      {/* 2. Follow me on */}
      <div className="bg-white rounded-[10px] border border-slate-200/90 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4 min-h-[135px] flex flex-col justify-center">
        <h4 className="text-xs sm:text-[14px] font-extrabold text-[#0B132B]">
          Follow me on
        </h4>
        <div className="flex items-center gap-3">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-2xs hover:scale-105 transition-transform"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow-2xs hover:scale-105 transition-transform"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-2xs hover:scale-105 transition-transform"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-2xs hover:scale-105 transition-transform"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-2xs hover:scale-105 transition-transform"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>

      {/* 3. RERA Verified Card */}
      <div className="bg-white rounded-[10px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3.5 min-h-[110px]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-[8px] bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#10B981] shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-xs sm:text-[14px] font-black text-[#0B132B]">
              RERA Verified
            </h4>
            <button
              type="button"
              className="text-[11.5px] font-bold text-[#1865F2] hover:underline flex items-center gap-0.5 cursor-pointer mt-0.5"
            >
              <span>View Certificate</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Reputation & Reviews */}
      <div className="bg-white rounded-[10px] border border-slate-200/90 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3.5">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <h4 className="text-xs sm:text-[13px] font-black text-[#0B132B]">
            Reputation & Reviews
          </h4>
          <button
            type="button"
            className="text-[10.5px] font-bold text-[#1865F2] hover:underline cursor-pointer"
          >
            Write Review
          </button>
        </div>

        {/* Rating Score */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#0B132B]">4.5</span>
          <div className="space-y-0.5">
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold">
              (200 Total Reviews)
            </p>
          </div>
        </div>

        {/* 5-Star Distribution Bars */}
        <div className="space-y-1.5 text-[10px] font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0">5 star</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#1865F2] w-[75%] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0">4 star</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#1865F2] w-[60%] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0">3 star</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#1865F2] w-[40%] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0">2 star</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#1865F2] w-[50%] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0">1 star</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#1865F2] w-[45%] rounded-full" />
            </div>
          </div>
        </div>

        {/* Ritik Singh Verified Review Snippet */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5 text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
              R
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-black text-[#0B132B]">Ritik Singh</p>
              <div className="flex items-center gap-1">
                <div className="flex items-center text-amber-400">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <Star className="w-2.5 h-2.5 text-slate-300" />
                </div>
                <span className="text-[9px] text-slate-400">10/7/2022 1:10:37 AM</span>
              </div>
            </div>
          </div>

          <p className="text-[9.5px] text-slate-500 font-medium leading-relaxed">
            The Property Is Really Nice. I&apos;m Staying Here Now, And My Experience Has Been Great. The Rooms Are Clean, The Surroundings Are Peaceful, And Everything Is Well Maintained.
          </p>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-[10px] font-bold text-[#1865F2] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
        </div>

      </div>

      {/* 5. Achievements Card */}
      <div className="bg-white rounded-[10px] border border-slate-200/90 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3.5">
        <h4 className="text-xs sm:text-[13px] font-black text-[#0B132B] pb-1 border-b border-slate-100">
          Achievements
        </h4>

        <div className="space-y-3 text-left">
          {/* Achievement 1 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-black text-[#0B132B]">Top Performer 2026</p>
              <p className="text-[9.5px] text-slate-400 font-medium">Roofin</p>
            </div>
          </div>

          {/* Achievement 2 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 font-bold text-[10px]">
              500+
            </div>
            <div>
              <p className="text-[11px] font-black text-[#0B132B]">500+ Successful Deals</p>
              <p className="text-[9.5px] text-slate-400 font-medium">Completed</p>
            </div>
          </div>

          {/* Achievement 3 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1865F2] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-black text-[#0B132B]">Trusted Advisor</p>
              <p className="text-[9.5px] text-slate-400 font-medium">By 300+ Clients</p>
            </div>
          </div>

          {/* Achievement 4 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-black text-[#0B132B]">Active members</p>
              <p className="text-[9.5px] text-slate-400 font-medium">Roofin since 2018</p>
            </div>
          </div>

          {/* Achievement 5 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-black text-[#0B132B]">Top 10 Brocker</p>
              <p className="text-[9.5px] text-slate-400 font-medium">Noida Region</p>
            </div>
          </div>

        </div>

      </div>

    </aside>
  );
};
