"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Phone,
  User,
  Mail,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Palette,
  Home,
  Clock,
  IndianRupee,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";
import { SearchHeader } from "@/components/layout/SearchHeader";

interface InteriorPackage {
  id: string;
  name: string;
  bhk: string;
  price: string;
  delivery: string;
  image: string;
  highlights: string[];
}

const PACKAGES: InteriorPackage[] = [
  {
    id: "pkg-1",
    name: "Essential Elegance",
    bhk: "2 BHK Flat",
    price: "₹3.8 Lakhs*",
    delivery: "45 Days Guaranteed",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Modular Kitchen with German Hardware",
      "Full Wardrobes in Master & Guest Rooms",
      "Designer False Ceiling with LED lights",
      "Premium Asian Paints Royale Finish",
      "10-Year Material Warranty",
    ],
  },
  {
    id: "pkg-2",
    name: "Luxury Signature",
    bhk: "3 BHK Apartment",
    price: "₹6.5 Lakhs*",
    delivery: "45 Days Guaranteed",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Italian Marble Finish TV Console Unit",
      "Hydraulic Acrylic Modular Kitchen",
      "Walk-in Closet & Vanity Mirrors",
      "Smart Home Automation Pre-wiring",
      "Full 3D Walkthrough Before Execution",
    ],
  },
  {
    id: "pkg-3",
    name: "Opulent Villa / Penthouse",
    bhk: "4 BHK / Villa",
    price: "₹11.9 Lakhs*",
    delivery: "60 Days Guaranteed",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Complete Custom Bespoke Architecture",
      "Imported Hardware & Quartz Countertops",
      "Ducted Acoustic False Ceilings",
      "Dedicated Senior Architect Supervision",
      "Zero Delay Penalty Guarantee",
    ],
  },
];

const STYLES = [
  {
    name: "Modern Minimalist",
    desc: "Clean geometry, neutral tones, and clutter-free open spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Contemporary Luxury",
    desc: "Warm brass accents, fluted panels, and plush ambient illumination.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Scandinavian Zen",
    desc: "Light wood grains, airy natural lighting, and organic linen textures.",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Neo-Classical Royal",
    desc: "Timeless cornices, royal mouldings, and grand statement fixtures.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
  },
];

