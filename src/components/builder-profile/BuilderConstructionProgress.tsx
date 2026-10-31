"use client";

export const BuilderConstructionProgress = () => {
  const steps = [
    { label: "Structure", progress: "100%" },
    { label: "Facade", progress: "82%" },
    { label: "Internal Finishing", progress: "64%" },
    { label: "Flooring", progress: "40%" },
    { label: "Amenities", progress: "30%" },
  ];

  return (
    <div className="w-full bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)] font-poppins">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-black text-[#1865F2] tracking-tight mb-4">
        Construction progress
      </h3>

      {/* Top 78% Pill + Completed Green Progress Bar */}
      <div className="flex items-center gap-4 mb-6">
        <span className="px-3.5 py-1 rounded-full bg-[#EBF5FF] text-[#1865F2] text-xs font-black shadow-2xs shrink-0">
          78%
        </span>
        <div className="flex-1">
          <div className="text-[11px] font-bold text-[#10B981] mb-1">
            Completed
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-[#10B981] rounded-full transition-all duration-1000"
              style={{ width: "78%" }}
            />
          </div>
        </div>
      </div>

      {/* Breakdown Rows (Clean Figma Text Alignment) */}
      <div className="space-y-3.5 pt-2">
        {steps.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs sm:text-[13px]">
            <span className="text-slate-800 font-medium">{s.label}</span>
            <span className="font-bold text-slate-800 text-right">{s.progress}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
