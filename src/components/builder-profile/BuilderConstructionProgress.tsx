"use client";

export const BuilderConstructionProgress = () => {
  const steps = [
    { label: "Structure", progress: 100 },
    { label: "Facade", progress: 82 },
    { label: "Internal Finishing", progress: 64 },
    { label: "Flooring", progress: 40 },
    { label: "Amenities", progress: 30 },
  ];

  return (
    <div className="w-full bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)] font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-black text-[#1865F2] tracking-tight">
          Construction progress
        </h3>
        <span className="text-[11px] font-bold text-[#00B368]">
          Completed
        </span>
      </div>

      {/* Main Bar (78%) */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-black text-[#1865F2]">78%</span>
        <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-[#00B368] rounded-full transition-all duration-1000"
            style={{ width: "78%" }}
          />
        </div>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        {steps.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs">
            <span className="text-slate-700 font-medium">{s.label}</span>
            <div className="flex items-center gap-3 w-1/2 max-w-[220px]">
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-[#1865F2] rounded-full"
                  style={{ width: `${s.progress}%` }}
                />
              </div>
              <span className="w-9 text-right font-black text-[#0B132B] text-[11px]">
                {s.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
