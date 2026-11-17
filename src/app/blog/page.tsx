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
import { ALL_ARTICLES } from "@/data/blogs";

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

  

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
  

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
                    <Link
                      href={`/blog/${article.slug}`}
                      
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1865F2] hover:text-blue-800 transition-colors cursor-pointer"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      type="button"
                      
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

       
      </main>
    </div>
  );
}
