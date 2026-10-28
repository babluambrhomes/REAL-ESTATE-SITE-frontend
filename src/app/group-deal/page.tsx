"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { GroupDealBanner } from "@/components/home/GroupDealBanner";
import {
  Users,
  MapPin,
  Bed,
  Maximize2,
  Star,
  Percent,
  Handshake,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  User,
  Mail,
  Building2,
  Sparkles,
  ChevronRight,
  TrendingDown,
  BadgeCheck,
  HelpCircle,
} from "lucide-react";
import { propertyApi } from "@/lib/features/property/propertyApi";

export default function GroupDealPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    unitType: "4BHK + Servant (3342 sq.ft.)",
  });
  const [submitted, setSubmitted] = useState(false);
  const [claimedCode, setClaimedCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const voucherCode = `ROOFIN-COBUY-76${Math.floor(10 + Math.random() * 90)}`;
    setClaimedCode(voucherCode);

    try {
      await propertyApi.submitEnquiry({
        name: formData.name.trim(),
        email: formData.email?.trim() || `deal_${formData.phone.replace(/\D/g, "")}@roofin.com`,
        phone: formData.phone.trim(),
        message: `Group Deal Reservation: Aspire Silicon City, Sector 76 Noida - ${formData.unitType} (Voucher: ${voucherCode})`,
      });
    } catch (err) {
      console.warn("Group deal lead sync error:", err);
    }

    try {
      const existingOffers = JSON.parse(localStorage.getItem("roofin_claimed_offers") || "[]");
      const newVoucher = {
        id: `deal-voucher-${Date.now()}`,
        title: `Group Deal Slot - Aspire Silicon City (${formData.unitType})`,
        discount: "15% Developer Tier OFF",
        code: voucherCode,
        validUntil: "30 Nov 2026",
        claimedAt: new Date().toISOString(),
      };
      localStorage.setItem("roofin_claimed_offers", JSON.stringify([newVoucher, ...existingOffers]));
    } catch {}

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Header */}
      <SimpleHeader />

      {/* 2. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] px-4 sm:px-8 pt-5 pb-2">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">Exclusive Group Deal</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[#1865F2] font-medium">Aspire Silicon City, Sector 76, Noida</span>
        </div>
      </nav>

      {/* 3. The 1:1 Pixel-Perfect Hero Banner */}
      <GroupDealBanner />

      {/* 4. Live Group Deal Status Tracker Bar */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 py-4 -mt-4 sm:-mt-6">
        <div className="rounded-[24px] bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-slate-200/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Progress info */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1865F2]">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>GROUP BUYING COHORT ACTIVE</span>
                </div>
                <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  <span>Deal Closes in: <span className="text-slate-900 font-extrabold">3 Days, 14 Hrs</span></span>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  16 of 20 Units Claimed{" "}
                  <span className="text-emerald-600 text-lg sm:text-xl font-bold">(80% Filled)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Only <span className="font-bold text-amber-600">4 remaining spots</span> to unlock maximum 15% pre-negotiated developer tier discount.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#1865F2] via-[#00A3FF] to-[#00D084] transition-all duration-1000 shadow-sm"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span>0 Units Booked</span>
                  <span className="text-[#1865F2]">16 Units Locked</span>
                  <span className="text-slate-700">Target: 20 Units</span>
                </div>
              </div>
            </div>

            {/* Right: Key Stats Counters */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6">
              <div className="rounded-2xl bg-slate-50 p-3.5 sm:p-4 border border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Total Group Savings
                </span>
                <p className="text-xl sm:text-2xl font-black text-[#1865F2] mt-0.5">
                  ₹7.52 Cr+
                </p>
                <span className="text-[10.5px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5">
                  <TrendingDown className="h-3 w-3" />
                  ~₹47L Saved / Unit
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 sm:p-4 border border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Broker Commission
                </span>
                <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">
                  100% Passed Back
                </p>
                <span className="text-[10.5px] text-slate-500 font-medium mt-0.5">
                  Zero Brokerage Fee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Comparison Table & Calculator */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pricing Comparison Breakdown (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#1865F2]">
                TRANSPARENT VALUE BREAKDOWN
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Why Individual Buyers Lose Money vs. Roofin Group Buying
              </h2>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                When you buy alone, developers offer standard rack rates and brokers charge hefty 1-2% brokerage. By combining 20 genuine buyers into a single block purchase, Roofin unlocks institutional wholesale pricing.
              </p>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Buying Individually */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs relative">
                <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 uppercase">
                  Solo Retail Buyer
                </span>
                <h4 className="mt-3 text-lg font-bold text-slate-800">
                  Standard Market Purchase
                </h4>

                <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Base Selling Price (3342 sq.ft.)</span>
                    <span className="font-bold text-slate-800">₹3.15 Cr</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Floor Rise & Preferred Loc Charges</span>
                    <span className="font-bold text-slate-800">+ ₹12.5 Lakhs</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Brokerage Fee (1%)</span>
                    <span className="font-bold text-red-600">+ ₹3.15 Lakhs</span>
                  </div>
                  <div className="flex justify-between py-2 font-black text-sm text-slate-900 border-t border-slate-200">
                    <span>Total Net Cost</span>
                    <span>₹3.30 Cr</span>
                  </div>
                </div>
              </div>

              {/* Option B: Roofin Group Deal (Winner) */}
              <div className="rounded-2xl border-2 border-[#1865F2] bg-gradient-to-b from-[#F0F6FE] to-white p-5 shadow-lg relative">
                <div className="absolute -top-3 right-4 rounded-full bg-[#1865F2] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-xs">
                  SAVE ₹47 LAKHS
                </div>

                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-[11px] font-black text-[#1865F2] uppercase">
                  Roofin Group Deal
                </span>
                <h4 className="mt-3 text-lg font-bold text-slate-900">
                  Pre-Negotiated 20-Unit Cohort
                </h4>

                <div className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between py-1 border-b border-blue-100">
                    <span>Institutional Discount Rate</span>
                    <span className="font-bold text-emerald-600">-15% Direct</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-blue-100">
                    <span>PLC & Club Waiver</span>
                    <span className="font-bold text-emerald-600">100% Waived</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-blue-100">
                    <span>Broker Commission</span>
                    <span className="font-bold text-emerald-600">₹0 (Passed Back)</span>
                  </div>
                  <div className="flex justify-between py-2 font-black text-sm text-[#1865F2] border-t border-blue-200">
                    <span>Effective Final Cost</span>
                    <span>₹2.68 Cr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Value Pillars */}
            <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-xs border border-slate-200/90 space-y-4">
              <h4 className="text-base font-bold text-slate-900">
                Core Guarantees of This Exclusive Deal:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#1865F2] shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">RERA & Legal Verified</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      100% clear title documentation and encumbrance certificate vetted.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#1865F2] shrink-0">
                    <Coins className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Zero Hidden Charges</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      All builder charges, club membership, and parking included in price.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#1865F2] shrink-0">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Bank Pre-Approved</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pre-sanctioned loans with SBI, HDFC, and ICICI at lowest repo-linked rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Lock-In Form (Span 5) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-[28px] bg-white p-6 sm:p-8 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-amber-800">
                  SLOTS FILLING FAST
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  4 Remaining
                </span>
              </div>

              <h3 className="mt-3 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Lock In Your Group Price
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to reserve one of the remaining 4 units under the institutional group rate.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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
                        placeholder="John Doe"
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
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-[#1865F2] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Configuration
                    </label>
                    <select
                      value={formData.unitType}
                      onChange={(e) =>
                        setFormData({ ...formData, unitType: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs text-slate-800 font-medium focus:border-[#1865F2] focus:bg-white focus:outline-none"
                    >
                      <option>4BHK + Servant (3342 sq.ft.) - Only 4 Units Left</option>
                      <option>3BHK + Servant (2450 sq.ft.) - Waitlist Only</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFB800] via-[#FFA800] to-[#FF9500] py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>RESERVE MY GROUP DEAL SLOT</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    No payment required upfront. A deal advisor will assist you with site visit & unit allocation.
                  </p>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-slate-900">
                      Slot Reserved Successfully!
                    </h4>
                    <p className="text-xs text-slate-600">
                      Congratulations <span className="font-bold text-slate-900">{formData.name}</span>. Your cohort slot has been pre-locked.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-dashed border-blue-300 rounded-2xl p-4 text-center max-w-sm mx-auto space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Your Exclusive Group Voucher Code
                    </span>
                    <div className="font-mono text-base font-extrabold text-[#1865F2] bg-white py-1.5 px-3 rounded-lg border border-slate-200 inline-block shadow-2xs">
                      {claimedCode}
                    </div>
                    <p className="text-[10.5px] text-emerald-700 font-medium">
                      ✓ Saved to your Roofin Account Vouchers
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                    <Link
                      href="/u/me?tab=offers"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      View in My Vouchers
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                    >
                      Reserve Another Unit
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1">
                    Our Senior Relationship Manager will call your number ({formData.phone}) within 15 minutes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