export default function InteriorPage() {
  const [selectedPkg, setSelectedPkg] = useState<string>("pkg-2");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "Noida",
    propertyType: "3 BHK Apartment",
    budget: "₹5L - ₹8L",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    reference: string;
    name: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Please provide your name and contact number");
      return;
    }

    setIsSubmitting(true);
    const refCode = `ROOFIN-INT-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const newEnquiry = {
        id: `int-${Date.now()}`,
        propertyTitle: `Roofin Interior Consultation (${formData.propertyType})`,
        propertyLocation: `${formData.location}, Delhi NCR`,
        dealerName: "Roofin Design Studio",
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        message: `Consultation Booked for ${formData.name.trim()} (${formData.phone.trim()}) - Budget: ${formData.budget}, Ref: ${refCode}`,
        status: "Design Scheduled",
        propertyId: "interior-consultation",
      };

      const existing = JSON.parse(
        localStorage.getItem("roofin_enquiries") || "[]"
      );
      localStorage.setItem(
        "roofin_enquiries",
        JSON.stringify([newEnquiry, ...existing])
      );
    } catch (err) {
      console.warn("Could not write interior enquiry to localStorage:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedBooking({
        reference: refCode,
        name: formData.name.trim(),
      });
      toast.success("Free 3D Design Consultation Confirmed!");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <SearchHeader />

      <main className="w-full flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#102A54] to-[#1865F2] text-white py-14 sm:py-20 px-4 sm:px-8">
          <div className="relative mx-auto w-full max-w-6xl z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/20 text-[#60A5FA]">
                <Sparkles className="h-4 w-4" />
                <span>ROOFIN INTERIORS & ARCHITECTURE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Turn Your New Flat Into A <span className="text-[#FFCC00]">Dream Home</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
                45-Day Move-in Guarantee • Free 3D Design Consultation • 10-Year Material Warranty • Zero Hidden Charges.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href="#book-consultation"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FF9500] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  <span>Book Free 3D Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 px-5 py-3.5 text-sm font-semibold text-white border border-white/30 backdrop-blur-md transition-all"
                >
                  <span>Explore Packages</span>
                </a>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"
                alt="Modern Living Room Interior"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 text-slate-900 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase text-[#1865F2]">Featured Look</p>
                  <p className="text-sm font-bold">Contemporary Luxury Living Suite</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500">Starting From</p>
                  <p className="text-sm font-black text-slate-900">₹3.8 Lakhs*</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Badges */}
        <section className="bg-white border-b border-slate-200 py-6 px-4">
          <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="flex flex-col items-center">
              <Clock className="h-6 w-6 text-[#1865F2] mb-1.5" />
              <p className="text-sm font-bold text-slate-900">45-Day Delivery</p>
              <p className="text-xs text-slate-500">Or we pay rent per day</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-6 w-6 text-[#10B981] mb-1.5" />
              <p className="text-sm font-bold text-slate-900">10-Year Warranty</p>
              <p className="text-xs text-slate-500">Premium verified materials</p>
            </div>
            <div className="flex flex-col items-center">
              <Palette className="h-6 w-6 text-[#F59E0B] mb-1.5" />
              <p className="text-sm font-bold text-slate-900">Free 3D Walkthrough</p>
              <p className="text-xs text-slate-500">See it before you build it</p>
            </div>
            <div className="flex flex-col items-center">
              <IndianRupee className="h-6 w-6 text-[#8B5CF6] mb-1.5" />
              <p className="text-sm font-bold text-slate-900">Zero Cost EMI</p>
              <p className="text-xs text-slate-500">Easy monthly installments</p>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-12 sm:py-16 px-4 sm:px-8 mx-auto w-full max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Popular <span className="text-[#1865F2]">Interior Packages</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Transparent all-inclusive pricing with design, materials, execution, and cleanup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPkg === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg.id)}
                  className={`rounded-2xl bg-white border-2 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-[#1865F2] ring-2 ring-blue-100"
                      : "border-slate-200"
                  }`}
                >
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md rounded-md px-2 py-0.5 text-xs text-white font-semibold">
                      {pkg.bhk}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                        <span className="text-base font-black text-[#1865F2]">{pkg.price}</span>
                      </div>
                      <p className="text-xs text-[#10B981] font-semibold mt-0.5">{pkg.delivery}</p>

                      <div className="mt-4 space-y-2">
                        {pkg.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#book-consultation"
                      className={`mt-6 w-full py-2.5 text-center text-xs font-bold rounded-xl transition-all ${
                        isSelected
                          ? "bg-[#1865F2] text-white hover:bg-blue-700"
                          : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {isSelected ? "Selected - Book Now" : "Choose Package"}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Styles Showcase */}
        <section className="bg-slate-100 py-12 sm:py-16 px-4 sm:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Design Styles <span className="text-[#1865F2]">Crafted For You</span>
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                From minimal zen aesthetics to opulent classical luxury, tailored to your lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STYLES.map((style, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all"
                >
                  <div className="relative h-44 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src={style.image}
                      alt={style.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#1865F2] transition-colors">
                      {style.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{style.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Consultation Booking Section */}
        <section id="book-consultation" className="py-14 sm:py-20 px-4 sm:px-8 mx-auto w-full max-w-4xl">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl">
            {!submittedBooking ? (
              <div>
                <div className="text-center max-w-xl mx-auto mb-8">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-[#1865F2] mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#1865F2]" />
                    <span>FREE ARCHITECTURAL CONSULTATION</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Get Instant 3D Quote & Design Plan
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Meet with a Roofin Senior Interior Designer online or at your site. No obligation, 100% free.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-[#1865F2] focus:bg-white focus:outline-none"
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
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-[#1865F2] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-[#1865F2] focus:bg-white focus:outline-none"
                        >
                          <option value="Noida">Noida</option>
                          <option value="Greater Noida">Greater Noida</option>
                          <option value="Gurgaon">Gurgaon</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Ghaziabad">Ghaziabad</option>
                          <option value="Faridabad">Faridabad</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Property Config
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-900 focus:border-[#1865F2] focus:bg-white focus:outline-none"
                      >
                        <option value="1 BHK Flat">1 BHK Flat</option>
                        <option value="2 BHK Apartment">2 BHK Apartment</option>
                        <option value="3 BHK Apartment">3 BHK Apartment</option>
                        <option value="4 BHK / Villa">4 BHK / Villa</option>
                        <option value="Commercial Office">Commercial Office</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Approx Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-900 focus:border-[#1865F2] focus:bg-white focus:outline-none"
                      >
                        <option value="Under ₹4 Lakhs">Under ₹4 Lakhs</option>
                        <option value="₹4L - ₹6L">₹4L - ₹6L</option>
                        <option value="₹6L - ₹10L">₹6L - ₹10L</option>
                        <option value="Above ₹10 Lakhs">Above ₹10 Lakhs</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 active:scale-95 py-3.5 text-sm font-bold text-white shadow-md transition-all cursor-pointer"
                  >
                    <span>{isSubmitting ? "Locking In Consultation..." : "Confirm Free 3D Consultation"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[11px] text-slate-400 pt-1">
                    🔒 100% Privacy. Your details are safe with Roofin Design Studio.
                  </p>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">
                    Consultation Booked Successfully!
                  </h3>
                  <p className="text-sm text-slate-600">
                    Thank you, <span className="font-semibold text-slate-900">{submittedBooking.name}</span>. A senior Roofin Interior Architect has been assigned to your project.
                  </p>
                </div>

                <div className="inline-block rounded-xl bg-slate-100 px-4 py-2 text-xs font-mono font-bold text-slate-800">
                  Booking Reference: {submittedBooking.reference}
                </div>

                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You can track this design inquiry directly inside your{" "}
                  <Link href="/u/me" className="text-[#1865F2] font-semibold underline">
                    Roofin Dashboard (/u/me)
                  </Link>
                  .
                </p>

                <div className="pt-3 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmittedBooking(null)}
                    className="rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Book Another Site
                  </button>
                  <Link
                    href="/u/me"
                    className="rounded-xl bg-[#1865F2] px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                  >
                    Go To My Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
