"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Calculator,
  Building2,
  MapPin,
  Percent,
  Calendar,
  Wallet,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

export interface PropertyEmiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyLocation?: string;
  initialPrice?: string | number;
}

// Format numbers into Indian currency display
export const formatIndianCurrency = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(2)} Lakh`;
  }
  return `₹ ${amount.toLocaleString("en-IN")}`;
};

// Robust parser for prices like "₹1.50 Cr", "85 Lakh", "75 L", 12500000, etc.
const parsePriceToNumber = (priceInput?: string | number): number => {
  if (typeof priceInput === "number") {
    return priceInput > 0 ? priceInput : 10000000;
  }
  if (!priceInput) return 10000000; // default 1 Cr

  const str = String(priceInput).replace(/₹|,|\*/g, "").trim().toLowerCase();

  // check Cr / Crore
  if (str.includes("cr")) {
    const num = parseFloat(str.replace(/cr(ore)?/g, "").trim());
    if (!isNaN(num) && num > 0) return Math.round(num * 10000000);
  }
  // check L / Lac / Lakh
  if (str.includes("l") || str.includes("lac") || str.includes("lakh")) {
    const num = parseFloat(str.replace(/(lakh|lac|l)/g, "").trim());
    if (!isNaN(num) && num > 0) return Math.round(num * 100000);
  }
  // check k / thousand
  if (str.includes("k")) {
    const num = parseFloat(str.replace(/k/g, "").trim());
    if (!isNaN(num) && num > 0) return Math.round(num * 1000);
  }

  const num = parseFloat(str);
  if (!isNaN(num) && num > 0) {
    if (num < 100) return Math.round(num * 10000000);
    if (num < 10000) return Math.round(num * 100000);
    return Math.round(num);
  }

  return 10000000;
};

const bankPartners = [
  { name: "SBI Home Loans", rate: 8.5, maxTenure: 30, processingFee: "0.35%" },
  { name: "HDFC Bank", rate: 8.65, maxTenure: 30, processingFee: "0.50%" },
  { name: "ICICI Bank", rate: 8.75, maxTenure: 30, processingFee: "0.50%" },
  { name: "Axis Bank", rate: 8.75, maxTenure: 30, processingFee: "0.40%" },
];

export const PropertyEmiCalculatorModal: React.FC<PropertyEmiCalculatorModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
  propertyLocation,
  initialPrice,
}) => {
  const [mounted, setMounted] = useState(false);

  // Parsed initial base property price
  const basePrice = useMemo(() => parsePriceToNumber(initialPrice), [initialPrice]);

  const [propertyPrice, setPropertyPrice] = useState<number>(basePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Lead capture state
  const [phone, setPhone] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Sync state whenever modal is opened or initialPrice changes
  useEffect(() => {
    if (isOpen) {
      const parsed = parsePriceToNumber(initialPrice);
      setPropertyPrice(parsed);
      setDownPaymentPercent(20);
      setInterestRate(8.5);
      setTenureYears(20);
      setHasApplied(false);
    }
  }, [isOpen, initialPrice]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key and background scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Financial calculations
  const downPaymentAmount = useMemo(
    () => Math.round((propertyPrice * downPaymentPercent) / 100),
    [propertyPrice, downPaymentPercent]
  );

  const loanAmount = useMemo(
    () => Math.max(100000, propertyPrice - downPaymentAmount),
    [propertyPrice, downPaymentAmount]
  );

  const { monthlyEmi, totalInterest, totalPayment, principalPercent, interestPercent } =
    useMemo(() => {
      const monthlyRate = interestRate / (12 * 100);
      const totalMonths = tenureYears * 12;

      let emi = 0;
      if (monthlyRate === 0) {
        emi = Math.round(loanAmount / totalMonths);
      } else {
        const factor = Math.pow(1 + monthlyRate, totalMonths);
        emi = Math.round((loanAmount * monthlyRate * factor) / (factor - 1));
      }

      const totalPay = emi * totalMonths;
      const totalInt = Math.max(0, totalPay - loanAmount);
      const pPct = totalPay > 0 ? Math.round((loanAmount / totalPay) * 100) : 50;
      const iPct = 100 - pPct;

      return {
        monthlyEmi: emi,
        totalInterest: totalInt,
        totalPayment: totalPay,
        principalPercent: pPct,
        interestPercent: iPct,
      };
    }, [loanAmount, interestRate, tenureYears]);

  const handleApplyOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setHasApplied(true);
      toast.success("Loan eligibility check submitted! Our loan advisor will contact you.");
    }, 800);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Stripe */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#1865F2] via-blue-500 to-[#00BA7A]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1865F2]/10 text-[#1865F2]">
              <Calculator className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-[#0B132B]">
                  Home Loan EMI Calculator
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Sparkles className="h-3 w-3" /> Real-time Estimate
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                {propertyTitle && (
                  <span className="font-medium text-slate-700 truncate max-w-[260px] sm:max-w-[400px]">
                    {propertyTitle}
                  </span>
                )}
                {propertyLocation && (
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span className="truncate max-w-[180px] sm:max-w-[260px]">
                      {propertyLocation}
                    </span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body: Two columns layout */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Sliders and Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Property Price Slider */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-[#1865F2]" /> Property Value
                </span>
                <span className="text-sm font-black text-[#0B132B] px-2.5 py-1 rounded-lg bg-blue-50/80 border border-blue-100">
                  {formatIndianCurrency(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={1500000}
                max={150000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1865F2]"
              />
              <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-1">
                <span>₹15 Lakh</span>
                <span>₹5 Cr</span>
                <span>₹15 Cr</span>
              </div>
              {/* Quick chips */}
              <div className="flex gap-1.5 flex-wrap mt-2.5">
                {[5000000, 10000000, 15000000, 25000000, 50000000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPropertyPrice(val)}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full border transition-all ${
                      propertyPrice === val
                        ? "bg-[#1865F2] text-white border-[#1865F2]"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {formatIndianCurrency(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Down Payment Slider */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Wallet className="h-3.5 w-3.5 text-[#00BA7A]" /> Down Payment
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ({downPaymentPercent}% of property value)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#0B132B] px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-100">
                    {formatIndianCurrency(downPaymentAmount)}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00BA7A]"
              />
              <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-1">
                <span>10% (Min)</span>
                <span>20% (Standard)</span>
                <span>40%</span>
                <span>60%</span>
              </div>
            </div>

            {/* 3. Interest Rate & Tenure (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Interest Rate */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Percent className="h-3.5 w-3.5 text-[#1865F2]" /> Interest Rate
                  </span>
                  <span className="text-xs font-black text-[#1865F2] px-2 py-0.5 rounded-md bg-blue-50">
                    {interestRate.toFixed(2)}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={7.0}
                  max={14.0}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1865F2]"
                />
                <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-1">
                  <span>7.0%</span>
                  <span>10.5%</span>
                  <span>14.0%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#1865F2]" /> Loan Tenure
                  </span>
                  <span className="text-xs font-black text-[#0B132B] px-2 py-0.5 rounded-md bg-slate-100">
                    {tenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1865F2]"
                />
                <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-1">
                  <span>5 Yrs</span>
                  <span>15 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>

            {/* Partner Bank Rates Table */}
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-3.5">
              <span className="text-[11px] font-bold text-slate-700 block mb-2">
                Compare Current Lender Rates
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {bankPartners.map((bank) => (
                  <button
                    key={bank.name}
                    type="button"
                    onClick={() => setInterestRate(bank.rate)}
                    className={`text-left p-2 rounded-xl border transition-all cursor-pointer ${
                      interestRate === bank.rate
                        ? "bg-white border-[#1865F2] shadow-sm"
                        : "bg-white/60 border-slate-200 hover:bg-white"
                    }`}
                  >
                    <div className="text-[10px] font-medium text-slate-600 truncate">
                      {bank.name}
                    </div>
                    <div className="text-xs font-black text-[#1865F2]">{bank.rate}%</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results & CTA (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {/* Monthly EMI Card */}
            <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-[#1865F2]/5 via-white to-emerald-50/50 p-5 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Estimated Monthly EMI
              </span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-3xl sm:text-4xl font-black text-[#00BA7A] tracking-tight">
                  ₹{monthlyEmi.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-medium text-slate-500">/ month</span>
              </div>

              {/* Progress Bar Distribution */}
              <div className="mt-5">
                <div className="flex justify-between text-[11px] font-medium mb-1.5">
                  <span className="text-[#1865F2]">Principal ({principalPercent}%)</span>
                  <span className="text-[#00BA7A]">Interest ({interestPercent}%)</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden flex">
                  <div
                    style={{ width: `${principalPercent}%` }}
                    className="bg-[#1865F2] h-full transition-all duration-300"
                  />
                  <div
                    style={{ width: `${interestPercent}%` }}
                    className="bg-[#00BA7A] h-full transition-all duration-300"
                  />
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Principal Loan Amount</span>
                  <span className="font-bold text-[#0B132B]">
                    {formatIndianCurrency(loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Total Interest Payable</span>
                  <span className="font-bold text-emerald-700">
                    {formatIndianCurrency(totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-dashed border-slate-200 font-black">
                  <span className="text-slate-700">Total Payable (Loan + Interest)</span>
                  <span className="text-[#0B132B]">{formatIndianCurrency(totalPayment)}</span>
                </div>
              </div>
            </div>

            {/* Instant Pre-Approval Lead Box */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-[#1865F2]" />
                <h4 className="text-xs font-black text-[#0B132B]">
                  Get Pre-Approved Loan Offer
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Avail lowest interest rates starting at 8.40% p.a. from 12+ verified lending partners.
              </p>

              {hasApplied ? (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-emerald-900">Application Submitted!</p>
                  <p className="text-[10px] text-emerald-700 mt-0.5">
                    Our loan advisor will contact you within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplyOffer} className="space-y-2.5">
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#1865F2] focus:ring-1 focus:ring-[#1865F2]"
                  />
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-60"
                  >
                    <span>{isApplying ? "Checking..." : "Check Loan Eligibility"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400">
          <span>*EMI calculations are indicative and subject to lender terms & credit score.</span>
          <button
            type="button"
            onClick={onClose}
            className="font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PropertyEmiCalculatorModal;
