import Image from "next/image";
import type { SubHeroProps } from "@/types";

export const SubHero = ({
  title,
  image = "/banner/listing_banner.png",
}: SubHeroProps) => {
  return (
    <section className="relative flex min-h-[320px] w-full items-center overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </section>
  );
};
