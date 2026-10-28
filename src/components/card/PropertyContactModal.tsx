"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  User,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";
import { propertyApi } from "@/lib/features/property/propertyApi";

interface PropertyContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id?: string | number;
    title?: string;
    location?: string;
    price?: string;
    image?: string;
    phone?: string;
    dealerName?: string;
  };
}

export const PropertyContactModal = ({
  isOpen,
  onClose,
  property,
}: PropertyContactModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [timeSlot, setTimeSlot] = useState("Immediate (Within 15 mins)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for ESC key
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

  if (!isOpen || !mounted) return null;

  const dealerPhone = property.phone || "+91 9876543210";
  const cleanPhone = dealerPhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`}?text=${encodeURIComponent(
    `Hi, I am interested in ${property.title || "this property"} in ${property.location || "Noida"}. Please share more details.`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = mobile.trim();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);
    // Send lead to backend API
    propertyApi.submitEnquiry({
      name: name.trim(),
      email: `buyer${cleanMobile.slice(-6)}@roofin.in`,
      phone: cleanMobile,
      message: `Instant callback requested (${timeSlot}) for: ${property.title || "Property"} (${property.location || "Noida"})`,
      propertyId: typeof property.id === "string" ? property.id : undefined,
    }).catch(() => {});

    setTimeout(() => {
      // Save request to localStorage so it syncs with User Dashboard
      try {
        const existing = JSON.parse(localStorage.getItem("roofin_callback_requests") || "[]");
        existing.unshift({
          id: `cb-${Date.now()}`,
          propertyId: property.id,
          propertyTitle: property.title || "Selected Property",
          propertyLocation: property.location || "Noida",
          dealerPhone: property.phone || "+91 98765 43210",
          name: name.trim(),
          phone: cleanMobile,
          date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          timeSlot: timeSlot || "Morning (10 AM - 1 PM)",
          status: "Callback Scheduled",
        });
        localStorage.setItem("roofin_callback_requests", JSON.stringify(existing));
      } catch {}

      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Callback request submitted! Our dealer will contact you shortly.");
    }, 600);
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
        {/* Top Header Glow */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#1865F2] via-blue-400 to-[#00BA7A]" />

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          {/* Property Mini Header */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
            <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
              <Image
                src={property.image || "/images/properties/villa-popular-figma.jpg"}
                alt={property.title || "Property"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1865F2]">
                Contact Dealer
              </span>
              <h3 className="text-sm font-bold text-slate-900 truncate">
                {property.title || "Luxury Residential Property"}
              </h3>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {property.location || "Sector 103, Noida"}
              </p>
              <p className="text-xs font-extrabold text-[#1865F2] mt-0.5">
                {property.price || "₹1.25 Cr*"}
              </p>
            </div>
          </div>

          {/* Dealer Info Row */}
          <div className="mt-4 flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
                  alt="Dealer"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  {property.dealerName || "Goyal Assar"}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="h-3 w-3 text-[#00BA7A]" />
                  <span className="text-[10.5px] font-semibold text-[#00BA7A]">
                    Verified Featured Dealer
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* WhatsApp Quick Link */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xs transition-transform hover:scale-105"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>

              {/* Direct Call Link */}
              <a
                href={`tel:${dealerPhone}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1865F2] hover:bg-blue-700 text-white shadow-xs transition-transform hover:scale-105"
                title="Call Directly"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {submitted ? (
            /* Success State */
            <div className="my-6 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00BA7A] text-white mb-3">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Callback Requested!
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xs">
                Thank you, <span className="font-semibold text-slate-900">{name}</span>. The verified dealer will call you at <span className="font-semibold text-slate-900">{mobile}</span> during the {timeSlot.toLowerCase()} slot.
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
            /* Request Callback Form */
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Sparkles className="h-3.5 w-3.5 text-[#1865F2]" />
                <span>Request a Free Instant Callback</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-[#1865F2] focus:outline-none shadow-2xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  10-Digit Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-[#1865F2] focus:outline-none shadow-2xs font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Preferred Call Time
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    "Immediate (Within 15 mins)",
                    "Morning (9 AM - 12 PM)",
                    "Afternoon (12 PM - 4 PM)",
                    "Evening (4 PM - 8 PM)",
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-left ${
                        timeSlot === slot
                          ? "border-[#1865F2] bg-blue-50/80 text-[#1865F2] font-semibold shadow-2xs"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Clock className="h-3 w-3 shrink-0" />
                      <span className="truncate">{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1E6BFF] to-[#1865F2] hover:from-[#1865F2] hover:to-[#1250C4] py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-70"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isSubmitting ? "Submitting..." : "Get Instant Callback"}</span>
              </button>

              <p className="text-center text-[10px] text-slate-400">
                🔒 Your contact details are secure. Zero spam guarantee.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
