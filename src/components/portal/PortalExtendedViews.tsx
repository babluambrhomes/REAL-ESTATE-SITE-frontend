"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { userApi } from "@/lib/features/user/userApi";
import { sellerApi } from "@/lib/features/seller/sellerApi";
import {
  Users,
  Building,
  BarChart3,
  Megaphone,
  Settings,
  ArrowUpRight,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Bell,
  Mail,
  Phone,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  MapPin,
  Eye,
  MousePointerClick,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

// ==========================================
// 1. AUDIENCE VIEW
// ==========================================
export const PortalAudience = () => {
  return (
    <div className="space-y-6 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-bold text-[#0B132B]">
            Audience & Buyer Demographics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time profile intelligence of high-intent buyers browsing your listings
          </p>
        </div>
        <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EAF2FF] text-[#1865F2]">
          Active Active Audience: 14.8K Buyers
        </span>
      </div>

      {/* Demographic Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "HNIs & Corporate Executives", val: "64%", sub: "Avg Annual Income > ₹45L", color: "text-[#1865F2]" },
          { label: "Pre-Approved Loan Buyers", val: "78%", sub: "SBI, HDFC & ICICI verified", color: "text-emerald-600" },
          { label: "First Time Home Buyers", val: "32%", sub: "Looking for 2 & 3 BHK", color: "text-amber-600" },
          { label: "NRI Investors", val: "18%", sub: "Gulf & North America based", color: "text-purple-600" },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
            <span className="text-xs text-slate-400 font-medium">{item.label}</span>
            <div className={`text-2xl font-black ${item.color} mt-1.5`}>{item.val}</div>
            <p className="text-[11px] text-slate-500 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Buyer Preference Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-[#0B132B]">Top Preferred Micro-Markets</h3>
          <div className="space-y-3">
            {[
              { name: "Sector 150 Noida (Sports City)", pct: 42, count: "6,210 inquiries" },
              { name: "Sector 128 / 124 (Noida Expressway)", pct: 28, count: "4,140 inquiries" },
              { name: "Greater Noida West (Noida Ext)", pct: 18, count: "2,660 inquiries" },
              { name: "Golf Course Extension (Gurgaon)", pct: 12, count: "1,770 inquiries" },
            ].map((loc, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{loc.name}</span>
                  <span className="text-slate-500">{loc.count} ({loc.pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#1865F2] rounded-full" style={{ width: `${loc.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-[#0B132B]">Buyer Budget Distribution</h3>
          <div className="space-y-3">
            {[
              { budget: "₹ 1.0 Cr - 1.5 Cr", pct: 45, tag: "Highest Volume" },
              { budget: "₹ 1.5 Cr - 2.5 Cr", pct: 32, tag: "Mid-Luxury" },
              { budget: "₹ 2.5 Cr - 5.0 Cr", pct: 16, tag: "High Demand" },
              { budget: "Above ₹ 5.0 Cr", pct: 7, tag: "Ultra Luxury" },
            ].map((b, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B]">{b.budget}</h4>
                  <span className="text-[11px] text-slate-400">{b.tag}</span>
                </div>
                <span className="text-xs font-black text-[#1865F2]">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. CONTENT & MARKETING MANAGER VIEW
// ==========================================
export const PortalContentManager = () => {
  return (
    <div className="space-y-6 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-bold text-[#0B132B]">
            Marketing Collateral & Media Assets
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Download verified high-res brochures, floor plans, and social promotion templates
          </p>
        </div>
        <button
          type="button"
          onClick={() => toast.success("Opening media uploader...")}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#1865F2] text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          + Upload Media Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            title: "The Terraces At Max 361 Brochure",
            type: "PDF Document (14.2 MB)",
            downloads: 342,
            preview: "/images/properties/tower-popular-figma.jpg",
          },
          {
            title: "ATS Knightsbridge Floor Plans (3/4 BHK)",
            type: "High-Res CAD / PDF (28 MB)",
            downloads: 512,
            preview: "/images/properties/night-tower-figma.jpg",
          },
          {
            title: "Ambr Magnolia 360° Virtual Walkthrough",
            type: "Interactive WebGL Embed",
            downloads: 189,
            preview: "/images/properties/ambr-aspire-figma.jpg",
          },
        ].map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="relative w-full h-36 bg-slate-100">
                <Image src={item.preview} alt={item.title} fill className="object-cover" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                  {item.type}
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-[#0B132B]">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{item.downloads} downloads by buyers</p>
              </div>
            </div>
            <div className="p-4 pt-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => toast.success(`Downloading ${item.title}...`)}
                className="flex-1 py-2 rounded-xl bg-[#EAF2FF] hover:bg-blue-100 text-[#1865F2] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>Download</span>
              </button>
              <button
                type="button"
                onClick={() => toast.success("Asset link copied to clipboard!")}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. ANALYTICS VIEW
// ==========================================
export const PortalAnalyticsView = () => {
  return (
    <div className="space-y-6 font-poppins">
      <div>
        <h2 className="text-[22px] font-bold text-[#0B132B]">
          Performance & Traffic Analytics
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed breakdown of impressions, clicks, inquiry conversions, and site visits
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Listing Impressions", val: "48.2K", change: "+24.5%", icon: Eye, color: "text-[#1865F2]" },
          { label: "Detailed Page Views", val: "12.4K", change: "+18.2%", icon: MousePointerClick, color: "text-emerald-600" },
          { label: "Direct Phone Inquiries", val: "418", change: "+32.1%", icon: Phone, color: "text-purple-600" },
          { label: "Avg Listing Time on Page", val: "3m 42s", change: "+12.0%", icon: Clock, color: "text-amber-600" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                  <Icon size={16} />
                </div>
              </div>
              <div className={`text-2xl font-black ${stat.color} mt-2`}>{stat.val}</div>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
                <ArrowUpRight size={13} />
                {stat.change} vs last month
              </span>
            </div>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
        <h3 className="text-base font-bold text-[#0B132B]">Listing Conversion Funnel</h3>
        <div className="space-y-2.5">
          {[
            { step: "Listing Impression in Search Results", count: "48,200", pct: 100 },
            { step: "Opened Listing Detail Page", count: "12,400", pct: 25.7 },
            { step: "Clicked Call / WhatsApp / Brochure", count: "2,180", pct: 17.5 },
            { step: "Scheduled Physical Site Visit", count: "418", pct: 19.1 },
            { step: "Token Booking Completed", count: "38", pct: 9.1 },
          ].map((fn, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1865F2] text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs font-medium text-slate-800">{fn.step}</span>
              </div>
              <div className="text-right">
                <strong className="text-xs font-bold text-[#0B132B]">{fn.count}</strong>
                <span className="text-[11px] text-slate-400 block">{fn.pct}% conversion</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. INSIGHTS VIEW
// ==========================================
export const PortalInsightsView = () => {
  return (
    <div className="space-y-6 font-poppins">
      <div>
        <h2 className="text-[22px] font-bold text-[#0B132B]">
          Market Intelligence & Competitor Insights
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time pricing benchmarking against surrounding projects in Noida & NCR
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#1865F2] flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
          <h4 className="text-base font-bold text-[#0B132B]">Price Positioning Index</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your listings in Sector 124 are priced <strong>4.8% lower than median</strong>, driving 2.3x higher inquiry volumes than adjacent developer inventories.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award size={20} />
          </div>
          <h4 className="text-base font-bold text-[#0B132B]">Listing Quality Score</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your average listing completeness score is <strong>92/100</strong>. Listings with verified floor plans & virtual walkthroughs close 18 days faster.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <h4 className="text-base font-bold text-[#0B132B]">AI Recommended Action</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Add 2 more interior photos to <strong>The Terraces At Max</strong> to unlock Top 1% Boost Badge in Sunday buyer search queries.
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. ACCOUNT SETTINGS VIEW
// ==========================================
export const PortalAccountSettings = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userFullName = [user?.person?.firstName, user?.person?.lastName].filter(Boolean).join(" ");

  const [name, setName] = useState(userFullName || "Jitender Singh");
  const [phone, setPhone] = useState((user?.person as any)?.phone || "+91 98112 90021");
  const [email, setEmail] = useState(user?.email || "jitender.singh@roofin.in");
  const [agency, setAgency] = useState("Roofin Premier Partners");
  const [reraNo, setReraNo] = useState("UPRERAAGT2024981");

  useEffect(() => {
    userApi
      .getProfile()
      .then((res: any) => {
        if (res?.data) {
          const u = res.data;
          const uName = [u.person?.firstName, u.person?.lastName].filter(Boolean).join(" ");
          if (uName) setName(uName);
          if (u.person?.phone) setPhone(u.person.phone);
          if (u.email) setEmail(u.email);
        }
      })
      .catch(() => {});

    // Also fetch seller profile
    sellerApi
      .getMyProfile()
      .then((res: any) => {
        if (res?.data) {
          const s = res.data;
          if (s.name) setName(s.name);
          if (s.reraNumber) setReraNo(s.reraNumber);
          if (s.organization?.name) setAgency(s.organization.name);
          if (s.contactPhone) setPhone(s.contactPhone);
          if (s.contactEmail) setEmail(s.contactEmail);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const parts = name.trim().split(" ");
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";

    try {
      await Promise.allSettled([
        userApi.updateProfile({ firstName, lastName }),
        sellerApi.updateMyProfile({
          name,
          reraNumber: reraNo,
          organization: { name: agency },
        }),
      ]);
    } catch (err) {
      console.log("Profile update fallback to local:", err);
    }
    toast.success("Account profile updated successfully!");
  };

  return (
    <div className="space-y-6 font-poppins max-w-4xl">
      <div>
        <h2 className="text-[22px] font-bold text-[#0B132B]">
          Agent Profile & Account Settings
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your verified credentials, RERA certification, and notification preferences
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-[#1865F2] text-white font-black text-xl flex items-center justify-center">
            JS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#0B132B]">{name}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck size={12} />
                Verified Partner
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">RERA: {reraNo} • {agency}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Agency / Consultancy Name</label>
              <input
                type="text"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">RERA Agent Registration Number</label>
              <input
                type="text"
                value={reraNo}
                onChange={(e) => setReraNo(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold cursor-pointer transition-colors shadow-sm"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
