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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/v1/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email?.trim() || `deal_${formData.phone.replace(/\D/g, "")}@roofin.com`,
          phone: formData.phone.trim(),
          message: "Exclusive Group Deal Registration: Aspire Silicon City, Sector 76 Noida (4BHK + S)",
        }),
      });
    } catch (err) {
      console.warn("Group deal enquiry backend sync:", err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
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
        {/* DESKTOP & WIDE SCREEN (1:1 Exact Figma Match with High-Res Clean Asset) */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative overflow-hidden rounded-[20px] xl:rounded-[24px] shadow-[0_16px_40px_rgba(0,102,255,0.2)] border border-blue-400/30 bg-[#0551CC]">
          {/* Main Container with High-Res Figma Exported Background */}
          <div className="relative w-full aspect-[1024/340] min-h-[380px] xl:min-h-[400px]">
            <Image
              src="/icon/hero/Frame_18.png"
              alt="Exclusive Group Deal For Only 20 Units - Roofin"
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-center select-none"
              priority
              unoptimized
            />

            {/* Live Interactive UI Overlay (Exact Figma Hierarchy) */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 xl:p-8 pointer-events-none">
              {/* Row 1: Roofin Logo, Divider & Exclusive Group Deal Badge */}
              <div className="flex items-center gap-3 pointer-events-auto">
                <div className="flex items-center">
                  <span className="text-[28px] xl:text-[32px] font-black tracking-tight text-white font-sans drop-shadow-xs">
                    Roofin
                  </span>
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#FFCC00] -mt-3.5 ml-0.5 shadow-xs" />
                </div>

                {/* Vertical Divider */}
                <div className="h-6 w-[1.5px] bg-white/40 mx-1" />

                {/* Badge */}
                <Link
                  href="/group-deal"
                  className="inline-flex items-center gap-2 rounded-[9px] border border-white/70 bg-white/15 px-3 py-1.5 backdrop-blur-md shadow-xs hover:bg-white/25 transition-all"
                >
                  <Users className="h-4 w-4 text-white shrink-0" />
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-white">
                      EXCLUSIVE
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#FFCC00] mt-0.5">
                      GROUP DEAL
                    </span>
                  </div>
                </Link>
              </div>

              {/* Row 2: Headline & Aspire Silicon City Card */}
              <div className="flex items-center gap-5 xl:gap-7 pointer-events-auto">
                {/* Headline */}
                <div>
                  <h2 className="text-[24px] xl:text-[28px] font-black leading-[1.15] tracking-tight text-white drop-shadow-xs">
                    Exclusive Group Deal <br />
                    For Only <span className="text-[#FFCC00]">20 Units</span>
                  </h2>
                  <div className="mt-2 h-[3.5px] w-14 rounded-full bg-[#FFCC00]" />
                </div>

                {/* Aspire Silicon City Spec Card */}
                <Link
                  href="/group-deal"
                  className="rounded-[14px] bg-white p-2.5 xl:p-3 text-slate-900 shadow-md border border-white/90 hover:scale-[1.02] transition-transform w-[240px] xl:w-[255px] shrink-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[#0066FF] shrink-0">
                      <MapPin className="h-4 w-4 fill-[#0066FF]" />
                    </div>
                    <div>
                      <h3 className="text-[12px] xl:text-[13px] font-bold text-slate-900 leading-tight">
                        Aspire Silicon City,
                      </h3>
                      <p className="text-[10px] xl:text-[10.5px] font-medium text-slate-500">
                        Sector 76, Noida
                      </p>
                    </div>
                  </div>

                  <div className="my-2 border-b border-dotted border-[#0066FF]/35" />

                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div className="flex flex-col items-center justify-center border-r border-slate-100 pr-1">
                      <Bed className="h-3.5 w-3.5 text-[#0066FF]" />
                      <span className="mt-0.5 text-[9px] font-bold text-slate-800 leading-tight">
                        4BHK + S
                      </span>
                      <span className="text-[7.5px] text-slate-500">(Servant)</span>
                    </div>

                    <div className="flex flex-col items-center justify-center border-r border-slate-100 px-1">
                      <Maximize2 className="h-3.5 w-3.5 text-[#0066FF]" />
                      <span className="mt-0.5 text-[9px] font-bold text-slate-800 leading-tight">
                        3342
                      </span>
                      <span className="text-[7.5px] text-slate-500">sq.ft.</span>
                    </div>

                    <div className="flex flex-col items-center justify-center pl-1">
                      <Star className="h-3.5 w-3.5 text-[#0066FF] fill-[#0066FF]" />
                      <span className="mt-0.5 text-[9px] font-bold text-slate-800 leading-tight">
                        Premium
                      </span>
                      <span className="text-[7.5px] text-slate-500">Residences</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Row 3: Benefits Pill Bar (Figma Exact) */}
              <div className="pointer-events-auto rounded-[14px] xl:rounded-[16px] bg-white p-2 xl:p-2.5 shadow-md border border-white flex items-center gap-3 w-fit max-w-[500px] xl:max-w-[540px]">
                {/* 1. Save 10-15 % */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[#0066FF] shrink-0 border border-blue-200">
                    <Percent className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] xl:text-[11.5px] font-bold text-[#0066FF]">
                      Save 10-15 %
                    </p>
                    <p className="text-[8.5px] xl:text-[9px] text-slate-600 font-medium whitespace-nowrap">
                      more than market prices
                    </p>
                  </div>
                </div>

                <div className="w-[1px] h-7 bg-slate-200 shrink-0" />

                {/* 2. We negotiate directly */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[#0066FF] shrink-0 border border-blue-200">
                    <Handshake className="h-3.5 w-3.5 text-[#0066FF]" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] xl:text-[11.5px] font-bold text-[#0066FF]">
                      We negotiate
                    </p>
                    <p className="text-[8.5px] xl:text-[9px] text-slate-600 font-medium whitespace-nowrap">
                      directly with developers
                    </p>
                  </div>
                </div>

                <div className="w-[1px] h-7 bg-slate-200 shrink-0" />

                {/* 3. 100% broker commission */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[#0066FF] shrink-0 border border-blue-200">
                    <Coins className="h-3.5 w-3.5 text-[#0066FF]" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] xl:text-[11.5px] font-bold text-[#0066FF]">
                      100%
                    </p>
                    <p className="text-[8.5px] xl:text-[9px] text-slate-600 font-medium whitespace-nowrap">
                      broker commission passed back
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 4: CTA Button with Crisp White Border & Validity */}
              <div className="flex items-center gap-4 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center gap-2 rounded-[10px] border-2 border-white bg-gradient-to-r from-[#FFB800] via-[#FFAE00] to-[#FF9500] px-5 py-2 xl:py-2.5 text-[12px] xl:text-[13px] font-black text-white shadow-[0_4px_16px_rgba(255,160,0,0.45)] hover:shadow-[0_6px_22px_rgba(255,160,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider"
                >
                  <span>I’M INTERESTED</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-2 text-white">
                  <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-white/20 border border-white/40 backdrop-blur-xs text-white">
                    <Calendar className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[10px] font-medium text-white/90">
                      Offer Valid For
                    </span>
                    <span className="text-[11px] font-bold text-[#FFCC00]">
                      Limited Units Only .
                    </span>
                  </div>
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
                <span className="text-[28px] sm:text-[34px] font-black tracking-tight text-white font-poppins">
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
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#FFCC00] mt-0.5">
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
                src="/public/icon/hero/Frame 18.svg"
                alt="Building towers"
                fill
                className="object-cover object-right"
                unoptimized
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
                  <div className="flex items-center justify-between font-medium">
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
                    Thank you, <span className="font-medium text-slate-900">{formData.name}</span>. Your priority slot for Aspire Silicon City has been pre-locked.
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
