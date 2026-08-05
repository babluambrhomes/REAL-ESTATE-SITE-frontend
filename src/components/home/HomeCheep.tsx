import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Chip = {
  title: string;
  subtitle: string;
  image: string;
  color: string;
};

const chips: Chip[] = [
  {
    title: "Buy a Home",
    subtitle: "200+ properties ready for you",
    image: "/chip_agent.png",
    color: "#2563EB",
  },
  {
    title: "Rent Property",
    subtitle: "Furnished & unfurnished options",
    image: "/chip_property.png",
    color: "#22BC90",
  },
  {
    title: "New Projects",
    subtitle: "Latest launches across NCR",
    image: "/chip_builder.png",
    color: "#9333EA",
  },
];

export const HomeCheep = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {chips.map((chip) => (
          <button
            key={chip.title}
            type="button"
            className="group flex items-center gap-4 rounded-full px-4 py-2 text-left shadow-md ring-1 ring-black/5 transition-transform duration-200 hover:scale-[1.02]"
            style={{
              backgroundImage: `linear-gradient(to right, ${chip.color}, #FFFFFF)`,
            }}
          >
            <div
              className="h-18 w-18 shrink-0 overflow-hidden rounded-full p-2 shadow-lg"
              style={{ backgroundColor: chip.color }}
            >
              <Image
                src={chip.image}
                alt={chip.title}
                width={60}
                height={60}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3
                className="text-lg font-semibold uppercase"
                style={{ color: chip.color }}
              >
                {chip.title}
              </h3>
              <p className="mt-0.5 line-clamp-1 text-sm text-gray-500">
                {chip.subtitle}
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" style={{ color: chip.color }} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
