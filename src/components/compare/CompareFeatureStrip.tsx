"use client";

export const CompareFeatureStrip = () => {
  const features = [
    {
      title: "Compare Key Details",
      desc: "Price, Size, Amenities, Location And More",
      icon: (
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </div>
      ),
    },
    {
      title: "Save Time",
      desc: "All Information In One Place.",
      icon: (
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="13" r="8" />
            <polyline points="12 9 12 13 14.5 15" />
            <path d="M5 3L2 6" />
            <path d="M22 6l-3-3" />
            <path d="M6 18H2" />
            <path d="M4 14H1" />
          </svg>
        </div>
      ),
    },
    {
      title: "Make Confident Decisions",
      desc: "Clear Differences, Better Insights.",
      icon: (
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
      ),
    },
    {
      title: "Share With Family",
      desc: "Get Opinions, Discuss, Decide Together",
      icon: (
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 font-jakarta">
      <div className="rounded-[20px] bg-white border border-slate-100/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200">
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-center gap-3.5 lg:px-5 first:pl-2 last:pr-2">
            {feat.icon}
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
