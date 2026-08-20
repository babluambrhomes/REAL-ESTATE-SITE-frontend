import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogCardProps } from "@/types";

export const BlogCard = ({ image, date, title }: BlogCardProps) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden  transition-transform duration-200 ">
      <div className="relative rounded-xl h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <span className="absolute left-3 bottom-3 flex items-center gap-1 rounded-sm bg-white/20 px-2 py-.5 text-[10px]  font-normal text-white">{date}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-2 pt-4">
        <h3 className="line-clamp-2 text-base font-medium text-gray-900">
          {title}
        </h3>

        <button
          type="button"
          className="mt-4 flex items-center gap-1.5 self-start rounded-full border border-primary bg-white px-3 py-1 text-sm font-semibold text-primary shadow-inner shadow-primary/20 transition-colors hover:text-secondary"
      >
           <ArrowUpRight className="h-5 w-5" />
          Read More
        </button>
      </div>
    </div>
  );
};
