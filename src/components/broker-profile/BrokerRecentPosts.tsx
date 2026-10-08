"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Send,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
  Share2,
  Check,
} from "lucide-react";

interface Post {
  id: string;
  badge: string;
  title: string;
  description: string;
  time: string;
  comments: number;
  views: number;
  image: string;
  fullContent?: string;
}

interface BrokerRecentPostsProps {
  isFullGrid?: boolean;
}

export const BrokerRecentPosts = ({
  isFullGrid = false,
}: BrokerRecentPostsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate 20 post cards for full grid view, or 6 for slider
  const rawPosts: Post[] = [
    {
      id: "post-1",
      badge: "Luxury Living at ABC",
      title: "New Launch Alert!",
      description: "Premium 2, 3, & 4 BHK Apartments in Noida Extension",
      time: "2 days ago",
      comments: 10,
      views: 6,
      image: "/builders/figma_photo_noida.png",
      fullContent:
        "Experience supreme luxury with ultra-spacious balconies, panoramic green views, Italian marble flooring, and 50+ modern club amenities at ABC Greens Noida Extension.",
    },
    {
      id: "post-2",
      badge: "Luxury Living at ABC",
      title: "New Launch Alert!",
      description: "Premium 2, 3, & 4 BHK Apartments in Noida Extension",
      time: "2 days ago",
      comments: 10,
      views: 6,
      image: "/builders/figma_photo_gurgaon.png",
      fullContent:
        "Exclusive gated community with Olympic-sized swimming pool, squash court, EV charging bays, and high-speed elevator towers designed by world-renowned architects.",
    },
    {
      id: "post-3",
      badge: "Luxury Living at ABC",
      title: "New Launch Alert!",
      description: "Premium 2, 3, & 4 BHK Apartments in Noida Extension",
      time: "2 days ago",
      comments: 10,
      views: 6,
      image: "/builders/thumb_noida_luxury.png",
      fullContent:
        "Smart home automation ready residences with touch controls, video door phone, 24/7 high-grade security, and round-the-clock water supply.",
    },
    {
      id: "post-4",
      badge: "Luxury Living at ABC",
      title: "New Launch Alert!",
      description: "Premium 2, 3, & 4 BHK Apartments in Noida Extension",
      time: "2 days ago",
      comments: 10,
      views: 6,
      image: "/builders/figma_photo_delhi.png",
      fullContent:
        "Located 5 minutes from FNG Expressway and 10 minutes from central Noida metro stations. Excellent connectivity to commercial hubs and premier schools.",
    },
    {
      id: "post-5",
      badge: "Luxury Living at ABC",
      title: "New Launch Alert!",
      description: "Premium 2, 3, & 4 BHK Apartments in Noida Extension",
      time: "2 days ago",
      comments: 10,
      views: 6,
      image: "/builders/figma_photo_noida.png",
      fullContent:
        "Special pre-launch payment plans (20:80) available with guaranteed zero PLC and free covered car parking for the first 50 buyers.",
    },
  ];

  // Repeat for 20 posts in full grid mode
  const posts: Post[] = isFullGrid
    ? Array.from({ length: 20 }, (_, idx) => ({
        ...rawPosts[idx % rawPosts.length],
        id: `post-grid-${idx + 1}`,
      }))
    : rawPosts;

  const [likes, setLikes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    posts.forEach((p) => {
      initial[p.id] = 67;
    });
    return initial;
  });

  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [customComments, setCustomComments] = useState<Record<string, string[]>>({});

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  const handleLike = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setUserLiked((prev) => {
      const isCurrentlyLiked = !!prev[postId];
      const newLikedState = !isCurrentlyLiked;
      setLikes((likePrev) => ({
        ...likePrev,
        [postId]: isCurrentlyLiked
          ? (likePrev[postId] || 67) - 1
          : (likePrev[postId] || 67) + 1,
      }));
      return { ...prev, [postId]: newLikedState };
    });
  };

  const handleShare = (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/broker#${post.id}`
      );
      setCopiedPostId(post.id);
      setTimeout(() => setCopiedPostId(null), 2500);
    }
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    setCustomComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment.trim()],
    }));
    setNewComment("");
  };

  return (
    <div className="w-full space-y-4 font-jakarta relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-base sm:text-[18px] font-black text-[#0B132B] tracking-tight">
          {isFullGrid ? "Post" : "Recent Posted"}
        </h2>

        <div className="flex items-center gap-2">
          {!isFullGrid && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Scroll left"
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Scroll right"
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <Link
            href="/properties"
            className="text-xs font-bold text-[#1865F2] hover:underline cursor-pointer ml-1"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Copy Toast Alert */}
      {copiedPostId && (
        <div className="absolute top-0 right-20 z-20 px-3 py-1.5 bg-[#0B132B] text-white text-[11px] font-bold rounded-lg shadow-lg flex items-center gap-1.5 animate-in fade-in duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Post link copied!</span>
        </div>
      )}

      {/* Cards Layout: 5-Column Grid on "Post" Tab OR Horizontal Slider on Overview */}
      <div
        ref={!isFullGrid ? scrollContainerRef : undefined}
        className={
          isFullGrid
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5"
            : "flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-2 pt-1 scroll-smooth"
        }
      >
        {posts.map((post) => {
          const isLiked = !!userLiked[post.id];
          const postLikes = likes[post.id] ?? 67;

          return (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`${
                isFullGrid ? "w-full" : "w-[185px] sm:w-[195px] shrink-0"
              } bg-white rounded-[12px] border border-slate-200/90 overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_26px_rgba(24,101,242,0.12)] hover:border-[#1865F2]/40 hover:-translate-y-1 transition-all p-2 sm:p-2.5 flex flex-col justify-between cursor-pointer group`}
            >
              {/* Image + Dark Badge */}
              <div className="relative w-full h-24 sm:h-26 rounded-[8px] overflow-hidden bg-slate-100 mb-2">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 text-[8.5px] font-bold text-white uppercase tracking-tight text-center bg-black/40 backdrop-blur-xs py-0.5 rounded-sm">
                  {post.badge}
                </div>
              </div>

              {/* Post Content */}
              <div className="space-y-0.5 text-left px-0.5">
                <h3 className="text-[11.5px] sm:text-xs font-black text-[#0B132B] truncate group-hover:text-[#1865F2] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[9.5px] text-slate-500 font-medium line-clamp-2 leading-tight">
                  {post.description}
                </p>
                <p className="text-[9px] text-slate-400 font-medium pt-0.5">
                  {post.time}
                </p>
              </div>

              {/* Bottom Engagement Counters */}
              <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[10px] text-slate-400 font-semibold px-0.5">
                {/* Like button */}
                <button
                  type="button"
                  onClick={(e) => handleLike(e, post.id)}
                  className={`flex items-center gap-1 transition-colors cursor-pointer ${
                    isLiked
                      ? "text-red-500 font-bold"
                      : "hover:text-red-500 text-slate-400"
                  }`}
                  aria-label="Like post"
                >
                  <Heart
                    className={`w-3 h-3 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span>{postLikes}</span>
                </button>

                {/* Comments button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(post);
                  }}
                  className="flex items-center gap-1 hover:text-[#1865F2] transition-colors cursor-pointer"
                  aria-label="Comments"
                >
                  <Send className="w-3 h-3" />
                  <span>
                    {(customComments[post.id]?.length || 0) + post.comments}
                  </span>
                </button>

                {/* Views */}
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{post.views}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Post Detail Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-[16px] max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image & Header */}
            <div className="relative w-full h-52 bg-slate-900">
              <Image
                src={selectedPost.image}
                alt={selectedPost.title}
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="px-2 py-0.5 bg-[#1865F2] text-[10px] font-black rounded-md uppercase tracking-wider">
                  {selectedPost.badge}
                </span>
                <h3 className="text-lg font-black mt-1">
                  {selectedPost.title}
                </h3>
                <p className="text-xs text-slate-200">
                  {selectedPost.description} • {selectedPost.time}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[55vh] overflow-y-auto">
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {selectedPost.fullContent}
              </p>

              {/* Engagement Bar */}
              <div className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100">
                <button
                  type="button"
                  onClick={(e) => handleLike(e, selectedPost.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
                    userLiked[selectedPost.id]
                      ? "text-red-500"
                      : "text-slate-600 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      userLiked[selectedPost.id]
                        ? "fill-red-500 text-red-500"
                        : ""
                    }`}
                  />
                  <span>
                    {likes[selectedPost.id] ?? 67} Likes
                  </span>
                </button>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>{selectedPost.views} Views</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleShare(e, selectedPost)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Post</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-black text-[#0B132B] flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#1865F2]" />
                  <span>
                    Comments (
                    {(customComments[selectedPost.id]?.length || 0) +
                      selectedPost.comments}
                    )
                  </span>
                </h4>

                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {(customComments[selectedPost.id] || []).map(
                    (cmt, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-100 text-[11px] text-slate-700"
                      >
                        <p className="font-bold text-[#0B132B]">Verified Buyer</p>
                        <p className="text-slate-600 mt-0.5">{cmt}</p>
                      </div>
                    )
                  )}
                </div>

                {/* Add Comment Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(selectedPost.id);
                      }
                    }}
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#1865F2] focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddComment(selectedPost.id)}
                    className="px-3.5 py-2 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
