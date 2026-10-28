"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Heart,
  Calendar,
  MessageSquare,
  Building2,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Share2,
  Plus,
  Star,
  PhoneCall,
  ArrowRight,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Edit3,
  X,
  SlidersHorizontal,
  BadgeCheck,
  AlertCircle,
  Eye,
  Check,
  MessageCircle,
  Copy,
  Ticket,
  Gift,
} from "lucide-react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/card/PropertyCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUser } from "@/store/slice/authSlice";
import { useWishlist, getSavedPropertiesData } from "@/lib/wishlist";
import { properties, fastSellingProperties, handpickedProperties } from "@/data/properties";
import type { Property } from "@/types";
import { apiClient } from "@/lib/axios";

type ActiveTabType = "saved" | "visits" | "enquiries" | "offers" | "listings" | "settings";

interface SiteVisitItem {
  id: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyImage: string;
  visitDate: string;
  timeSlot: string;
  advisorName: string;
  advisorPhone: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  meetingPoint: string;
}

interface EnquiryItem {
  id: string;
  propertyTitle: string;
  propertyLocation: string;
  dealerName: string;
  date: string;
  message: string;
  status: "Dealer Assigned" | "Callback Scheduled" | "Completed";
  propertyId: string;
}

interface UserListingItem {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: string;
  image: string;
  status: "Active" | "Pending Verification" | "Draft";
  views: number;
  leads: number;
  dateAdded: string;
}

