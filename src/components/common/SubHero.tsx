import Image from "next/image";
import type { SubHeroProps } from "@/types";

export const SubHero = ({
  title,
  image = "/banner/listing_banner.png",
}: SubHeroProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#1865F2]">
      <Image
        src={image}
        alt={title}
        width={1920}
        height={480}
        priority
        sizes="100vw"
        className="w-full h-auto min-h-[220px] sm:min-h-0 block object-cover sm:object-contain"
      />
    </section>
  );
};
