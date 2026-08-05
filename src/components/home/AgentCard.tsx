import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Eye, Play, UserPlus } from "lucide-react";
import Link from "next/link";

type AgentCardProps = {
  image: string;
  name: string;
  designation: string;
  followers: number;
  views: number;
  videos: number;
};

const Stat = ({
  Icon,
  count,
  label,
}: {
  Icon: LucideIcon;
  count: number;
  label: string;
}) => (
  <div className="group/stat relative flex flex-col items-center gap-1">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-800">
      <Icon className="h-4 w-4 text-secondary" />
    </span>
    <span className="text-[10px] text-white">{count}</span>
    <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-white px-1 py-.5 text-[10px] font-medium text-secondary opacity-0 shadow-lg transition-opacity duration-150 group-hover/stat:opacity-100">
      {label}
    </span>
  </div>
);

export const AgentCard = ({
  image,
  name,
  designation,
  followers,
  views,
  videos,
}: AgentCardProps) => {
  return (
    <div className="group relative">
      <div className="overflow-hidden mb-4 rounded-tr-2xl rounded-bl-2xl bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-64 w-full overflow-hidden ">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-secondary/25 to-transparent" />

          <div className="absolute inset-x-0 top-0 flex justify-end p-3">
            <div className="flex flex-col items-center gap-1">
              <Stat Icon={UserPlus} count={followers} label="Followers" />
              <Stat Icon={Eye} count={views} label="Views" />
              <Stat Icon={Play} count={videos} label="Videos" />
            </div>
          </div>
           <div className="absolute inset-x-0 left-0 bottom-0 flex ">
            
             <div className="p-4">
          <h3 className="flex  text-base font-bold text-[#FBE518]">{name} </h3>
          <p className="mt-0.5 text-sm text-white">{designation}</p>
        </div>
          </div>
        </div>

       
      </div>

      <Link
        href="/agents"
        className="block uppercase text-center whitespace-nowrap rounded-lg w-full bg-secondary px-6 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
      >
        View Profile
      </Link>
    </div>
  );
};
