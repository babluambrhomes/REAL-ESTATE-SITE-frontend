"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

export interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  minHeight?: string | number;
  rootMargin?: string;
  className?: string;
  skeletonType?: "cards" | "banner" | "grid" | "simple";
}

/**
 * LazySection component for high-performance lazy loading.
 * Defers rendering and dynamic imports of below-the-fold sections
 * until the user scrolls within `rootMargin` of the section.
 */
export function LazySection({
  children,
  fallback,
  minHeight = "360px",
  rootMargin = "350px 0px",
  className = "",
  skeletonType = "cards",
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If already visible, no need to observe
    if (isVisible) return;

    // Fallback if IntersectionObserver is not available
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    const currentElem = containerRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
      observer.disconnect();
    };
  }, [isVisible, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight: isVisible ? undefined : minHeight }}
    >
      {isVisible ? (
        children
      ) : (
        fallback || <SectionSkeleton type={skeletonType} minHeight={minHeight} />
      )}
    </div>
  );
}

function SectionSkeleton({
  type,
  minHeight,
}: {
  type: "cards" | "banner" | "grid" | "simple";
  minHeight: string | number;
}) {
  if (type === "banner") {
    return (
      <div
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 animate-pulse"
        style={{ minHeight }}
      >
        <div className="w-full h-44 sm:h-56 rounded-2xl bg-gradient-to-r from-slate-100 via-slate-200/70 to-slate-100 border border-slate-200/60" />
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 animate-pulse"
        style={{ minHeight }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-2 rounded-full bg-slate-200" />
          <div className="h-6 w-48 bg-slate-200 rounded-md" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 rounded-2xl bg-slate-100/90 border border-slate-200/60" />
          <div className="h-72 rounded-2xl bg-slate-100/90 border border-slate-200/60" />
        </div>
      </div>
    );
  }

  if (type === "simple") {
    return (
      <div
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 animate-pulse"
        style={{ minHeight }}
      >
        <div className="h-6 w-40 bg-slate-200 rounded-md mb-4" />
        <div className="h-48 rounded-xl bg-slate-100 border border-slate-200/50" />
      </div>
    );
  }

  // Default: "cards" skeleton
  return (
    <div
      className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 animate-pulse"
      style={{ minHeight }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-2 rounded-full bg-slate-200" />
          <div className="h-6 w-48 bg-slate-200 rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-200" />
          <div className="h-8 w-8 rounded-full bg-slate-200" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/60 bg-white p-3 space-y-3 shadow-xs"
          >
            <div className="h-44 w-full rounded-xl bg-slate-100" />
            <div className="h-4 w-3/4 rounded bg-slate-100" />
            <div className="h-3 w-1/2 rounded bg-slate-100" />
            <div className="flex justify-between pt-2">
              <div className="h-5 w-20 rounded bg-slate-200" />
              <div className="h-5 w-16 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LazySection;
