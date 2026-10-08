"use client";

export const BuilderConstructionProgress = () => {
  const steps = [
    { label: "Structure", progress: 100 },
    { label: "Facade", progress: 82 },
    { label: "Internal Finishing", progress: 64 },
    { label: "Flooring", progress: 48 },
    { label: "Amenities", progress: 30 },
  ];

  return (
    <div className="w-full bg-white rounded-[22px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-black text-[#0B132B]">
          Construction progress
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10.5px] font-bold">
          Completed
        </span>
      </div>

      {/* Main Bar (78%) */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-black text-[#10B981]">78%</span>
        <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-[#10B981] rounded-full transition-all duration-1000"
            style={{ width: "78%" }}
          />
        </div>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        {steps.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-semibold">{s.label}</span>
            <div className="flex items-center gap-3 w-1/2 max-w-[200px]">
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
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
