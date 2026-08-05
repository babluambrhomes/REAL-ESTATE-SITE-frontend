import Image from "next/image";
import { Star } from "lucide-react";

type HappyClientCardProps = {
  image: string;
  name: string;
  role: string;
  rating: number;
  review: string;
};

const imgarr = ['/happy_c_v_1.png','/happy_c_v_2.png','/happy_c_v_3.png',];

export const HappyClientCard = ({
  image,
  name,
  role,
  rating,
  review,
}: HappyClientCardProps) => {
  return (
    <div className="flex h-full flex-col overflow-hidden relative  bg-white p-6 shadow-md ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">

      <Image
          src={imgarr[Math.floor(Math.random() * imgarr.length)]}
          alt="roofing-banner"
          width={100}
          height={100}
          className="w-32 h-32 absolute -bottom-10 -right-10 object-contain opacity-10 rotate-12"
        />
      <div className="flex items-center justify-between">
       
        {/* <Quote className="h-8 w-8 text-primary/10" /> */}
        <Image
          src="/happy_client_vector.png"
          alt="roofing-banner"
          width={100}
          height={100}
          className="w-8 h-auto object-contain"
        />
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
        &ldquo;{review}&rdquo;
      </p>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-normal text-gray-900">{name}</h3>
           <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "fill-[#F8990C] text-[#F8990C]"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};
