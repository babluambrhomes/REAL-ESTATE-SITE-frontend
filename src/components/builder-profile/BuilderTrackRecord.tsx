"use client";

export const BuilderTrackRecord = () => {
  const records = [
    {
      id: "tr-1",
      project: "ReverseEXP 360",
      promisedDate: "Dec 2026",
      deliveredDate: "Oct 2027",
      status: "Early",
      statusClass: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      id: "tr-2",
      project: "ReverseEXP Green",
      promisedDate: "Dec 2026",
      deliveredDate: "Oct 2027",
      status: "On Time",
      statusClass: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    {
      id: "tr-3",
      project: "ReverseEXP Luxe",
      promisedDate: "May 2026",
      deliveredDate: "Oct 2027",
      status: "5 Months Delay",
      statusClass: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "tr-4",
      project: "ReverseEXP Plus",
      promisedDate: "Dec 2026",
      deliveredDate: "Oct 2027",
      status: "On Time",
      statusClass: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    {
      id: "tr-5",
      project: "ReverseEXP Prime",
      promisedDate: "Aug 2026",
      deliveredDate: "Oct 2027",
      status: "1 Month Delay",
      statusClass: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "tr-6",
      project: "ReverseEXP Green",
      promisedDate: "Jun 2026",
      deliveredDate: "Oct 2027",
      status: "On Time",
      statusClass: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    {
      id: "tr-7",
      project: "ReverseEXP 360",
      promisedDate: "Dec 2026",
      deliveredDate: "Oct 2027",
      status: "2 Month Delay",
      statusClass: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  return (
    <div className="w-full bg-white rounded-[22px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] font-jakarta">
      <h3 className="text-base sm:text-lg font-black text-[#0B132B] mb-4">
        Delivery Track Record
      </h3>

      {/* Table Container */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3 font-extrabold">Project</th>
              <th className="pb-3 font-extrabold">Promised Date</th>
              <th className="pb-3 font-extrabold">Delivered Date</th>
              <th className="pb-3 font-extrabold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 font-bold text-[#0B132B]">{r.project}</td>
                <td className="py-3 text-slate-500 font-medium">{r.promisedDate}</td>
                <td className="py-3 text-slate-500 font-medium">{r.deliveredDate}</td>
                <td className="py-3 text-right">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${r.statusClass}`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* On-Time Delivery Progress Metric */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <span className="text-xs font-bold text-[#0B132B] whitespace-nowrap">
          On-time Delivery
        </span>
        <div className="flex-1 max-w-md h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-[#10B981] rounded-full transition-all duration-1000"
            style={{ width: "95%" }}
          />
        </div>
        <span className="text-sm font-black text-[#10B981]">95%</span>
      </div>
    </div>
  );
};
