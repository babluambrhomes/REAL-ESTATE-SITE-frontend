"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Share2,
  X,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { SearchHeader } from "@/components/layout/SearchHeader";

interface BlogArticle {
  id: number;
  category: "Investment" | "Market Trends" | "Buying Guide" | "Selling Tips";
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  image: string;
  content: string[];
  author: string;
}

const ALL_ARTICLES: BlogArticle[] = [
  {
    id: 1,
    category: "Investment",
    title: "Invest in Real Estate: How Smart Property Investments Build Long-Term Wealth",
    subtitle: "A comprehensive analysis on ROI across Noida Expressway, Yamuna Expressway, and Dwarka Expressway.",
    readTime: "5 min read",
    date: "24 Jun 2026",
    image: "/images/blogs/blog_banner_invest.png",
    author: "Roofin Research Desk",
    content: [
      "Real estate investment in Delhi NCR continues to outperform conventional financial instruments due to aggressive infrastructure expansion including the Noida International Airport (Jewar), Dwarka Expressway operationalization, and regional rapid transit systems.",
      "Key corridors such as Sector 150 (Noida Sports City) and Sector 128 (Expressway) demonstrate consistent rental yields of 3.8% to 4.5% alongside steady annual capital appreciation.",
      "Smart investors prioritize projects with RERA certifications, developer track records of on-time delivery, and proximity to grade-A commercial IT parks.",
    ],
  },
  {
    id: 2,
    category: "Market Trends",
    title: "Should You Invest in Residential or Commercial Property in 2026?",
    subtitle: "Comparing lease stability, entry ticket sizes, liquidity, and tax benefits.",
    readTime: "6 min read",
    date: "24 Jun 2026",
    image: "/images/blogs/blog_banner_commercial.png",
    author: "Aditi Mathur, Real Estate Analyst",
    content: [
      "While residential real estate offers lower entry barriers, tax write-offs on home loans, and higher emotional security, commercial real estate provides superior gross rental yields averaging 7% to 9%.",
      "Institutional co-working spaces and high-street retail developments in Greater Noida and Golf Course Extension Road are witnessing exponential footfall and long-term lock-in leases.",
      "For retail investors with portfolios under ₹1.5 Crore, prime 3BHK residential units near operational metro lines continue to remain the most resilient asset class.",
    ],
  },
  {
    id: 3,
    category: "Buying Guide",
    title: "First-Time Home Buyer Checklist: 10 Essential Due-Diligence Steps",
    subtitle: "Avoid common legal and financial pitfalls before transferring your token advance.",
    readTime: "4 min read",
    date: "18 Jun 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    author: "Roofin Legal Cell",
    content: [
      "1. Verify the official RERA registration number on the state portal.",
      "2. Scrutinize the Encumbrance Certificate (EC) for the past 30 years to verify clear title.",
      "3. Inspect the Commencement Certificate (CC) and sanctioned master floor plans.",
      "4. Calculate true carpet area versus super built-up area to avoid hidden square-footage inflation.",
      "5. Always obtain a pre-approved home loan sanction before entering into a non-refundable builder-buyer agreement.",
    ],
  },
  {
    id: 4,
    category: "Selling Tips",
    title: "Maximizing Your Property Value: Top Upgrades That Deliver 300% ROI",
    subtitle: "How minor staging and kitchen upgrades dramatically reduce days on market.",
    readTime: "4 min read",
    date: "12 Jun 2026",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    author: "Jitender Singh, Top Agent",
    content: [
      "First impressions sell homes: neutral fresh paint coats (like off-white and warm beige) make spaces feel significantly larger and brighter.",
      "Upgrading bathroom faucets and modernizing cabinet handles creates an immediate impression of premium upkeep at a minimal cost.",
      "High-resolution digital photography and listing through verified verified channels like Roofin ensures 4x more qualified inquiries within the first 14 days.",
    ],
  },
  {
    id: 5,
    category: "Investment",
    title: "Noida International Airport Impact: Real Estate Growth in Yamuna Expressway",
    subtitle: "Evaluating commercial and plotted residential trends over the next 5 years.",
    readTime: "7 min read",
    date: "05 Jun 2026",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    author: "Roofin Research Desk",
    content: [
      "The ongoing development of the Jewar International Airport has transformed Yamuna Expressway from a speculative corridor into a robust infrastructure hub.",
      "Logistics hubs, film city developments, and industrial corridors are fueling immense job creation, spurring massive housing demand across sectors 18, 20, and 22D.",
    ],
  },
  {
    id: 6,
    category: "Market Trends",
    title: "Green Buildings & Sustainable Architecture: Why Buyers Pay 15% More",
    subtitle: "Energy efficiency, solar integration, and rainwater harvesting in modern townships.",
    readTime: "5 min read",
    date: "28 May 2026",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    author: "Vikram Malhotra, Architect",
    content: [
      "LEED-certified and IGBC Gold-rated buildings report 20-30% lower monthly maintenance bills due to solar power integration and smart water treatment systems.",
      "Modern homebuyers increasingly prioritize wellness amenities such as oxygen parks, EV charging bays, and non-toxic interior finishes.",
    ],
  },
];

const CATEGORIES = [
  "All",
  "Investment",
  "Market Trends",
  "Buying Guide",
  "Selling Tips",
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      const matchesCat =
        selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleShare = (article: BlogArticle) => {
    const url = typeof window !== "undefined" ? window.location.href : "/blogs";
    if (navigator.share) {
      navigator.share({ title: article.title, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Article link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <SearchHeader />

      <main className="w-full flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#0B132B] via-[#102A54] to-[#1865F2] text-white py-12 sm:py-16 px-4 sm:px-8">
          <div className="mx-auto w-full max-w-5xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/20 text-[#60A5FA]">
              <BookOpen className="h-4 w-4" />
              <span>ROOFIN KNOWLEDGE BASE & INSIGHTS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Real Estate <span className="text-[#FFCC00]">Insights & Articles</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-normal">
              Stay ahead with curated property analyses, investment advisories, market price movements, and home-buying strategies.
            </p>

            {/* Search Bar */}
            <div className="pt-2 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, guides, market trends..."
                  className="w-full rounded-full border border-white/20 bg-white/95 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1865F2] shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Pills Bar */}
        <section className="bg-white border-b border-slate-200 py-4 px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
          <div className="mx-auto w-full max-w-5xl flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#1865F2] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-10 sm:py-14 px-4 sm:px-8 mx-auto w-full max-w-6xl">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-bold text-slate-700">No articles found</p>
              <p className="text-sm text-slate-500 mt-1">
                Try searching with different terms or selecting another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-xl bg-[#1865F2] px-4 py-2 text-xs font-bold text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#1865F2] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        {article.category}
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{article.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#1865F2] transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1865F2] hover:text-blue-800 transition-colors cursor-pointer"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(article)}
                      aria-label="Share article"
                      className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setActiveArticle(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="inline-block rounded-full bg-blue-50 text-[#1865F2] px-3 py-1 text-xs font-bold mb-3">
                {activeArticle.category}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 pb-4 border-b border-slate-100">
                <span>By {activeArticle.author}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <div className="relative h-60 w-full rounded-2xl overflow-hidden my-5 bg-slate-100">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  sizes="600px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/properties"
                  onClick={() => setActiveArticle(null)}
                  className="rounded-xl bg-[#1865F2] px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  Explore Related Properties
                </Link>

                <button
                  type="button"
                  onClick={() => handleShare(activeArticle)}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share Article</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