interface ClaimedOfferItem {
  id: string;
  title: string;
  discount: string;
  code: string;
  validUntil: string;
  claimedAt: string;
}

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateToReadable(dateStr: string): string {
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const userId = params?.id as string;

  const { user: currentUser, isAuthenticated } = useAppSelector((state) => state.auth);
  const { savedIds, count: wishlistCount, clearAll: clearWishlist } = useWishlist();

  // If user visits /u/me or their own ID, treat as self dashboard
  const isSelf =
    userId === "me" ||
    (currentUser?.id && String(currentUser.id) === String(userId)) ||
    (!userId && isAuthenticated);

  const [activeTab, setActiveTab] = useState<ActiveTabType>("saved");

  useEffect(() => {
    const tabParam = searchParams.get("tab") as ActiveTabType;
    if (
      tabParam &&
      ["saved", "visits", "enquiries", "offers", "listings", "settings"].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile Edit Form State
  const [profileForm, setProfileForm] = useState({
    firstName: currentUser?.person?.firstName || "",
    lastName: currentUser?.person?.lastName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    city: currentUser?.person?.city || "Noida",
    budget: "₹1 Cr - ₹2 Cr",
    propertyInterest: "Apartments / Flats",
    bio: currentUser?.person?.bio || "Passionate real estate enthusiast looking for dream investments in NCR.",
  });

  // Reschedule Visit State
  const [reschedulingVisit, setReschedulingVisit] = useState<SiteVisitItem | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleSlot, setRescheduleSlot] = useState("10:00 AM - 01:00 PM");

  // Claimed Offers State
  const [claimedOffers, setClaimedOffers] = useState<ClaimedOfferItem[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    // 1. Preload User Profile
    try {
      const savedProfile = localStorage.getItem("roofin_user_profile");
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        setProfileForm((prev) => ({
          ...prev,
          firstName: p.name?.split(" ")?.[0] || prev.firstName,
          lastName: p.name?.split(" ")?.slice(1)?.join(" ") || prev.lastName,
          phone: p.phone || prev.phone,
          city: p.city || prev.city,
          budget: p.budget || prev.budget,
        }));
      } else if (currentUser) {
        setProfileForm({
          firstName: currentUser.person?.firstName || "",
          lastName: currentUser.person?.lastName || "",
          email: currentUser.email || "",
          phone: currentUser.phone || "",
          city: currentUser.person?.city || "Noida",
          budget: "₹1 Cr - ₹2 Cr",
          propertyInterest: "Apartments / Flats",
          bio: currentUser.person?.bio || "Passionate real estate enthusiast looking for dream investments in NCR.",
        });
      }

      // Fetch live user profile from backend API
      if (isAuthenticated) {
        apiClient
          .get("/users/profile")
          .then((res: any) => {
            const u = res?.data?.data || res?.data;
            if (u) {
              setProfileForm((prev) => ({
                ...prev,
                firstName: u.person?.firstName || prev.firstName,
                lastName: u.person?.lastName || prev.lastName,
                email: u.email || prev.email,
                phone: u.phone || u.person?.phone || prev.phone,
                city: u.person?.city || prev.city,
              }));
            }
          })
          .catch(() => {});
      }
    } catch {}

    // 2. Load Real Site Visits from localStorage
    try {
      const rawVisits = localStorage.getItem("roofin_site_visits");
      if (rawVisits) {
        const parsed = JSON.parse(rawVisits);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted: SiteVisitItem[] = parsed.map((item: any, idx: number) => ({
            id: item.id || `sv-local-${idx}`,
            propertyTitle: item.propertyTitle || "Verified Property Site Visit",
            propertyLocation: item.propertyLocation || "Sector 103 / 76, Noida",
            propertyImage: item.propertyImage || "/images/properties/terraces-max-estate-clean.png",
            visitDate: item.visitDate || item.date || "Scheduled Slot",
            timeSlot: item.timeSlot || item.slot || "10:00 AM - 01:00 PM",
            advisorName: item.advisorName || "Amit Sharma",
            advisorPhone: item.advisorPhone || "+91 9870000003",
            status: item.status || "Confirmed",
            meetingPoint: item.meetingPoint || "Project Sales Lounge, Tower A Entrance Gate",
          }));
          setSiteVisits((prev) => {
            const ids = new Set(formatted.map((f) => f.id));
            const remaining = prev.filter((p) => !ids.has(p.id));
            return [...formatted, ...remaining];
          });
        }
      }
    } catch {}

    // 3. Load Real Enquiries & Callbacks from localStorage
    try {
      const storedEnquiries = JSON.parse(localStorage.getItem("roofin_enquiries") || "[]");
      const storedCallbacks = JSON.parse(localStorage.getItem("roofin_callback_requests") || "[]");
      const storedBrochures = JSON.parse(localStorage.getItem("roofin_brochure_leads") || "[]");

      const dynamicEnquiries: EnquiryItem[] = [
        ...storedEnquiries.map((e: any) => ({
          id: e.id,
          propertyTitle: e.propertyTitle,
          propertyLocation: e.propertyLocation || "Noida",
          dealerName: e.dealerName || "Official Partner",
          date: e.date,
          message: e.message || "Requested property details",
          status: (e.status || "Dealer Assigned") as any,
          propertyId: e.propertyId || "1",
        })),
        ...storedCallbacks.map((cb: any) => ({
          id: cb.id,
          propertyTitle: cb.propertyTitle,
          propertyLocation: cb.propertyLocation || "Noida",
          dealerName: "Verified Dealer Desk",
          date: cb.date,
          message: `Requested callback for slot: ${cb.timeSlot}`,
          status: "Callback Scheduled" as any,
          propertyId: cb.propertyId || "1",
        })),
        ...storedBrochures.map((b: any, idx: number) => ({
          id: `br-${idx}`,
          propertyTitle: b.propertyTitle,
          propertyLocation: "Noida / NCR",
          dealerName: "Roofin Documentation Desk",
          date: new Date(b.timestamp || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          message: "Downloaded official project brochure & prospectus",
          status: "Completed" as any,
          propertyId: String(b.propertyId || "1"),
        })),
      ];

      if (dynamicEnquiries.length > 0) {
        setEnquiries((prev) => {
          const ids = new Set(dynamicEnquiries.map((d) => d.id));
          return [...dynamicEnquiries, ...prev.filter((p) => !ids.has(p.id))];
        });
      }
    } catch {}

    // 4. Load Claimed Offers
    try {
      const storedOffers = JSON.parse(localStorage.getItem("roofin_claimed_offers") || "[]");
      if (Array.isArray(storedOffers) && storedOffers.length > 0) {
        setClaimedOffers(storedOffers);
      } else {
        // Sample default voucher
        setClaimedOffers([
          {
            id: "sample-offer-1",
            title: "Zero Brokerage on Verified Homes",
            discount: "100% OFF",
            code: "ROOFIN-ZERO-FESTIVE",
            validUntil: "30 Nov 2026",
            claimedAt: new Date().toISOString(),
          },
        ]);
      }
    } catch {}

    // 5. Load User Listed Properties
    try {
      const storedListings = JSON.parse(localStorage.getItem("roofin_user_listings") || "[]");
      if (Array.isArray(storedListings) && storedListings.length > 0) {
        setMyListings(storedListings);
      }
    } catch {}
  }, [currentUser]);

  // Display identities
  const displayName = isSelf && currentUser
    ? [currentUser.person?.firstName, currentUser.person?.lastName].filter(Boolean).join(" ") ||
      currentUser.phone ||
      currentUser.email?.split("@")[0] ||
      "Verified Member"
    : "Jitender Singh";

  const displayRole = isSelf && currentUser
    ? (currentUser.memberships?.[0]?.role?.roleName?.toUpperCase().includes("SELLER") || (currentUser as any).role === "SELLER")
      ? "Registered Property Seller"
      : "Verified Roofin Member"
    : "Senior Property Consultant";

  const avatarUrl = isSelf && currentUser?.person?.avatarUrl
    ? currentUser.person.avatarUrl
    : "/broker/jitender_singh_figma.jpg";

  // 1. Resolve Saved Properties Data
  const savedPropertiesList = useMemo<Property[]>(() => {
    if (savedIds.length === 0) return [];

    const idMap = new Map<string, Property>();
    properties.forEach((p) => {
      if (p.id) idMap.set(String(p.id), p);
    });
    fastSellingProperties.forEach((p) => {
      if (p.id && !idMap.has(String(p.id))) idMap.set(String(p.id), p);
    });
    handpickedProperties.forEach((p) => {
      if (p.id && !idMap.has(String(p.id))) idMap.set(String(p.id), p);
    });

    const cached = getSavedPropertiesData();
    Object.entries(cached).forEach(([id, p]) => {
      if (!idMap.has(id)) idMap.set(id, p);
    });

    const list: Property[] = [];
    savedIds.forEach((id) => {
      const found = idMap.get(String(id));
      if (found) {
        list.push(found);
      } else {
        list.push({
          id,
          title: "NBCC Aspire Silicon City",
          location: "Sector 76, Noida",
          city: "Noida",
          type: "Apartment",
          beds: "3 BHK",
          price: "₹1.25* Cr",
          verifiedText: "VERIFIED DEAL",
          images: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80",
          ],
          chips: ["2, 3 & 4 BHK Apartments"],
          phone: "+91 9876543210",
        });
      }
    });

    return list;
  }, [savedIds]);

  // 2. Booked Site Visits State
  const [siteVisits, setSiteVisits] = useState<SiteVisitItem[]>([
    {
      id: "sv-101",
      propertyTitle: "NBCC Aspire Silicon City",
      propertyLocation: "Sector 76, Central Noida",
      propertyImage:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      visitDate: "Saturday, Oct 24, 2026",
      timeSlot: "10:00 AM - 01:00 PM",
      advisorName: "Amit Sharma",
      advisorPhone: "+91 9870000003",
      status: "Confirmed",
      meetingPoint: "Project Sales Lounge, Tower A Entrance Gate",
    },
    {
      id: "sv-102",
      propertyTitle: "ATS Knightsbridge Ultra Luxury",
      propertyLocation: "Sector 124, Expressway, Noida",
      propertyImage:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      visitDate: "Wednesday, Oct 28, 2026",
      timeSlot: "02:00 PM - 05:00 PM",
      advisorName: "Pooja Nair",
      advisorPhone: "+91 9870000009",
      status: "Pending",
      meetingPoint: "Clubhouse Reception Lobby",
    },
  ]);

  // 3. Submitted Enquiries State
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([
    {
      id: "enq-201",
      propertyTitle: "The Terraces at Max Estate 361",
      propertyLocation: "Sector 103, Noida Extension",
      dealerName: "Max Estates Official Partner",
      date: "14 Oct 2026",
      message: "Interested in 3 BHK Unit with park facing balcony. Please share floor plans & payment terms.",
      status: "Dealer Assigned",
      propertyId: "max-estate-1",
    },
    {
      id: "enq-202",
      propertyTitle: "Godrej Woods Nature Living",
      propertyLocation: "Sector 43, Central Noida",
      dealerName: "Roofin Verified Dealer Desk",
      date: "11 Oct 2026",
      message: "Requested callback regarding home loan bank subsidy and special festive discounts.",
      status: "Callback Scheduled",
      propertyId: "godrej-woods-1",
    },
  ]);

  // 4. User Listed Properties State (for Seller / Owner flow)
  const [myListings, setMyListings] = useState<UserListingItem[]>([
    {
      id: "prop-listed-1",
      title: "Semi Furnished 3 BHK in Sector 75",
      location: "Golf City, Sector 75, Noida",
      price: "₹1.15 Cr",
      beds: "3 BHK · 1450 sq.ft.",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
      status: "Active",
      views: 342,
      leads: 18,
      dateAdded: "08 Oct 2026",
    },
  ]);

  const handleShareProfile = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Profile link copied to clipboard!");
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${profileForm.firstName} ${profileForm.lastName}`.trim();
    dispatch(
      updateUser({
        person: {
          firstName: profileForm.firstName,
          lastName: profileForm.lastName,
          city: profileForm.city,
          bio: profileForm.bio,
        },
      })
    );

    // Call live backend PUT /users/profile
    try {
      await apiClient.put("/users/profile", {
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        city: profileForm.city,
      });
    } catch (err: any) {
      console.log("Profile update live deferred to local state:", err?.response?.data?.message || err?.message);
    }

    try {
      localStorage.setItem(
        "roofin_user_profile",
        JSON.stringify({
          name: fullName,
          phone: profileForm.phone,
          email: profileForm.email,
          city: profileForm.city,
          budget: profileForm.budget,
          propertyInterest: profileForm.propertyInterest,
          bio: profileForm.bio,
        })
      );
    } catch {}
    setIsEditingProfile(false);
    toast.success("Profile information and preferences updated!");
  };

  const handleDeleteEnquiry = (id: string) => {
    setEnquiries((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      try {
        const stored = JSON.parse(localStorage.getItem("roofin_enquiries") || "[]");
        localStorage.setItem("roofin_enquiries", JSON.stringify(stored.filter((e: any) => e.id !== id)));
      } catch {}
      return updated;
    });
    toast.success("Enquiry removed from dashboard");
  };

  const handleDeleteListing = (id: string) => {
    setMyListings((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      try {
        const stored = JSON.parse(localStorage.getItem("roofin_user_listings") || "[]");
        localStorage.setItem("roofin_user_listings", JSON.stringify(stored.filter((l: any) => l.id !== id)));
      } catch {}
      return updated;
    });
    toast.success("Listing removed from your account");
  };

  const handleCancelVisit = (id: string) => {
    setSiteVisits((prev) => {
      const updated = prev.map((v) => (v.id === id ? { ...v, status: "Cancelled" as const } : v));
      try {
        localStorage.setItem("roofin_site_visits", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    toast.success("Site visit booking cancelled.");
  };

  const handleConfirmReschedule = () => {
    if (!reschedulingVisit) return;
    if (!rescheduleDate) {
      toast.error("Please select a new date");
      return;
    }

    const selected = new Date(rescheduleDate);
    selected.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selected.getTime())) {
      toast.error("Please enter a valid date.");
      return;
    }

    if (selected < today) {
      toast.error("Past dates are not allowed! Please select today or a future date.");
      return;
    }

    const formattedDate = formatDateToReadable(rescheduleDate);

    setSiteVisits((prev) => {
      const updated = prev.map((v) =>
        v.id === reschedulingVisit.id
          ? {
              ...v,
              visitDate: formattedDate,
              timeSlot: rescheduleSlot,
              status: "Confirmed" as const,
            }
          : v
      );
      try {
        localStorage.setItem("roofin_site_visits", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setReschedulingVisit(null);
    toast.success(`Site visit rescheduled to ${formattedDate} (${rescheduleSlot})!`);
  };

  const handleCopyVoucherCode = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success(`Promo code ${code} copied!`);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-jakarta">
      {/* 1. Global Header */}
      <SearchHeader />

      {/* 2. Top Profile Hero Cover & Identity Card */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative border-b border-slate-200/80"
        style={{ backgroundImage: "url('/broker/brokerbg.png')" }}
      >
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
          
          {/* Cover Banner Area */}
          <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-900 shadow-md">
            <Image
              src="/broker/bg_image.png"
              alt="Cover Image"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {isSelf && (
              <button
                type="button"
                onClick={() => toast.success("Cover photo update dialog")}
                className="absolute right-4 sm:right-6 bottom-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 text-xs font-bold shadow-md transition-all backdrop-blur-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#1865F2]" />
                <span>Change Cover</span>
              </button>
            )}
          </div>

          {/* Profile Identity Bar */}
          <div className="relative flex flex-col lg:flex-row items-center lg:items-end justify-between -mt-12 sm:-mt-14 px-2 sm:px-6 gap-6 z-10">
            
            {/* Avatar & Names */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative shrink-0">
                <div className="w-28 sm:w-36 h-28 sm:h-36 overflow-hidden border-4 border-white ring-4 ring-blue-500/10 rounded-2xl shadow-xl bg-white flex items-center justify-center">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-black text-[#1865F2] uppercase">
                      {displayName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-slate-100">
                  <BadgeCheck className="w-6 h-6 text-[#1865F2] fill-[#1865F2]/10" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[#0B132B] tracking-tight">
                    {displayName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1865F2] border border-blue-200 text-[11px] font-bold">
                    Verified
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {displayRole}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#1865F2]" />
                    <span>{profileForm.city || "Noida, NCR"}</span>
                  </span>
                  {profileForm.email && (
                    <span className="flex items-center gap-1 font-medium">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profileForm.email}</span>
                    </span>
                  )}
                  {profileForm.phone && (
                    <span className="flex items-center gap-1 font-medium">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profileForm.phone}</span>
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  {isSelf ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("settings");
                          const el = document.getElementById("dashboard-tab-content");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Profile</span>
                      </button>

                      <Link
                        href="/post-property"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Post Property</span>
                      </Link>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Contact Broker</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleShareProfile}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard Quick Stats Pill Counters */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center bg-white/95 backdrop-blur-xs p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 shadow-sm">
              <div
                onClick={() => setActiveTab("saved")}
                className="text-center px-2.5 sm:px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Saved</p>
                <p className="text-lg font-black text-[#1865F2]">{wishlistCount}</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />

              <div
                onClick={() => setActiveTab("visits")}
                className="text-center px-2.5 sm:px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Site Visits</p>
                <p className="text-lg font-black text-emerald-600">
                  {siteVisits.filter((v) => v.status !== "Cancelled").length}
                </p>
              </div>
              <div className="h-8 w-px bg-slate-200" />

              <div
                onClick={() => setActiveTab("enquiries")}
                className="text-center px-2.5 sm:px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Enquiries</p>
                <p className="text-lg font-black text-amber-500">{enquiries.length}</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />

              <div
                onClick={() => setActiveTab("offers")}
                className="text-center px-2.5 sm:px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Vouchers</p>
                <p className="text-lg font-black text-rose-500">{claimedOffers.length}</p>
              </div>

              {isSelf && (
                <>
                  <div className="h-8 w-px bg-slate-200" />
                  <div
                    onClick={() => setActiveTab("listings")}
                    className="text-center px-2.5 sm:px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">My Listings</p>
                    <p className="text-lg font-black text-purple-600">{myListings.length}</p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* 3. Dashboard Navigation Tabs Strip */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-2.5 no-scrollbar">
            
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "saved"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
              }`}
            >
              <Heart className={`w-4 h-4 ${activeTab === "saved" ? "fill-white" : "text-rose-500"}`} />
              <span>Saved Properties</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === "saved" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}
              >
                {wishlistCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("visits")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "visits"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Booked Site Visits</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === "visits" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {siteVisits.filter((v) => v.status !== "Cancelled").length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("enquiries")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "enquiries"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>My Enquiries</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === "enquiries" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
                }`}
              >
                {enquiries.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("offers")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "offers"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
              }`}
            >
              <Ticket className="w-4 h-4 text-amber-500" />
              <span>Claimed Vouchers</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === "offers" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
                }`}
              >
                {claimedOffers.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("listings")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "listings"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>My Listings</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === "listings" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-800"
                }`}
              >
                {myListings.length}
              </span>
            </button>

            {isSelf && (
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "settings"
                    ? "bg-[#1865F2] text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* 4. Tab Content Body */}
      <main id="dashboard-tab-content" className="flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ============================================================ */}
        {/* TAB 1: SAVED PROPERTIES (WISHLIST) */}
        {/* ============================================================ */}
        {activeTab === "saved" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0B132B]">
                  Saved Properties ({wishlistCount})
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Your shortlisted homes, apartments and commercial properties.
                </p>
              </div>

              {wishlistCount > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Are you sure you want to remove all saved properties?")) {
                        clearWishlist();
                        toast.success("All saved properties removed");
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Wishlist</span>
                  </button>

                  <Link
                    href="/compare/side-by-side"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <span>Compare Saved</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* If Wishlist has items */}
            {savedPropertiesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedPropertiesList.map((property) => (
                  <PropertyCard key={property.id} {...property} layout="vertical" />
                ))}
              </div>
            ) : (
              /* Empty Wishlist State */
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B132B]">No Saved Properties Yet</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                    Click the heart icon on any property card to save your favourite homes and compare them later.
                  </p>
                </div>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: BOOKED SITE VISITS */}
        {/* ============================================================ */}
        {activeTab === "visits" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0B132B]">
                  Booked Site Visits ({siteVisits.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Track your scheduled property tours, meeting details and advisor contacts.
                </p>
              </div>

              <Link
                href="/properties"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Book Another Site Tour</span>
              </Link>
            </div>

            {siteVisits.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {siteVisits.map((visit) => {
                  const isConfirmed = visit.status === "Confirmed";
                  const isCancelled = visit.status === "Cancelled";

                  return (
                    <div
                      key={visit.id}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-5 sm:p-6 space-y-4">
                        {/* Status Badge & Tour Date */}
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                              isConfirmed
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : isCancelled
                                ? "bg-slate-100 text-slate-500 border border-slate-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isConfirmed
                                  ? "bg-emerald-500"
                                  : isCancelled
                                  ? "bg-slate-400"
                                  : "bg-amber-500"
                              }`}
                            />
                            {visit.status}
                          </span>

                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-lg">
                            <Clock className="w-3.5 h-3.5 text-[#1865F2]" />
                            <span>{visit.timeSlot}</span>
                          </div>
                        </div>

                        {/* Property Details */}
                        <div className="flex gap-4 items-start">
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                            <Image
                              src={visit.propertyImage}
                              alt={visit.propertyTitle}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="space-y-1 min-w-0 flex-1">
                            <h3 className="text-base sm:text-lg font-black text-[#0B132B] truncate">
                              {visit.propertyTitle}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#1865F2] shrink-0" />
                              <span className="truncate">{visit.propertyLocation}</span>
                            </p>
                            <p className="text-xs font-bold text-[#1865F2]">
                              Date: {visit.visitDate}
                            </p>
                          </div>
                        </div>

                        {/* Meeting Location & Advisor */}
                        <div className="bg-[#FAFBFD] p-3.5 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                          <p className="text-slate-600">
                            <strong className="text-slate-800">Meeting Point:</strong>{" "}
                            {visit.meetingPoint}
                          </p>
                          <p className="text-slate-600">
                            <strong className="text-slate-800">Roofin Advisor:</strong>{" "}
                            {visit.advisorName} ({visit.advisorPhone})
                          </p>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="px-5 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <a
                            href={`tel:${visit.advisorPhone}`}
                            className="flex items-center gap-1.5 text-xs font-bold text-[#1865F2] hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>

                          <a
                            href={`https://wa.me/${visit.advisorPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Hi ${visit.advisorName}, regarding my site visit for ${visit.propertyTitle} on ${visit.visitDate}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        {!isCancelled && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setReschedulingVisit(visit);
                                const todayMidnight = new Date();
                                todayMidnight.setHours(0, 0, 0, 0);

                                const parsedExisting = new Date(visit.visitDate);
                                if (!isNaN(parsedExisting.getTime()) && parsedExisting >= todayMidnight) {
                                  const year = parsedExisting.getFullYear();
                                  const month = String(parsedExisting.getMonth() + 1).padStart(2, "0");
                                  const day = String(parsedExisting.getDate()).padStart(2, "0");
                                  setRescheduleDate(`${year}-${month}-${day}`);
                                } else {
                                  setRescheduleDate(getTomorrowDateString());
                                }
                                setRescheduleSlot(visit.timeSlot || "10:00 AM - 12:00 PM");
                              }}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              Reschedule
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCancelVisit(visit.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
                <Calendar className="w-12 h-12 text-[#1865F2] mx-auto opacity-70" />
                <h3 className="text-lg font-black text-[#0B132B]">No Site Tours Scheduled</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse any verified property detail page and schedule a free guided site tour with a verified advisor.
                </p>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1865F2] text-white text-xs font-bold"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: MY ENQUIRIES */}
        {/* ============================================================ */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B132B]">
                My Enquiries & Leads ({enquiries.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Overview of questions and callback requests sent to builders & verified dealers.
              </p>
            </div>

            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1865F2] border border-blue-200 text-[10.5px] font-bold">
                        {enq.status}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Submitted on {enq.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-[#0B132B] truncate">
                      {enq.propertyTitle}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      Dealer Contact: <strong className="text-slate-700">{enq.dealerName}</strong>
                    </p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                      &quot;{enq.message}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        `Hi, I had enquired about ${enq.propertyTitle}. Please share the latest availability and floor plans.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors flex items-center gap-1.5 border border-emerald-200"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      href={enq.propertyId ? `/properties/${enq.propertyId}` : "/properties"}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteEnquiry(enq.id)}
                      title="Remove enquiry from dashboard"
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: CLAIMED OFFERS & VOUCHERS */}
        {/* ============================================================ */}
        {activeTab === "offers" && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0B132B]">
                  Claimed Vouchers &amp; Deals ({claimedOffers.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Exclusive developer subsidies, zero-brokerage vouchers &amp; legal fee discounts.
                </p>
              </div>

              <Link
                href="/properties"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Browse Properties With Offers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {claimedOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {claimedOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="relative overflow-hidden rounded-3xl border border-blue-200/90 bg-gradient-to-b from-white via-white to-blue-50/40 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-0.5 text-xs font-black uppercase tracking-wider">
                          {offer.discount}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          Valid till {offer.validUntil}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-[#0B132B] leading-snug">
                          {offer.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Quote this code when finalizing your deal with our verified partner.
                        </p>
                      </div>

                      {/* Promo Code Box */}
                      <div className="flex items-center justify-between rounded-2xl border border-dashed border-[#1865F2] bg-[#F0F6FE] p-2.5">
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-[#1865F2]" />
                          <code className="text-xs sm:text-sm font-mono font-black text-[#1865F2] tracking-wider">
                            {offer.code}
                          </code>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyVoucherCode(offer.code)}
                          className="flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors border border-slate-200 cursor-pointer"
                        >
                          {copiedCode === offer.code ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 text-slate-500" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
                <Ticket className="w-12 h-12 text-[#1865F2] mx-auto opacity-70" />
                <h3 className="text-lg font-black text-[#0B132B]">No Vouchers Claimed Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Claim verified developer discounts on the property listing sidebar to get instant coupons.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: MY LISTED PROPERTIES (SELLER / BROKER VIEW) */}
        {/* ============================================================ */}
        {activeTab === "listings" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0B132B]">
                  My Listed Properties ({myListings.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Manage the listings posted by you, view lead metrics, and boost impressions.
                </p>
              </div>

              <Link
                href="/post-property"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post New Property</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10.5px] font-bold">
                        {listing.status}
                      </span>
                      <span className="text-xs text-slate-400">Added on {listing.dateAdded}</span>
                    </div>

                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <h3 className="text-base font-black text-[#0B132B] truncate">{listing.title}</h3>
                        <p className="text-xs text-slate-500 truncate">{listing.location}</p>
                        <p className="text-base font-black text-[#1865F2]">{listing.price}</p>
                        <p className="text-xs text-slate-400">{listing.beds}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                        <p className="text-[11px] text-slate-500 font-bold uppercase">Total Views</p>
                        <p className="text-base font-black text-slate-800">{listing.views}</p>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                        <p className="text-[11px] text-slate-500 font-bold uppercase">Buyer Leads</p>
                        <p className="text-base font-black text-[#1865F2]">{listing.leads}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href="/properties"
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:bg-white transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Live</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteListing(listing.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <Link
                      href="/pricing"
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
                    >
                      Boost Leads ✦
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: ACCOUNT & PROFILE SETTINGS */}
        {/* ============================================================ */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-xl font-black text-[#0B132B]">Account Settings</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update your personal info, contact numbers and preferences.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                <input
                  type="text"
                  value={profileForm.city}
                  onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                  placeholder="e.g. Noida, Delhi NCR"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Budget Range</label>
                  <input
                    type="text"
                    value={profileForm.budget}
                    onChange={(e) => setProfileForm({ ...profileForm, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                    placeholder="e.g. ₹80 Lakh - ₹1.5 Cr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Property Type Interest</label>
                  <select
                    value={profileForm.propertyInterest}
                    onChange={(e) => setProfileForm({ ...profileForm, propertyInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none bg-white"
                  >
                    <option value="Residential Luxury Apartments">Residential Luxury Apartments</option>
                    <option value="Villas & Independent Floors">Villas & Independent Floors</option>
                    <option value="Commercial & Retail Spaces">Commercial & Retail Spaces</option>
                    <option value="Plots & Land">Plots & Land</option>
                    <option value="Studio & 1 BHK Compact Units">Studio & 1 BHK Compact Units</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Bio</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none resize-none"
                  placeholder="Write a few lines about your property requirements or expertise..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* Reschedule Site Visit Modal */}
      {reschedulingVisit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center font-bold">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Reschedule Site Visit</h3>
                  <p className="text-xs text-slate-500 truncate max-w-[240px]">{reschedulingVisit.propertyTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setReschedulingVisit(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Select New Date</label>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Today / Future Only
                  </span>
                </div>
                <input
                  type="date"
                  value={rescheduleDate}
                  min={getTodayDateString()}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Visits can only be booked from today ({getTodayDateString()}) onwards.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Convenient Time Slot</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "10:00 AM - 12:00 PM",
                    "12:00 PM - 02:00 PM",
                    "02:00 PM - 04:00 PM",
                    "04:00 PM - 06:00 PM",
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setRescheduleSlot(slot)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left ${
                        rescheduleSlot === slot
                          ? "border-[#1865F2] bg-blue-50/70 text-[#1865F2]"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
                <span className="text-[#1865F2] font-bold">ℹ</span>
                <span>Our Roofin Relationship Manager will confirm the revised slot with the site representative.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setReschedulingVisit(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                className="px-5 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Global Footer (handled by RootLayout) */}
      {/* <Footer /> */}
    </div>
  );
}
