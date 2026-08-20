import { ChevronsLeft, ChevronsRight } from "lucide-react";
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
  text 
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(currentPage, totalPages);

  const navButton =
    "flex items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 shadow-sm transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40";

  const start =
    totalItems != null && perPage != null
      ? (currentPage - 1) * perPage + 1
      : null;
  const end =
    totalItems != null && perPage != null
      ? Math.min(currentPage * perPage, totalItems)
      : null;

  return (
    <div className="mt-10 flex items-center justify-between gap-2 sm:flex-row">
      <div className=" flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => onChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={cn(navButton, "h-8 w-8 sm:h-9 sm:w-auto sm:gap-1 sm:px-3")}
        >
          <ChevronsLeft className="h-4 w-4" />

        </button>

        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center text-sm text-gray-400 sm:h-9 sm:w-9"
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
                "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors sm:h-9 sm:w-9",
                page === currentPage
                  ? "bg-primary text-white shadow-md"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
              )}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          aria-label="Next page"
          onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={cn(navButton, "h-8 w-8 sm:h-9 sm:w-auto sm:gap-1 sm:px-3")}
        >

          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-gray-600">
        {start != null && end != null ? (
          <>
            Showing{" "}
            <span className="font-semibold ">
              {start} to {end}
            </span>{" "}
            of{" "}
            <span className="font-semibold ">
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
