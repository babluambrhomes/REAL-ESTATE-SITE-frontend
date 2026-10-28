"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Calculator, CheckCircle2, ArrowRight, Sparkles, Building2 } from "lucide-react";
import toast from "react-hot-toast";
import { PropertyEmiCalculatorModal } from "@/components/properties/PropertyEmiCalculatorModal";

export const BuilderSidebarLeadForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [project, setProject] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [lastSubmittedLead, setLastSubmittedLead] = useState<{
    name: string;
    mobile: string;
    project: string;
  } | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!mobile.trim() || mobile.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!agreed) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    const chosenProject = project || "The Terraces at Max Estate 361";
    const leadData = {
      name: name.trim(),
      mobile: mobile.trim(),
      project: chosenProject,
    };

    // Save to roofin_enquiries in localStorage
    try {
      const newEnquiry = {
        id: `enq-${Date.now()}`,
        propertyTitle: chosenProject ? `${chosenProject} (ATS Infra)` : "ATS Infrastructure - Direct Advisory",
        propertyLocation: "Sector 150 / 128, Noida Expressway",
        dealerName: "ATS Infrastructure Corporate Desk",
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        message: `Budget: ${budget || "Flexible"}, Selected Project: ${chosenProject}, Mobile: ${mobile.trim()}`,
        status: "Dealer Assigned",
        propertyId: "1",
      };
      const existing = JSON.parse(localStorage.getItem("roofin_enquiries") || "[]");
      localStorage.setItem("roofin_enquiries", JSON.stringify([newEnquiry, ...existing]));

      // Update user profile info
      const userProfile = JSON.parse(localStorage.getItem("roofin_user_profile") || "{}");
      localStorage.setItem(
        "roofin_user_profile",
        JSON.stringify({
          ...userProfile,
          name: name.trim() || userProfile.name,
          phone: mobile.trim() || userProfile.phone,
          email: email.trim() || userProfile.email,
          budget: budget || userProfile.budget,
        })
      );
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    try {
      await fetch("/api/v1/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || `builder_lead_${mobile.replace(/\D/g, "")}@roofin.com`,
          phone: mobile.trim(),
          message: `Builder Lead - Budget: ${budget || "Any"}, Project: ${chosenProject}, Builder: ATS Infrastructure`,
        }),
      });
    } catch (err) {
      console.warn("Builder enquiry backend error (handled gracefully):", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setLastSubmittedLead(leadData);
      toast.success("Enquiry sent! The builder will contact you shortly.");
      setName("");
      setMobile("");
      setEmail("");
      setBudget("");
      setProject("");
    }
  };

  const banks = [
    {
      name: "SBI",
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#0091DF] flex items-center justify-center shrink-0">
            <div className="w-1 h-1.5 bg-white rounded-t-full" />
          </div>
          <span className="text-[11px] font-black text-[#0091DF] tracking-tight">SBI</span>
        </div>
      ),
    },
    {
      name: "AXIS BANK",
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 bg-[#97144D] rounded-xs flex items-center justify-center text-white text-[8px] font-black shrink-0">
            ▲
          </div>
          <span className="text-[10px] font-black text-[#97144D] tracking-tight">AXIS BANK</span>
        </div>
      ),
    },
    {
      name: "ICICI BANK",
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#F37021] flex items-center justify-center text-white text-[7px] font-black shrink-0">
            i
          </div>
          <span className="text-[10px] font-black text-[#F37021] tracking-tight">ICICI BANK</span>
        </div>
      ),
    },
    {
      name: "HDFC BANK",
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 bg-[#004C8F] border border-[#ED232A] rounded-xs flex items-center justify-center shrink-0">
            <div className="w-1.5 h-1.5 bg-[#ED232A]" />
          </div>
          <span className="text-[10px] font-black text-[#004C8F] tracking-tight">HDFC BANK</span>
        </div>
      ),
    },
    {
      name: "kotak",
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ED1C24] flex items-center justify-center text-white text-[7px] font-bold shrink-0">
            ∞
          </div>
          <span className="text-[11px] font-black text-[#ED1C24] tracking-tight">kotak</span>
        </div>
      ),
    },
    {
      name: "Union Bank",
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-xs bg-[#E31E24] flex items-center justify-center text-white text-[7px] font-black shrink-0">
            UB
          </div>
          <span className="text-[10px] font-black text-[#003B73] tracking-tight">Union Bank</span>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-4 font-poppins">
      {/* 1. Card: Interested in this builder ? */}
      <div id="builder-lead-form" className="bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)]">
        {isSubmitted ? (
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[10px] font-black tracking-wide text-emerald-700 uppercase mb-2">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Direct Enquiry Registered
            </span>
            <h4 className="text-base font-black text-[#0B132B]">
              Thank You, {lastSubmittedLead?.name || "Valued Buyer"}!
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
              Your request for <span className="font-bold text-[#0B132B]">{lastSubmittedLead?.project}</span> has been forwarded to ATS Infrastructure official sales desk.
            </p>
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 my-3 text-left">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <Building2 className="w-4 h-4 text-[#1865F2] shrink-0" />
                <span>Assigned: ATS Corporate Advisor</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                You will receive exclusive floor plans & VIP pricing on <span className="font-bold text-slate-700">{lastSubmittedLead?.mobile}</span> within 2 hours.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <Link
                href="/u/me?tab=enquiries"
                className="w-full py-2.5 bg-[#1865F2] hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(24,101,242,0.3)] transition-all cursor-pointer"
              >
                <span>View in My Enquiries Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-sm sm:text-[15px] font-black text-[#0B132B]">
              Interested in this builder ?
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
              Get Expert Guidance For Your Ideal Home Purchase Today.
            </p>

            <form className="mt-4 space-y-2.5" onSubmit={handleFormSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1865F2] focus:outline-none transition-all"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1865F2] focus:outline-none transition-all"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1865F2] focus:outline-none transition-all"
                />
              </div>

              <div className="relative">
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-700 focus:bg-white focus:border-[#1865F2] focus:outline-none appearance-none transition-all cursor-pointer"
                >
                  <option value="">Budget Range</option>
                  <option value="50L - 1Cr">₹50 Lakh - ₹1 Crore</option>
                  <option value="1Cr - 2Cr">₹1 Crore - ₹2 Crore</option>
                  <option value="2Cr - 5Cr">₹2 Crore - ₹5 Crore</option>
                  <option value="5Cr+">₹5 Crore +</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-700 focus:bg-white focus:border-[#1865F2] focus:outline-none appearance-none transition-all cursor-pointer"
                >
                  <option value="">Preferred Project</option>
                  <option value="The Terraces at Max Estate 361">
                    The Terraces at Max Estate 361
                  </option>
                  <option value="ReverseEXP Prime">ReverseEXP Prime</option>
                  <option value="ReverseEXP Luxe">ReverseEXP Luxe</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-[#00B368] focus:ring-0"
                />
                <span className="text-[10.5px] text-slate-500">
                  I Agree To ReverseExp Terms & Condition
                </span>
              </label>

              {/* Green Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-[#00B368] hover:bg-[#009b5a] disabled:opacity-75 text-white text-xs font-bold rounded-xl shadow-[0_4px_14px_rgba(0,179,104,0.3)] transition-all cursor-pointer mt-1"
              >
                {isSubmitting ? "Submitting..." : "Contact Builder Now"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* 2. Card: Bank Approvals */}
      <div className="bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)]">
        <h3 className="text-sm sm:text-[15px] font-black text-[#0B132B] mb-3">
          Bank Approvals
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {banks.map((b) => (
            <div
              key={b.name}
              className="h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center p-2 shadow-2xs hover:border-slate-300 transition-colors"
            >
              {b.logo}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowEmiModal(true)}
          className="w-full mt-3.5 py-2 rounded-xl border border-[#BFDBFE] bg-white hover:bg-blue-50/50 text-center text-[11px] font-bold text-[#1865F2] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5 text-[#1865F2]" />
          <span>Calculate Home Loan</span>
        </button>
      </div>

      {/* Property EMI Calculator Modal */}
      <PropertyEmiCalculatorModal
        isOpen={showEmiModal}
        onClose={() => setShowEmiModal(false)}
        propertyTitle={lastSubmittedLead?.project || "ATS Infrastructure Projects"}
        propertyLocation="Sector 150 / 128, Noida Expressway"
        initialPrice="₹1.50 Cr"
      />

      {/* 3. Card: Company Portfolio (Donut Chart) */}
      <div className="bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)]">
        <h3 className="text-sm sm:text-[15px] font-black text-[#0B132B] mb-3">
          Company Portfolio
        </h3>

        <div className="flex items-center gap-4">
          {/* SVG Donut Chart */}
          <div className="relative w-24 h-24 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              {/* Slice 1: Delivered (25/44 = ~57%) -> Teal/Blue */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#00D1FF"
                strokeWidth="4.5"
                strokeDasharray="57, 100"
                strokeDashoffset="0"
              />
              {/* Slice 2: Ongoing (12/44 = ~27%) -> Orange */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="4.5"
                strokeDasharray="27, 100"
                strokeDashoffset="-57"
              />
              {/* Slice 3: Upcoming (7/44 = ~16%) -> Green */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#10B981"
                strokeWidth="4.5"
                strokeDasharray="16, 100"
                strokeDashoffset="-84"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[12px] font-black text-[#0B132B]">44</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase">Total</span>
            </div>
          </div>

          {/* Legend Details */}
          <div className="flex-1 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 font-bold text-[11px]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#00D1FF]" />
                Delivered
              </span>
              <span className="font-black text-[#0B132B]">25</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 font-bold text-[11px]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]" />
                Ongoing
              </span>
              <span className="font-black text-[#0B132B]">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 font-bold text-[11px]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />
                Upcoming
              </span>
              <span className="font-black text-[#0B132B]">7</span>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100 text-center text-[10.5px] font-bold text-slate-500">
          Total Projects: <span className="text-[#0B132B] font-black">44</span>
        </div>
      </div>
    </div>
  );
};
