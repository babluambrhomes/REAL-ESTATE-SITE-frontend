"use client";

import { useState } from "react";
import { Star, Edit3, X, Check } from "lucide-react";
import toast from "react-hot-toast";

export const BuilderReviewsSection = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const ratingBreakdown = [
    { stars: "5 star", percent: 85 },
    { stars: "4 star", percent: 65 },
    { stars: "3 star", percent: 45 },
    { stars: "2 star", percent: 20 },
    { stars: "1 star", percent: 10 },
  ];

  const [reviewList, setReviewList] = useState([
    {
      id: "rev-1",
      name: "Ritik Singh",
      avatarBg: "bg-[#7C3AED] text-white",
      date: "10/7/2022 1:10:37 AM",
      rating: 4,
      comment:
        "The Property Is Really Nice. I'm Staying Here Now, And My Experience Has Been Great. The Rooms Are Clean, The Surroundings Are Peaceful, And Everything Is Well Maintained.",
    },
    {
      id: "rev-2",
      name: "Ritik Singh",
      avatarBg: "bg-[#991B1B] text-white",
      date: "10/7/2022 1:10:37 AM",
      rating: 4,
      comment:
        "The Property Is Really Nice. I'm Staying Here Now, And My Experience Has Been Great. The Rooms Are Clean, The Surroundings Are Peaceful, And Everything Is Well Maintained.",
    },
  ]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      name: authorName.trim(),
      avatarBg: "bg-[#1865F2] text-white",
      date: "Just now",
      rating,
      comment: comment.trim(),
    };

    setReviewList([newRev, ...reviewList]);
    setAuthorName("");
    setComment("");
    setIsWriting(false);
    toast.success("Thank you! Your review has been added.");
  };

  const displayedReviews = showAll ? reviewList : reviewList.slice(0, 2);

  return (
    <div className="w-full bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)] font-poppins">
      {/* Header with Write Review */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-black text-[#1865F2] tracking-tight">
          Reputation & Reviews
        </h3>
        <button
          type="button"
          onClick={() => setIsWriting(!isWriting)}
          className="text-xs font-bold text-[#1865F2] hover:underline flex items-center gap-1 cursor-pointer"
        >
          {isWriting ? (
            <>
              <X className="w-3 h-3 text-[#1865F2]" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <Edit3 className="w-3 h-3 text-[#1865F2]" />
              <span>Write Review</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Write Review Form (Conditional) */}
      {isWriting && (
        <form
          onSubmit={handleReviewSubmit}
          className="mb-6 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3 animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0B132B]">Your Rating:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300 fill-slate-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Your Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2]"
          />

          <textarea
            placeholder="Share your experience with this builder..."
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] resize-none"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsWriting(false)}
              className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-xs font-bold text-white shadow-xs cursor-pointer flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </button>
          </div>
        </form>
      )}

      {/* Ratings Summary Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-100">
        {/* Big Score */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-2">
          <span className="text-4xl sm:text-5xl font-black text-[#00B368]">
            4.5
          </span>
          <div className="flex items-center gap-1 text-amber-400 my-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-medium">
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
            ALL Reviews <span className="text-[#1865F2]">({reviewList.length})</span>
          </h4>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {displayedReviews.map((rev, index) => (
            <div
              key={rev.id}
              className={`p-4 rounded-xl bg-white border border-slate-100 flex items-start gap-3.5 shadow-2xs relative ${
                index === 0 ? "border-r-2 border-r-[#1865F2]" : ""
              }`}
            >
              <div className={`w-9 h-9 rounded-full ${rev.avatarBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                {rev.name[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="text-xs sm:text-[13px] font-black text-[#0B132B]">
                    {rev.name}
                  </h5>
                  <span className="text-[10.5px] text-slate-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 my-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rev.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 fill-transparent"
                      }`}
                    />
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
