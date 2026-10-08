"use client";

import Image from "next/image";

export const BrokerHighlightsRow = () => {
  const highlights = [
    {
      id: "hl-1",
      iconSrc: "/broker/Frame (12).png",
      value: "12 Min",
      label: "Response Time",
    },
    {
      id: "hl-2",
      iconSrc: "/broker/Frame (13).png",
      value: "10K+",
      label: "Happy Clients",
    },
    {
      id: "hl-3",
      iconSrc: "/broker/Frame (14).png",
      value: "10+",
      label: "Property sold",
    },
    {
      id: "hl-4",
      iconSrc: "/broker/Frame (15).png",
      value: "Free",
      label: "Site visit",
    },
    {
      id: "hl-5",
      iconSrc: "/broker/Frame (16).png",
      value: "Availability",
      label: "Mon -Sun ( 10am Pm)",
    },
    {
      id: "hl-6",
      iconSrc: "/broker/Frame (17).png",
      value: "Office Address",
      label: "A-56, SECTOR 63, NOIDA-201301",
    },
    {
      id: "hl-7",
      iconSrc: "/broker/Frame (18).png",
      value: "Listing",
      label: "700+",
    },
    {
      id: "hl-8",
      iconSrc: "/broker/Frame (19).png",
      value: "Market Knowladge",
      label: "700+",
    },
  ];

  return (
    <div className="w-full bg-white rounded-[20px] border border-[#D8E6FC] shadow-[0_6px_24px_rgba(24,101,242,0.04)] p-4 sm:p-5 mt-5 font-jakarta overflow-x-auto no-scrollbar">
      <div className="flex items-center divide-x divide-slate-100 min-w-[820px] lg:min-w-0 justify-between">
        {highlights.map((item) => (
          <div
            key={item.id}
            className="flex-1 flex flex-col items-center justify-center text-center px-2 py-1 first:pl-0 last:pr-0"
          >
            <div className="w-11 h-11 rounded-full bg-[#EBF4FE] flex items-center justify-center mb-2 shrink-0 shadow-[0_2px_8px_rgba(24,101,242,0.06)] relative overflow-hidden">
              <Image
                src={item.iconSrc}
                alt={item.label}
                width={22}
                height={22}
                className="object-contain"
              />
            </div>
            <p className="text-[13px] sm:text-[13.5px] font-black text-[#0B132B] tracking-tight leading-tight">
              {item.value}
            </p>
            <p className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium leading-tight mt-0.5 max-w-[125px] truncate">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

