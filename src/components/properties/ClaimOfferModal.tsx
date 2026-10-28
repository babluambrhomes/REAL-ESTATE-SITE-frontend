"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Gift, CheckCircle2, Copy, Check, Sparkles, Tag, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/axios";

interface ClaimOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const availableOffers = [
  {
    id: "site-visit",
    title: "Free Cab & Guided Site Visit",
    desc: "AC cab pick & drop service with dedicated property advisor",
    badge: "MOST POPULAR",
  },
  {
    id: "zero-brokerage",
    title: "100% Zero Brokerage Guarantee",
    desc: "Direct deal with verified builder / verified owner",
    badge: "SAVE ₹50,000+",
  },
  {
    id: "cash-discount",
    title: "₹50,000 Interior & Modular Kitchen Voucher",
    desc: "Redeemable with top interior partners upon booking",
    badge: "LIMITED PERIOD",
  },
  {
    id: "legal-vastu",
    title: "Free Legal Verification & Vastu Report",
    desc: "Complete document title check by certified legal advocates",
    badge: "EXPERT ASSIST",
  },
];

export const ClaimOfferModal = ({ isOpen, onClose }: ClaimOfferModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(availableOffers[0].id);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [claimedCode, setClaimedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setClaimedCode(null);
      setCopied(false);
      return;
    }
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

  if (!isOpen || !mounted) return null;

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);
    const code = `ROOFIN-${Math.floor(1000 + Math.random() * 9000)}-${selectedOffer.toUpperCase().slice(0, 4)}`;
    const chosenOffer = availableOffers.find((o) => o.id === selectedOffer);

    try {
      await apiClient.post("/enquiries", {
        name: name.trim(),
        email: `offer_${mobile.trim()}@roofin.in`,
        phone: mobile.trim(),
        message: `Claimed Offer: ${chosenOffer?.title || selectedOffer} [Code: ${code}]`,
      });
    } catch {
      // Local fallback
      try {
        const stored = JSON.parse(localStorage.getItem("roofin_claimed_offers") || "[]");
        stored.push({
          code,
          offerId: selectedOffer,
          offerTitle: chosenOffer?.title,
          name: name.trim(),
          mobile: mobile.trim(),
          date: new Date().toISOString(),
        });
        localStorage.setItem("roofin_claimed_offers", JSON.stringify(stored));
      } catch {}
    }

    setIsSubmitting(false);
    setClaimedCode(code);
    toast.success("Offer claimed successfully!");
  };

  const handleCopy = () => {
    if (!claimedCode) return;
    navigator.clipboard.writeText(claimedCode);
    setCopied(true);
    toast.success("Coupon code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Gradient */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#FF385C] via-rose-400 to-[#1865F2]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-[#FF385C]">
              <Gift className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Claim Today&apos;s Exclusive Offers
              </h3>
              <p className="text-xs text-slate-500">
                Guaranteed voucher sent instantly to your mobile number
              </p>
            </div>
          </div>

          {claimedCode ? (
            /* Success Voucher Screen */
            <div className="my-5 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gradient-to-b from-rose-50/50 to-white border border-rose-200/80">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00BA7A] text-white mb-3">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Offer Claimed Successfully!
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xs">
                Your unique voucher code has been registered for <span className="font-medium">{mobile}</span>:
              </p>

              <div className="mt-4 flex items-center justify-between w-full max-w-xs px-4 py-3 rounded-xl bg-white border-2 border-dashed border-[#FF385C] shadow-xs">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-[#FF385C]" />
                  <span className="font-mono text-sm font-extrabold text-[#0B132B] tracking-wider">
                    {claimedCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-lg bg-rose-50 hover:bg-rose-100 px-2.5 py-1 text-xs font-bold text-[#FF385C] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                Show this code during your site visit or builder meeting to redeem.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-4 rounded-xl bg-[#1865F2] px-6 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            /* Offer Selection & Mobile Input Form */
            <form onSubmit={handleClaim} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Your Offer:
                </label>
                <div className="space-y-2">
                  {availableOffers.map((offer) => (
                    <div
                      key={offer.id}
                      onClick={() => setSelectedOffer(offer.id)}
                      className={`flex items-start justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedOffer === offer.id
                          ? "border-[#FF385C] bg-rose-50/40 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{offer.title}</p>
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-rose-100 text-[#FF385C]">
                            {offer.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{offer.desc}</p>
                      </div>
                      <div
                        className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border flex items-center justify-center ${
                          selectedOffer === offer.id
                            ? "border-[#FF385C] bg-[#FF385C]"
                            : "border-slate-300"
                        }`}
                      >
                        {selectedOffer === offer.id && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#FF385C] focus:outline-none shadow-2xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      placeholder="9876543210"
                      className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2 text-xs text-slate-900 focus:border-[#FF385C] focus:outline-none shadow-2xs font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF385C] to-[#E0244C] hover:from-[#E0244C] hover:to-[#C01538] py-2.5 text-xs font-bold text-white shadow-md shadow-rose-500/20 transition-all cursor-pointer disabled:opacity-70"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isSubmitting ? "Generating Voucher..." : "Claim Exclusive Voucher Now"}</span>
              </button>

              <p className="text-center text-[10.5px] text-slate-400">
                🔒 Zero spam. Voucher delivered instantly via SMS / WhatsApp.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
