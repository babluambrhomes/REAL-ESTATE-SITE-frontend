"use client";

import Image from "next/image";

export const CompareFeatureStrip = () => {
  const features = [
    {
      title: "Compare Key Details",
      desc: "Price, Size, Amenities, Location And More",
      iconPath: "/compare/icons/compare_key_details.png",
    },
    {
      title: "Save Time",
      desc: "All Information In One Place.",
      iconPath: "/compare/icons/save_time.png",
    },
    {
      title: "Make Confident Decisions",
      desc: "Clear Differences, Better Insights.",
      iconPath: "/compare/icons/make_confident_decisions.png",
    },
    {
      title: "Share With Family",
      desc: "Get Opinions, Discuss, Decide Together",
      iconPath: "/compare/icons/share_with_family.png",
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 font-jakarta">
      <div className="rounded-[20px] bg-white border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200">
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-center gap-3.5 lg:px-6 first:pl-2 last:pr-2">
            <div className="w-12 h-12 rounded-full bg-[#EBF3FE] flex items-center justify-center shrink-0 p-2.5">
              <Image
                src={feat.iconPath}
                alt={feat.title}
                width={26}
                height={26}
                className="object-contain w-auto h-6"
              />
            </div>
            <div>
              <h4 className="text-[14.5px] sm:text-[15px] font-bold text-[#0B132B] leading-tight">
                {feat.title}
              </h4>
              <p className="text-[11.5px] sm:text-[12px] text-slate-500 font-normal leading-tight mt-1">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
