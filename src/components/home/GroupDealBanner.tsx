"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  MapPin,
  Bed,
  Maximize2,
  Star,
  Percent,
  Handshake,
  Coins,
  ArrowRight,
  X,
  CheckCircle2,
  Phone,
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";

export const GroupDealBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", email: "" });
    }, 300);
  };

  return (
    <>
      <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8 sm:py-12">
        {/* ========================================================================= */}
        {/* DESKTOP & WIDE SCREEN (Live High-Fidelity UI with Clean Master Background) */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative overflow-hidden rounded-[28px] xl:rounded-[36px] shadow-[0_20px_50px_rgba(0,102,255,0.22)] border border-blue-400/30 transition-transform duration-300 hover:scale-[1.002]">
          {/* Main Container with Clean Master Background */}
          <div className="relative w-full aspect-[1748/582] min-h-[440px]">
            <Image
              src="/banner/exclusive_group_deal_clean_bg.png"
              alt="Exclusive Group Deal For Only 20 Units - Roofin"
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-center select-none"
              priority
              unoptimized
            />

            {/* Live Interactive UI Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 xl:p-8 pointer-events-none">
              {/* Top Row: Roofin Logo & Exclusive Group Deal Badge */}
              <div className="flex items-center gap-4 pointer-events-auto">
                <div className="flex items-center gap-1.5">
                  <span className="text-[30px] xl:text-[34px] font-black tracking-tight text-white font-rounded-mplus drop-shadow-sm">
                    Roofin
                  </span>
                  <span className="h-2 w-2 rounded-xs bg-[#FFCC00] -mt-4 shadow-xs" />
                </div>

                <Link
                  href="/group-deal"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/15 px-3 py-1.5 backdrop-blur-md shadow-sm hover:bg-white/25 transition-all"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20 text-white">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-white">
                      EXCLUSIVE
                    </span>
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-white mt-0.5">
                      GROUP DEAL
                    </span>
                  </div>
                </Link>
              </div>

              {/* Middle Row: Headline & Property Card */}
              <div className="flex items-center gap-6 xl:gap-8 pointer-events-auto">
                {/* Headline */}
                <div className="max-w-[300px] xl:max-w-[330px]">
                  <h2 className="text-[26px] xl:text-[32px] font-black leading-[1.12] tracking-tight text-white drop-shadow-sm">
                    Exclusive Group Deal <br />
                    For Only{" "}
                    <span className="text-[#FFCC00] drop-shadow-md">20 Units</span>
                  </h2>
                  <div className="mt-2 h-1.5 w-16 rounded-full bg-[#FFCC00]" />
                </div>

                {/* Aspire Silicon City Spec Card */}
                <Link
                  href="/group-deal"
                  className="rounded-2xl bg-white/95 backdrop-blur-md p-3 xl:p-3.5 text-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white hover:scale-[1.02] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] transition-all max-w-[260px] xl:max-w-[280px]"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[#0066FF] shrink-0">
                      <MapPin className="h-3.5 w-3.5 fill-[#0066FF]" />
                    </div>
                    <div>
                      <h3 className="text-[12.5px] xl:text-[13px] font-bold text-slate-900 leading-tight">
                        Aspire Silicon City,
                      </h3>
                      <p className="text-[10.5px] xl:text-[11px] font-medium text-slate-500">
                        Sector 76, Noida
                      </p>
                    </div>
                  </div>

                  <div className="my-2 border-b border-dashed border-[#0066FF]/25" />

                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div className="flex flex-col items-center justify-center border-r border-slate-100 pr-1">
                      <Bed className="h-3.5 w-3.5 text-[#0066FF]" />
                      <span className="mt-0.5 text-[9.5px] font-bold text-slate-800 leading-tight">
                        4BHK + S
                      </span>
                      <span className="text-[8px] text-slate-500">[Servant]</span>
                    </div>

                    <div className="flex flex-col items-center justify-center border-r border-slate-100 px-1">
                      <Maximize2 className="h-3.5 w-3.5 text-[#0066FF]" />
                      <span className="mt-0.5 text-[9.5px] font-bold text-slate-800 leading-tight">
                        3342
                      </span>
                      <span className="text-[8px] text-slate-500">sq.ft.</span>
                    </div>

                    <div className="flex flex-col items-center justify-center pl-1">
                      <Star className="h-3.5 w-3.5 text-[#0066FF] fill-[#0066FF]" />
                      <span className="mt-0.5 text-[9.5px] font-bold text-slate-800 leading-tight">
                        Premium
                      </span>
                      <span className="text-[8px] text-slate-500">Residences</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Benefits Pill Bar */}
              <div className="pointer-events-auto max-w-[530px] xl:max-w-[580px] rounded-2xl bg-white/95 backdrop-blur-md p-2 xl:p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-white flex items-center gap-2.5">
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[#0066FF] shrink-0">
                    <Percent className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] xl:text-[11.5px] font-bold text-[#0066FF]">
                      Save 10-15 %
                    </p>
                    <p className="text-[9px] xl:text-[9.5px] text-slate-600">
                      more than market prices
                    </p>
                  </div>
                </div>

                <div className="w-[1px] h-7 bg-slate-200" />

                <div className="flex-1 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[#0066FF] shrink-0">
                    <Handshake className="h-3 w-3 text-[#0066FF]" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] xl:text-[11.5px] font-bold text-slate-800">
                      We negotiate
                    </p>
                    <p className="text-[9px] xl:text-[9.5px] text-slate-600">
                      directly with developers
                    </p>
                  </div>
                </div>

                <div className="w-[1px] h-7 bg-slate-200" />

                <div className="flex-1 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[#0066FF] shrink-0">
                    <Coins className="h-3 w-3 text-[#0066FF]" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] xl:text-[11.5px] font-bold text-slate-800">
                      100%
                    </p>
                    <p className="text-[9px] xl:text-[9.5px] text-slate-600">
                      broker commission passed
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Row: CTA Button & Validity */}
              <div className="flex items-center gap-4 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="group relative flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FFB703] to-[#FB8500] px-5 xl:px-6 py-2.5 xl:py-3 text-[13.5px] xl:text-[14px] font-extrabold text-slate-950 shadow-[0_6px_24px_rgba(255,183,3,0.4)] hover:shadow-[0_8px_30px_rgba(255,183,3,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="tracking-wide">I’M INTERESTED</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-2 text-white">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                    <Calendar className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[11.5px] xl:text-[12px] font-semibold tracking-wide drop-shadow-sm">
                    Offer Valid For Limited Units Only.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TABLET & MOBILE DISPLAY (Responsive, Large Readable Elements & Live Layout) */}
        {/* ========================================================================= */}
        <div className="block lg:hidden relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-gradient-to-b from-[#0062E0] via-[#0D7BF5] to-[#2593FE] p-5 sm:p-8 text-white shadow-xl border border-blue-400/30">
          {/* Glowing 3D Honeycomb Mesh Background */}
          <div className="absolute -bottom-10 -left-10 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] opacity-75 pointer-events-none mix-blend-screen">
            <Image
              src="/banner/group-deal-mesh.png"
              alt="Decorative Hex Mesh"
              fill
              className="object-contain object-bottom-left"
            />
          </div>

          <div className="relative z-10 flex flex-col gap-5 sm:gap-6">
            {/* Top Row: Roofin Logo + Exclusive Group Deal Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[28px] sm:text-[34px] font-black tracking-tight text-white font-rounded-mplus">
                  Roofin
                </span>
                <span className="h-2 w-2 rounded-xs bg-[#FFCC00] -mt-4 shadow-xs" />
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/15 px-3 py-1.5 backdrop-blur-md shadow-sm">
                <Users className="h-4 w-4 text-white shrink-0" />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-white">
                    EXCLUSIVE
                  </span>
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-white mt-0.5">
                    GROUP DEAL
                  </span>
                </div>
              </div>
            </div>

            {/* Headline with Yellow Accent */}
            <div>
              <h2 className="text-[26px] sm:text-[34px] font-black leading-tight tracking-tight text-white">
                Exclusive Group Deal
                <br />
                For Only{" "}
                <span className="text-[#FFCC00] drop-shadow-sm">20 Units</span>
              </h2>
              <div className="mt-2 h-1.5 w-16 rounded-full bg-[#FFCC00]" />
            </div>

            {/* Building Visual on Mobile */}
            <div className="relative w-full h-[180px] sm:h-[240px] rounded-2xl overflow-hidden shadow-md bg-sky-200/20">
              <Image
                src="/banner/exclusive_group_deal_clean_bg.png"
                alt="Building towers"
                fill
                className="object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0062E0]/80 via-transparent to-transparent" />
            </div>

            {/* Aspire Silicon City Card */}
            <Link
              href="/group-deal"
              className="block rounded-2xl bg-white p-4 text-slate-900 shadow-xl transition-transform hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[#0066FF] shrink-0">
                  <MapPin className="h-4 w-4 fill-[#0066FF]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-900 leading-tight">
                    Aspire Silicon City,
                  </h3>
                  <p className="text-[12px] font-medium text-slate-500">
                    Sector 76, Noida
                  </p>
                </div>
              </div>

              <div className="my-3 border-b border-dashed border-[#0066FF]/30" />

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center justify-center border-r border-slate-100 pr-1">
                  <Bed className="h-4 w-4 text-[#0066FF]" />
                  <span className="mt-1 text-[10px] font-bold text-slate-800 leading-tight">
                    4BHK + S
                  </span>
                  <span className="text-[9px] text-slate-500">[Servant]</span>
                </div>

                <div className="flex flex-col items-center justify-center border-r border-slate-100 px-1">
                  <Maximize2 className="h-4 w-4 text-[#0066FF]" />
                  <span className="mt-1 text-[10px] font-bold text-slate-800 leading-tight">
                    3342
                  </span>
                  <span className="text-[9px] text-slate-500">sq.ft.</span>
                </div>

                <div className="flex flex-col items-center justify-center pl-1">
                  <Star className="h-4 w-4 text-[#0066FF] fill-[#0066FF]" />
                  <span className="mt-1 text-[10px] font-bold text-slate-800 leading-tight">
                    Premium
                  </span>
                  <span className="text-[9px] text-slate-500">Residences</span>
                </div>
              </div>
            </Link>

            {/* 3 Benefits Pill Bar */}
            <div className="rounded-2xl bg-white p-3 text-slate-900 shadow-xl flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[#0066FF] shrink-0">
                  <Percent className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#0066FF] leading-tight">
                    Save 10-15 %
                  </p>
                  <p className="text-[10px] text-slate-600">
                    more than market prices
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-[1px] bg-slate-200" />
              <div className="block sm:hidden h-[1px] w-full bg-slate-100" />

              <div className="flex-1 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[#0066FF] shrink-0">
                  <Handshake className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#0066FF] leading-tight">
                    We negotiate
                  </p>
                  <p className="text-[10px] text-slate-600">
                    directly with developers
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-[1px] bg-slate-200" />
              <div className="block sm:hidden h-[1px] w-full bg-slate-100" />

              <div className="flex-1 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[#0066FF] shrink-0">
                  <Coins className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#0066FF] leading-tight">
                    100%
                  </p>
                  <p className="text-[10px] text-slate-600">
                    broker commission passed back
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Row: Yellow CTA + Limited Units Badge */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white bg-gradient-to-r from-[#FFB800] via-[#FFA800] to-[#FF9500] px-6 py-3.5 text-[15px] font-black uppercase tracking-wide text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>I&apos;M INTERESTED</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2.5 rounded-xl border border-white/30 bg-white/20 px-3.5 py-2 backdrop-blur-md">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/30 text-white shrink-0">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-medium text-white">
                    Offer Valid For
                  </span>
                  <span className="text-[11.5px] font-bold text-[#FFCC00]">
                    Limited Units Only .
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE INQUIRY MODAL (When 'I'M INTERESTED' is Clicked) */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] bg-white p-6 sm:p-8 shadow-2xl border border-slate-100">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {!formSubmitted ? (
              <div>
                {/* Header Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[11px] font-bold text-[#1865F2]">
                  <Sparkles className="h-3.5 w-3.5 text-[#1865F2]" />
                  <span>EXCLUSIVE GROUP DEAL REGISTRATION</span>
                </div>

                <h3 className="mt-3 text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Claim Your Group Discount on
                  <br />
                  <span className="text-[#1865F2]">Aspire Silicon City</span>
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Join the pre-negotiated group deal to save 10-15% and get 100% broker commission passed back.
                </p>

                {/* Deal Quick Highlights Box */}
                <div className="mt-4 rounded-xl bg-[#F0F6FE] p-3.5 border border-blue-100 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-[#1865F2]">Sector 76, Noida • 4BHK + S (3342 sq.ft.)</span>
                    <span className="rounded-md bg-[#10B981] text-white px-2 py-0.5 text-[10px] font-bold">
                      ONLY 4 UNITS LEFT
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <ShieldCheck className="h-4 w-4 text-[#10B981] shrink-0" />
                    <span>Direct Developer Agreement • Zero Brokerage Guarantee</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-[#1865F2] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-[#1865F2] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="yourname@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-[#1865F2] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFB800] via-[#FFA800] to-[#FF9500] py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>CLAIM GROUP DISCOUNT SLOT</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[11px] text-slate-500 pt-1">
                    🔒 No spam. A Roofin Group Deal manager will contact you within 15 minutes.
                  </p>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-slate-900">
                    Group Deal Slot Reserved!
                  </h4>
                  <p className="text-sm text-slate-600">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your priority slot for Aspire Silicon City has been pre-locked.
                  </p>
                </div>

                <div className="inline-block rounded-xl bg-slate-100 px-4 py-2 text-xs font-mono font-bold text-slate-800">
                  Booking Reference: ROOFIN-GD-{Math.floor(1000 + Math.random() * 9000)}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 rounded-xl bg-[#1865F2] py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                  <Link
                    href="/group-deal"
                    onClick={handleCloseModal}
                    className="flex-1 rounded-xl border border-slate-300 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors text-center"
                  >
                    View Deal Page
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
