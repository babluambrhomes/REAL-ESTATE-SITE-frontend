"use client";

import { Star, Edit3 } from "lucide-react";

export const BuilderReviewsSection = () => {
  const ratingBreakdown = [
    { stars: "5 star", percent: 85 },
    { stars: "4 star", percent: 65 },
    { stars: "3 star", percent: 55 },
    { stars: "2 star", percent: 45 },
    { stars: "1 star", percent: 80 },
  ];

  const reviews = [
    {
      id: "rev-1",
      name: "Ritik Singh",
      avatarBg: "bg-purple-600 text-white",
      date: "10/7/2022 1:10:37 AM",
      rating: 5,
      comment:
        "The Property Is Really Nice. I'm Staying Here Now, And My Experience Has Been Great. The Rooms Are Clean, The Surroundings Are Peaceful, And Everything Is Well Maintained.",
    },
    {
      id: "rev-2",
      name: "Ritik Singh",
      avatarBg: "bg-rose-600 text-white",
      date: "10/7/2022 1:10:37 AM",
      rating: 5,
      comment:
        "The Property Is Really Nice. I'm Staying Here Now, And My Experience Has Been Great. The Rooms Are Clean, The Surroundings Are Peaceful, And Everything Is Well Maintained.",
    },
  ];

  return (
    <div className="w-full bg-white rounded-[22px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] font-jakarta">
      {/* Header with Write Review */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-black text-[#0B132B]">
          Reputation & Reviews
        </h3>
        <button
          type="button"
          className="text-xs font-bold text-[#1865F2] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Edit3 className="w-3 h-3" />
          <span>Write Review</span>
        </button>
      </div>

      {/* Ratings Summary Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-100">
        {/* Big Score */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-3">
          <span className="text-4xl sm:text-5xl font-black text-[#0B132B]">
            4.5
          </span>
          <div className="flex items-center gap-1 text-amber-400 my-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            (200 Total Reviews)
          </span>
        </div>

        {/* Rating Breakdown Lines */}
        <div className="md:col-span-8 space-y-2">
          {ratingBreakdown.map((rb) => (
            <div key={rb.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-slate-500 font-medium text-[11px]">
                {rb.stars}
              </span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-[#1865F2] rounded-full"
                  style={{ width: `${rb.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Reviews Section */}
      <div className="pt-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs sm:text-[13px] font-black text-[#0B132B]">
            All Reviews <span className="text-[#1865F2]">(2)</span>
          </h4>
          <button
            type="button"
            className="text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 flex items-start gap-3.5"
            >
              <div className={`w-9 h-9 rounded-full ${rev.avatarBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                {rev.name[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="text-xs sm:text-[13px] font-black text-[#0B132B]">
                    {rev.name}
                  </h5>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 my-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                  {rev.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
