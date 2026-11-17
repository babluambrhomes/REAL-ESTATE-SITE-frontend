"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  MapPin,
  Building2,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

interface PropertySiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id?: string | number;
    title: string;
    location: string;
    price?: string;
  };
}

export const PropertySiteVisitModal: React.FC<PropertySiteVisitModalProps> = ({
  isOpen,
  onClose,
  property,
}) => {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDay, setSelectedDay] = useState<"today" | "tomorrow" | "weekend" | "custom">("tomorrow");
  const [customDate, setCustomDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("11:00 AM - 01:00 PM");
  const [needCab, setNeedCab] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll on open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const timeSlots = [
    { label: "Morning", time: "10:00 AM - 12:00 PM" },
    { label: "Afternoon", time: "12:00 PM - 03:00 PM" },
    { label: "Evening", time: "03:00 PM - 06:00 PM" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);

    const visitDateLabel =
      selectedDay === "today"
        ? "Today"
        : selectedDay === "tomorrow"
        ? "Tomorrow"
        : selectedDay === "weekend"
        ? "This Weekend"
        : customDate || "Custom Date";

    const newEnquiry = {
      id: "sv_" + Date.now(),
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim(),
      visitDate: visitDateLabel,
      timeSlot: selectedTimeSlot,
      needCab,
      status: "Site Visit Scheduled",
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("roofin_enquiries") || "[]");
      existing.unshift(newEnquiry);
      localStorage.setItem("roofin_enquiries", JSON.stringify(existing));
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Site visit booked! Our advisor will call to confirm.");
    }, 600);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-poppins animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-[28px] bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={36} className="stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Site Visit Scheduled!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              We have reserved your site tour for <span className="font-bold text-[#1865F2]">{property.title}</span>. Our verified area expert will call you on <span className="font-bold">{phone}</span> to confirm your cab pickup and gate pass.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-xl bg-[#1865F2] px-7 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-5 pr-8">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-0.5 text-[11px] font-bold text-[#1865F2] mb-1.5">
                <Sparkles size={12} />
                <span>Zero Cost • Free Cab Assistance</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Schedule a Free Site Visit
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 truncate">
                <MapPin size={12} className="text-[#1865F2] shrink-0" />
                <span className="font-medium text-slate-700 truncate">{property.title}</span>
                <span className="text-slate-400">({property.location})</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Day Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Preferred Day
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDay("today")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      selectedDay === "today"
                        ? "border-[#1865F2] bg-blue-50/70 text-[#1865F2] shadow-2xs"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDay("tomorrow")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      selectedDay === "tomorrow"
                        ? "border-[#1865F2] bg-blue-50/70 text-[#1865F2] shadow-2xs"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    Tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDay("weekend")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      selectedDay === "weekend"
                        ? "border-[#1865F2] bg-blue-50/70 text-[#1865F2] shadow-2xs"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    This Weekend
                  </button>
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`py-2 px-2 text-center rounded-xl border text-[11px] font-medium cursor-pointer transition-all ${
                        selectedTimeSlot === slot.time
                          ? "border-[#1865F2] bg-[#1865F2] text-white shadow-2xs"
                          : "border-slate-200 text-slate-700 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <span className="block font-bold leading-tight">{slot.label}</span>
                      <span className="block text-[9.5px] opacity-80 leading-tight mt-0.5">
                        {slot.time.split("-")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#1865F2] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative flex rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden focus-within:border-[#1865F2] focus-within:bg-white">
                    <span className="flex items-center bg-slate-100/80 px-3 text-xs font-bold text-slate-600 border-r border-slate-200">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                      required
                      className="flex-1 py-2.5 px-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Free Cab Option */}
                <label className="flex items-center gap-2 pt-1 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needCab}
                    onChange={(e) => setNeedCab(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#1865F2] cursor-pointer"
                  />
                  <span>Need free pick & drop cab service for this visit</span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-[#1865F2] to-[#0284C7] py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:from-blue-700 hover:to-cyan-700 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Booking Your Visit..." : "Confirm Free Site Visit"}
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  🔒 100% spam-free. Your contact details are kept strictly private.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
