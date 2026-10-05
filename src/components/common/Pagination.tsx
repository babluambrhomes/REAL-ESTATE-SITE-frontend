"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaginationProps } from "@/types";

const getPageWindow = (currentPage: number, totalPages: number) => {
  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  if (currentPage > 3) pages.push("ellipsis");
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }
  if (currentPage < totalPages - 2) pages.push("ellipsis");
  pages.push(totalPages);
  return pages;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onChange,
  totalItems,
  perPage,
  text = "Properties",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(currentPage, totalPages);

  const navButton =
    "flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-600 shadow-2xs transition-all hover:border-[#1865F2] hover:text-[#1865F2] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer";

  const start =
    totalItems != null && perPage != null
      ? (currentPage - 1) * perPage + 1
      : null;
  const end =
    totalItems != null && perPage != null
      ? Math.min(currentPage * perPage, totalItems)
      : null;

  return (
    <div className="my-8 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center gap-1.5">
        {/* First Page */}
        <button
          type="button"
          aria-label="First page"
          onClick={() => onChange(1)}
          disabled={currentPage === 1}
          className={navButton}
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => onChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={navButton}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {/* Page Numbers */}
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-xs font-medium text-slate-400"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onChange(page)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md text-xs font-bold transition-all cursor-pointer",
                page === currentPage
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-[#1865F2] hover:text-[#1865F2]"
              )}
            >
              {page}
            </button>
          )
        )}

        {/* Next Page */}
        <button
          type="button"
          aria-label="Next page"
          onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={navButton}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* Last Page */}
        <button
          type="button"
          aria-label="Last page"
          onClick={() => onChange(totalPages)}
          disabled={currentPage === totalPages}
          className={navButton}
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Showing Text Matching Figma */}
      <p className="text-[13px] text-[#475569] font-medium">
        {start != null && end != null ? (
          <>
            Showing{" "}
            <span className="font-semibold text-[#0B132B]">
              {start} to {end}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#0B132B]">
              {totalItems!.toLocaleString("en-IN")}
            </span>{" "}
            {text}
          </>
        ) : (
          <>Showing {text}</>
        )}
      </p>
    </div>
  );
};
