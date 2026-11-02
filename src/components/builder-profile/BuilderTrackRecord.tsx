"use client";

export const BuilderTrackRecord = () => {
  const records = [
    {
      id: "tr-1",
      project: "ReverseEXP 360",
      promisedDate: "Dec 2026",
      deliveredDate: "Oct 2027",
      status: "Early",
      statusClass: "bg-[#E6F9F0] text-[#00B368] border border-[#A7F3D0]",
    },
    {
      id: "tr-2",
      project: "ReverseEXP Green",
      promisedDate: "Dec 2026",
      deliveredDate: "Oct 2027",
      status: "On Time",
      statusClass: "bg-[#EBF7EE] text-[#16A34A] border border-[#BBF7D0]",
    },
    {
      id: "tr-3",
      project: "ReverseEXP Luxe",
      promisedDate: "May 2026",
      deliveredDate: "Oct 2027",
      status: "5 Months Delay",
      statusClass: "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
    },
    {
      id: "tr-4",
      project: "ReverseEXP Plus",
      promisedDate: "Dec 2026",
      deliveredDate: "Oct 2027",
      status: "On Time",
      statusClass: "bg-[#EBF7EE] text-[#16A34A] border border-[#BBF7D0]",
    },
    {
      id: "tr-5",
      project: "ReverseEXP Prime",
      promisedDate: "Aug 2026",
      deliveredDate: "Oct 2027",
      status: "1 Month Delay",
      statusClass: "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
    },
    {
      id: "tr-6",
      project: "ReverseEXP Green",
      promisedDate: "Jun 2026",
      deliveredDate: "Oct 2027",
      status: "On Time",
      statusClass: "bg-[#EBF7EE] text-[#16A34A] border border-[#BBF7D0]",
    },
    {
      id: "tr-7",
      project: "ReverseEXP 360",
      promisedDate: "Dec 2026",
      deliveredDate: "Oct 2027",
      status: "2 Month Delay",
      statusClass: "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
    },
  ];

  return (
    <div className="w-full bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)] font-poppins">
      <h3 className="text-base sm:text-lg font-black text-[#1865F2] mb-4 tracking-tight">
        Delivery Track Record
      </h3>

      {/* Table Container */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#EEF4FF] rounded-xl text-slate-700 font-bold text-xs">
              <th className="py-3 px-4 font-black text-[#0B132B] rounded-l-xl">Project</th>
              <th className="py-3 px-4 font-black text-[#0B132B]">Promised Date</th>
              <th className="py-3 px-4 font-black text-[#0B132B]">Delivered Date</th>
              <th className="py-3 px-4 font-black text-[#0B132B] rounded-r-xl">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-bold text-[#0B132B]">{r.project}</td>
                <td className="py-3 px-4 text-[#1865F2] font-semibold">{r.promisedDate}</td>
                <td className="py-3 px-4 text-[#0B132B] font-medium">{r.deliveredDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3.5 py-1 rounded-full text-[10.5px] font-bold ${
                      r.status === "Early" || r.status.toLowerCase().includes("on time")
                        ? "bg-[#D1FAE5] text-[#059669]"
                        : "bg-[#FEF3C7] text-[#D97706]"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* On-Time Delivery Progress Metric (Exact Figma 1:1) */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <span className="text-xs sm:text-[13px] font-bold text-[#0B132B] whitespace-nowrap">
          On- time Delivery
        </span>
        <div className="flex-1 max-w-xl h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-[#10B981] rounded-full transition-all duration-1000"
            style={{ width: "95%" }}
          />
        </div>
        <span className="text-lg sm:text-xl font-black text-[#10B981]">95%</span>
      </div>
    </div>
  );
};
